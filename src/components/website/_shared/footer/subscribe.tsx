import { Button } from "@/components/ui/button";
import React from "react";

export default function Subscribe() {
  return (
    <div className="container mx-auto grid gap-5">
      <h2 className="font-playfair-display text-3xl sm:text-4xl font-semibold max-w-md italic mx-auto text-center">
        Stay Inspired. Get Exclusive Travel Deals & Tips.
      </h2>
      <div className="max-w-md grid grid-cols-[1fr_auto] bg-secondary p-1 rounded-full mx-auto w-full">
        <input
          type="text"
          name=""
          id=""
          placeholder="Enter email"
          className="outline-none px-5 w-full placeholder:text-black"
        />
        <Button>Subscribe</Button>
      </div>
    </div>
  );
}
