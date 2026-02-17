import React from "react";
import NavigationItem from "./navigation-item";

interface NavigationProps {
  variant?: "variant-1" | "variant-2";
}

export default function Navigation({ variant }: NavigationProps) {
  return (
    <nav className="hidden md:grid grid-flow-col gap-5">
      <NavigationItem title="Home" url="/" matcher={["/"]} variant={variant} />
      <NavigationItem
        title="Packages"
        url="/packages"
        matcher={["/packages"]}
        variant={variant}
      />
      <NavigationItem
        title="Destinations"
        url="/destinations"
        matcher={["/destinations"]}
        variant={variant}
      />
      <NavigationItem
        title="Stories & Tips"
        url="/stories-and-tips"
        matcher={["/stories-and-tips"]}
        variant={variant}
      />

      <NavigationItem
        title="Contact Us"
        url="/contact-us"
        matcher={["/contact-us"]}
        variant={variant}
      />
    </nav>
  );
}
