import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/stories-and-tips-page/hero-section";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <Footer />
    </main>
  );
}
