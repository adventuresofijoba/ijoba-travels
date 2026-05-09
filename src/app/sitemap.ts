import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.ijoba.travel/";

  // Static routes
  const staticRoutes = [
    "",
    "/destinations",
    "/packages",
    "/stories-and-tips",
    "/create-custom-package",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  // Dynamic Destinations
  const { data: destinations } = await supabase
    .from("destinations")
    .select("id, updated_at")
    .eq("is_active", true);

  const destinationRoutes = (destinations || []).map((dest) => ({
    url: `${baseUrl}/destinations/${dest.id}`,
    lastModified: new Date(dest.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Packages
  const { data: packages } = await supabase
    .from("packages")
    .select("id, updated_at")
    .eq("is_active", true);

  const packageRoutes = (packages || []).map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.id}`,
    lastModified: new Date(pkg.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Dynamic Stories
  const { data: stories } = await supabase
    .from("stories")
    .select("slug, updated_at")
    .eq("is_published", true);

  const storyRoutes = (stories || []).map((story) => ({
    url: `${baseUrl}/stories-and-tips/${story.slug}`,
    lastModified: new Date(story.updated_at || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...destinationRoutes,
    ...packageRoutes,
    ...storyRoutes,
  ];
}
