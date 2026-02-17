import Image from "next/image";
import React from "react";

export default function WhyVisit() {
  return (
    <section className="bg-[#F5E8C7] px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto grid lg:grid-cols-2 gap-[30px] lg:gap-32 items-center">
        {/* Text Content */}
        <div className="grid gap-8 order-2 lg:order-1">
          <div className="grid gap-[10px] lg:gap-5">
            <h2 className="font-playfair-display font-bold text-2xl sm:text-4xl text-[#2D2D2D]">
              Why visit Japan?
            </h2>
            <p className="font-lato sm:text-lg text-[#2D2D2D] leading-relaxed">
              Japan is a land where centuries-old traditions meet
              state-of-the-art innovation. From tranquil temples and cherry
              blossom gardens to neon-lit streets and futuristic technology,
              every corner of Japan offers a unique cultural experience. Whether
              you&apos;re indulging in world-renowned cuisine, discovering
              historical landmarks, or exploring breathtaking landscapes, Japan
              is an unforgettable destination.
            </p>
          </div>
        </div>

        {/* Image Content */}
        <div className="relative w-full h-[253px] lg:h-auto lg:aspect-[629/491] rounded-xl overflow-hidden bg-[#E0E0E0] order-1 lg:order-2">
          <Image
            src="/japan-why-visit.png"
            alt="Why visit Japan"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
