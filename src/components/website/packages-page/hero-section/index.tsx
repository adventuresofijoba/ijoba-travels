import React from "react";
import SearchFilter from "./search-filter";
import { supabase } from "@/lib/supabase";

async function getFilterData() {
  const { data: destinations } = await supabase
    .from("destinations")
    .select("name")
    .order("name");

  const { data: packages } = await supabase
    .from("packages")
    .select("price, duration_days");

  // Process destinations
  const processedDestinations = destinations?.map((d) => d.name) || [];

  // Process budgets (create ranges based on min/max or fixed steps)
  const prices = packages?.map((p) => p.price) || [];

  // Create logical price ranges
  const budgetRanges = [];
  if (prices.length > 0) {
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Round down to nearest 500
    const start = Math.floor(minPrice / 500) * 500;
    // Round up to nearest 500
    const end = Math.ceil(maxPrice / 500) * 500;

    // Create reasonable step size based on range
    const range = end - start;
    let step = 1000;
    if (range > 10000) step = 2500;
    if (range > 20000) step = 5000;

    for (let i = start; i < end; i += step) {
      budgetRanges.push(
        `₦${i.toLocaleString()} - ₦${(i + step).toLocaleString()}`
      );
    }
  }

  // Process durations
  const durations = packages?.map((p) => p.duration_days) || [];
  const uniqueDurations = Array.from(new Set(durations)).sort((a, b) => a - b);

  // Group durations into ranges if there are many, or list them if few
  const durationRanges = [];
  if (uniqueDurations.length > 0) {
    const maxDuration = Math.max(...uniqueDurations);

    // Create comprehensive ranges based on available data
    durationRanges.push("1 - 7 days");
    if (maxDuration > 7) durationRanges.push("8 - 14 days");
    if (maxDuration > 14) durationRanges.push("15 - 30 days");
    if (maxDuration > 30) durationRanges.push("1+ months");
  }

  return {
    destinations: processedDestinations,
    budgets:
      budgetRanges.length > 0
        ? budgetRanges
        : ["₦1,000 - ₦2,000", "₦2,000 - ₦3,000", "₦3,000+"],
    durations:
      durationRanges.length > 0
        ? Array.from(new Set(durationRanges))
        : ["1 - 7 days", "8 - 14 days", "15+ days"],
  };
}

export default async function HeroSection() {
  const filterData = await getFilterData();

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-28 sm:py-56">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-4xl sm:text-5xl font-semibold">
            Unforgettable <span className="italic">experiences</span>, tailored
            for you.
          </h1>
          <p className="text-lg">
            Choose your next trip from our collection of handpicked experiences
          </p>
        </div>

        <SearchFilter
          destinations={filterData.destinations}
          budgets={filterData.budgets}
          durations={filterData.durations}
        />
      </div>
    </section>
  );
}
