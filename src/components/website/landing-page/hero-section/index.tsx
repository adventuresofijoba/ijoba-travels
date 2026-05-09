import Search from "./search";

export default function HeroSection() {
  return (
    <section className="h-screen grid overflow-hidden relative bg-[url(/hero-bg.jpg)] bg-cover bg-center">
      <div className="bg-black/60 grid gap-10 content-end justify-center text-white text-center pb-16 sm:pb-32 px-layout-spacing-xs">
        <div className="grid gap-5">
          <h1 className="font-playfair-display italic font-bold text-4xl sm:text-7xl max-w-3xl mx-auto">
            Curating experiences that transcend time.
          </h1>
          <p className="text-lg sm:text-xl font-medium max-w-2xl mx-auto">
            Seamless travel, tailored adventures, and unforgettable
            memories—your journey starts here.
          </p>
        </div>
        <Search />
      </div>
    </section>
  );
}
