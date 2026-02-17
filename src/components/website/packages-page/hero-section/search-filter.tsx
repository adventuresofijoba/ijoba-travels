"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { DESTINATIONS, BUDGETS, DURATIONS } from "./constants";
import { AnimatePresence, motion } from "framer-motion";

type FilterType = "destination" | "budget" | "duration" | null;

export default function SearchFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFilter = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveFilter(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-2.5 items-center w-full max-w-[650px] mx-auto relative z-20"
    >
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
      <AnimatePresence>
        {activeFilter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-[#F8EFD8] rounded-xl p-5 w-full absolute top-[80px] left-0 right-0 shadow-xl z-30"
          >
            {/* Destination Content */}
            {activeFilter === "destination" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-5"
              >
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
              </motion.div>
            )}

            {/* Budget Content */}
            {activeFilter === "budget" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
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
              </motion.div>
            )}

            {/* Duration Content */}
            {activeFilter === "duration" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 md:grid-cols-3 gap-3"
              >
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
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
