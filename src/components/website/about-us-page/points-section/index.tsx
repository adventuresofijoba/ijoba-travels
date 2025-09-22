import Image from "next/image";
import React from "react";

export default function PointsSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        {/* point one */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="lg:max-w-lg grid gap-5 content-center">
            <h2 className="font-playfair-display font-bold text-4xl">
              Our Mission
            </h2>
            <p>
              At Ijoba Travels, we believe travel is more than moving from place
              to place; it&apos;s about creating moments that stay with you
              forever. Our mission is to curate journeys that blend adventure,
              culture, and connection, leaving every traveler with memories that
              transcend time.
            </p>
          </div>
          <Image
            src={"/hero-bg.jpg"}
            width={1000}
            height={1000}
            alt="Image"
            className="rounded-xl"
          />
        </div>
        {/* point Two */}
        <div className="grid lg:grid-cols-2 gap-10">
          <Image
            src={"/hero-bg.jpg"}
            width={1000}
            height={1000}
            alt="Image"
            className="rounded-xl  order-1 lg:order-none"
          />
          <div className="lg:max-w-lg grid gap-5 content-center lg:ml-auto">
            <h2 className="font-playfair-display font-bold text-4xl">
              Our Story
            </h2>
            <p>
              Ijoba Travels is the creative brainchild of{" "}
              <span className="font-semibold">Adventures of Ijoba</span>, a
              brand that began as a traveler&apos;s way of sharing authentic
              travel stories and experiences. What began as a journey of
              exploration evolved into a community of adventurers inspired to
              see the world in a new light. From that spirit, Ijoba Travels
              emerged, transforming inspiration into action by designing curated
              trips for travelers seeking more than the ordinary.
            </p>
          </div>
        </div>
        {/* point Three */}
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="lg:max-w-lg grid gap-5 content-center">
            <h2 className="font-playfair-display font-bold text-4xl">
              Our Commitment
            </h2>
            <p>
              Today, we bring that same personal touch into every trip we plan.
              Whether it&apos;s a weekend escape within Nigeria, a cultural
              journey across Africa, or an international adventure beyond, Ijoba
              Travels is committed to crafting experiences that are personal,
              seamless, and unforgettable.
            </p>
            <p>
              At Ijoba Travels, we don&apos;t just plan trips;{" "}
              <span className="font-semibold">
                we curate memories that transcend time.
              </span>
            </p>
          </div>
          <Image
            src={"/hero-bg.jpg"}
            width={1000}
            height={1000}
            alt="Image"
            className="rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
