import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Destination } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface CardProps {
  destination: Destination;
}

export default function Card({ destination }: CardProps) {
  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full max-w-sm mx-auto h-full grid-rows-[auto_1fr]">
      {/* Destination Image */}
      <span className="grid relative h-64 overflow-hidden">
        <ImageWithFallback
          src={destination.image_url}
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
          alt={destination.name}
        />
      </span>

      <div className="grid gap-5 p-5 content-between">
        <div className="grid gap-5">
          {/* Destination Country and Flag */}
          {/* Assuming name includes country or is country name */}
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <Icon icon={"lucide:map-pin"} width="24" className="text-primary" />
            <span className="font-bold text-lg">{destination.name}</span>
          </div>

          {/* Destination Name and Description  */}
          <div className="grid gap-3">
            {/* If we have specific title distinct from name, use it. Otherwise name. */}
            {/* <h3 className="font-semibold text-xl">{destination.name}</h3> */}
            <p className="line-clamp-3 text-muted-foreground">
              {destination.description}
            </p>
          </div>
        </div>

        <Link href={`/destinations/${destination.id}`}>
          <Button className="w-full sm:w-max">
            View more
            <Icon icon={"ep:right"} width="16" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
