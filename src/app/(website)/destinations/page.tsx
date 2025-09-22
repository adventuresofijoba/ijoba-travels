import Header from "@/components/website/_shared/header";
import CreateCustomPackage from "@/components/website/destinations-page/create-custom-package";
import Destinations from "@/components/website/destinations-page/destinations";
import HeroSection from "@/components/website/destinations-page/hero-section";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <Destinations />
      <CreateCustomPackage />
    </main>
  );
}
