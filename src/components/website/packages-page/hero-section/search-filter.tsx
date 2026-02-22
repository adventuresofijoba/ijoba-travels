"use client";

import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

type FilterType = "destination" | "budget" | "duration" | null;

interface SearchFilterProps {
  destinations?: string[];
  budgets?: string[];
  durations?: string[];
}

export default function SearchFilter({
  destinations = [],
  budgets = [],
  durations = [],
}: SearchFilterProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const toggleFilter = (filter: FilterType) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleFilterSelect = (type: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    // Toggle: if clicking the same value, remove it
    if (params.get(type) === value) {
      params.delete(type);
    } else {
      params.set(type, value);
    }

    router.push(`/packages?${params.toString()}`);
    setActiveFilter(null);
  };

  const selectedDestination = searchParams.get("destination");
  const selectedBudget = searchParams.get("budget");
  const selectedDuration = searchParams.get("duration");

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
      className="flex flex-col gap-2.5 items-center w-full max-w-[650px] mx-auto relative"
    >
      {/* Search Bar */}
      <div className="bg-[#F8EFD8] rounded-full px-4 sm:px-8 py-2.5 sm:py-5 flex items-center justify-between gap-2.5 sm:gap-5 w-full shadow-sm">
        {/* Destination Trigger */}
        <button
          onClick={() => toggleFilter("destination")}
          className="flex items-center gap-2.5 group"
        >
          <span
            className={cn(
              "font-lato text-base transition-colors",
              selectedDestination
                ? "text-primary font-medium"
                : "text-[#2D2D2D] group-hover:text-primary"
            )}
          >
            {selectedDestination || "Destination"}
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
          <span
            className={cn(
              "font-lato text-base transition-colors",
              selectedBudget
                ? "text-primary font-medium"
                : "text-[#2D2D2D] group-hover:text-primary"
            )}
          >
            {selectedBudget || "Budget"}
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
          <span
            className={cn(
              "font-lato text-base transition-colors",
              selectedDuration
                ? "text-primary font-medium"
                : "text-[#2D2D2D] group-hover:text-primary"
            )}
          >
            {selectedDuration || "Duration"}
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
            className="bg-[#F8EFD8] rounded-xl p-5 w-full absolute top-full mt-4 left-0 right-0 shadow-xl z-30"
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
                {destinations.map((destination) => (
                  <button
                    key={destination}
                    onClick={() =>
                      handleFilterSelect("destination", destination)
                    }
                    className={cn(
                      "flex items-center justify-between group p-3 rounded-lg transition-all",
                      selectedDestination === destination
                        ? "bg-primary text-white"
                        : "bg-white/50 hover:bg-white text-[#2D2D2D]"
                    )}
                  >
                    <span className="font-lato text-sm">{destination}</span>
                    {selectedDestination === destination ? (
                      <Icon icon="akar-icons:check" width="12" />
                    ) : (
                      <div className="w-5 h-5 bg-white group-hover:bg-[#F8EFD8] rounded-full flex items-center justify-center transition-colors">
                        <Icon
                          icon="ep:right"
                          width="12"
                          className="text-black"
                        />
                      </div>
                    )}
                  </button>
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
                {budgets.map((budget) => (
                  <button
                    key={budget}
                    onClick={() => handleFilterSelect("budget", budget)}
                    className={cn(
                      "flex items-center justify-between group p-3 rounded-lg transition-all",
                      selectedBudget === budget
                        ? "bg-primary text-white"
                        : "bg-white/50 hover:bg-white text-[#2D2D2D]"
                    )}
                  >
                    <span className="font-lato text-sm">{budget}</span>
                    {selectedBudget === budget ? (
                      <Icon icon="akar-icons:check" width="12" />
                    ) : (
                      <div className="w-5 h-5 bg-white group-hover:bg-[#F8EFD8] rounded-full flex items-center justify-center transition-colors">
                        <Icon
                          icon="ep:right"
                          width="12"
                          className="text-black"
                        />
                      </div>
                    )}
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
                {durations.map((duration) => (
                  <button
                    key={duration}
                    onClick={() => handleFilterSelect("duration", duration)}
                    className={cn(
                      "flex items-center justify-between group p-3 rounded-lg transition-all",
                      selectedDuration === duration
                        ? "bg-primary text-white"
                        : "bg-white/50 hover:bg-white text-[#2D2D2D]"
                    )}
                  >
                    <span className="font-lato text-sm">{duration}</span>
                    {selectedDuration === duration ? (
                      <Icon icon="akar-icons:check" width="12" />
                    ) : (
                      <div className="w-5 h-5 bg-white group-hover:bg-[#F8EFD8] rounded-full flex items-center justify-center transition-colors">
                        <Icon
                          icon="ep:right"
                          width="12"
                          className="text-black"
                        />
                      </div>
                    )}
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
