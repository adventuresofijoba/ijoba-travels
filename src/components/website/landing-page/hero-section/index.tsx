import { Button } from "@/components/ui/button";
import Search from "./search";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function HeroSection() {
  return (
    <section className="h-screen grid overflow-hidden relative bg-[url(/hero-bg.jpg)] bg-cover bg-center">
      <div className="bg-black/60 grid gap-16 content-end justify-center text-white text-center pb-16 sm:pb-32 px-layout-spacing-xs">
        <div className="grid gap-5">
          <h1 className="font-playfair-display italic font-bold text-4xl sm:text-7xl max-w-3xl mx-auto">
            Curating experiences that transcend time.
          </h1>
          <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Seamless travel, tailored adventures, and unforgettable memories
            <br />— your journey starts here.
          </p>
          <Button className="w-max mx-auto">
            View Packages <Icon icon={"ep:right"} width="16" />
          </Button>
        </div>
        <Search />
      </div>
    </section>
  );
}
