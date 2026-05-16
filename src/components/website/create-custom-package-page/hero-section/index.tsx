"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Destination } from "@/types";
import { sendEmail } from "@/actions/send-email";
import { Check } from "lucide-react";

const TRAVEL_STYLES = [
  { label: "Cultural Immersion", id: "cultural" },
  { label: "Adventure", id: "adventure" },
  { label: "Relaxation", id: "relaxation" },
  { label: "Food & Wine", id: "food-wine" },
  { label: "Mix of All", id: "mix" },
];

const CONTACT_METHODS = [
  { label: "Email", id: "email" },
  { label: "Phone", id: "phone" },
  { label: "WhatsApp", id: "whatsapp" },
];

const inputClass =
  "bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D] w-full";

const destinationInputClass =
  "flex items-center gap-2.5 bg-[#F8EFD8] px-5 py-3 rounded-xl border border-transparent focus-within:border-[#2D2D2D]/20 transition-colors";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    adults: "",
    children: "",
    infants: "",
    budget: "",
    departureCity: "",
    destination: "",
    flightInclusive: false,
    hasPassport: false,
    hasVisa: false,
    travelStyle: [] as string[],
    contactMethod: [] as string[],
    startDate: "",
    endDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const todayStr = new Date().toISOString().split("T")[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (name: string, value: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiToggle = (
    field: "travelStyle" | "contactMethod",
    id: string,
  ) => {
    setFormData((prev) => {
      const exists = prev[field].includes(id);
      return {
        ...prev,
        [field]: exists
          ? prev[field].filter((s) => s !== id)
          : [...prev[field], id],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.adults ||
      !formData.budget ||
      !formData.departureCity ||
      !formData.destination ||
      formData.travelStyle.length === 0 ||
      formData.contactMethod.length === 0 ||
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
        adults: formData.adults,
        children: formData.children,
        infants: formData.infants,
        estimated_budget: formData.budget,
        departure_city: formData.departureCity,
        preferred_destination: formData.destination,
        flight_inclusive: formData.flightInclusive,
        has_passport: formData.hasPassport,
        has_visa: formData.hasVisa,
        travel_style: formData.travelStyle.join(", "),
        contact_method: formData.contactMethod.join(", "),
        travel_dates: `${formData.startDate} to ${formData.endDate}`,
        message: formData.message,
        inquiry_type: "custom_package",
        status: "unresolved",
      });

      if (error) throw error;

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

      const whatsappMessage = `Hello, I would like to create a custom package.\n\nName: ${formData.fullName}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nAdults: ${formData.adults}\nChildren: ${formData.children}\nInfants: ${formData.infants}\nBudget: ${formData.budget}\nDeparture City: ${formData.departureCity}\nDestination: ${formData.destination}\nFlight Inclusive: ${formData.flightInclusive ? "Yes" : "No"}\nHas Passport: ${formData.hasPassport ? "Yes" : "No"}\nHas VISA: ${formData.hasVisa ? "Yes" : "No"}\nTravel Style: ${formData.travelStyle.join(", ")}\nPreferred Contact: ${formData.contactMethod.join(", ")}\nDates: ${formData.startDate} to ${formData.endDate}\nMessage: ${formData.message}`;
      window.open(
        `https://wa.me/447470524596?text=${encodeURIComponent(whatsappMessage)}`,
        "_blank",
      );

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        adults: "",
        children: "",
        infants: "",
        budget: "",
        departureCity: "",
        destination: "",
        flightInclusive: false,
        hasPassport: false,
        hasVisa: false,
        travelStyle: [],
        contactMethod: [],
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

  const isDisabled =
    !formData.fullName ||
    !formData.email ||
    !formData.phone ||
    !formData.adults ||
    !formData.budget ||
    !formData.departureCity ||
    !formData.destination ||
    formData.travelStyle.length === 0 ||
    formData.contactMethod.length === 0 ||
    !formData.startDate ||
    !formData.endDate ||
    loading;

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-28 sm:py-40">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-4xl sm:text-5xl max-w-xl font-semibold">
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
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="grid gap-1">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className="grid gap-1">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={inputClass}
            />
          </div>

          {/* Number of Travellers */}
          <div className="grid gap-1">
            <label>Number of Travellers</label>
            <div className="grid grid-cols-2 gap-5">
              <input
                type="number"
                name="adults"
                id="adults"
                value={formData.adults}
                onChange={handleChange}
                placeholder="Adults (12 yrs old +)"
                min={1}
                className={inputClass}
              />
              <input
                type="number"
                name="children"
                id="children"
                value={formData.children}
                onChange={handleChange}
                placeholder="Children (2 - 11 yrs old)"
                min={0}
                className={inputClass}
              />
              <input
                type="number"
                name="infants"
                id="infants"
                value={formData.infants}
                onChange={handleChange}
                placeholder="Infant (under 1 yr old)"
                min={0}
                className={inputClass}
              />
            </div>
          </div>

          {/* Estimated Budget */}
          <div className="grid gap-1">
            <label htmlFor="budget">Estimated Budget</label>
            <input
              type="text"
              name="budget"
              id="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter estimated budget"
              className={inputClass}
            />
          </div>

          {/* Departure City */}
          <div className="grid gap-1">
            <label htmlFor="departureCity">Departure City</label>
            <input
              type="text"
              name="departureCity"
              id="departureCity"
              value={formData.departureCity}
              onChange={handleChange}
              placeholder="Enter your departure city"
              className={inputClass}
            />
          </div>

          {/* Preferred Destination */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              Preferred Destination
            </label>
            <div className={destinationInputClass}>
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

          {/* Flight / Passport / Visa */}
          <div className="flex gap-5 flex-wrap">
            {[
              { label: "Flight Inclusive", name: "flightInclusive" },
              { label: "I have a Passport", name: "hasPassport" },
              { label: "I have a VISA", name: "hasVisa" },
            ].map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-2 cursor-pointer py-2.5"
              >
                <div className="relative w-5 h-5 flex items-center justify-center">
                  <input
                    type="checkbox"
                    id={item.name}
                    checked={
                      formData[
                        item.name as
                          | "flightInclusive"
                          | "hasPassport"
                          | "hasVisa"
                      ]
                    }
                    onChange={(e) =>
                      handleCheckbox(item.name, e.target.checked)
                    }
                    className="peer appearance-none w-5 h-5 border-[1.5px] border-[#2D2D2D] rounded-sm checked:border-[#2D2D2D] cursor-pointer checked:bg-[#2D2D2D]"
                  />
                  <label
                    htmlFor={item.name}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <Check size={10} color="#F5E8C7" />
                  </label>
                </div>
                <label
                  htmlFor={item.name}
                  className="font-lato text-sm text-[#2D2D2D] cursor-pointer select-none"
                >
                  {item.label}
                </label>
              </div>
            ))}
          </div>

          {/* Travel Style */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              What&apos;s Your Travel Style?
            </label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-1">
              {TRAVEL_STYLES.map((style) => (
                <div
                  key={style.id}
                  className="flex items-center gap-2 cursor-pointer py-2.5"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={style.id}
                      checked={formData.travelStyle.includes(style.id)}
                      onChange={() =>
                        handleMultiToggle("travelStyle", style.id)
                      }
                      className="peer appearance-none w-5 h-5 border-[1.5px] border-[#2D2D2D] rounded-sm checked:border-[#2D2D2D] cursor-pointer checked:bg-[#2D2D2D]"
                    />
                    <label
                      htmlFor={style.id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
            {[
              { label: "Start Date", name: "startDate", min: todayStr },
              {
                label: "End Date",
                name: "endDate",
                min: formData.startDate || todayStr,
              },
            ].map((field) => (
              <div key={field.name} className="grid gap-1.5">
                <label className="font-lato font-medium text-base text-[#2D2D2D]">
                  {field.label}
                </label>
                <div className={destinationInputClass}>
                  <Icon
                    icon="solar:calendar-linear"
                    width="20"
                    height="20"
                    className="text-[#2D2D2D] flex-shrink-0"
                  />
                  <input
                    type="date"
                    name={field.name}
                    value={formData[field.name as "startDate" | "endDate"]}
                    onChange={handleChange}
                    min={field.min}
                    className="bg-transparent outline-none font-lato text-sm text-[#2D2D2D] w-full"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Preferred Contact Method */}
          <div className="grid gap-1.5">
            <label className="font-lato font-medium text-base text-[#2D2D2D]">
              What&apos;s Your Preferred Contact Method?
            </label>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 px-1">
              {CONTACT_METHODS.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center gap-2 cursor-pointer py-2.5"
                >
                  <div className="relative w-5 h-5 flex items-center justify-center">
                    <input
                      type="checkbox"
                      id={`contact-${method.id}`}
                      checked={formData.contactMethod.includes(method.id)}
                      onChange={() =>
                        handleMultiToggle("contactMethod", method.id)
                      }
                      className="peer appearance-none w-5 h-5 border-[1.5px] border-[#2D2D2D] rounded-sm checked:border-[#2D2D2D] cursor-pointer checked:bg-[#2D2D2D]"
                    />
                    <label
                      htmlFor={`contact-${method.id}`}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                      <Check size={10} color="#F5E8C7" />
                    </label>
                  </div>
                  <label
                    htmlFor={`contact-${method.id}`}
                    className="font-lato text-sm text-[#2D2D2D] cursor-pointer select-none"
                  >
                    {method.label}
                  </label>
                </div>
              ))}
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

          <Button type="submit" disabled={isDisabled} className="mt-5">
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
