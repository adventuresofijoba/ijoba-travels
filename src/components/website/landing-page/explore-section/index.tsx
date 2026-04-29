import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Destinations from "./destinations";

export default async function ExploreSection() {
  // let destinations: any[] | null = null;
  // {
  //   const q = supabase
  //     .from("destinations")
  //     .select("*")
  //     .eq("is_active", true)
  //     .order("order_index", { ascending: true, nullsFirst: false })
  //     .order("name", { ascending: true })
  //     .limit(8);
  //   const res = await q;
  //   if (res.error && /order_index/i.test(res.error.message || "")) {
  //     const fb = await supabase
  //       .from("destinations")
  //       .select("*")
  //       .eq("is_active", true)
  //       .order("created_at", { ascending: false })
  //       .limit(8);
  //     destinations = fb.data || [];
  //   } else {
  //     destinations = res.data || [];
  //   }
  // }

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

        <Destinations />

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
