import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Card() {
  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full max-w-sm mx-auto">
      {/* Destination Image */}
      <span className="grid relative h-64 overflow-hidden">
        <Image
          src={"/exp-1.jpg"}
          fill
          objectFit="cover"
          objectPosition="center"
          alt="Location Image"
        />
      </span>

      <div className="grid gap-5 p-5">
        {/* Destination Country and Flag */}
        <div className="grid grid-cols-[auto_1fr] items-center gap-2">
          <Icon icon={"twemoji:flag-japan"} width="24" />
          <span>Japan</span>
        </div>

        {/* Destination Name and Description  */}
        <div className="grid gap-3">
          <h3 className="font-semibold text-xl">Kyoto</h3>
          <p>
            A bustling metropolis blending traditino with modernity, offering
            diverse cuisine, cutting-edge technology, and vibrant nightlife.
          </p>
        </div>

        <Link href={"/destinations/1"}>
          <Button className="w-max">
            View more
            <Icon icon={"ep:right"} width="16" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
