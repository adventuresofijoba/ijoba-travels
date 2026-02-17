"use client";

import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const article = {
  title: "Top 10 Must-Visit Temples in Kyoto",
  author: "Emily Tanaka",
  date: "March 15, 2025",
  image: "/stories-and-tips.jpg",
  content: `
    <p class="mb-4">Kyoto, often called the cultural heart of Japan, is home to over 1,600 temples, each offering a unique glimpse into the country’s spiritual and architectural history. Whether you’re a history buff, a spiritual seeker, or simply a traveler in search of beauty, Kyoto’s temples are a must-visit. Here’s our curated list of the top 10 temples you can’t miss on your trip:</p>

    <div class="flex flex-col gap-4">
      <p>
        <strong>1. Kinkaku-ji (The Golden Pavilion)</strong><br />
        This iconic Zen temple, covered in gold leaf, is a UNESCO World Heritage Site. Its reflection in the surrounding pond is a sight to behold, especially in autumn when the maple trees turn fiery red. Don’t miss the serene gardens and the chance to sip matcha tea while taking in the view.
      </p>

      <p>
        <strong>2. Fushimi Inari Taisha</strong><br />
        Famous for its thousands of red torii gates that form trails up Mount Inari, this Shinto shrine is dedicated to Inari, the god of rice and prosperity. The hike to the summit takes about 2-3 hours and offers stunning views of Kyoto.
      </p>

      <p>
        <strong>3. Kiyomizu-dera</strong><br />
        Perched on a hillside, this temple offers panoramic views of Kyoto from its wooden stage. It’s particularly magical during cherry blossom season or autumn. Try the Otowa Waterfall, where you can drink sacred water for health, longevity, or success.
      </p>

      <p>
        <strong>4. Tō-ji</strong><br />
        Known for its five-story pagoda—the tallest in Japan—Tō-ji is a Shingon Buddhist temple with a monthly flea market that’s a treasure trove for souvenirs.
      </p>

      <p>
        <strong>5. Ginkaku-ji (The Silver Pavilion)</strong><br />
        Despite its name, this temple isn’t covered in silver, but its understated elegance and Zen rock garden make it a peaceful retreat.
      </p>

      <p>
        <strong>6. Ryōan-ji</strong><br />
        Home to Japan’s most famous rock garden, Ryōan-ji is a place for quiet contemplation. The 15 rocks are arranged so that you can never see all of them at once—a metaphor for the mystery of life.
      </p>

      <p>
        <strong>7. Sanjūsangen-dō</strong><br />
        This temple houses 1,001 statues of Kannon, the Buddhist goddess of mercy, in a long wooden hall. The sheer scale and craftsmanship are awe-inspiring.
      </p>

      <p>
        <strong>8. Tōfuku-ji</strong><br />
        A top spot for autumn foliage, Tōfuku-ji’s Tsutenkyo Bridge offers breathtaking views of fiery maple trees. The temple also features a stunning Zen garden.
      </p>

      <p>
        <strong>9. Enryaku-ji</strong><br />
        Located on Mount Hiei, this temple complex is a UNESCO site and the headquarters of the Tendai sect. It’s a bit off the beaten path but worth the trip for its history and serene setting.
      </p>

      <p>
        <strong>10. Nanzen-ji</strong><br />
        Known for its massive Sanmon Gate and beautiful aqueduct, Nanzen-ji is a Zen temple with sprawling grounds perfect for a quiet stroll.
      </p>
    </div>
  `,
};

export default function DetailsPage({}: { slug: string }) {
  return (
    <div className="grid gap-10 sm:gap-20 py-10 sm:py-20 justify-items-center w-full max-w-4xl mx-auto px-layout-spacing-xs sm:px-layout-spacing-sm">
      {/* Title Section */}
      <div className="flex flex-col items-center gap-2.5 max-w-[846px] w-full text-center">
        <h1 className="font-playfair-display font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.16] text-[#2D2D2D]">
          {article.title}
        </h1>
        <p className="font-lato text-lg md:text-xl text-[#2D2D2D]">
          {article.author} | {article.date}
        </p>
      </div>

      <div className="grid gap-5">
        {/* Hero Image */}
        <div className="w-full aspect-[16/9] relative rounded-[12px] overflow-hidden shadow-sm">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content Section */}
        <div
          className="font-lato text-lg text-[#2D2D2D] leading-[1.38]"
          dangerouslySetInnerHTML={{ __html: article.content }}
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
