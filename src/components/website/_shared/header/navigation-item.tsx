"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavigationItemProps {
  title: string;
  url: string;
  matcher: string[];
  variant?: "variant-1" | "variant-2";
}

export default function NavigationItem({
  title,
  url,
  matcher,
  variant,
}: NavigationItemProps) {
  const path = usePathname();
  console.log(path);

  return (
    <Link
      href={url}
      className={cn(
        "relative w-max transition-all after:absolute after:w-full after:h-[0.5px] after:left-0 after:-bottom-0.5",
        variant === "variant-2"
          ? "text-black after:bg-black"
          : "text-white after:bg-white",
        matcher.includes(path)
          ? "font-bold after:opacity-100"
          : "after:transition-all after:w-0 hover:after:w-full hover:after:opacity-100 after:opacity-0"
      )}
    >
      {title}
    </Link>
  );
}
