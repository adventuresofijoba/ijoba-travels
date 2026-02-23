"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { sendEmail } from "@/actions/send-email";

export default function HeroSection() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!firstname || !lastname || !email || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        full_name: `${firstname} ${lastname}`,
        email,
        phone_number: phone,
        message,
        inquiry_type: "contact",
        status: "unresolved",
      });

      if (error) throw error;

      // Send email notification
      await sendEmail({
        type: "contact",
        name: `${firstname} ${lastname}`,
        email,
        phone,
        message,
      });

      toast.success("Message sent successfully! We'll be in touch soon.");

      // Send to WhatsApp
      const whatsappMessage = `Hello, I would like to make an inquiry.\n\nName: ${firstname} ${lastname}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
      const whatsappUrl = `https://wa.me/447470524596?text=${encodeURIComponent(
        whatsappMessage
      )}`;
      window.open(whatsappUrl, "_blank");

      // Reset form
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center max-w-3xl mx-auto grid gap-5">
          <h1 className="font-playfair-display text-5xl sm:text-6xl font-semibold">
            Contact us.
          </h1>
          <p className="text-lg">
            Find the perfect getaway tailored to your travel style.
          </p>
        </div>

        <div className="w-full max-w-xl mx-auto grid gap-5">
          <div className="grid gap-1">
            <label htmlFor="">First Name*</label>
            <input
              type="text"
              name="firstname"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter your first name"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Last Name*</label>
            <input
              type="text"
              name="lastname"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter your last name"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]"
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Email Address*</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]  "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Phone Number</label>
            <input
              type="number"
              name="phone"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D]  "
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="">Message*</label>
            <textarea
              name="message"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              className="bg-secondary px-5 py-3 rounded-lg outline-none text-[#2D2D2D] resize-none min-h-80"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!firstname || !lastname || !email || !message || loading}
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
        </div>
      </div>
    </section>
  );
}
