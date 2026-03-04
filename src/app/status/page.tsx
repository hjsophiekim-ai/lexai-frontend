"use client";

import { useEffect, useState } from "react";
import { getApiBase } from "@/lib/api";

type State = "CHECKING" | "OK" | "DOWN";

export default function StatusPage() {
  const apiBase = getApiBase(); // ✅ 환경변수 NEXT_PUBLIC_API_BASE 사용

  const [state, setState] = useState<State>("CHECKING");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      setState("CHECKING");
      setMsg("");

      try {
        const res = await fetch(`${apiBase}/health`, { cache: "no-store" });
        const text = await res.text();

        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);

        if (!alive) return;
        setState("OK");
        setMsg(text || "ok");
      } catch (e: unknown) {
        const err = e instanceof Error ? e.message : String(e);
        if (!alive) return;
        setState("DOWN");
        setMsg(err);
      }
    })();

    return () => {
      alive = false;
    };
  }, [apiBase]);

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Service Status</h1>
      <p style={{ marginTop: 8, color: "#666" }}>API: {apiBase}</p>

      <div
        style={{
          marginTop: 16,
          padding: 16,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      >
        <div style={{ fontWeight: 700 }}>
          {state === "CHECKING"
            ? "Checking…"
            : state === "OK"
              ? "Operational ✅"
              : "Down ❌"}
        </div>
        <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{msg}</pre>
      </div>

      <div style={{ marginTop: 20 }}>
        <a href="/" style={{ textDecoration: "underline" }}>
          ← Home
        </a>
      </div>
    </main>
  );
}