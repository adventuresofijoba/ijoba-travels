import React from "react";
import { Destination } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface HeroSectionProps {
  destination: Destination;
}

export default function HeroSection({ destination }: HeroSectionProps) {
  return (
    <section className="h-screen grid overflow-hidden relative">
      <div className="absolute inset-0 z-[-1]">
        <ImageWithFallback
          src={destination.image_url}
          alt={destination.name}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      <div className="bg-black/60 grid gap-10 content-end justify-center text-white text-center pb-16 sm:pb-32 px-layout-spacing-xs h-full relative z-10">
        <div className="grid gap-5">
          <h1 className="font-playfair-display italic font-bold text-4xl sm:text-7xl max-w-3xl mx-auto">
            {destination.name}
          </h1>
          <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            {destination.description}
          </p>
        </div>
      </div>
    </section>
  );
}
