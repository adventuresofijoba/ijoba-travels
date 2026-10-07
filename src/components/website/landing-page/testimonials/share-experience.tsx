"use client";

import React, { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";

const MAX_PHOTO_BYTES = 4 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];
const inputClassName =
  "bg-[#F5E8C7] px-5 py-3 rounded-lg outline-none text-[#2D2D2D]";

export default function ShareExperience({
  destinations,
}: {
  destinations: string[];
}) {
  const currentYear = new Date().getFullYear();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [tripYear, setTripYear] = useState(String(currentYear));
  const [quote, setQuote] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [website, setWebsite] = useState("");
  // Shown inline: toasts would render underneath the modal backdrop.
  const [error, setError] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && !ALLOWED_PHOTO_TYPES.includes(file.type)) {
      setError("Photo must be a JPG, PNG or WebP image.");
      e.target.value = "";
      return;
    }
    if (file && file.size > MAX_PHOTO_BYTES) {
      setError("Photo must be 4MB or smaller.");
      e.target.value = "";
      return;
    }
    setError("");
    setPhoto(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quote.trim().length < 20) {
      setError("Please tell us a little more (at least 20 characters).");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const body = new FormData();
      body.append("name", name);
      body.append("destination", destination);
      body.append("trip_year", tripYear);
      body.append("quote", quote);
      body.append("website", website);
      if (photo) body.append("photo", photo);

      const res = await fetch("/api/testimonials", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }
      setSubmitted(true);
    } catch (error: any) {
      setError(error.message || "Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openDialog = () => dialogRef.current?.showModal();
  const closeDialog = () => dialogRef.current?.close();

  // Start fresh next time once a story has been sent.
  const handleClose = () => {
    setError("");
    if (!submitted) return;
    setSubmitted(false);
    setName("");
    setDestination("");
    setTripYear(String(currentYear));
    setQuote("");
    setPhoto(null);
    setWebsite("");
  };

  return (
    <>
      <Button onClick={openDialog} className="w-max mx-auto mt-5">
        Share your experience
        <Icon icon={"ep:right"} width="24" />
      </Button>

      <dialog
        ref={dialogRef}
        onClose={handleClose}
        // Close when the backdrop (the dialog element itself) is clicked.
        onClick={(e) => e.target === e.currentTarget && closeDialog()}
        aria-labelledby="share-experience-title"
        className="m-auto w-[calc(100%-32px)] max-w-xl max-h-[calc(100dvh-32px)] overflow-y-auto rounded-xl bg-[#F8EFD8] text-[#2D2D2D] p-0 backdrop:bg-black/60"
      >
        <button
          type="button"
          onClick={closeDialog}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 grid place-content-center w-9 h-9 rounded-full hover:bg-black/5 transition-all cursor-pointer"
        >
          <Icon icon="mingcute:close-line" width="20" />
        </button>

        {submitted ? (
          <div className="p-5 sm:p-8 pt-12 sm:pt-12 grid gap-3 text-center justify-items-center">
            <span className="grid place-content-center w-12 h-12 rounded-full bg-[#F4A261]">
              <Icon icon="mingcute:check-2-fill" width="24" color="#FFFFFF" />
            </span>
            <h3 id="share-experience-title" className="font-semibold text-xl">
              Thank you for sharing!
            </h3>
            <p>
              Your story has been received and will appear on our site once
              our team has reviewed it.
            </p>
            <Button onClick={closeDialog} className="mt-2">
              Close
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative p-5 sm:p-8 grid gap-5"
          >
            <div className="grid gap-1 text-center px-8">
              <h3
                id="share-experience-title"
                className="font-playfair-display italic font-semibold text-xl sm:text-2xl"
              >
                Share your experience
              </h3>
              <p className="text-sm text-[#2D2D2D]/80">
                Travelled with us? We&apos;d love to hear about it.
              </p>
            </div>

            {/* Honeypot: hidden from real users */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="testimonial-website">Website</label>
              <input
                type="text"
                id="testimonial-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid gap-1">
              <label htmlFor="testimonial-name">Name*</label>
              <input
                type="text"
                id="testimonial-name"
                required
                minLength={2}
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={inputClassName}
              />
            </div>

            <div className="grid sm:grid-cols-[1fr_140px] gap-5">
              <div className="grid gap-1">
                <label htmlFor="testimonial-destination">Destination*</label>
                <input
                  type="text"
                  id="testimonial-destination"
                  list="testimonial-destinations"
                  required
                  minLength={2}
                  maxLength={80}
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where did you go?"
                  className={inputClassName}
                />
                <datalist id="testimonial-destinations">
                  {destinations.map((d) => (
                    <option key={d} value={d} />
                  ))}
                </datalist>
              </div>
              <div className="grid gap-1">
                <label htmlFor="testimonial-year">Trip year*</label>
                <input
                  type="number"
                  id="testimonial-year"
                  required
                  min={1990}
                  max={currentYear}
                  value={tripYear}
                  onChange={(e) => setTripYear(e.target.value)}
                  className={inputClassName}
                />
              </div>
            </div>

            <div className="grid gap-1">
              <label htmlFor="testimonial-quote">Your story*</label>
              <textarea
                id="testimonial-quote"
                required
                minLength={20}
                maxLength={1500}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Tell us about your trip"
                className={`${inputClassName} resize-none min-h-40`}
              />
              <span className="text-xs text-[#2D2D2D]/70 justify-self-end">
                {quote.length}/1500
              </span>
            </div>

            <div className="grid gap-1">
              <label htmlFor="testimonial-photo">Trip photo (optional)</label>
              <input
                type="file"
                id="testimonial-photo"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoChange}
                className={`${inputClassName} text-sm file:mr-3 file:rounded-full file:border-0 file:bg-primary file:text-white file:px-3 file:py-1 file:cursor-pointer`}
              />
              <span className="text-xs text-[#2D2D2D]/70">JPG, PNG or WebP, up to 4MB.</span>
            </div>

            {error && (
              <p
                role="alert"
                className="text-sm text-red-700 bg-red-500/10 rounded-lg px-4 py-2"
              >
                {error}
              </p>
            )}

            <Button type="submit" disabled={loading} className="mt-2">
              {loading ? (
                <Icon icon="eos-icons:loading" width="24" className="animate-spin" />
              ) : null}
              {loading ? "SENDING..." : "SUBMIT"}
            </Button>
          </form>
        )}
      </dialog>
    </>
  );
}
