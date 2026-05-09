import React, { Suspense } from "react";
import SearchInput from "./search-input";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm pt-28 sm:pt-56">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-4xl sm:text-5xl font-semibold text-[#2d2d2d]">
            Explore the world, <br />
            one <span className="italic">destination</span> at a time.
          </h1>
          <p className="text-lg text-[#2d2d2d]/80">
            Find the perfect getaway tailored to your travel style.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="max-w-md h-12 bg-secondary rounded-full mx-auto w-full animate-pulse" />
          }
        >
          <SearchInput />
        </Suspense>
      </div>
    </section>
  );
}
