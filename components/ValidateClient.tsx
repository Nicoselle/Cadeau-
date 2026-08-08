"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { ValidationReport } from "@/lib/report";
import ReportView from "@/components/report/ReportView";

const AGENT_STEPS = [
  "Parsing your idea",
  "Mapping the competitive landscape",
  "Sizing the market (TAM / SAM / SOM)",
  "Scanning demand signals",
  "Stress-testing for blind spots",
  "Scoring viability across six factors",
];

type State =
  | { status: "loading" }
  | { status: "done"; report: ValidationReport }
  | { status: "error"; message: string };

function LoadingSequence() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStep((s) => Math.min(s + 1, AGENT_STEPS.length - 1));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mx-auto max-w-md rounded-2xl border border-edge bg-panel p-8">
      <h2 className="text-lg font-semibold text-white">Analyzing your idea…</h2>
      <p className="mt-1 text-sm text-zinc-500">This usually takes 10–20 seconds.</p>
      <ul className="mt-6 space-y-3">
        {AGENT_STEPS.map((label, i) => {
          const isActive = i === step;
          const isDone = i < step;
          return (
            <li key={label} className="flex items-center gap-3 text-sm">
              <span
                className={`inline-block h-2 w-2 rounded-full ${
                  isDone
                    ? "bg-green-400"
                    : isActive
                      ? "animate-pulse-dot bg-accent"
                      : "bg-edge"
                }`}
              />
              <span
                className={
                  isDone
                    ? "text-zinc-400"
                    : isActive
                      ? "text-white"
                      : "text-zinc-600"
                }
              >
                {label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function ValidateClient() {
  const params = useSearchParams();
  const idea = params.get("idea") ?? "";
  const [state, setState] = useState<State>({ status: "loading" });
  // Guard against double-invocation in React StrictMode (dev).
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    if (!idea.trim()) {
      setState({ status: "error", message: "No idea was provided." });
      return;
    }

    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idea }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) {
          setState({
            status: "error",
            message: data?.error ?? "Something went wrong.",
          });
          return;
        }
        setState({ status: "done", report: data.report });
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setState({
          status: "error",
          message: "Network error. Please try again.",
        });
      }
    })();

    return () => controller.abort();
  }, [idea]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm text-zinc-500 transition hover:text-zinc-300"
        >
          ← Preuve AI
        </Link>
        {state.status === "done" && (
          <Link
            href="/"
            className="rounded-lg border border-edge px-3 py-1.5 text-sm text-zinc-300 transition hover:border-accent/50"
          >
            Validate another
          </Link>
        )}
      </div>

      {state.status === "loading" && <LoadingSequence />}

      {state.status === "error" && (
        <div className="mx-auto max-w-md rounded-2xl border border-red-500/30 bg-red-500/5 p-8 text-center">
          <h2 className="text-lg font-semibold text-white">Couldn&apos;t run the scan</h2>
          <p className="mt-2 text-sm text-zinc-400">{state.message}</p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition hover:bg-accent-soft"
          >
            Try again
          </Link>
        </div>
      )}

      {state.status === "done" && (
        <>
          <ReportView report={state.report} />
          <p className="mt-6 rounded-xl border border-edge bg-panel/50 p-4 text-center text-xs text-zinc-500">
            This report is AI-generated. Competitor figures, market sizes, and
            sources are model estimates — verify anything important before you
            build.
          </p>
        </>
      )}
    </main>
  );
}
