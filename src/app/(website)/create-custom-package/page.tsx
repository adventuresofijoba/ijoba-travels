import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/create-custom-package-page/hero-section";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <Footer hideSubscribe />
    </main>
  );
}
