import { Button } from "@/components/ui/button";
import React from "react";
import { Icon } from "@iconify/react";

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-5xl sm:text-6xl font-semibold">
            Let&apos;s Create Your Custom Journey
          </h1>
          <p className="text-lg">
            Tell us your preferences, and we&apos;ll craft your perfect trip.{" "}
          </p>
        </div>

        <form action="" className="w-full max-w-xl mx-auto grid gap-5">
          {/* Full Name */}
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

          {/* Email Address */}
          <div className="grid gap-1">
            <label htmlFor="">Email Address</label>
            <input
              type="email"
              name=""
              id=""
              placeholder="Enter your email"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-1">
            <label htmlFor="">Phone Number</label>
            <input
              type="tel"
              name=""
              id=""
              placeholder="Enter your email"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>

          {/* Preferred Destination */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              Preferred Destination
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus:border-[#2D2D2D]/20 transition-colors font-lato text-sm text-[#2D2D2D] outline-none cursor-pointer"
                defaultValue=""
              >
                <option value="" disabled>
                  Select preferred destination
                </option>
                <option value="japan">Japan</option>
                <option value="switzerland">Switzerland</option>
                <option value="south-korea">South Korea</option>
                <option value="nigeria">Nigeria</option>
                <option value="kenya">Kenya</option>
              </select>
              <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                <Icon
                  icon="icon-park-outline:down"
                  className="text-[#2D2D2D]"
                  width="20"
                  height="20"
                />
              </div>
            </div>
          </div>

          {/* Travel Style */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              What&apos;s Your Travel Style?
            </label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-1">
              {[
                { label: "Cultural Immersion", id: "cultural" },
                { label: "Adventure", id: "adventure" },
                { label: "Relaxation", id: "relaxation" },
                { label: "Food & Wine", id: "food-wine" },
                { label: "Mix of All", id: "mix" },
              ].map((style) => (
                <div
                  key={style.id}
                  className="flex items-center gap-2 cursor-pointer group py-2.5"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <input
                      type="radio"
                      name="travel-style"
                      id={style.id}
                      className="peer appearance-none w-5 h-5 border-[1.5px] border-[#2D2D2D] rounded-full checked:border-[#2D2D2D] cursor-pointer"
                    />
                    <div className="absolute w-2.5 h-2.5 bg-[#2D2D2D] rounded-full scale-0 peer-checked:scale-100 transition-transform pointer-events-none" />
                  </div>
                  <label
                    htmlFor={style.id}
                    className="font-lato text-sm text-[#2D2D2D] cursor-pointer select-none"
                  >
                    {style.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="grid gap-1.5">
              <label className="font-lato font-medium text-base text-[#2D2D2D]">
                Start Date
              </label>
              <div className="flex items-center gap-2.5 bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus-within:border-[#2D2D2D]/20 transition-colors">
                <Icon
                  icon="solar:calendar-linear"
                  width="20"
                  height="20"
                  className="text-[#2D2D2D] flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="bg-transparent outline-none font-lato text-sm text-[#2D2D2D] w-full placeholder:text-[#2D2D2D]/60"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label className="font-lato font-medium text-base text-[#2D2D2D]">
                End Date
              </label>
              <div className="flex items-center gap-2.5 bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus-within:border-[#2D2D2D]/20 transition-colors">
                <Icon
                  icon="solar:calendar-linear"
                  width="20"
                  height="20"
                  className="text-[#2D2D2D] flex-shrink-0"
                />
                <input
                  type="text"
                  placeholder="dd/mm/yyyy"
                  className="bg-transparent outline-none font-lato text-sm text-[#2D2D2D] w-full placeholder:text-[#2D2D2D]/60"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
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
