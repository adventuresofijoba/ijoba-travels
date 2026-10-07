import Image from "next/image";

const logoClassName =
  "object-contain grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100";

function Logo({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="group relative h-12 sm:h-20 w-20 sm:w-40">
      <Image src={src} alt={alt} fill sizes="160px" className={logoClassName} />
    </span>
  );
}

export default function AccreditationSection() {
  return (
    <section className="px-layout-spacing-xs sm:px-layout-spacing-sm py-10 sm:py-20">
      <div className="container mx-auto grid gap-10">
        <div className="text-center grid gap-2.5 justify-center">
          <h2 className="font-playfair-display text-4xl font-semibold max-w-[460px] italic">
            Licensed & Accredited
          </h2>
          <p className="text-lg">Travel with a team you can trust</p>
        </div>

        <div className="bg-[#F8EFD8] rounded-xl p-5 sm:p-8 grid gap-8 max-w-4xl w-full mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-12">
            <Logo src="/logos/ncaa-logo.png" alt="Nigeria Civil Aviation Authority (NCAA)" />
            <Logo src="/logos/nanta-logo.png" alt="National Association of Nigeria Travel Agencies (NANTA)" />
            <Logo src="/logos/amadeus-logo-cropped.png" alt="Amadeus" />
          </div>
          <p className="text-center max-w-2xl mx-auto">
            Ijoba Travels Ltd is registered with the Nigeria Civil Aviation
            Authority (NCAA) as a Travel Agency —{" "}
            <span className="font-semibold whitespace-nowrap">
              NCAA/ATR/TAC.2438
            </span>{" "}
            — and is a member of the National Association of Nigeria Travel
            Agencies (NANTA).
          </p>
        </div>
      </div>
    </section>
  );
}
