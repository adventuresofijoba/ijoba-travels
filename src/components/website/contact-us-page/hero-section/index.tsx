"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

export default function HeroSection() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const sendToWhatsApp = () => {
    const fullName = `${firstname} ${lastname}`;
    const agencyNumber = "+447470524596"; // Replace with your travel agency WhatsApp number (in international format, no +)

    const message = `Hello Ijoba Travels,%0AMy name is ${fullName}. I’d like to inquire about a trip.%0AHere are my details:%0AEmail: ${email}%0APhone: ${phone}`;

    const url = `https://wa.me/${agencyNumber}?text=${message}`;

    window.open(url, "_blank")?.focus();
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
            onClick={sendToWhatsApp}
            disabled={!firstname || !lastname || !email || !message}
            className="mt-5"
          >
            <Icon icon={"mage:whatsapp-filled"} width="24" color="#FFFFFF" />
            SUBMIT
          </Button>
        </div>
      </div>
    </section>
  );
}
