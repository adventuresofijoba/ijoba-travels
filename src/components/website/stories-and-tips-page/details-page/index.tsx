"use client";

import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { Story } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface DetailsPageProps {
  story: Story;
}

export default function DetailsPage({ story }: DetailsPageProps) {
  const date = story.published_at
    ? new Date(story.published_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date(story.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  return (
    <div className="grid gap-10 sm:gap-20 py-10 sm:py-20 justify-items-center w-full max-w-4xl mx-auto px-layout-spacing-xs sm:px-layout-spacing-sm">
      {/* Title Section */}
      <div className="flex flex-col items-center gap-2.5 max-w-[846px] w-full text-center">
        <h1 className="font-playfair-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.16] text-[#2D2D2D]">
          {story.title}
        </h1>
        <p className="font-lato text-lg md:text-xl text-[#2D2D2D]">
          {date} • {story.author_name}
        </p>
      </div>

      <div className="grid gap-5 w-full">
        {/* Hero Image */}
        <div className="w-full aspect-[16/9] relative rounded-[12px] overflow-hidden shadow-sm">
          <ImageWithFallback
            src={story.cover_image}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div
          className="font-lato text-lg text-[#2D2D2D] leading-[1.38] prose max-w-none"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />
      </div>

      <div className="flex items-center gap-5 mx-auto sm:mx-0">
        <Link
          href={"https://wa.me/+447470524596"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon icon={"mage:whatsapp-filled"} width="32" color="#F4A261" />
        </Link>
        <Link
          href={"https://www.instagram.com/ijoba.travel"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon icon={"mage:instagram-circle"} width="32" color="#F4A261" />
        </Link>
        <Link
          href={"https://www.youtube.com/@adventuresofijoba"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon
            icon={"entypo-social:youtube-with-circle"}
            width="32"
            color="#F4A261"
          />
        </Link>
        <Link
          href={"https://www.tiktok.com/@ijoba.travel"}
          target="_blank"
          className="hover:opacity-50 transition-all"
        >
          <Icon icon={"mage:tiktok-circle"} width="32" color="#F4A261" />
        </Link>
      </div>
    </div>
  );
}
