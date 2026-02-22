import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/packages-page/details-page/hero-section";
import PackagesIncludes from "@/components/website/packages-page/details-page/packages-includes";
import Timeline from "@/components/website/packages-page/details-page/timeline";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: pkg } = await supabase
    .from("packages")
    .select("*")
    .eq("id", id)
    .single();

  if (!pkg) {
    notFound();
  }

  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection pkg={pkg} />
      <PackagesIncludes pkg={pkg} />
      <Timeline pkg={pkg} />
      <Footer />
    </main>
  );
}
