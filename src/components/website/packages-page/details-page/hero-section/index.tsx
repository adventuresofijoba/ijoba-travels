"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Package } from "@/types";
import { ImageWithFallback } from "@/components/ui/image-with-fallback";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { sendEmail } from "@/actions/send-email";

interface HeroSectionProps {
  pkg: Package;
}

export default function HeroSection({ pkg }: HeroSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Try to determine date range from timeline if available
  const startDate = pkg.timeline?.[0]?.date;
  const endDate = pkg.timeline?.[pkg.timeline.length - 1]?.date;

  let dateDisplay = `${pkg.duration_days} Days`;
  if (startDate && endDate) {
    // Simple check if they look like dates (contain numbers and separators)
    if (/\d/.test(startDate) && /\d/.test(endDate)) {
      dateDisplay = `${startDate} — ${endDate}`;
    }
  }

  return (
    <>
      <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 lg:py-20">
        <div className="container mx-auto flex flex-col-reverse lg:flex-row gap-5 sm:gap-10">
          {/* Content Side */}
          <div className="w-full lg:w-1/2 flex flex-col lg:self-center gap-[30px] lg:pr-[20px]">
            <div className="flex flex-col gap-[10px]">
              <h1 className="font-playfair-display font-bold text-3xl sm:text-4xl text-[#2D2D2D] uppercase leading-tight">
                {pkg.title}
              </h1>
              <p className="font-lato text-lg sm:text-xl text-[#2D2D2D] leading-[1.4] opacity-80 whitespace-pre-line">
                {pkg.description}
              </p>
            </div>

            <div className="flex flex-col gap-[30px]">
              {/* Date Badge */}
              <div className="flex items-center gap-[10px] w-fit">
                <Icon
                  icon="solar:calendar-linear"
                  className="text-[#2D2D2D]"
                  width="24"
                  height="24"
                />
                <span className="font-lato text-base text-[#2D2D2D]">
                  {dateDisplay}
                </span>
              </div>

              {/* Book Button */}
              <Button onClick={() => setIsModalOpen(true)} className="w-max">
                Make a Reservation
              </Button>
            </div>
          </div>

          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full max-h-96 lg:max-h-none aspect-[630/511] rounded-xl overflow-hidden bg-[#E0E0E0]">
              <ImageWithFallback
                src={pkg.image_urls?.[0]}
                alt={pkg.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        pkg={pkg}
      />
    </>
  );
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkg: Package;
}

function BookingModal({ isOpen, onClose, pkg }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        message: formData.message,
        preferred_destination: pkg.title, // Using preferred_destination to store package name
        inquiry_type: "package_reserve",
        status: "new",
      });

      if (error) throw error;

      // Send email notification
      await sendEmail({
        type: "package_reserve",
        packageName: pkg.title,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      toast.success("Booking request sent! We'll be in touch soon.");

      // Send to WhatsApp
      const whatsappMessage = `Hello, I would like to reserve a package.\n\nPackage: ${pkg.title}\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`;
      const whatsappUrl = `https://wa.me/447470524596?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");

      onClose();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting booking request:", error);
      toast.error(error.message || "Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#F8EFD8] w-full max-w-lg rounded-2xl p-6 sm:p-8 relative z-10 shadow-xl overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#2D2D2D]/60 hover:text-[#2D2D2D] transition-colors"
            >
              <Icon icon="mingcute:close-line" width="24" />
            </button>

            <div className="grid gap-6">
              <div className="text-center grid gap-2">
                <h3 className="font-playfair-display font-bold text-2xl sm:text-3xl text-[#2D2D2D]">
                  Make a Reservation
                </h3>
                <p className="font-lato text-[#2D2D2D]/80">
                  Reserving: <span className="font-bold">{pkg.title}</span>
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-1">
                  <label
                    htmlFor="fullName"
                    className="font-lato font-medium text-sm text-[#2D2D2D]"
                  >
                    Full Name*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="bg-white px-4 py-3 rounded-lg outline-none text-[#2D2D2D] border border-transparent focus:border-[#2D2D2D]/20 transition-colors"
                  />
                </div>

                <div className="grid gap-1">
                  <label
                    htmlFor="email"
                    className="font-lato font-medium text-sm text-[#2D2D2D]"
                  >
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="bg-white px-4 py-3 rounded-lg outline-none text-[#2D2D2D] border border-transparent focus:border-[#2D2D2D]/20 transition-colors"
                  />
                </div>

                <div className="grid gap-1">
                  <label
                    htmlFor="phone"
                    className="font-lato font-medium text-sm text-[#2D2D2D]"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="bg-white px-4 py-3 rounded-lg outline-none text-[#2D2D2D] border border-transparent focus:border-[#2D2D2D]/20 transition-colors"
                  />
                </div>

                <div className="grid gap-1">
                  <label
                    htmlFor="message"
                    className="font-lato font-medium text-sm text-[#2D2D2D]"
                  >
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific requests or questions?"
                    className="bg-white px-4 py-3 rounded-lg outline-none text-[#2D2D2D] border border-transparent focus:border-[#2D2D2D]/20 transition-colors resize-none min-h-[100px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={!formData.fullName || !formData.email || loading}
                  className="mt-2 w-full"
                >
                  {loading ? (
                    <Icon
                      icon="eos-icons:loading"
                      width="24"
                      className="animate-spin"
                    />
                  ) : null}
                  {loading ? "SENDING..." : "RESERVE"}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
