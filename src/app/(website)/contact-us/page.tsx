import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/contact-us-page/hero-section";
import FaqSection from "@/components/website/landing-page/faq";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <FaqSection />
      <Footer hideSubscribe />
    </main>
  );
}
