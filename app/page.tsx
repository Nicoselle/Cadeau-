import Hero from "@/components/marketing/Hero";
import StatsStrip from "@/components/marketing/StatsStrip";
import FeatureGrid from "@/components/marketing/FeatureGrid";
import HowItWorks from "@/components/marketing/HowItWorks";
import Footer from "@/components/marketing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsStrip />
      <FeatureGrid />
      <HowItWorks />
      <Footer />
    </main>
  );
}
