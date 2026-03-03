"use client";

import { useEffect, useState } from "react";

export default function StatusPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";
  const [state, setState] = useState<"CHECKING" | "OK" | "DOWN">("CHECKING");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${apiBase}/health`, { cache: "no-store" });
        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
        setState("OK");
        setMsg(text);
      } catch (e: any) {
        setState("DOWN");
        setMsg(e?.message ?? String(e));
      }
    })();
  }, [apiBase]);

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700 }}>Service Status</h1>
      <p style={{ marginTop: 8, color: "#666" }}>API: {apiBase}</p>

      <div style={{ marginTop: 16, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
        <div style={{ fontWeight: 700 }}>
          {state === "CHECKING" ? "Checking…" : state === "OK" ? "Operational ✅" : "Down ❌"}
        </div>
        <pre style={{ marginTop: 12, whiteSpace: "pre-wrap" }}>{msg}</pre>
      </div>

      <div style={{ marginTop: 20 }}>
        <a href="/" style={{ textDecoration: "underline" }}>← Home</a>
      </div>
    </main>
  );
}