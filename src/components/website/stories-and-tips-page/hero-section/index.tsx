"use client";

import React, { useState } from "react";
import Card from "../../landing-page/travel-stories/card";
import Pagination from "./pagination";

export default function HeroSection() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-6xl font-semibold max-w-md mx-auto">
            Travel Stories & Tips{" "}
          </h1>
          <p className="text-lg">
            Get inspired with our latest travel guides, tips, and stories from
            the road.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, index) => (
            <Card key={index} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
