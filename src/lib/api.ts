/**
 * API client for LexAI backend.
 * Base URL: NEXT_PUBLIC_API_BASE (e.g. http://127.0.0.1:8000)
 *
 * Reverse Query: POST /reverse-query (또는 OpenAPI에서 자동 탐색)
 * CMS: /admin/content/{page} (GET/PUT)
 */

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

/** Reverse query endpoint path. Backend may use e.g. /api/reverse-query — change here if needed. */
export const REVERSE_QUERY_ENDPOINT = "/reverse-query";

export function getApiBase(): string {
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
  try {
    const res = await fetch(`${API_BASE}/health`, { cache: "no-store" });
    const text = await res.text();
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
  try {
    const res = await fetch(`${API_BASE}/openapi.json`, { cache: "no-store" });
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
  const path = Object.keys(spec.paths).find(
    (p) => lower(p).includes("reverse") && lower(p).includes("query"),
  );
  return path ?? REVERSE_QUERY_ENDPOINT;
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
  const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
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

