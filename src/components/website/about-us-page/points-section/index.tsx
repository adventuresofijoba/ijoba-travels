import Image from "next/image";
import React from "react";

export default function PointsSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        {/* point one */}
        <div className="grid lg:grid-cols-2 items-center gap-5">
          <p className="text-xl pr-28">
            Ijoba Travels is the creative brainchild of Adventures of Ijoba, a
            brand that began as a traveler&apos;s way of sharing authentic
            travel stories and experiences. What began as a journey of
            exploration evolved into a community of adventurers inspired to see
            the world in a new light. From that spirit, Ijoba Travels emerged,
            transforming inspiration into action by designing curated trips for
            travelers seeking more than the ordinary.
          </p>
          <span className="relative aspect-[1271/1032] rounded-xl overflow-hidden">
            <Image
              src={"/about-us-img-1.png"}
              fill
              objectFit="cover"
              objectPosition="center"
              alt="Image"
            />
          </span>
        </div>
        {/* point Two */}
        <div className="grid lg:grid-cols-2 gap-5 items-center">
          <span className="relative aspect-[1271/1032] rounded-xl overflow-hidden order-1 lg:order-none">
            <Image
              src={"/about-us-img-2.png"}
              fill
              objectFit="cover"
              objectPosition="center"
              alt="Image"
            />
          </span>
          <p className="text-xl pl-28">
            Today, we bring that same personal touch into every trip we plan.
            Whether it&apos;s a weekend escape within Nigeria, a cultural
            journey across Africa, or an international adventure beyond, Ijoba
            Travels is committed to crafting experiences that are personal,
            seamless, and unforgettable. At Ijoba Travels, we don&apos;t just
            plan trips; we curate memories that transcend time.
          </p>
        </div>
      </div>
    </section>
  );
}
