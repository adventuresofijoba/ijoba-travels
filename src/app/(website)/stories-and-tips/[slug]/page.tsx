import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import DetailsPage from "@/components/website/stories-and-tips-page/details-page";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: story } = await supabase
    .from("stories")
    .select("title, excerpt, image_url")
    .eq("slug", slug)
    .single();

  if (!story) return { title: "Story Not Found" };

  return {
    title: `${story.title} | Stories & Tips | Ijoba Travels`,
    description: story.excerpt || `Read ${story.title} on Ijoba Travels.`,
    openGraph: {
      title: `${story.title} | Ijoba Travels`,
      description: story.excerpt || `Read ${story.title} on Ijoba Travels.`,
      images: story.image_url ? [story.image_url] : [],
    },
  };
}

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
