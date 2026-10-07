"use client";

import React, { Children, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function Carousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      setCanPrev(track.scrollLeft > 1);
      setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  // Move one "page" of visible cards at a time.
  const scroll = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="grid gap-5">
      <div
        ref={trackRef}
        className="flex items-stretch gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <div className="flex snap-start shrink-0 w-[85%] sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)] xl:w-[calc((100%-60px)/4)]">
            {child}
          </div>
        ))}
      </div>

      {(canPrev || canNext) && (
        <div className="flex justify-center gap-3">
          <Button
            size="icon"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Previous testimonials"
          >
            <Icon icon="ep:back" width="18" />
          </Button>
          <Button
            size="icon"
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Next testimonials"
          >
            <Icon icon="ep:right" width="18" />
          </Button>
        </div>
      )}
    </div>
  );
}
