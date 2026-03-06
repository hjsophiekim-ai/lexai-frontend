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
  const url = `${API_BASE}/openapi.json`;
  // eslint-disable-next-line no-console
  console.info("[LexAI] API proxy openapi →", url);

  try {
    const res = await fetch(url, { cache: "no-store" });
    const text = await res.text();
    if (!res.ok) {
      return new Response(
        JSON.stringify({
          error: `HTTP ${res.status}: ${text}`,
        }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    return new Response(text, {
      status: 200,
      headers: {
        "Content-Type":
          res.headers.get("Content-Type") ?? "application/json",
      },
    });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

