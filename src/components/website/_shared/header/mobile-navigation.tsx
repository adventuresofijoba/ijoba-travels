"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import NavigationItem from "./navigation-item";

interface MobileNavigationProps {
  defaultVariantState?: "variant-1" | "variant-2";
  variantState?: "variant-1" | "variant-2";
  setVariantState: (e?: "variant-1" | "variant-2") => void;
}

export default function MobileNavigation({
  defaultVariantState,
  variantState,
  setVariantState,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setVariantState("variant-2");
    } else {
      setVariantState(defaultVariantState);
    }
  }, [isOpen, defaultVariantState, setVariantState]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative w-6 h-4 top-1"
      >
        <motion.span
          className={cn(
            "absolute h-0.5 w-full left-0",
            variantState === "variant-2" ? "bg-black" : "bg-white"
          )}
          animate={{ rotate: isOpen ? 45 : 0, top: isOpen ? 8 : 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className={cn(
            "absolute h-0.5 w-full bg-black left-0",
            variantState === "variant-2" ? "bg-black" : "bg-white"
          )}
          animate={{ rotate: isOpen ? -45 : 0, top: isOpen ? 8 : 8 }}
          transition={{ duration: 0.3 }}
        />
      </button>

      <div
        className={cn(
          "bg-[#F5E8C7] fixed left-0 top-[84px] w-full transition-all overflow-hidden grid gap-8 content-start px-layout-spacing-xs sm:px-layout-spacing-sm",
          isOpen ? "h-[calc(100vh_-_84px)] py-10" : "h-0"
        )}
      >
        <NavigationItem
          title="Home"
          url="/"
          matcher={["/"]}
          variant={variantState}
        />
        <NavigationItem
          title="Packages"
          url="/packages"
          matcher={["/packages"]}
          variant={variantState}
        />
        <NavigationItem
          title="Destinations"
          url="/destinations"
          matcher={["/destinations"]}
          variant={variantState}
        />
        <NavigationItem
          title="About Us"
          url="/about-us"
          matcher={["/about-us"]}
          variant={variantState}
        />
        <NavigationItem
          title="Contact Us"
          url="/contact-us"
          matcher={["/contact-us"]}
          variant={variantState}
        />
      </div>
    </>
  );
}
