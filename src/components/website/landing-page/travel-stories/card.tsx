import Image from "next/image";
import React from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

export default function Card() {
  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full max-w-sm sm:max-w-none mx-auto">
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
        {/* Destination Name and Description  */}
        <div className="grid gap-3">
          <h3 className="font-semibold text-xl">
            Top 10 Must-Visit Temples in Kyoto
          </h3>
          <p>
            Discover Kyoto&apos;s ancient temples, from Kinkaku-ji to Fushimi
            Inari...
          </p>
        </div>

        <Button className="w-max">
          Read more
          <Icon icon={"ep:right"} width="24" />
        </Button>
      </div>
    </div>
  );
}
