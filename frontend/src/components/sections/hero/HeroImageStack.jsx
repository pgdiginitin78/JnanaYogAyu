import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroImages } from "./heroImages";
import HeroImageFrame from "./HeroImageFrame";
import HeroFloatingCards from "./HeroFloatingCards";

const desktopSlots = [
  // Slot 0: Layer 1 — Main Foreground Frame (slightly rotated +2 deg)
  { x: 0, y: 0, scale: 1, rotate: 2, opacity: 1, zIndex: 30 },
  // Slot 1: Frame A — Upper-Left Behind (-7 deg)
  { x: -64, y: -42, scale: 0.84, rotate: -7, opacity: 0.86, zIndex: 15 },
  // Slot 2: Frame B — Upper-Right Behind (+6 deg)
  { x: 56, y: -28, scale: 0.86, rotate: 6, opacity: 0.88, zIndex: 20 },
  // Slot 3: Frame C — Lower-Right Behind (+9 deg)
  { x: 46, y: 46, scale: 0.82, rotate: 9, opacity: 0.82, zIndex: 10 },
  // Slot 4: Standby Incoming / Outgoing Frame in Back
  { x: -24, y: 24, scale: 0.72, rotate: -3, opacity: 0, zIndex: 5 },
];

const mobileSlots = [
  { x: 0, y: 0, scale: 1, rotate: 2, opacity: 1, zIndex: 30 },
  { x: -26, y: -22, scale: 0.86, rotate: -6, opacity: 0.84, zIndex: 15 },
  { x: 24, y: -16, scale: 0.86, rotate: 5, opacity: 0.84, zIndex: 20 },
  { x: 20, y: 22, scale: 0.82, rotate: 7, opacity: 0, zIndex: 10 },
  { x: -12, y: 12, scale: 0.74, rotate: -3, opacity: 0, zIndex: 5 },
];

export default function HeroImageStack() {
  const shouldReduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Preload all 5 images before transitions
  useEffect(() => {
    heroImages.forEach((img) => {
      const preload = new Image();
      preload.src = img.src;
    });
  }, []);

  // Track viewport size for responsive stack offsets
  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 4-second automatic 3D rotation, paused on hover
  useEffect(() => {
    if (isPaused || shouldReduce) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, shouldReduce]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % heroImages.length);
  };

  const slots = isMobile ? mobileSlots : desktopSlots;

  return (
    <motion.div
      initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative mx-auto flex w-full max-w-[740px] flex-col items-center"
    >
      {/* 3D Layered Stack Container */}
      <div className="relative h-[390px] w-full sm:h-[510px] lg:h-[660px] xl:h-[710px]">
        {/* Layer 3 — Floating Botanical Glass Cards */}
        <HeroFloatingCards />

        {/* Layers 1 & 2 — 5 Rotating Photographs across 4 visible depth slots + 1 standby */}
        {heroImages.map((img, idx) => {
          const slotIndex =
            (idx - activeIndex + heroImages.length) % heroImages.length;
          const slotStyle = slots[slotIndex];
          const isForeground = slotIndex === 0;

          return (
            <HeroImageFrame
              key={img.id}
              image={img}
              slotStyle={slotStyle}
              isForeground={isForeground}
              onSelect={() => {
                if (!isForeground) setActiveIndex(idx);
              }}
            />
          );
        })}
      </div>

      {/* Navigation Indicators & Manual Controls */}
      <div className="relative z-30 mt-2 flex items-center gap-3 rounded-full border border-[#C99A45]/30 bg-[#F8F5EC]/85 px-4 py-2 shadow-[0_8px_24px_rgba(18,61,43,0.08)] backdrop-blur-md">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous photograph"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#123D2B]/75 transition hover:bg-[#DDE5D3]/70 hover:text-[#123D2B] cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {heroImages.map((img, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`View ${img.category}`}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  isActive
                    ? "w-7 bg-[#123D2B]"
                    : "w-2 bg-[#C99A45]/45 hover:bg-[#C99A45]"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next photograph"
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#123D2B]/75 transition hover:bg-[#DDE5D3]/70 hover:text-[#123D2B] cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        <span className="hidden border-l border-[#C99A45]/30 pl-3 font-sans text-xs font-medium text-[#123D2B]/80 sm:inline-block">
          {heroImages[activeIndex].category}
        </span>
      </div>
    </motion.div>
  );
}

