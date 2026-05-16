import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import DetailsPage from "@/components/website/stories-and-tips-page/details-page";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import RecommendedPackages from "@/components/website/_shared/recommended-packages";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Package } from "@/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: story } = await supabase
    .from("stories")
    .select("title, cover_image") // 👈 use your actual column names
    .eq("slug", slug)
    .single();

  if (!story) return { title: "Story Not Found" };

  return {
    title: story.title ?? "Story & Tips",
    description: `Read ${story.title ?? "Story & Tips"} on Ijoba Travels.`,
    openGraph: {
      title: `${story.title ?? "Story & Tips"} | Ijoba Travels`,
      description: `Read ${story.title ?? "Story & Tips"} on Ijoba Travels.`,
      images: story.cover_image ? [story.cover_image] : [],
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

  let packages: Package[] = [];
  let recommendedIds: string[] = [];

  if (story.recommended_packages) {
    if (Array.isArray(story.recommended_packages)) {
      recommendedIds = story.recommended_packages;
    } else if (typeof story.recommended_packages === "string") {
      try {
        recommendedIds = JSON.parse(story.recommended_packages);
      } catch (e) {
        // Handle comma separated string just in case
        recommendedIds = story.recommended_packages
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
      <Header variant="variant-2" />
      <DetailsPage story={story} />
      <div className="flex items-center gap-5 mx-auto w-max mt-5">
        <Link
          href={"https://wa.me/+447470524596"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon icon={"mage:whatsapp-filled"} width="32" color="#F4A261" />
        </Link>
        <Link
          href={"https://www.instagram.com/ijoba.travel"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon icon={"mage:instagram-circle"} width="32" color="#F4A261" />
        </Link>
        <Link
          href={"https://www.youtube.com/@adventuresofijoba"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon
            icon={"entypo-social:youtube-with-circle"}
            width="32"
            color="#F4A261"
          />
        </Link>
        <Link
          href={"https://www.tiktok.com/@ijoba.travel"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon icon={"mage:tiktok-circle"} width="32" color="#F4A261" />
        </Link>
      </div>

      <RecommendedPackages packages={packages} />
      <Footer />
    </main>
  );
}
