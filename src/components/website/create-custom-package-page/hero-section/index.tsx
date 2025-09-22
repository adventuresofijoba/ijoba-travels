import { Button } from "@/components/ui/button";
import React from "react";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-6xl font-semibold">
            Let&apos;s Create Your Custom Journey
          </h1>
          <p className="text-lg">
            Tell us your preferences, and we&apos;ll craft your perfect trip.{" "}
          </p>
        </div>

        <form action="" className="w-full max-w-xl mx-auto grid gap-5">
          <div className="grid gap-1">
            <label htmlFor="">Full Name</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your full name"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]  "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Email Address</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter your email"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]  "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Additional Notes (Optional)</label>
            <textarea
              name=""
              id=""
              placeholder="Tell us more about your dream trip (e.g., specific activities, dietary needs, or preferences)"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D] resize-none min-h-80"
            />
          </div>
          <Button className="mt-5">Submit</Button>
        </form>
      </div>
    </section>
  );
}
