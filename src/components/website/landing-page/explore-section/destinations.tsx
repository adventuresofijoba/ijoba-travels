"use client";

import { supabase } from "@/lib/supabase";
import { Destination } from "@/types";
import Card from "./card";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const fetchDestinations = async () => {
    setLoading(true);
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
      setDestinations(fb.data || []);
      setError(fb.error || null);
    } else {
      setDestinations(res.data || []);
      setError(res.error || null);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDestinations();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {loading ? (
        Array.from({ length: 8 }).map((_, index) => (
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
                </div>
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        ))
      ) : destinations.length > 0 ? (
        destinations.map((destination: any) => (
          <Card key={destination.id} destination={destination as Destination} />
        ))
      ) : (
        <div className="col-span-full text-center text-muted-foreground py-10">
          No destinations found.
        </div>
      )}
    </div>
  );
}
