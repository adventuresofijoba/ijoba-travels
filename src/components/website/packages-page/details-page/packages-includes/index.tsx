"use client";

import React from "react";
import { Icon } from "@iconify/react";

const INCLUDES = [
  {
    id: "01",
    title: "Accommodation & Stay",
    items: [
      "4-star or 5-star hotels in major cities (Tokyo, Kyoto, Osaka).",
      "Experience an authentic Ryokan (traditional Japanese inn) with tatami floors and futon bedding.",
      "Optional capsule hotel stay for an ultra-modern experience.",
    ],
  },
  {
    id: "02",
    title: "Flights & Transfers",
    items: [
      "Private airport pickup and drop-off service.",
      "High-speed Shinkansen (bullet train) passes for intercity travel.",
      "Local transport passes for buses, subways, and taxis.",
    ],
  },
  {
    id: "03",
    title: "Meals & Culinary Experience",
    items: [
      "Authentic Japanese breakfast with miso soup, rice, grilled fish, and pickles.",
      "Michelin-starred dining experience (optional upgrade).",
      "Guided street food tour in Tokyo’s Tsukiji Market & Osaka’s Dotonbori.",
      "Traditional Tea Ceremony in Kyoto.",
    ],
  },
  {
    id: "04",
    title: "Guided Tours & Excursions",
    items: [
      "Tokyo Highlights: Shibuya Crossing, Senso-ji Temple, Akihabara, and Harajuku.",
      "Kyoto Heritage Tour: Fushimi Inari Shrine, Kinkaku-ji (Golden Pavilion), and Arashiyama Bamboo Forest.",
      "Mount Fuji & Hakone Day Trip: Scenic lake cruise & ropeway ride.",
      "Osaka Nightlife & Street Food Adventure: Dotonbori, Shinsekai, and Umeda Sky Building.",
    ],
  },
  {
    id: "05",
    title: "Special Experiences & Activities",
    items: [
      "Kimono Rental & Photoshoot in Kyoto.",
      "Samurai Experience: Learn the way of the sword with a real Samurai master.",
      "Sushi-Making Class with a professional chef.",
      "Anime & Gaming Tour: Akihabara, Pokémon Center, and Ghibli Museum.",
    ],
  },
  {
    id: "06",
    title: "Shopping & Souvenirs",
    items: [
      "Visit Shinjuku & Ginza for high-end fashion.",
      "Explore Nakamise Shopping Street for traditional crafts.",
      "Personalized shopping assistant available upon request.",
    ],
  },
];

export default function PackagesIncludes() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
      <div className="container mx-auto flex flex-col gap-[50px] lg:gap-[80px]">
        <div className="flex flex-col gap-4 text-center max-w-[760px] mx-auto">
          <h2 className="font-playfair-display font-bold text-3xl sm:text-4xl text-[#2D2D2D]">
            What&apos;s Included in Your Package
          </h2>
          <p className="font-lato text-base sm:text-lg text-[#2D2D2D]">
            Everything you need for a seamless and unforgettable journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-[40px] max-w-[1000px] mx-auto">
          {INCLUDES.map((section, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 md:gap-[40px] items-start"
            >
              {/* Number Badge */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-black grid place-content-center rounded-full text-white">
                  {section.id}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5 pt-1 w-full">
                <h3 className="font-playfair-display font-bold text-2xl text-[#2D2D2D]">
                  {section.title}
                </h3>
                <div className="flex flex-col gap-3">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 flex-shrink-0">
                        <Icon
                          icon="mingcute:check-2-fill"
                          className="text-black"
                          width="20"
                          height="20"
                        />
                      </div>
                      <p className="font-lato text-base md:text-lg text-black leading-relaxed opacity-80">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
