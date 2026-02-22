"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Package } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface PackageCardProps {
  pkg: Package;
  reversed?: boolean;
}

const PackageCard = ({ pkg, reversed }: PackageCardProps) => {
  // Extract highlights from features - flatten all points from all features and take first 4
  const highlights = pkg.features
    .flatMap((feature) => feature.points)
    .slice(0, 4);

  return (
    <div
      className={cn(
        "flex flex-col lg:flex-row gap-6 lg:gap-[60px]",
        reversed ? "lg:flex-row-reverse" : ""
      )}
    >
      {/* Image Side */}
      <div className="w-full lg:w-1/2">
        <div className="relative w-full h-[253px] lg:h-auto lg:aspect-[629/491] rounded-xl overflow-hidden bg-[#E0E0E0]">
          <ImageWithFallback
            src={pkg.image_urls?.[0]}
            alt={pkg.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full lg:w-1/2 flex flex-col self-center gap-6 lg:gap-8">
        <div className="flex flex-col gap-[10px]">
          <h3 className="font-playfair-display font-bold text-2xl lg:text-[32px] text-[#2D2D2D] uppercase leading-tight">
            {pkg.title}
          </h3>
          <p className="font-lato text-base text-[#2D2D2D] leading-relaxed line-clamp-4">
            {pkg.description}
          </p>
        </div>

        {highlights.length > 0 && (
          <div className="flex flex-col gap-5">
            <h4 className="font-playfair-display font-bold text-lg text-[#2D2D2D]">
              Key Highlights:
            </h4>
            <div className="flex flex-col gap-3">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-1">
                    <Icon
                      icon="mingcute:check-2-fill"
                      className="text-[#2D2D2D]"
                      width="18"
                      height="18"
                    />
                  </div>
                  <p className="font-lato text-base text-[#2D2D2D] leading-relaxed">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-start pt-2">
          <Link href={`/packages/${pkg.id}`}>
            <Button className="">Explore Package</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

interface RecommendedPackagesProps {
  packages: Package[];
}

export default function RecommendedPackages({
  packages,
}: RecommendedPackagesProps) {
  if (!packages || packages.length === 0) {
    return null;
  }

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col gap-[50px] lg:gap-[100px]">
        <div className="flex flex-col gap-4 text-center max-w-[760px] mx-auto">
          <h2 className="font-playfair-display font-bold text-3xl sm:text-4xl text-[#2D2D2D]">
            Recommended Packages
          </h2>
          <p className="font-lato sm:text-lg text-[#2D2D2D]">
            Discover handpicked destinations and exclusive deals.
          </p>
        </div>

        <div className="grid gap-[60px] lg:gap-[100px]">
          {packages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} reversed={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
