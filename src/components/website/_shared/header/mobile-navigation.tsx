"use client";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import NavigationItem from "./navigation-item";

interface MobileNavigationProps {
  isOpen: boolean;
}

export default function MobileNavigation({ isOpen }: MobileNavigationProps) {
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

  return (
    <div
      className={cn(
        "bg-[#F5E8C7] fixed inset-0 w-full pt-28 transition-all duration-300 ease-in-out z-30 overflow-hidden grid gap-8 content-start px-layout-spacing-xs sm:px-layout-spacing-sm",
        isOpen ? "opacity-100 h-full" : "h-0 opacity-0"
      )}
    >
      <NavigationItem
        title="Home"
        url="/"
        matcher={["/"]}
        variant={"variant-2"}
      />
      <NavigationItem
        title="Packages"
        url="/packages"
        matcher={["/packages"]}
        variant={"variant-2"}
      />
      <NavigationItem
        title="Destinations"
        url="/destinations"
        matcher={["/destinations"]}
        variant={"variant-2"}
      />
      <NavigationItem
        title="Stories & Tips"
        url="/stories-and-tips"
        matcher={["/stories-and-tips"]}
        variant={"variant-2"}
      />
      <NavigationItem
        title="About Us"
        url="/about-us"
        matcher={["/about-us"]}
        variant={"variant-2"}
      />
      <NavigationItem
        title="Contact Us"
        url="/contact-us"
        matcher={["/contact-us"]}
        variant={"variant-2"}
      />
    </div>
  );
}
