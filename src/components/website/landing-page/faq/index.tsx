import React from "react";
import Card from "./card";
import { FAQS } from "./constant";

export default function FaqSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold italic">
            FAQs
          </h2>
          <p className="text-lg">Effortless Travel, Unforgettable Memories .</p>
        </div>

        <div className="grid gap-5">
          {FAQS.map((faq, index) => (
            <Card key={index} ques={faq.ques} ans={faq.ans} />
          ))}
        </div>
      </div>
    </section>
  );
}
