import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/destinations-page/details-page/hero-section";
import RecommendedPackages from "@/components/website/destinations-page/details-page/recommended-packages";
import TopExperiences from "@/components/website/destinations-page/details-page/top-experiences";
import WhyVisit from "@/components/website/destinations-page/details-page/why-visit";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Package } from "@/types";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: destination } = await supabase
    .from("destinations")
    .select("*")
    .eq("id", id)
    .single();

  if (!destination) {
    notFound();
  }

  let packages: Package[] = [];
  if (
    destination.recommended_packages &&
    destination.recommended_packages.length > 0
  ) {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .in("id", destination.recommended_packages);
    packages = data || [];
  }

  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSection destination={destination} />
      </div>
      <WhyVisit destination={destination} />
      <TopExperiences destination={destination} />
      <RecommendedPackages packages={packages} />
      <Footer />
    </main>
  );
}
