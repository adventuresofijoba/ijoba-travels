"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { sendEmail, sendWelcomeEmail } from "@/actions/send-email";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/inquiries/newsletter-exists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      if (res.ok) {
        const { exists } = await res.json();
        if (exists) {
          toast.info("This email is already subscribed.");
          setLoading(false);
          return;
        }
      }

      const { error } = await supabase.from("inquiries").insert({
        email: normalizedEmail,
        full_name: "Newsletter Subscriber", // Required field in schema
        inquiry_type: "newsletter",
        status: "unresolved",
      });

      if (error) {
        const msg = String(error.message || "");
        const code = (error as any).code;
        if (code === "23505" || /duplicate key/i.test(msg)) {
          toast.info("This email is already subscribed.");
          setEmail("");
          return;
        }
        throw error;
      }

      // Send email notification to admin
      await sendEmail({
        type: "newsletter",
        email: normalizedEmail,
      });

      // Send welcome email to subscriber
      await sendWelcomeEmail(normalizedEmail);

      toast.success("Thank you for subscribing!");
      setEmail("");
    } catch (error: any) {
      console.error("Error subscribing:", error);
      toast.error(error.message || "Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto grid gap-5">
      <h2 className="font-playfair-display text-3xl sm:text-4xl font-semibold max-w-md italic mx-auto text-center">
        Stay Inspired. Get Exclusive Travel Deals & Tips.
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md grid grid-cols-[1fr_auto] bg-secondary p-1 rounded-full mx-auto w-full"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="outline-none px-5 w-full placeholder:text-black bg-transparent"
        />
        <Button disabled={loading} className="w-20">
          {loading ? (
            <Icon
              icon="eos-icons:loading"
              width="24"
              className="animate-spin"
            />
          ) : (
            "Subscribe"
          )}
        </Button>
      </form>
    </div>
  );
}
