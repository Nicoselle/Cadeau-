import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Keuze — Decision Intelligence",
  description:
    "Volgende-generatie besluitvormingssoftware: expliciete modellen, causale duiding en een ledger tegen beslissingsamnesie.",
};

export default function KeuzeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-background">{children}</div>;
}
