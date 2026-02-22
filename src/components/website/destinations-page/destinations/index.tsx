import React from "react";
import Card from "../../landing-page/explore-section/card";
import { supabase } from "@/lib/supabase";
import { Destination } from "@/types";

export default async function Destinations({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const { search } = await searchParams;

  // Fetch all active destinations
  const { data: allDestinations, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching destinations:", error);
    return <div>Error loading destinations</div>;
  }

  let destinations = allDestinations as Destination[];

  // Filter in memory to search across multiple fields including JSON arrays
  if (search) {
    const searchLower = search.toLowerCase();
    destinations = destinations.filter((dest) => {
      return (
        dest.name?.toLowerCase().includes(searchLower) ||
        dest.description?.toLowerCase().includes(searchLower) ||
        dest.why_visit_description?.toLowerCase().includes(searchLower) ||
        dest.experiences?.some((exp) =>
          exp?.name?.toLowerCase().includes(searchLower)
        )
      );
    });
  }

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="grid container mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {destinations?.map((destination: any) => (
          <Card key={destination.id} destination={destination as Destination} />
        ))}
        {(!destinations || destinations.length === 0) && (
          <div className="col-span-full text-center text-muted-foreground">
            No destinations found.
          </div>
        )}
      </div>
    </section>
  );
}
