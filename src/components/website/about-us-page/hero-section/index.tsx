import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-6xl font-semibold">
            About IJOBA TRAVELS
          </h1>
          <p className="text-lg">
            Discover the land of ancient traditions and modern wonders as we
            explore Tokyo&apos;s vibrant cityscape, visit historic Kyoto
            temples, make and savor exquisite authentic traditional food, and
            teleport to the land of your anime dreams. Experience the rich
            culture, breathtaking landscapes, and warm hospitality of Japan on
            this magical journey of cultural immersion and unforgettable
            memories.
          </p>
        </div>

        <Image
          src={"/hero-bg.jpg"}
          width={2000}
          height={2000}
          alt="Image"
          className="max-h-[567px] rounded-xl"
        />
      </div>
    </section>
  );
}
