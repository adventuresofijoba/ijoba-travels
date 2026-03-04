"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Destination } from "@/types";
import { sendEmail } from "@/actions/send-email";
import { Check } from "lucide-react";

interface HeroSectionProps {
  destinations?: Destination[];
}

export default function HeroSection({ destinations = [] }: HeroSectionProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    destination: "",
    travelStyle: [] as string[],
    startDate: "",
    endDate: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStyleToggle = (id: string) => {
    setFormData((prev) => {
      const exists = prev.travelStyle.includes(id);
      const next = exists
        ? prev.travelStyle.filter((s) => s !== id)
        : [...prev.travelStyle, id];
      return { ...prev, travelStyle: next };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.destination ||
      formData.travelStyle.length === 0 ||
      !formData.startDate ||
      !formData.endDate
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (new Date(formData.startDate) < new Date(todayStr)) {
      toast.error("Start date must be in the future");
      return;
    }
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      toast.error("End date cannot be before start date");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        full_name: formData.fullName,
        email: formData.email,
        phone_number: formData.phone,
        preferred_destination: formData.destination,
        travel_style: formData.travelStyle.join(", "),
        travel_dates: `${formData.startDate} to ${formData.endDate}`,
        message: formData.message,
        inquiry_type: "custom_package",
        status: "unresolved",
      });

      if (error) throw error;

      // Send email notification
      await sendEmail({
        type: "custom_package",
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        travelStyle: formData.travelStyle.join(", "),
        dates: `${formData.startDate} to ${formData.endDate}`,
        message: formData.message,
      });

      toast.success("Request sent successfully! We'll be in touch soon.");

      // Send to WhatsApp
      const whatsappMessage = `Hello, I would like to create a custom package.\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nDestination: ${formData.destination}\nTravel Style: ${formData.travelStyle}\nDates: ${formData.startDate} to ${formData.endDate}\nMessage: ${formData.message}`;
      const whatsappUrl = `https://wa.me/447470524596?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        destination: "",
        travelStyle: [],
        startDate: "",
        endDate: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Error submitting custom package request:", error);
      toast.error(error.message || "Failed to send request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-5xl sm:text-6xl font-semibold">
            Let&apos;s Curate your next experience
          </h1>
          <p className="text-lg">
            Tell us your preferences, and we&apos;ll curate the right trip for
            you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl mx-auto grid gap-5"
        >
          {/* Full Name */}
          <div className="grid gap-1">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>

          {/* Email Address */}
          <div className="grid gap-1">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-1">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>

          {/* Preferred Destination */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              Preferred Destination
            </label>
            <div className="flex items-center gap-2.5 bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus-within:border-[#2D2D2D]/20 transition-colors">
              <Icon
                icon="mdi:map-marker-outline"
                width="20"
                height="20"
                className="text-[#2D2D2D] flex-shrink-0"
              />
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                placeholder="Enter preferred destination"
                className="bg-transparent outline-none font-lato text-sm text-[#2D2D2D] w-full placeholder:text-[#2D2D2D]/60"
              />
            </div>
          </div>

          {/* Travel Style */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              What&apos;s Your Travel Style?
            </label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-1">
              {[
                { label: "Cultural Immersion", id: "cultural" },
                { label: "Adventure", id: "adventure" },
                { label: "Relaxation", id: "relaxation" },
                { label: "Food & Wine", id: "food-wine" },
                { label: "Mix of All", id: "mix" },
              ].map((style) => (
                <div
                  key={style.id}
                  className="flex items-center gap-2 cursor-pointer group py-2.5"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={style.id}
                      checked={formData.travelStyle.includes(style.id)}
                      onChange={() => handleStyleToggle(style.id)}
                      className="peer appearance-none w-5 h-5 border-[1.5px] border-[#2D2D2D] rounded-sm checked:border-[#2D2D2D] cursor-pointer checked:bg-[#2D2D2D]"
                    />
                    <label
                      htmlFor={style.id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <Check size={10} color="#F5E8C7" />
                    </label>
                  </div>
                  <label
                    htmlFor={style.id}
                    className="font-lato text-sm text-[#2D2D2D] cursor-pointer select-none"
                  >
                    {style.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="grid gap-1.5">
              <label className="font-lato font-medium text-base text-[#2D2D2D]">
                Start Date
              </label>
              <div className="flex items-center gap-2.5 bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus-within:border-[#2D2D2D]/20 transition-colors">
                <Icon
                  icon="solar:calendar-linear"
                  width="20"
                  height="20"
                  className="text-[#2D2D2D] flex-shrink-0"
                />
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  min={todayStr}
                  className="bg-transparent outline-none font-lato text-sm text-[#2D2D2D] w-full placeholder:text-[#2D2D2D]/60"
                />
              </div>
            </div>
            <div className="grid gap-1.5">
              <label className="font-lato font-medium text-base text-[#2D2D2D]">
                End Date
              </label>
              <div className="flex items-center gap-2.5 bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus-within:border-[#2D2D2D]/20 transition-colors">
                <Icon
                  icon="solar:calendar-linear"
                  width="20"
                  height="20"
                  className="text-[#2D2D2D] flex-shrink-0"
                />
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  min={formData.startDate || todayStr}
                  className="bg-transparent outline-none font-lato text-sm text-[#2D2D2D] w-full placeholder:text-[#2D2D2D]/60"
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="grid gap-1">
            <label htmlFor="message">Additional Notes (Optional)</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us more about your dream trip (e.g., specific activities, dietary needs, or preferences)"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D] resize-none min-h-80"
            />
          </div>
          <Button
            type="submit"
            disabled={
              !formData.fullName ||
              !formData.email ||
              !formData.phone ||
              !formData.destination ||
              !formData.travelStyle ||
              !formData.startDate ||
              !formData.endDate ||
              loading
            }
            className="mt-5"
          >
            {loading ? (
              <Icon
                icon="eos-icons:loading"
                width="24"
                className="animate-spin"
              />
            ) : null}
            {loading ? "SENDING..." : "SUBMIT"}
          </Button>
        </form>
      </div>
    </section>
  );
}
