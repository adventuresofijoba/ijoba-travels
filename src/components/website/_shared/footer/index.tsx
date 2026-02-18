import React from "react";
import Subscribe from "./subscribe";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer({ hideSubscribe }: { hideSubscribe?: boolean }) {
  return (
    <footer className="pt-20 overflow-hidden">
      {!hideSubscribe && (
        <div className="px-layout-spacing-xs">
          <Subscribe />
        </div>
      )}
      <div className="relative grid w-full mt-32 sm:mt-48 md:mt-52">
        <span className="absolute h-52 sm:h-80 md:h-96 aspect-[2880/1084] -top-5 left-1/2 -translate-1/2 ">
          <Image
            src={"/footer-image.webp"}
            priority
            fill
            alt="Background Image"
            className="object-contain"
          />
        </span>

        <div className="bg-[#000] w-full px-layout-spacing-xs text-white grid gap-5 sm:gap-10 py-10 relative">
          <div className="grid sm:grid-flow-col gap-5 justify-center sm:justify-between items-center container mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-5 mx-auto text-sm sm:text-base">
              <div className="flex items-center gap-1">
                <Icon icon="fluent:mail-28-regular" width="20" height="20" />
                <Link
                  href={"mailto:support@ijoba.travel"}
                  className="hover:underline transition-all"
                >
                  support@ijoba.travel
                </Link>
              </div>
              <div className="flex items-center gap-1">
                <Icon icon="fluent:call-28-regular" width="20" height="20" />
                <p>+234 810 253 1877</p>
              </div>
            </div>

            <div className="flex items-center gap-5 mx-auto">
              <Link
                href={"https://wa.me/+447470524596"}
                target="_blank"
                className="hover:opacity-50 transition-all"
              >
                <Icon
                  icon={"mage:whatsapp-filled"}
                  width="24"
                  color="#FFFFFF"
                />
              </Link>
              <Link
                href={"https://www.instagram.com/ijoba.travel"}
                target="_blank"
                className="hover:opacity-50 transition-all"
              >
                <Icon
                  icon={"mage:instagram-circle"}
                  width="24"
                  color="#FFFFFF"
                />
              </Link>
              <Link
                href={"https://www.youtube.com/@adventuresofijoba"}
                target="_blank"
                className="hover:opacity-50 transition-all"
              >
                <Icon
                  icon={"entypo-social:youtube-with-circle"}
                  width="24"
                  color="#FFFFFF"
                />
              </Link>
              <Link
                href={"https://www.tiktok.com/@ijoba.travel"}
                target="_blank"
                className="hover:opacity-50 transition-all"
              >
                <Icon icon={"mage:tiktok-circle"} width="24" color="#FFFFFF" />
              </Link>
            </div>
          </div>
          <p className="text-center text-sm">
            © 2024 Adventures of Ijoba. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
