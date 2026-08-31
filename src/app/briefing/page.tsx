import type { Metadata } from "next";
import { BriefingClient } from "@/components/briefing-client";

export const metadata: Metadata = {
  title: "Jouw zaak",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  return (
    <div className="container py-14 sm:py-20">
      <BriefingClient />
    </div>
  );
}
