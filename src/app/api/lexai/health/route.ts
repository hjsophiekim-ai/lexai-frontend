const RAW_API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";
const API_PATH = process.env.NEXT_PUBLIC_API_PATH ?? "";

const API_BASE = (() => {
  const base = RAW_API_BASE.replace(/\/+$/, "");
  if (!API_PATH) return base;
  const normalizedPath = API_PATH.replace(/^\/+/, "").replace(/\/+$/, "");
  return `${base}/${normalizedPath}`;
})();

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const healthUrl = `${API_BASE}/health`;
  // eslint-disable-next-line no-console
  console.info("[LexAI] API proxy health →", healthUrl);

  try {
    const res = await fetch(healthUrl, { cache: "no-store" });
    const text = await res.text();

    if (res.status === 404) {
      // /health 가 없다면 /openapi.json을 이용해 헬스체크
      const openapiUrl = `${API_BASE}/openapi.json`;
      // eslint-disable-next-line no-console
      console.info(
        "[LexAI] API proxy health fallback →",
        openapiUrl,
      );
      try {
        const openapiRes = await fetch(openapiUrl, { cache: "no-store" });
        if (openapiRes.ok) {
          return new Response(JSON.stringify({ status: "ok" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        }
      } catch {
        // fall through to error response below
      }

      return new Response(
        JSON.stringify({
          status: "error",
          error:
            "Health endpoint /health not found (404), and /openapi.json also failed.",
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    if (!res.ok) {
      return new Response(
        JSON.stringify({
          status: "error",
          error: `HTTP ${res.status}: ${text}`,
        }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // 원본 응답이 JSON이든 텍스트든 그대로 전달
    return new Response(text, {
      status: res.status,
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(
      JSON.stringify({
        status: "error",
        error: msg,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

