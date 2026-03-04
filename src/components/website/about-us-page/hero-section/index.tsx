import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-5xl sm:text-6xl font-semibold">
            About IJOBA TRAVELS
          </h1>
          <p className="text-lg">
            Ijoba Travels is a dynamic travel and tourism company driven by a
            passion for meaningful experiences and unforgettable adventures.
            Built on the belief that travel should inspire discovery, foster
            cultural connections, and create lasting memories, the company
            specializes in thoughtfully curated journeys for individuals,
            groups, and organizations. By combining careful planning, authentic
            local insights, and a commitment to exceptional service, Ijoba
            Travels transforms ordinary trips into enriching experiences that
            stay with travelers long after the journey ends.
          </p>
        </div>

        <span className="relative aspect-[1271/567]">
          <Image
            src={"/about-us-hero-bg.png"}
            fill
            objectFit="cover"
            objectPosition="center"
            alt="Image"
          />
        </span>
      </div>
    </section>
  );
}
