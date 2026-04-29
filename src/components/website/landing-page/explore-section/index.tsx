import Card from "./card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Destination } from "@/types";

export const dynamic = "force-dynamic";

export default async function ExploreSection() {
  let destinations: any[] | null = null;
  {
    const q = supabase
      .from("destinations")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true })
      .limit(8);
    const res = await q;
    if (res.error && /order_index/i.test(res.error.message || "")) {
      const fb = await supabase
        .from("destinations")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(8);
      destinations = fb.data || [];
    } else {
      destinations = res.data || [];
    }
  }

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold max-w-sm italic">
            Explore our top experiences.
          </h2>
          <p className="text-lg">
            Discover handpicked destinations and exclusive deals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {destinations?.map((destination: any) => (
            <Card
              key={destination.id}
              destination={destination as Destination}
            />
          ))}
          {(!destinations || destinations.length === 0) && (
            <div className="col-span-full text-center text-muted-foreground">
              No destinations found.
            </div>
          )}
        </div>

        <Link href={"/destinations"} className="w-max mx-auto mt-10">
          <Button>
            Explore Destinations
            <Icon icon={"ep:right"} width="24" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
