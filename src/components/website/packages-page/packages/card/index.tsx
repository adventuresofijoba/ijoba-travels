import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Package } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import {
  Calendar,
  Clock,
  MapPin,
  MapPinIcon,
  PackageIcon,
  Plane,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PackagesCardProps {
  packageData: Package & { destinations?: { name: string } };
}

export default function PackagesCard({ packageData }: PackagesCardProps) {
  return (
    <Link href={`/packages/${packageData.id}`} className="flex h-full">
      <Card
        key={packageData.id}
        className="overflow-hidden flex flex-col group hover:shadow-lg transition-shadow border-black/10 bg-[#F5E8C7] w-full"
      >
        <div className="relative aspect-video w-full bg-black/5 overflow-hidden">
          {packageData.image_urls && packageData.image_urls.length > 0 ? (
            <ImageWithFallback
              src={packageData.image_urls[0]}
              alt={packageData.title}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              fallback={
                <div className="flex items-center justify-center h-full w-full text-muted-foreground bg-black/5">
                  <PackageIcon className="h-10 w-10 opacity-20" />
                </div>
              }
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <PackageIcon className="h-10 w-10 opacity-20" />
            </div>
          )}

          {packageData.is_flight_inclusive && (
            <div className="absolute bottom-2 left-2">
              <div className="flex items-center gap-2 text-sm font-medium bg-[#F5E8C7] hover:bg-[#F5E8C7] text-[#2D2D2D] px-2 py-1 rounded-full">
                <Plane className="w-4" />
                Flight Inclusive
              </div>
            </div>
          )}
        </div>
        <div className="p-4 grid grid-rows-[auto_1fr] gap-4 flex-1">
          <CardHeader className="p-0">
            <CardTitle className="text-xl line-clamp-2 text-[#2D2D2D]">
              {packageData.title}
            </CardTitle>
            <div className="grid grid-flow-col gap-3 justify-between items-center">
              <span className="text-xs grid gap-1 grid-flow-col justify-start items-start text-[#2D2D2D]/70">
                <MapPin size={14} className="mt-px" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {packageData.destination}
                </span>
              </span>
              {packageData.package_date && (
                <span className="text-xs grid grid-flow-col items-start gap-1 text-[#2D2D2D]/70">
                  <Calendar size={14} className="mt-px" />{" "}
                  {packageData.package_date}
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 space-y-2">
            <div className="flex items-center justify-between text-sm text-[#2D2D2D]/80">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{packageData.duration_days} Days</span>
              </div>
              <div className="flex items-center gap-1 font-semibold">
                <span>₦</span>
                <span>{packageData.price?.toLocaleString()}</span>
              </div>
            </div>
            <p className="line-clamp-3 text-sm text-[#2D2D2D]/70">
              {packageData.description}
            </p>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
}
