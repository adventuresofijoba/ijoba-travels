"use client";

import React, { useState, useEffect } from "react";
import Card from "../../landing-page/travel-stories/card";
import Pagination from "./pagination";
import { supabase } from "@/lib/supabase";
import { Story } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

const ITEMS_PER_PAGE = 8;

export default function HeroSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [stories, setStories] = useState<Story[]>([]);
  const [totalStories, setTotalStories] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStories() {
      setLoading(true);
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      const { data, count, error } = await supabase
        .from("stories")
        .select("*", { count: "exact" })
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        console.error("Error fetching stories:", error);
      } else {
        setStories(data as Story[]);
        setTotalStories(count || 0);
      }
      setLoading(false);
    }

    fetchStories();
  }, [currentPage]);

  const totalPages = Math.ceil(totalStories / ITEMS_PER_PAGE);

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-28 sm:py-40">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-4xl sm:text-5xl font-semibold max-w-md mx-auto">
            Travel Stories & Tips{" "}
          </h1>
          <p className="text-lg">
            Get inspired with our latest travel guides, tips, and stories from
            the road.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {loading ? (
            Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <div
                key={index}
                className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full max-w-sm sm:max-w-none mx-auto h-full grid-rows-[auto_1fr]"
              >
                <Skeleton className="h-64 w-full" />
                <div className="grid gap-5 p-5 content-between">
                  <div className="grid gap-3">
                    <Skeleton className="h-7 w-3/4" />
                    <div className="grid gap-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                  <Skeleton className="h-10 w-32" />
                </div>
              </div>
            ))
          ) : stories.length > 0 ? (
            stories.map((story) => <Card key={story.id} story={story} />)
          ) : (
            <div className="col-span-full text-center py-20 text-muted-foreground">
              No stories found.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
