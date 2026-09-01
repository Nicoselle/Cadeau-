import type { Metadata } from "next";
import { RoosterApp } from "@/components/rooster/rooster-app";

export const metadata: Metadata = {
  title: "Nachtrooster",
  description:
    "Klaar het nachtdienst-uurrooster (21:00–08:00, 7/7) in één klik. Uren, dekking en CSV-export voor op het werk.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RoosterPage() {
  return <RoosterApp />;
}
