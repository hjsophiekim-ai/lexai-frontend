"use client";

import { useEffect, useState } from "react";
import { getApiBase, healthCheck } from "@/lib/api";

export default function StatusPage() {
  const [state, setState] = useState<"CHECKING" | "OK" | "DOWN">("CHECKING");
  const [msg, setMsg] = useState("");
  const [apiBase, setApiBase] = useState<string>("");

  useEffect(() => {
    let alive = true;

    (async () => {
      setState("CHECKING");
      setMsg("");

      try {
        const base = getApiBase();
        if (alive) setApiBase(base);
        if (typeof window !== "undefined") {
          // eslint-disable-next-line no-console
          console.info("[LexAI] /status using API_BASE =", base);
        }

        const result = await healthCheck();
        if (!alive) return;
        setState(result.ok ? "OK" : "DOWN");
        if (result.ok) {
          setMsg(
            result.data
              ? JSON.stringify(result.data, null, 2)
              : "OK (no payload)",
          );
        } else {
          setMsg(result.error ?? "Unknown error");
        }
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
  }, []);

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