"use client";

import React, { Suspense, useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter } from "next/navigation";

function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/destinations");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-md grid grid-cols-[auto_1fr_auto] gap-2.5 items-center bg-secondary p-1 pl-2.5 rounded-full mx-auto w-full">
      <Icon icon={"akar-icons:location"} width="20" color="#2d2d2d" />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Where do you want to go?"
        className="outline-none w-full placeholder:text-black text-black bg-transparent"
      />
      <Button onClick={handleSearch}>
        Search
        <Icon icon={"ep:right"} width="16" />
      </Button>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-5xl sm:text-6xl font-semibold">
            Explore the world, <br />
            one <span className="italic">destination</span> at a time.
          </h1>
          <p className="text-lg">
            Find the perfect getaway tailored to your travel style.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="max-w-md h-12 bg-secondary rounded-full mx-auto w-full animate-pulse" />
          }
        >
          <SearchInput />
        </Suspense>
      </div>
    </section>
  );
}
