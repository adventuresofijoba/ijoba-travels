import type { Metadata } from "next";
import { Lato, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-playfair-display",
});

export const metadata: Metadata = {
  title: "Ijoba Travels",
  description: "Curating experiences that transcend time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(lato.variable, playfairDisplay.variable)}
        suppressHydrationWarning
      >
        <NextTopLoader color="#F4A261" showSpinner={false} height={4} />
        {children}
      </body>
    </html>
  );
}
