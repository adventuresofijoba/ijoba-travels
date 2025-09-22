"use client";

import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import Navigation from "./navigation";
import MobileNavigation from "./mobile-navigation";

interface HeaderProps {
  variant?: "variant-1" | "variant-2";
}

export default function Header({ variant }: HeaderProps) {
  const [variantState, setVariantState] = useState<"variant-1" | "variant-2">();

  return (
    <header
      className={cn(
        "px-layout-spacing-xs sm:px-layout-spacing-sm z-10 py-5 md:py-10 grid w-full",
        variantState === "variant-2" ? "relative" : "absolute top-0"
      )}
    >
      <div className="container mx-auto grid grid-flow-col items-center justify-between">
        <Logo
          variant={variantState === "variant-2" ? "black" : "white"}
          className="w-56"
        />
        <MobileNavigation
          defaultVariantState={variant}
          variantState={variantState}
          setVariantState={setVariantState}
        />
        <Navigation variant={variant} />
      </div>
    </header>
  );
}
