"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Destination } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface TopExperiencesProps {
  destination: Destination;
}

export default function TopExperiences({ destination }: TopExperiencesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const experiences = (destination.experiences || []).filter(
    (exp) => exp && exp.name && exp.image_url
  );

  if (experiences.length === 0) {
    return null;
  }

  const currentExperience = experiences[currentIndex];

  if (!currentExperience) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + experiences.length) % experiences.length
    );
  };

  return (
    <section className="bg-[#F5E8C7] px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col gap-5">
        {/* Main Image Card */}
        <div className="relative w-full h-[370px] lg:h-auto lg:aspect-[1271/592] rounded-xl overflow-hidden bg-[#E0E0E0] group">
          <ImageWithFallback
            src={currentExperience.image_url}
            alt={currentExperience.name}
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
              {currentExperience.name}
            </h2>
          </div>
        </div>

        {/* Controls & Indicators */}
        <div className="flex flex-row items-center justify-between gap-10 w-full">
          {/* Progress Indicators */}
          <div className="flex items-center gap-2.5 lg:gap-4 w-full lg:w-auto">
            <span className="font-lato text-sm lg:text-lg text-[#2D2D2D]">
              <span className="font-semibold">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              /{String(experiences.length).padStart(2, "0")}
            </span>

            <div className="flex items-center w-full lg:max-w-none">
              {experiences.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    "h-full transition-all duration-300 bg-[#F4A261] mr-1 rounded-full",
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
              <Icon icon="mingcute:arrow-left-line" className="text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 bg-primary hover:bg-primary/80 rounded-full transition-colors cursor-pointer sm:text-2xl"
            >
              <Icon icon="mingcute:arrow-right-line" className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
