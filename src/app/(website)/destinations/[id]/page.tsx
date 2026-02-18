import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/destinations-page/details-page/hero-section";
import RecommendedPackages from "@/components/website/destinations-page/details-page/recommended-packages";
import TopExperiences from "@/components/website/destinations-page/details-page/top-experiences";
import WhyVisit from "@/components/website/destinations-page/details-page/why-visit";
import React from "react";

export default function Page() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSection />
      </div>
      <WhyVisit />
      <TopExperiences />
      <RecommendedPackages />
      <Footer />
    </main>
  );
}
