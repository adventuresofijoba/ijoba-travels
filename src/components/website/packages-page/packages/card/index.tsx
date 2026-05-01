import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { Calendar, Clock, MapPinIcon } from "lucide-react";

interface PackagesCardProps {
  packageData: Package & { destinations?: { name: string } };
}

export default function PackagesCard({ packageData }: PackagesCardProps) {
  const destinationName =
    packageData.destinations?.name || packageData.destination;

  return (
    <div className="bg-[#F8EFD8] rounded-xl overflow-hidden grid w-full h-full grid-rows-[auto_1fr]">
      <span className="grid relative h-64 overflow-hidden">
        <ImageWithFallback
          src={packageData.image_urls?.[0]}
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
          alt={packageData.title}
        />
      </span>

      <div className="grid gap-5 p-5 grid-rows-[auto_1fr_auto]">
        <div className="text-sm font-medium text-muted-foreground flex justify-between items-center">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            {packageData.duration_days} days
          </div>
          {packageData.package_date && (
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              {packageData.package_date}
            </div>
          )}
        </div>

        <div className="grid gap-3 content-start">
          <h3 className="font-semibold text-xl line-clamp-1">
            {packageData.title}
          </h3>
          <p className="line-clamp-3 text-muted-foreground">
            {packageData.description}
          </p>
        </div>

        <div className="grid grid-flow-col items-center justify-between mt-auto">
          <span className="font-semibold text-2xl">
            ₦{packageData.price?.toLocaleString()}
          </span>
          <Link href={`/packages/${packageData.id}`}>
            <Button>Discover</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
