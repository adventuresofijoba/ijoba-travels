import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import DetailsPage from "@/components/website/stories-and-tips-page/details-page";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: story } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!story) {
    notFound();
  }

  return (
    <main>
      <Header variant="variant-2" />
      <DetailsPage story={story} />
      <Footer />
    </main>
  );
}
