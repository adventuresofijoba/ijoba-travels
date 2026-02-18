import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/packages-page/details-page/hero-section";
import PackagesIncludes from "@/components/website/packages-page/details-page/packages-includes";
import Timeline from "@/components/website/packages-page/details-page/timeline";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <PackagesIncludes />
      <Timeline />
      <Footer />
    </main>
  );
}
