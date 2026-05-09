import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/packages-page/details-page/hero-section";
import PackagesIncludes from "@/components/website/packages-page/details-page/packages-includes";
import Timeline from "@/components/website/packages-page/details-page/timeline";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data: pkg } = await supabase
    .from("packages")
    .select("title, description, image_urls")
    .eq("id", id)
    .single();

  if (!pkg) return { title: "Package Not Found" };

  return {
    title: `${pkg.title} | Ijoba Travels`,
    description: pkg.description || `Book ${pkg.title} with Ijoba Travels.`,
    openGraph: {
      title: `${pkg.title} | Ijoba Travels`,
      description: pkg.description || `Book ${pkg.title} with Ijoba Travels.`,
      images: pkg.image_urls?.[0] ? [pkg.image_urls[0]] : [],
    },
  };
}

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
    .eq("is_active", true)
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
