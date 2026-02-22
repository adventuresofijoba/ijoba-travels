import React from "react";
import Card from "./card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Story } from "@/types";

export default async function TravelStoriesSection() {
  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold italic">
            Travel Stories
            <br /> & Tips
          </h2>
          <p className="text-lg">
            Get inspired with our latest travel guides, tips, and stories from
            the road.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {stories?.map((story: any) => (
            <Card key={story.id} story={story as Story} />
          ))}
          {(!stories || stories.length === 0) && (
            <div className="col-span-full text-center text-muted-foreground">
              No stories found.
            </div>
          )}
        </div>

        <Link href="/stories-and-tips" className="w-max mx-auto mt-10">
          <Button>
            Explore More Travel Stories
            <Icon icon={"ep:right"} width="24" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
