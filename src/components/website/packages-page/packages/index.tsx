import React from "react";
import PackagesCard from "./card";
import { supabase } from "@/lib/supabase";
import { Package } from "@/types";

export default async function Packages({
  searchParams,
}: {
  searchParams?: Promise<{
    destination?: string;
    budget?: string;
    duration?: string;
  }>;
}) {
  const params = await searchParams;
  const destination = params?.destination;
  const budget = params?.budget;
  const duration = params?.duration;

  let query = supabase
    .from("packages")
    .select("*")
    .order("title", { ascending: true });

  if (destination) {
    // We need to filter by destination name
    // The packages table seems to use a text 'destination' column instead of 'destination_id'
    query = query.ilike("destination", `%${destination}%`);
  }

  if (budget) {
    const [minStr, maxStr] = budget.replace(/₦/g, "").split(" - ");
    const min = parseInt(minStr.replace(/,/g, ""), 10);
    const max = maxStr ? parseInt(maxStr.replace(/,/g, ""), 10) : undefined;

    if (!isNaN(min)) query = query.gte("price", min);
    if (max && !isNaN(max)) query = query.lte("price", max);
  }

  if (duration) {
    // Handle "1 - 7 days", "15+ days", "1+ months"
    const isMonths = duration.includes("month");
    const cleanDuration = duration
      .replace(" days", "")
      .replace(" months", "")
      .replace(" month", "");

    if (duration.includes("+")) {
      const min = parseInt(cleanDuration.replace("+", ""), 10);
      if (!isNaN(min)) {
        query = query.gte("duration_days", isMonths ? min * 30 : min);
      }
    } else {
      const [minStr, maxStr] = cleanDuration.split(" - ");
      const min = parseInt(minStr, 10);
      const max = parseInt(maxStr, 10);

      if (!isNaN(min))
        query = query.gte("duration_days", isMonths ? min * 30 : min);
      if (!isNaN(max))
        query = query.lte("duration_days", isMonths ? max * 30 : max);
    }
  }

  const { data: packages, error } = await query;

  if (error) {
    console.error("Error fetching packages:", error);
    return (
      <div className="text-red-500 text-center py-10">
        Error loading packages: {error.message}
      </div>
    );
  }

  // No need to manually fetch destinations if we just use the 'destination' text column
  // which seems to be what is populated in the database based on previous errors

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="grid container mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {packages?.map((pkg: any) => (
          <PackagesCard
            key={pkg.id}
            packageData={pkg as Package & { destinations?: { name: string } }}
          />
        ))}
        {(!packages || packages.length === 0) && (
          <div className="col-span-full text-center text-muted-foreground">
            No packages found.
          </div>
        )}
      </div>
    </section>
  );
}
