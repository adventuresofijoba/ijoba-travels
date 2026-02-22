"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Package } from "@/types";

interface PackagesIncludesProps {
  pkg: Package;
}

export default function PackagesIncludes({ pkg }: PackagesIncludesProps) {
  const features = pkg.features || [];

  if (features.length === 0) {
    return null;
  }

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col gap-[50px] lg:gap-[80px]">
        <div className="flex flex-col gap-4 text-center max-w-[760px] mx-auto">
          <h2 className="font-playfair-display font-bold text-3xl sm:text-4xl text-[#2D2D2D]">
            What&apos;s Included in Your Package
          </h2>
          <p className="font-lato text-base sm:text-lg text-[#2D2D2D]">
            Everything you need for a seamless and unforgettable journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-[40px] max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 md:gap-[40px] items-start"
            >
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-black grid place-content-center rounded-full text-white">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5 pt-1 w-full">
                <h3 className="font-playfair-display font-bold text-2xl text-[#2D2D2D]">
                  {feature.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {feature.points.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Icon
                          icon="mingcute:check-2-fill"
                          className="text-black"
                          width="20"
                          height="20"
                        />
                      </div>
                      <p className="font-lato text-base md:text-lg text-black leading-relaxed opacity-80">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
