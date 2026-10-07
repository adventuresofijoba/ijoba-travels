import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import AccreditationSection from "@/components/website/landing-page/accreditation-section";
import ExploreSection from "@/components/website/landing-page/explore-section";
import FaqSection from "@/components/website/landing-page/faq";
import HeroSection from "@/components/website/landing-page/hero-section";
import TestimonialsSection from "@/components/website/landing-page/testimonials";
import TravelStoriesSection from "@/components/website/landing-page/travel-stories";
import WhyChooseUsSection from "@/components/website/landing-page/why-choose-us-section";

// Refresh admin-managed content (testimonials, destinations, stories) without a redeploy.
export const revalidate = 60;

export default function Page() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSection />
      </div>
      <ExploreSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <AccreditationSection />
      <TravelStoriesSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
