import type { Metadata } from "next";
import { BriefingClient } from "@/components/briefing-client";

export const metadata: Metadata = {
  title: "Dossier",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  return (
    <div className="container py-12 sm:py-16">
      <BriefingClient />
    </div>
  );
}
