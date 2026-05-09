import { supabase } from "@/lib/supabase";
import { Destination } from "@/types";
import Card from "./card";

export default async function Destinations() {
  let destinations: Destination[] = [];
  let error: any = null;

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
    error = fb.error || null;
  } else {
    destinations = res.data || [];
    error = res.error || null;
  }

  if (error) {
    console.error("Error fetching destinations:", error);
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {destinations.length > 0 ? (
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
