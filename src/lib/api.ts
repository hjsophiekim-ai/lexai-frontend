/**
 * API client for LexAI backend.
 * Base URL:
 *   - NEXT_PUBLIC_API_BASE (e.g. https://api.lexai.ai.kr or http://127.0.0.1:8000)
 *   - + NEXT_PUBLIC_API_PATH (e.g. /api) 가 붙어서 최종 API_BASE를 이룬다.
 *
 * Reverse Query: POST /reverse-query (또는 OpenAPI에서 자동 탐색)
 * CMS: /admin/content/{page} (GET/PUT)
 */

const RAW_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";
const API_PATH = process.env.NEXT_PUBLIC_API_PATH ?? "";

const API_BASE = (() => {
  const base = RAW_API_BASE.replace(/\/+$/, "");
  if (!API_PATH) return base;
  const normalizedPath = API_PATH.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${base}/${normalizedPath}`;
})();

/** Reverse query endpoint path. Backend may use e.g. /api/reverse-query — change here if needed. */
export const REVERSE_QUERY_ENDPOINT = "/reverse-query";

function shouldUseProxy(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.host;
  return (
    host === "lexai.ai.kr" ||
    host === "www.lexai.ai.kr" ||
    host.endsWith(".vercel.app") ||
    host.startsWith("localhost") ||
    host.startsWith("127.0.0.1")
  );
}

/**
 * 현재 프론트에서 사용 중인 API Base를 반환.
 * 브라우저 콘솔에도 실제 값이 찍히도록 한다.
 */
export function getApiBase(): string {
  if (typeof window !== "undefined") {
    // 이 로그를 통해 브라우저에서 실제 호출되는 Base URL을 확인할 수 있다.
    // (빌드 타임에 NEXT_PUBLIC_API_BASE가 어떻게 Resolve 되었는지 확인용)
    // 예: [LexAI] API_BASE (browser) = https://api.lexai.ai.kr
    // eslint-disable-next-line no-console
    console.info("[LexAI] API_BASE (browser) =", API_BASE);
  } else {
    // eslint-disable-next-line no-console
    console.info("[LexAI] API_BASE (server) =", API_BASE);
  }
  return API_BASE;
}

export type HealthStatus = "ok" | "error";
export type HealthResponse = { status: string };

export async function healthCheck(): Promise<{
  ok: boolean;
  status: HealthStatus;
  data?: HealthResponse;
  error?: string;
}> {
  // 브라우저에서 lexai.ai.kr / vercel / localhost 등일 때는
  // Next.js API Route 프록시를 타서 CORS를 피한다.
  if (typeof window !== "undefined" && shouldUseProxy()) {
    const url = "/api/lexai/health";
    // eslint-disable-next-line no-console
    console.info("[LexAI] healthCheck (proxy) →", url);
    try {
      const res = await fetch(url, { cache: "no-store" });
      const text = await res.text();
      if (!res.ok) {
        return {
          ok: false,
          status: "error",
          error: `HTTP ${res.status}: ${text}`,
        };
      }
      let data: HealthResponse = { status: "ok" };
      try {
        data = JSON.parse(text) as HealthResponse;
      } catch {
        data = { status: text || "ok" };
      }
      return {
        ok: true,
        status: (data.status === "ok" ? "ok" : "error") as HealthStatus,
        data,
      };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      return { ok: false, status: "error", error: msg };
    }
  }

  const base = getApiBase();
  try {
    // 1차: /health 시도
    const healthUrl = `${base}/health`;
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.info("[LexAI] healthCheck →", healthUrl);
    }
    const res = await fetch(healthUrl, { cache: "no-store" });
    const text = await res.text();
    if (res.status === 404) {
      // /health 엔드포인트가 없다면 /openapi.json으로 대체 헬스 체크
      if (typeof window !== "undefined") {
        // eslint-disable-next-line no-console
        console.info(
          "[LexAI] /health 404 → fallback to /openapi.json for health check",
        );
      }
      try {
        const spec = await fetchOpenAPI();
        if (spec) {
          return {
            ok: true,
            status: "ok",
            data: { status: "ok" },
          };
        }
      } catch {
        // ignore, 아래 공통 에러로 떨어진다.
      }
      return {
        ok: false,
        status: "error",
        error: "Health endpoint /health not found (404), and /openapi.json also failed.",
      };
    }

    if (!res.ok) {
      return { ok: false, status: "error", error: `HTTP ${res.status}: ${text}` };
    }
    let data: HealthResponse = { status: "ok" };
    try {
      data = JSON.parse(text) as HealthResponse;
    } catch {
      data = { status: text || "ok" };
    }
    return {
      ok: true,
      status: (data.status === "ok" ? "ok" : "error") as HealthStatus,
      data,
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, status: "error", error: msg };
  }
}

/** OpenAPI spec type (minimal for path discovery) */
export type OpenAPISpec = {
  paths?: Record<string, { post?: unknown; get?: unknown }>;
};

/** Fetch OpenAPI JSON from backend. Used to discover reverse-query endpoint if needed. */
export async function fetchOpenAPI(): Promise<OpenAPISpec | null> {
  // 브라우저에서 CORS를 피하기 위해 프록시 우선 사용
  if (typeof window !== "undefined" && shouldUseProxy()) {
    const url = "/api/lexai/openapi";
    // eslint-disable-next-line no-console
    console.info("[LexAI] fetchOpenAPI (proxy) →", url);
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      return (await res.json()) as OpenAPISpec;
    } catch {
      return null;
    }
  }

  try {
    const base = getApiBase();
    const url = `${base}/openapi.json`;
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.info("[LexAI] fetchOpenAPI →", url);
    }
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as OpenAPISpec;
  } catch {
    return null;
  }
}

/**
 * Discover reverse-query endpoint from OpenAPI paths.
 * Falls back to REVERSE_QUERY_ENDPOINT if not found.
 */
export async function getReverseQueryPath(): Promise<string> {
  const spec = await fetchOpenAPI();
  if (!spec?.paths) return REVERSE_QUERY_ENDPOINT;
  const lower = (s: string) => s.toLowerCase();
  // 1순위: "reverse" + "query" 포함 경로
  let path =
    Object.keys(spec.paths).find(
      (p) => lower(p).includes("reverse") && lower(p).includes("query"),
    ) ?? null;

  // 2순위: "reverse_query" 또는 "reverse-query" 만 포함된 경로
  if (!path) {
    path = Object.keys(spec.paths).find((p) =>
      lower(p).includes("reverse_query") || lower(p).includes("reverse-query"),
    ) ?? null;
  }

  const finalPath = path ?? REVERSE_QUERY_ENDPOINT;
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.info("[LexAI] getReverseQueryPath →", finalPath);
  }
  return finalPath;
}

/** Request body for reverse-query (align with backend OpenAPI schema). */
export type ReverseQueryRequest = {
  document_id?: number;
  version_id?: number;
  start_offset: number;
  end_offset: number;
  /** Optional: if backend accepts raw content instead of IDs */
  document_content?: string;
  version1_content?: string;
  version2_content?: string;
};

/** Single change block from reverse-query response. */
export type ChangeBlock = {
  type?: "added" | "deleted" | "modified";
  start_offset?: number;
  end_offset?: number;
  text?: string;
  summary?: string;
};

/** Reverse-query API response (flexible to match backend). */
export type ReverseQueryResponse = {
  summary?: string;
  evidence?: string[];
  changes?: ChangeBlock[];
  blocks?: ChangeBlock[];
  [key: string]: unknown;
};

export async function reverseQuery(
  body: ReverseQueryRequest,
  endpoint?: string,
): Promise<{ ok: boolean; data?: ReverseQueryResponse; error?: string }> {
  const path = endpoint ?? (await getReverseQueryPath());
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  let url: string;
  if (shouldUseProxy()) {
    url = `/api/lexai/reverse-query?path=${encodeURIComponent(normalizedPath)}`;
  } else {
    const base = getApiBase();
    url = `${base}${normalizedPath}`;
  }
  if (typeof window !== "undefined") {
    // eslint-disable-next-line no-console
    console.info("[LexAI] reverseQuery POST →", url);
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const text = await res.text();
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}: ${text}` };
    }
    let data: ReverseQueryResponse = {};
    try {
      data = JSON.parse(text) as ReverseQueryResponse;
    } catch {
      data = { summary: text };
    }
    return { ok: true, data };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

/* ===================== CMS: Admin Content ===================== */

export type AdminPageId =
  | "home"
  | "product"
  | "technology"
  | "pricing"
  | "customers"
  | "blog"
  | "contact"
  | "docs"
  | "about"
  | "legal"
  | "footer"
  | (string & {});

export type AdminSection = {
  title: string;
  description: string;
};

export type AdminContent = {
  heroTitle?: string;
  heroSubtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  sections?: AdminSection[];
  /** 홈: 배지 문구 (예: Beta 서비스 오픈: 2026.02) */
  badgeText?: string;
  /** 홈: 히어로 아래 보조 문구 */
  heroExtra?: string;
  /** 홈: 핵심 기능 섹션 제목 */
  sectionHeading?: string;
  /** 홈: 핵심 기능 섹션 부제 */
  sectionSubheading?: string;
  /** 홈: 적용 산업 라벨 */
  industryLabel?: string;
  /** 홈: 적용 산업 목록 (쉼표 또는 줄바꿈 구분) */
  industryItems?: string;
  /** 홈: 하단 CTA 섹션 제목 */
  ctaSectionHeading?: string;
  /** 홈: 하단 CTA 버튼 1 */
  ctaSectionPrimary?: string;
  /** 홈: 하단 CTA 버튼 2 */
  ctaSectionSecondary?: string;
};

export async function fetchAdminContent(
  page: AdminPageId,
): Promise<AdminContent | null> {
  try {
    const res = await fetch(`${API_BASE}/admin/content/${page}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return (await res.json()) as AdminContent;
  } catch {
    return null;
  }
}

export async function saveAdminContent(
  page: AdminPageId,
  content: AdminContent,
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(`${API_BASE}/admin/content/${page}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (!res.ok) {
      const text = await res.text();
      return { ok: false, error: `HTTP ${res.status}: ${text}` };
    }
    return { ok: true };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

