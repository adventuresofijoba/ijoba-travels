import React from "react";
import Card from "./card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function ExploreSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold max-w-sm italic">
            Explore our top experiences.
          </h2>
          <p className="text-lg">
            Discover handpicked destinations and exclusive deals.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <Card key={index} />
          ))}
        </div>

        <Link href={"/packages"} className="w-max mx-auto mt-10">
          <Button>
            Explore Packages
            <Icon icon={"ep:right"} width="24" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
