import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function HeroSection() {
  return (
    <section className="max-h-[640px] sm:max-h-[768px] h-screen grid overflow-hidden relative bg-[url(/hero-bg.jpg)] bg-cover bg-center">
      <div className="bg-black/60 grid gap-10 content-end justify-center text-white text-center pb-16 sm:pb-32 px-layout-spacing-xs">
        <div className="grid gap-5">
          <h1 className="font-playfair-display italic font-bold text-4xl sm:text-7xl max-w-3xl mx-auto">
            Curating experiences that transcend time.
          </h1>
          <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Seamless travel, tailored adventures, and unforgettable
            memories—your journey starts here.
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
