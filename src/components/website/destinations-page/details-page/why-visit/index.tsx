import React from "react";
import { Destination } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface WhyVisitProps {
  destination: Destination;
}

export default function WhyVisit({ destination }: WhyVisitProps) {
  const description = destination.why_visit_description || destination.description;
  const imageUrl = destination.why_visit_image_url || destination.image_url;

  if (!description) return null;

  return (
    <section className="bg-[#F5E8C7] px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-[30px] lg:gap-32 items-center">
        {/* Text Content */}
        <div className="grid gap-8 order-2 lg:order-1">
          <div className="grid gap-[10px] lg:gap-5">
            <h2 className="font-playfair-display font-bold text-2xl sm:text-4xl text-[#2D2D2D]">
              Why visit {destination.name}?
            </h2>
            <p className="font-lato sm:text-lg text-[#2D2D2D] leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative w-full h-[253px] lg:h-auto lg:aspect-[629/491] rounded-xl overflow-hidden bg-[#E0E0E0] order-1 lg:order-2">
          <ImageWithFallback
            src={imageUrl}
            alt={`Why visit ${destination.name}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
