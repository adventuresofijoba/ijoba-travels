import React from "react";
import SearchFilter from "./search-filter";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-5xl sm:text-6xl font-semibold">
            Unforgettable <span className="italic">experiences</span>, tailored
            for you.
          </h1>
          <p className="text-lg">
            Choose your next trip from our collection of handpicked experiences
          </p>
        </div>

        <SearchFilter />
      </div>
    </section>
  );
}
