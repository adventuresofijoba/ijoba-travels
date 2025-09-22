import React from "react";
import Card from "../../landing-page/explore-section/card";

export default function Destinations() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="grid container mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {[...Array(8)].map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </section>
  );
}
