import Header from "@/components/website/_shared/header";
import CreateCustomPackage from "@/components/website/_shared/create-custom-package";
import HeroSection from "@/components/website/packages-page/hero-section";
import Packages from "@/components/website/packages-page/packages";
import React from "react";

export default function Page() {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <Packages />
      <CreateCustomPackage />
    </main>
  );
}
