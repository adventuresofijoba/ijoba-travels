import Header from "@/components/website/_shared/header";
import CreateCustomPackage from "@/components/website/_shared/create-custom-package";
import HeroSection from "@/components/website/packages-page/hero-section";
import Packages from "@/components/website/packages-page/packages";
import React from "react";
import Footer from "@/components/website/_shared/footer";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    destination?: string;
    budget?: string;
    duration?: string;
  }>;
}) {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <Packages searchParams={searchParams} />
      <CreateCustomPackage />
      <Footer />
    </main>
  );
}
