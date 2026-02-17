import React from "react";
import PackagesCard from "./card";

export default function Packages() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="grid container mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <PackagesCard key={index} />
        ))}
      </div>
    </section>
  );
}
