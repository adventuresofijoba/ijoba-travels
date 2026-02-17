"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

const TIMELINES = [
  {
    id: "01",
    date: "March 23, 2025",
    title: "City trip to Tokyo",
    text: "Experience the perfect blend of tradition and modernity during this city trip to Tokyo.",
  },
  {
    id: "01",
    date: "March 23, 2025",
    title: "City trip to Tokyo",
    text: "Experience the perfect blend of tradition and modernity during this city trip to Tokyo.",
  },
  {
    id: "01",
    date: "March 23, 2025",
    title: "City trip to Tokyo",
    text: "Experience the perfect blend of tradition and modernity during this city trip to Tokyo.",
  },
  {
    id: "01",
    date: "March 23, 2025",
    title: "City trip to Tokyo",
    text: "Experience the perfect blend of tradition and modernity during this city trip to Tokyo.",
  },
];

export default function Timeline() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col gap-[50px] lg:gap-[80px]">
        <div className="flex flex-col gap-4 text-center max-w-5xl mx-auto">
          <h2 className="font-playfair-display font-bold text-3xl sm:text-4xl text-[#2D2D2D]">
            Timeline
          </h2>
          <p className="font-lato text-base sm:text-lg text-[#2D2D2D]">
            Discover handpicked destinations and exclusive deals.
          </p>
        </div>

        <div className="grid gap-4 max-w-5xl w-full mx-auto">
          {TIMELINES.map((timeline, index) => (
            <div
              key={index}
              className={cn(
                "min-h-64 relative grid sm:w-1/2",
                index % 2 === 0 ? "ml-auto" : ""
              )}
            >
              <div
                className={cn(
                  "grid grid-rows-[1fr_auto] justify-items-center h-full gap-1 w-2.5 absolute top-0",
                  index % 2 === 0 ? "-left-0" : "-left-0 sm:left-full"
                )}
              >
                <span className="block w-3/4 h-full rounded-full bg-[linear-gradient(180deg,_rgba(0,_0,_0,_0)_0%,_#000000_100%)]"></span>
                <span className="block w-full aspect-square rounded-full bg-[#000000]"></span>
              </div>
              <div className="flex flex-col gap-5 p-8 pb-2.5 self-end">
                <div className="flex items-center gap-[10px]">
                  <Icon
                    icon="solar:calendar-linear"
                    className="text-[#2D2D2D]"
                    width="20"
                    height="20"
                  />
                  <span className="font-lato text-base text-[#2D2D2D]">
                    {timeline.date}
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  <h3 className="font-lato font-semibold text-xl text-[#2D2D2D]">
                    {timeline.title}
                  </h3>
                  <p className="font-lato text-base text-[#2D2D2D] leading-relaxed opacity-80">
                    {timeline.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// border: 5px solid;

// border-image-source:;
