import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import React from "react";

export default function CreateCustomPackage() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="grid container mx-auto rounded-xl relative overflow-hidden">
        <Image
          src={"/create-custom-package-bg.jpg"}
          fill
          objectFit="cover"
          objectPosition="center"
          priority
          alt="Image"
        />

        <div className="bg-black/50 grid justify-items-center gap-10 py-32 relative">
          <div className="w-full max-w-xl text-white text-center grid gap-5">
            <h2 className="font-playfair-display text-5xl">
              Create a Custom Package Tailored Just for You
            </h2>
            <p className="text-lg text-white">
              Tell us your preferences, and we&apos;ll craft a seamless travel
              experience that matches your unique style—whether it&apos;s
              cultural immersion, adventure, or relaxation.
            </p>
          </div>
          <Button className="w-max">
            Create your Package now
            <Icon icon={"ep:right"} width="16" />
          </Button>
        </div>
      </div>
    </section>
  );
}
