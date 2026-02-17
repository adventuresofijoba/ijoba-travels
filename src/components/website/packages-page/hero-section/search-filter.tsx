"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { DESTINATIONS, BUDGETS, DURATIONS } from "./constants";

type FilterType = "destination" | "budget" | "duration" | null;

export default function SearchFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="flex flex-col gap-2.5 items-center w-full max-w-[650px] mx-auto relative z-20">
      {/* Search Bar */}
      <div className="bg-[#F8EFD8] rounded-full px-4 sm:px-8 py-2.5 sm:py-5 flex items-center justify-between gap-2.5 sm:gap-5 w-full max-w-[625px] shadow-sm">
        {/* Destination Trigger */}
        <button
          onClick={() => toggleFilter("destination")}
          className="flex items-center gap-2.5 group"
        >
          <span className="font-lato text-base text-[#2D2D2D] group-hover:text-primary transition-colors">
            Destination
          </span>
          <Icon
            icon="icon-park-outline:down"
            width="20"
            height="20"
            className={cn(
              "transition-transform duration-200 text-[#2D2D2D] group-hover:text-primary",
              activeFilter === "destination" ? "rotate-180" : ""
            )}
          />
        </button>

        {/* Budget Trigger */}
        <button
          onClick={() => toggleFilter("budget")}
          className="flex items-center gap-2.5 group"
        >
          <span className="font-lato text-base text-[#2D2D2D] group-hover:text-primary transition-colors">
            Budget
          </span>
          <Icon
            icon="icon-park-outline:down"
            width="20"
            height="20"
            className={cn(
              "transition-transform duration-200 text-[#2D2D2D] group-hover:text-primary",
              activeFilter === "budget" ? "rotate-180" : ""
            )}
          />
        </button>

        {/* Duration Trigger */}
        <button
          onClick={() => toggleFilter("duration")}
          className="flex items-center gap-2.5 group"
        >
          <span className="font-lato text-base text-[#2D2D2D] group-hover:text-primary transition-colors">
            Duration
          </span>
          <Icon
            icon="icon-park-outline:down"
            width="20"
            height="20"
            className={cn(
              "transition-transform duration-200 text-[#2D2D2D] group-hover:text-primary",
              activeFilter === "duration" ? "rotate-180" : ""
            )}
          />
        </button>
      </div>

      {/* Dropdown Content */}
      {activeFilter && (
        <div className="bg-[#F8EFD8] rounded-xl p-5 w-full absolute top-[80px] left-0 right-0 shadow-xl animate-in fade-in slide-in-from-top-2 z-30">
          {/* Destination Content */}
          {activeFilter === "destination" && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {DESTINATIONS.map((region) => (
                <div key={region.region} className="flex flex-col gap-2.5">
                  <h3 className="font-playfair-display font-bold text-lg text-[#2D2D2D]">
                    {region.region}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {region.countries.map((country) => (
                      <button
                        key={country}
                        className="flex items-center justify-between group text-left w-full hover:bg-black/5 p-1.5 rounded transition-colors"
                      >
                        <span className="font-lato text-sm text-[#2D2D2D]">
                          {country}
                        </span>
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Icon icon="ep:right" width="10" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Budget Content */}
          {activeFilter === "budget" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {BUDGETS.map((budget) => (
                <button
                  key={budget}
                  className="flex items-center justify-between group bg-white/50 hover:bg-white p-3 rounded-lg transition-all"
                >
                  <span className="font-lato text-sm text-[#2D2D2D]">
                    {budget}
                  </span>
                  <div className="w-5 h-5 bg-white group-hover:bg-[#F8EFD8] rounded-full flex items-center justify-center transition-colors">
                    <Icon icon="ep:right" width="12" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Duration Content */}
          {activeFilter === "duration" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {DURATIONS.map((duration) => (
                <button
                  key={duration}
                  className="flex items-center justify-between group bg-white/50 hover:bg-white p-3 rounded-lg transition-all"
                >
                  <span className="font-lato text-sm text-[#2D2D2D]">
                    {duration}
                  </span>
                  <div className="w-5 h-5 bg-white group-hover:bg-[#F8EFD8] rounded-full flex items-center justify-center transition-colors">
                    <Icon icon="ep:right" width="12" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
