"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Testimonial } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";

interface CardProps {
  testimonial: Testimonial;
  fallbackImage: string | null;
}

function BrandedFallback() {
  return (
    <div className="grid place-content-center h-full w-full bg-[#F4A261]/30">
      <Image
        src="/logo-icon.svg"
        alt="Adventures of Ijoba"
        width={56}
        height={56}
        className="opacity-60"
      />
    </div>
  );
}

function Photo({
  testimonial,
  fallbackImage,
  sizes,
}: CardProps & { sizes: string }) {
  const destinationFallback = fallbackImage ? (
    <ImageWithFallback
      src={fallbackImage}
      fill
      sizes={sizes}
      className="object-cover object-center"
      alt={testimonial.destination}
      fallback={<BrandedFallback />}
    />
  ) : (
    <BrandedFallback />
  );

  return testimonial.photo_url ? (
    <ImageWithFallback
      src={testimonial.photo_url}
      fill
      sizes={sizes}
      className="object-cover object-center"
      alt={`${testimonial.name}'s trip to ${testimonial.destination}`}
      fallback={destinationFallback}
    />
  ) : (
    destinationFallback
  );
}

function Author({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="grid gap-1">
      <span className="font-bold text-lg">{testimonial.name}</span>
      <div className="grid grid-cols-[auto_1fr] items-center gap-1.5 text-sm text-[#2D2D2D]/80">
        <Icon icon={"lucide:map-pin"} width="16" className="text-primary" />
        <span>
          {testimonial.destination} · {testimonial.trip_year}
        </span>
      </div>
    </div>
  );
}

export default function Card({ testimonial, fallbackImage }: CardProps) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const check = () => setIsClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const closeDialog = () => dialogRef.current?.close();

  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden flex flex-col h-full w-full">
      {/* Trip Photo */}
      <span className="grid relative aspect-[4/3] overflow-hidden shrink-0">
        <Photo
          testimonial={testimonial}
          fallbackImage={fallbackImage}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw"
        />
      </span>

      <div className="flex flex-col flex-1 gap-5 p-5">
        <div className="grid gap-2">
          <Icon
            icon={"ri:double-quotes-l"}
            width="28"
            className="text-primary"
          />
          <p ref={quoteRef} className="whitespace-pre-line line-clamp-4">
            {testimonial.quote}
          </p>
          {isClamped && (
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="w-max text-sm font-semibold text-primary hover:underline cursor-pointer"
            >
              Read more
            </button>
          )}
        </div>

        {/* Pinned to the bottom so names line up across cards */}
        <div className="mt-auto">
          <Author testimonial={testimonial} />
        </div>
      </div>

      {/* Full story: opens over the page so the slider never changes height */}
      <dialog
        ref={dialogRef}
        onClick={(e) => e.target === e.currentTarget && closeDialog()}
        aria-label={`${testimonial.name}'s story`}
        className="m-auto w-[calc(100%-32px)] max-w-3xl max-h-[calc(100dvh-32px)] overflow-y-auto rounded-xl bg-[#F8EFD8] text-[#2D2D2D] p-0 backdrop:bg-black/60"
      >
        <button
          type="button"
          onClick={closeDialog}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid place-content-center w-9 h-9 rounded-full bg-[#F8EFD8]/80 hover:bg-[#F8EFD8] transition-all cursor-pointer"
        >
          <Icon icon="mingcute:close-line" width="20" />
        </button>

        <div className="grid md:grid-cols-[2fr_3fr]">
          <span className="grid relative aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden">
            <Photo
              testimonial={testimonial}
              fallbackImage={fallbackImage}
              sizes="(min-width: 768px) 300px, 100vw"
            />
          </span>
          <div className="grid gap-5 p-5 sm:p-8 content-start">
            <Icon
              icon={"ri:double-quotes-l"}
              width="32"
              className="text-primary"
            />
            <p className="whitespace-pre-line">{testimonial.quote}</p>
            <Author testimonial={testimonial} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
