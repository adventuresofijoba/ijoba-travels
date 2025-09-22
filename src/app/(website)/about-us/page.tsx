import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/about-us-page/hero-section";
import PointsSection from "@/components/website/about-us-page/points-section";
import FaqSection from "@/components/website/landing-page/faq";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <PointsSection />
      <FaqSection />
    </main>
  );
}
