import React from "react";

export default function HeroSection() {
  return (
    <section className="max-h-[640px] sm:max-h-[768px] h-screen grid overflow-hidden relative bg-[url(/japan.jpg)] bg-cover bg-center">
      <div className="bg-black/60 grid gap-10 content-end justify-center text-white text-center pb-16 sm:pb-32 px-layout-spacing-xs">
        <div className="grid gap-5">
          <h1 className="font-playfair-display italic font-bold text-4xl sm:text-7xl max-w-3xl mx-auto">
            Japan
          </h1>
          <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            From the cherry blossoms of Kyoto to the neon-lit streets of Tokyo,
            Japan is a country of contrasts. Whether you&apos;re drawn to its
            rich history, mouthwatering cuisine, or high-tech marvels, every
            traveler finds something magical here.
          </p>
        </div>
      </div>
    </section>
  );
}
