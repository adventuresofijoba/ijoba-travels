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
  let recommendedIds: string[] = [];

  if (destination.recommended_packages) {
    if (Array.isArray(destination.recommended_packages)) {
      recommendedIds = destination.recommended_packages;
    } else if (typeof destination.recommended_packages === "string") {
      try {
        recommendedIds = JSON.parse(destination.recommended_packages);
      } catch (e) {
        // Handle comma separated string just in case
        recommendedIds = destination.recommended_packages
          .split(",")
          .map((s: string) => s.trim());
      }
    }
  }

  if (recommendedIds.length > 0) {
    const { data } = await supabase
      .from("packages")
      .select("*")
      .in("id", recommendedIds)
      .eq("is_active", true);
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
