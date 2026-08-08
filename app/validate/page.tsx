import { Suspense } from "react";
import ValidateClient from "@/components/ValidateClient";

export default function ValidatePage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-3xl px-6 py-12 text-sm text-zinc-500">
          Loading…
        </main>
      }
    >
      <ValidateClient />
    </Suspense>
  );
}
