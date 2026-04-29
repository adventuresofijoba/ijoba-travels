import Footer from "@/components/website/_shared/footer";
import Header from "@/components/website/_shared/header";
import ExploreSection from "@/components/website/landing-page/explore-section";
import FaqSection from "@/components/website/landing-page/faq";
import HeroSection from "@/components/website/landing-page/hero-section";
import TravelStoriesSection from "@/components/website/landing-page/travel-stories";
import WhyChooseUsSection from "@/components/website/landing-page/why-choose-us-section";

export default function Page() {
  return (
    <main>
      <div className="relative">
        <Header />
        <HeroSection />
      </div>
      <ExploreSection />
      <WhyChooseUsSection />
      <TravelStoriesSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
