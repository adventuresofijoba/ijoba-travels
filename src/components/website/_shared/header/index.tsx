"use client";

import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navigation from "./navigation";
import MobileNavigation from "./mobile-navigation";

interface HeaderProps {
  variant?: "variant-1" | "variant-2";
}

export default function Header({ variant = "variant-1" }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine effective variant
  // If mobile menu is open, force variant-2 (assuming dark text on light menu background)
  // If scrolled and original variant was variant-1, switch to variant-2 (sticky light header)
  // If original variant was variant-2, it stays variant-2
  const effectiveVariant =
    isMobileMenuOpen ||
    (isScrolled && variant === "variant-1") ||
    variant === "variant-2"
      ? "variant-2"
      : "variant-1";

  // When variant-1 scrolls and becomes variant-2, it needs to be fixed to stay visible
  // sticky only works if the parent allows it, but absolute positioning can interfere.
  // For variant-1 (hero overlay), we start as absolute.
  // When scrolled, we want it to become fixed at top.

  return (
    <>
      <header
        className={cn(
          "px-layout-spacing-xs sm:px-layout-spacing-sm z-50 py-5 md:py-10 grid w-full transition-all duration-300",
          effectiveVariant === "variant-2"
            ? "sticky top-0 left-0 right-0 bg-[#F5E8C7] py-4 md:py-4"
            : "absolute top-0 bg-transparent",
          isScrolled && "shadow-sm"
        )}
      >
        <div className="container mx-auto grid grid-flow-col items-center justify-between">
          <Logo
            variant={effectiveVariant === "variant-2" ? "black" : "white"}
          />
          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 w-6 h-4 top-1"
          >
            <motion.span
              className={cn(
                "absolute h-0.5 w-full left-0",
                effectiveVariant === "variant-2" ? "bg-black" : "bg-white"
              )}
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                top: isMobileMenuOpen ? 8 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={cn(
                "absolute h-0.5 w-full bg-black left-0",
                effectiveVariant === "variant-2" ? "bg-black" : "bg-white"
              )}
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                top: isMobileMenuOpen ? 8 : 8,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
          <Navigation variant={effectiveVariant} />
        </div>
      </header>

      <MobileNavigation isOpen={isMobileMenuOpen} />
    </>
  );
}
