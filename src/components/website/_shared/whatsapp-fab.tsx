"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppFAB() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const phoneNumber = "447470524596";
  const message =
    "Hello Ijoba Travels! I'm interested in booking a trip. Can you help me?";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleTrackClick = () => {
    // Basic click tracking - can be integrated with GA4, Meta Pixel, etc.
    console.log("WhatsApp FAB clicked");
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click", {
        event_category: "Engagement",
        event_label: "WhatsApp FAB",
      });
    }
  };

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
        className="fixed bottom-6 right-6 z-[9999]"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTrackClick}
          aria-label="Contact us on WhatsApp"
          className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group border border-white/10"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-full h-full"
          >
            <Icon
              icon="ri:whatsapp-line"
              width="32"
              height="32"
              className="text-white"
            />
          </motion.div>

          {/* Tooltip for desktop */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-[#2D2D2D] text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap hidden md:block shadow-md font-lato">
            Chat with us!
          </span>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}
