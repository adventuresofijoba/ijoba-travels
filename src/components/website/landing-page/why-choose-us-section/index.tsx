import React from "react";
import Card from "./card";
import { Icon } from "@iconify/react";

export default function WhyChooseUsSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold max-w-[420px] italic">
            Why Choose Adventures of Ijoba?
          </h2>
          <p className="text-lg">Effortless Travel, Unforgettable Memories</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <Card
            icon={
              <Icon icon={"game-icons:journey"} width="24" color="#FFFFFF" />
            }
            title="We Know the Journey Matters"
            description="With us, it’s never just about reaching a destination; it’s about enjoying every moment along the way."
          />
          <Card
            icon={
              <Icon icon={"mdi:passport-check"} width="24" color="#FFFFFF" />
            }
            title="Flights, Visas & the Boring Stuff — Sorted"
            description="From flight bookings to visa support, we handle the details so you can focus on the fun parts of travel."
          />
          <Card
            icon={
              <Icon
                icon="solar:gallery-favourite-bold"
                width="24"
                color="#FFFFFF"
              />
            }
            title="Stays You’ll Love"
            description="We handpick accommodations that fit your vibe; whether that’s chic, cozy, or adventure-ready."
          />
          <Card
            icon={
              <Icon
                icon={"streamline-flex:arrow-roadmap-solid"}
                width="24"
                color="#FFFFFF"
              />
            }
            title="Adventures, Not Itineraries"
            description="Our trips are designed for stories you’ll tell forever — cultural tours, hidden gems, and experiences you won’t find in a brochure. "
          />
          <Card
            icon={
              <Icon
                icon={"material-symbols:travel"}
                width="24"
                color="#FFFFFF"
              />
            }
            title="Travel Your Way"
            description="Join a group trip for the energy, or go private for a personalized escape. Either way, it’s your adventure, your style."
          />
          <Card
            icon={
              <Icon
                icon={"streamline-plump:customer-support-7-solid"}
                width="24"
                color="#FFFFFF"
              />
            }
            title="Dedicated Support"
            description="Our team is with you every step of the way, from planning to on-the-ground assistance, ensuring a stress-free travel experience."
          />
        </div>
      </div>
    </section>
  );
}
