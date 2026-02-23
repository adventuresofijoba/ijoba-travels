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

    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        email,
        full_name: "Newsletter Subscriber", // Required field in schema
        inquiry_type: "newsletter",
        status: "unresolved",
      });

      if (error) throw error;

      // Send email notification to admin
      await sendEmail({
        type: "newsletter",
        email,
      });

      // Send welcome email to subscriber
      await sendWelcomeEmail(email);

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
        <Button disabled={loading}>
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
