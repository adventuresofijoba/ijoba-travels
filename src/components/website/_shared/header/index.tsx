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
  const [currentVariant, setCurrentVariant] = useState(variant);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const effectiveVariant =
    isMobileMenuOpen ||
    (isScrolled && variant === "variant-1") ||
    variant === "variant-2"
      ? "variant-2"
      : "variant-1";

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      {effectiveVariant === "variant-2" ? (
        <HeaderVariant2
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      ) : (
        <HeaderVariant1
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
        />
      )}

      <MobileNavigation isOpen={isMobileMenuOpen} />
    </>
  );
}

function HeaderVariant1({
  isMobileMenuOpen,
  toggleMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}) {
  return (
    <header className="px-layout-spacing-xs sm:px-layout-spacing-sm z-50 py-5 md:py-10 grid w-full transition-all duration-300 absolute top-0 bg-transparent">
      <div className="container mx-auto grid grid-flow-col items-center justify-between">
        <Logo variant="white" />
        <button
          onClick={toggleMobileMenu}
          className="md:hidden relative z-50 w-6 h-4 top-1"
        >
          <motion.span
            className={cn("absolute h-0.5 w-full left-0", "bg-white")}
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              top: isMobileMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={cn("absolute h-0.5 w-full left-0", "bg-white")}
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              top: isMobileMenuOpen ? 8 : 8,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
        <Navigation variant="variant-1" />
      </div>
    </header>
  );
}

function HeaderVariant2({
  isMobileMenuOpen,
  toggleMobileMenu,
}: {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}) {
  return (
    <header className="px-layout-spacing-xs sm:px-layout-spacing-sm z-50 py-4 md:py-4 grid w-full transition-all duration-300 sticky top-0 left-0 right-0 bg-[#F5E8C7] shadow-sm">
      <div className="container mx-auto grid grid-flow-col items-center justify-between">
        <Logo variant="black" />
        <button
          onClick={toggleMobileMenu}
          className="md:hidden relative z-50 w-6 h-4 top-1"
        >
          <motion.span
            className={cn("absolute h-0.5 w-full left-0", "bg-black")}
            animate={{
              rotate: isMobileMenuOpen ? 45 : 0,
              top: isMobileMenuOpen ? 8 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className={cn("absolute h-0.5 w-full left-0", "bg-black")}
            animate={{
              rotate: isMobileMenuOpen ? -45 : 0,
              top: isMobileMenuOpen ? 8 : 8,
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
        <Navigation variant="variant-2" />
      </div>
    </header>
  );
}
