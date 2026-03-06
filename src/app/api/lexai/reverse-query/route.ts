import { NextRequest } from "next/server";

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

export async function POST(req: NextRequest): Promise<Response> {
  const url = new URL(req.url);
  const path = url.searchParams.get("path") ?? "/reverse-query";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const target = `${API_BASE}${normalizedPath}`;

  try {
    const bodyText = await req.text();

    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyText || undefined,
    });

    const text = await res.text();

    return new Response(text, {
      status: res.status,
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

