import React from "react";
import Subscribe from "./subscribe";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Footer() {
  return (
    <footer className="pt-20 overflow-hidden">
      <div className="px-layout-spacing-xs">
        <Subscribe />
      </div>
      <div className="relative grid w-full max-w-screen lg:h-[37vw]">
        <Image
          src={"/footer-image.webp"}
          width={2880}
          height={1084}
          priority
          alt="Background Image"
          className="hidden sm:grid col-[-1/1] row-[-1/1]"
        />
        <Image
          src={"/footer-image-mobile.png"}
          width={640}
          height={300}
          priority
          alt="Background Image"
          className="sm:hidden col-[-1/1] row-[-1/1]"
        />

        <div className="col-[-1/1] row-[-1/1] container mx-auto w-full px-layout-spacing-xs text-white self-end relative grid gap-5 min-[480px]:gap-10 sm:gap-3 md:gap-5 pb-10 sm:pb-5 lg:pb-10 min-[480px]:text-lg sm:text-sm lg:text-base">
          <div className="grid gap-5 min-[480px]:gap-10 sm:gap-5 sm:flex sm:justify-between items-center">
            <div className="flex items-center gap-5 mx-auto sm:mx-0">
              <div className="flex items-center gap-1">
                <Icon icon="fluent:mail-28-regular" width="20" height="20" />
                <Link
                  href={"mailto:support@ijoba.travel"}
                  className="hover:underline transition-all"
                >
                  support@ijoba.travel
                </Link>
              </div>
              <p>+234 810 253 1877</p>
            </div>

            <div className="flex items-center gap-5 mx-auto sm:mx-0">
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
          <p className="text-center">
            © 2024 Adventures of Ijoba. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
