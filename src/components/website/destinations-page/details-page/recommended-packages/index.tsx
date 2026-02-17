"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface PackageCardProps {
  image: string;
  title: string;
  description: string;
  highlights: string[];
  reversed?: boolean;
}

const PackageCard = ({
  image,
  title,
  description,
  highlights,
  reversed,
}: PackageCardProps) => (
  <div
    className={cn(
      "flex flex-col lg:flex-row gap-6 lg:gap-[60px]",
      reversed ? "lg:flex-row-reverse" : ""
    )}
  >
    {/* Image Side */}
    <div className="w-full lg:w-1/2">
      <div className="relative w-full h-[253px] lg:h-auto lg:aspect-[629/491] rounded-xl overflow-hidden bg-[#E0E0E0]">
        {/* Placeholder for image - using div for now as images need to be downloaded */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </div>

    {/* Content Side */}
    <div className="w-full lg:w-1/2 flex flex-col gap-6 lg:gap-8">
      <div className="flex flex-col gap-[10px]">
        <h3 className="font-playfair-display font-bold text-2xl lg:text-[32px] text-[#2D2D2D] uppercase leading-tight">
          {title}
        </h3>
        <p className="font-lato text-base text-[#2D2D2D] leading-relaxed">
          {description}
        </p>
      </div>

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

      <div className="flex justify-start pt-2">
        <Link href={"/packages/1"}>
          <Button className="">Explore Package</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default function RecommendedPackages() {
  const packages = [
    {
      title: "TOKYO – THE CITY OF THE FUTURE",
      description:
        "A vibrant metropolis where towering skyscrapers stand alongside historic shrines. Tokyo is known for its cutting-edge technology, bustling streets, and rich cultural sites.",
      image: "/japan.jpg",
      highlights: [
        "Shibuya Crossing – The busiest pedestrian crossing in the world",
        "Sensō-ji Temple – Tokyo’s oldest Buddhist temple",
        "Akihabara – The heart of gaming, anime, and tech",
        "Tsukiji Outer Market – Famous for fresh seafood and street food",
      ],
    },
    {
      title: "KYOTO – A JOURNEY BACK IN TIME",
      description:
        "Once Japan’s imperial capital, Kyoto is home to stunning temples, ancient traditions, and tranquil Zen gardens.",
      image: "/japan.jpg",
      highlights: [
        "Fushimi Inari Shrine – Iconic torii gates pathway",
        "Kinkaku-ji (Golden Pavilion) – A breathtaking gold-covered temple",
        "Arashiyama Bamboo Forest – A surreal nature experience",
        "Gion District – The heart of traditional Geisha culture",
      ],
    },
    {
      title: "OSAKA – THE KITCHEN OF JAPAN",
      description:
        "Famous for its mouthwatering street food, vibrant nightlife, and historic landmarks, Osaka is a must-visit for food lovers.",
      image: "/japan.jpg",
      highlights: [
        "Dotonbori – Lively streets filled with neon lights and food stalls",
        "Osaka Castle – A beautifully preserved samurai-era castle",
        "Shinsekai – Retro district with nostalgic charm",
        "Umeda Sky Building – Stunning panoramic views of the city",
      ],
    },
    {
      title: "MOUNT FUJI – JAPAN’S ICONIC PEAK",
      description:
        "A UNESCO World Heritage site and one of the most photographed mountains in the world, Mount Fuji offers incredible views and adventure opportunities.",
      image: "/japan.jpg",
      highlights: [
        "Fuji Five Lakes – Scenic lakes with perfect Fuji views",
        "Hakone Hot Springs – Relax in onsens with mountain views",
        "Chureito Pagoda – Picture-perfect cherry blossom scenery",
      ],
    },
  ];

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
            <PackageCard key={index} {...pkg} reversed={index % 2 !== 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
