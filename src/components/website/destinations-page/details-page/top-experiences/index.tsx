"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

interface Experience {
  title: string;
  image: string;
}

const EXPERIENCES: Experience[] = [
  {
    title: "Witness the Cherry Blossoms in Kyoto",
    image: "/japan.jpg",
  },
  {
    title: "Explore the Neon Streets of Tokyo",
    image: "/japan.jpg",
  },
  {
    title: "Relax in Hakone Hot Springs",
    image: "/japan.jpg",
  },
  {
    title: "Hike Mount Fuji at Sunrise",
    image: "/japan.jpg",
  },
  {
    title: "Taste Street Food in Osaka",
    image: "/japan.jpg",
  },
  {
    title: "Visit the Peace Memorial in Hiroshima",
    image: "/japan.jpg",
  },
];

export default function TopExperiences() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % EXPERIENCES.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + EXPERIENCES.length) % EXPERIENCES.length
    );
  };

  return (
    <section className="bg-[#F5E8C7] px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col gap-5">
        {/* Main Image Card */}
        <div className="relative w-full h-[370px] lg:h-auto lg:aspect-[1271/592] rounded-xl overflow-hidden bg-[#E0E0E0] group">
          <Image
            src={EXPERIENCES[currentIndex].image}
            alt={EXPERIENCES[currentIndex].title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30" />

          {/* Content */}
          <div className="absolute bottom-[26px] left-[10px] lg:bottom-[50px] lg:left-[50px] flex flex-col gap-[5px] lg:gap-2.5 max-w-[333px] lg:max-w-[606px]">
            <h3 className="font-lato font-medium text-base lg:text-xl text-white">
              Top Experiences:
            </h3>
            <h2 className="font-playfair-display font-bold text-2xl lg:text-5xl text-white leading-tight">
              {EXPERIENCES[currentIndex].title}
            </h2>
          </div>
        </div>

        {/* Controls & Indicators */}
        <div className="flex flex- flex-row items-center justify-between gap-10 w-full">
          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5 lg:gap-4 w-full lg:w-auto">
            <span className="font-lato text-sm lg:text-lg text-[#2D2D2D]">
              <span className="font-semibold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              /{String(EXPERIENCES.length).padStart(2, "0")}
            </span>

            <div className="flex items-center w-full lg:max-w-none">
              {EXPERIENCES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-full transition-all duration-300 bg-[#F4A261]",
                    currentIndex === index
                      ? "flex-1 h-1.5 lg:w-[92px] lg:flex-none"
                      : "flex-1 h-0.5 lg:w-[92px] lg:flex-none opacity-50 hover:opacity-100 hover:h-1"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Navigation Icon */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={prevSlide}
              className="p-2 bg-primary hover:bg-primary/80 rounded-full transition-colors cursor-pointer sm:text-2xl"
            >
              <Icon icon="mingcute:arrow-left-line" className="text-[white]" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-primary hover:bg-primary/80 rounded-full transition-colors cursor-pointer sm:text-2xl"
            >
              <Icon icon="mingcute:arrow-right-line" className="text-[white]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
