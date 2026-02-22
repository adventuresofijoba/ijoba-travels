import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import HeroSection from "@/components/website/create-custom-package-page/hero-section";
import { supabase } from "@/lib/supabase";
import React from "react";

export default async function Page() {
  const { data: destinations } = await supabase
    .from("destinations")
    .select("*")
    .eq("is_active", true)
    .order("name");

  return (
    <main>
      <Header variant="variant-2" />
      <HeroSection destinations={destinations || []} />
      <Footer hideSubscribe />
    </main>
  );
}
