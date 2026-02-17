"use client";

import React from "react";
import { LogoProps } from "./types";
import Image from "next/image";
import Link from "next/link";

export function Logo({ variant, className }: LogoProps) {
  const logoSrc =
    variant === "white"
      ? "/logo-white.webp"
      : variant === "black"
      ? "/logo-black.webp"
      : "/logo-white.webp";

  return (
    <Link
      href={"/"}
      className={`relative grid aspect-[1/0.2] ${className || "w-60"}`}
    >
      <Image
        src={logoSrc}
        alt="Adventures Of Ijoba Logo"
        fill
        className="object-contain"
        sizes="300px"
      />
    </Link>
  );
}
