import { supabase } from "@/lib/supabase";
import { Destination, Testimonial } from "@/types";
import Card from "./card";
import Carousel from "./carousel";
import ShareExperience from "./share-experience";

function findDestinationImage(
  destination: string,
  destinations: Pick<Destination, "name" | "image_url">[]
) {
  const target = destination.trim().toLowerCase();
  if (!target) return null;
  const match =
    destinations.find((d) => d.name.trim().toLowerCase() === target) ||
    destinations.find((d) => {
      const name = d.name.trim().toLowerCase();
      return target.includes(name) || name.includes(target);
    });
  return match?.image_url || null;
}

export default async function TestimonialsSection() {
  const [{ data: testimonials, error }, { data: destinations }] =
    await Promise.all([
      supabase
        .from("testimonials")
        .select("*")
        .eq("status", "approved")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("destinations")
        .select("name, image_url")
        .eq("is_active", true),
    ]);

  if (error) {
    console.error("Error fetching testimonials:", error);
  }

  const destinationNames = (destinations || []).map((d) => d.name);

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold max-w-md italic">
            What Our Travellers Say
          </h2>
          <p className="text-lg">Real stories from real adventures.</p>
        </div>

        {testimonials && testimonials.length > 0 && (
          <Carousel>
            {(testimonials as Testimonial[]).map((testimonial) => (
              <Card
                key={testimonial.id}
                testimonial={testimonial}
                fallbackImage={findDestinationImage(
                  testimonial.destination,
                  destinations || []
                )}
              />
            ))}
          </Carousel>
        )}

        <ShareExperience destinations={destinationNames} />
      </div>
    </section>
  );
}
