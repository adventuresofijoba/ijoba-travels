import Header from "@/components/website/_shared/header";
import CreateCustomPackage from "@/components/website/_shared/create-custom-package";
import Destinations from "@/components/website/destinations-page/destinations";
import HeroSection from "@/components/website/destinations-page/hero-section";
import React from "react";
import Footer from "@/components/website/_shared/footer";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection />
      <Destinations searchParams={searchParams} />
      <CreateCustomPackage />
      <Footer />
    </main>
  );
}
