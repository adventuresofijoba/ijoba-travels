import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-6xl font-semibold">
            Explore the world, one <span className="italic">destination</span>{" "}
            at a time.
          </h1>
          <p className="text-lg">
            Find the perfect getaway tailored to your travel style.
          </p>
        </div>

        <div className="max-w-md grid grid-cols-[auto_1fr_auto] gap-2.5 items-center bg-secondary p-1 pl-2.5 rounded-full mx-auto w-full">
          <Icon icon={"akar-icons:location"} width="20" color="#2d2d2d" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Where do you want to go?"
            className="outline-none w-full placeholder:text-black text-black"
          />
          <Button>
            Search
            <Icon icon={"ep:right"} width="16" />
          </Button>
        </div>
      </div>
    </section>
  );
}
