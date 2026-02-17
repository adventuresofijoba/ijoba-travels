import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PackagesCard() {
  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full">
      <span className="grid relative h-64 overflow-hidden">
        <Image
          src={"/exp-1.jpg"}
          fill
          objectFit="cover"
          objectPosition="center"
          alt="United Arab Emirates"
        />
      </span>

      <div className="grid gap-5 p-5">
        <div className="text-sm">United Arab Emirates - 5 days</div>

        <div className="grid gap-3">
          <h3 className="font-semibold text-xl">City trip Abu Dhabi</h3>
          <p>
            Discover the best of both worlds during this city trip to Abu Dhabi.
          </p>
        </div>

        <div className="grid grid-flow-col items-center justify-between">
          <span className="font-semibold text-3xl">$1,200</span>
          <Link href="/packages/1">
            <Button>Discover</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
