import { motion, useReducedMotion } from "framer-motion";
import { Leaf } from "lucide-react";

export default function HeroFloatingCards() {
  const shouldReduce = useReducedMotion();

  return (
    <>
      {/* Upper-left floating glassmorphism card with botanical leaf */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-2 top-8 z-40 sm:left-6 sm:top-10 lg:left-4 lg:top-12"
      >
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, -7, 0] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/80 bg-[#F8F5EC]/80 shadow-[0_14px_34px_rgba(18,61,43,0.14)] backdrop-blur-md"
        >
          <Leaf className="h-5 w-5 sm:h-6 sm:w-6 text-[#123D2B]" strokeWidth={1.8} />
        </motion.div>
      </motion.div>

      {/* Lower-right floating glassmorphism card with Ayurveda mortar-and-pestle SVG */}
      <motion.div
        initial={shouldReduce ? { opacity: 0 } : { opacity: 0, scale: 0.85, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-12 right-2 z-40 sm:bottom-14 sm:right-6 lg:bottom-14 lg:right-4"
      >
        <motion.div
          animate={shouldReduce ? undefined : { y: [0, 7, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl border border-white/80 bg-[#F8F5EC]/80 shadow-[0_14px_34px_rgba(18,61,43,0.14)] backdrop-blur-md"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 sm:h-7 sm:w-7 text-[#8B5E2A]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16.5 3.5 13 10" />
            <path d="M5 10h14l-1.3 5.2A5 5 0 0 1 12.85 19h-1.7a5 5 0 0 1-4.85-3.8L5 10Z" />
            <path d="M8.5 19 7 21h10l-1.5-2" />
          </svg>
        </motion.div>
      </motion.div>
    </>
  );
}

