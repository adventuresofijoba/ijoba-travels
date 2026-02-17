"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-[60px] lg:gap-[16px]">
        {/* Content Side */}
        <div className="w-full lg:w-1/2 flex flex-col gap-[30px] lg:pr-[20px]">
          <div className="flex flex-col gap-[10px]">
            <h1 className="font-playfair-display font-bold text-3xl sm:text-4xl text-[#2D2D2D] uppercase leading-tight">
              Japan: City trip to Tokyo
            </h1>
            <p className="font-lato text-lg sm:text-xl text-[#2D2D2D] leading-[1.4] opacity-80">
              Discover the land of ancient traditions and modern wonders as we
              explore Tokyo&apos;s vibrant cityscape, visit historic Kyoto
              temples, make and savor exquisite authentic traditional food, and
              teleport to the land of your anime dreams. Experience the rich
              culture, breathtaking landscapes, and warm hospitality of Japan on
              this magical journey of cultural immersion and unforgettable
              memories.
            </p>
          </div>

          <div className="flex flex-col gap-[30px]">
            {/* Date Badge */}
            <div className="flex items-center gap-[10px] w-fit">
              <Icon
                icon="solar:calendar-linear"
                className="text-[#2D2D2D]"
                width="24"
                height="24"
              />
              <span className="font-lato text-base text-[#2D2D2D]">
                March 23, 2025 — March 29, 2025
              </span>
            </div>

            {/* Book Button */}
            <Button className="w-max">Book Trip</Button>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full max-h-96 lg:max-h-none aspect-[630/511] rounded-xl overflow-hidden bg-[#E0E0E0]">
            {/* Placeholder for hero image */}
            <Image
              src="/japan.jpg"
              alt="Japan City Trip"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
