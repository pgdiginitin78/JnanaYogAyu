import { motion, useReducedMotion } from "framer-motion";

export default function HeroImageFrame({
  image,
  slotStyle,
  isForeground,
  onSelect,
}) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={false}
      animate={{
        x: slotStyle.x,
        y: slotStyle.y,
        scale: slotStyle.scale,
        rotate: slotStyle.rotate,
        opacity: slotStyle.opacity,
        zIndex: slotStyle.zIndex,
      }}
      transition={{
        duration: shouldReduce ? 0.3 : 1.1,
        ease: "easeInOut",
      }}
      onClick={onSelect}
      className={`absolute inset-0 m-auto overflow-hidden will-change-transform ${
        isForeground
          ? "h-[330px] w-[84%] sm:h-[440px] sm:w-[76%] lg:h-[580px] lg:w-[80%] xl:h-[630px] xl:w-[82%] rounded-[36px] border-2 border-[#F8F5EC]/95 shadow-[0_32px_80px_rgba(18,61,43,0.24)] cursor-default"
          : "h-[295px] w-[76%] sm:h-[390px] sm:w-[68%] lg:h-[490px] lg:w-[70%] xl:h-[540px] xl:w-[72%] rounded-[28px] border border-white/80 shadow-[0_22px_50px_rgba(18,61,43,0.16)] cursor-pointer"
      }`}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="eager"
        decoding="async"
        className="h-full w-full object-cover object-center select-none"
      />
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          isForeground
            ? "bg-gradient-to-t from-[#123D2B]/25 via-transparent to-white/10 opacity-100"
            : "bg-[#F8F5EC]/15 opacity-100"
        }`}
      />
    </motion.div>
  );
}
