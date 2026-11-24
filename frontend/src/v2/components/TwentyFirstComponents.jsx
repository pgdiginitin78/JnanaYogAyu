import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const ANIMATED_GROUP_PRESETS = {
  fade: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    },
    item: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
  },
  slide: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", bounce: 0.25, duration: 0.85 },
      },
    },
  },
  blur: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.13, delayChildren: 0.08 },
      },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { type: "spring", bounce: 0.25, duration: 1.0 },
      },
    },
  },
};

export function AnimatedGroup({ children, className = "", preset = "blur" }) {
  const selected =
    ANIMATED_GROUP_PRESETS[preset] || ANIMATED_GROUP_PRESETS.blur;
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={selected.container}
      className={className}
    >
      {React.Children.toArray(children).map((child, index) => (
        <motion.div key={index} variants={selected.item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

export function ImagesSlider({
  images = [],
  children,
  overlay = true,
  overlayClassName = "",
  className = "",
  autoplay = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (!autoplay || images.length <= 1) return undefined;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(interval);
  }, [autoplay, images.length]);

  useEffect(() => {
    if (images.length <= 1) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1 >= images.length ? 0 : prev + 1));
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev - 1 < 0 ? images.length - 1 : prev - 1,
        );
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length]);

  const safeIndex = images.length > 0 ? currentIndex % images.length : 0;

  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${className}`}
    >
      {images.length > 0 && (
        <AnimatePresence mode="sync">
          <motion.img
            key={safeIndex}
            src={images[safeIndex]}
            alt="JnanaYogAyu Sanctuary Backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center"
          />
        </AnimatePresence>
      )}
      {overlay && (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-10 bg-[#071E14]/50 ${overlayClassName}`}
        />
      )}
      <div className="relative z-20 w-full">{children}</div>
      {images.length > 1 && (
        <div className="absolute bottom-5 right-6 z-30 hidden sm:flex items-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`Hero slide ${idx + 1}`}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                safeIndex === idx
                  ? "w-7 bg-[#C9A45C]"
                  : "w-2 bg-[#FAF5E8]/50 hover:bg-[#FAF5E8]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TwentyFirstHero({
  images = [],
  title,
  subtitle,
  actions,
  bottomStats = [],
}) {
  return (
    <section className="relative w-full overflow-hidden min-h-[calc(100svh-5rem)] bg-[#071E14] text-[#FAF5E8] flex flex-col">
      <ImagesSlider
        images={images}
        overlayClassName="bg-gradient-to-b from-[#071E14]/55 via-[#071E14]/40 to-[#071E14]/88"
        className="min-h-[calc(100svh-5rem)] flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 2xl:px-14"
      >
        <div className="w-full flex flex-col items-center justify-between text-center gap-8">
          <AnimatedGroup
            preset="blur"
            className="w-full flex flex-col items-center mx-auto gap-5 pt-2 sm:pt-6"
          >
  
            

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.06] text-[#FAF5E8]">
              {title}
            </h1>

            {subtitle && (
              <p className="w-full  text-sm sm:text-base lg:text-lg leading-relaxed text-[#FAF5E8]/90">
                {subtitle}
              </p>
            )}

            {actions && (
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                {actions}
              </div>
            )}
          </AnimatedGroup>

          {bottomStats.length > 0 && (
            <AnimatedGroup
              preset="slide"
              className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-4"
            >
              {bottomStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#FAF5E8]/20 bg-[#071E14]/65 px-4 py-3 text-center backdrop-blur-md"
                >
                  <p className="font-serif text-lg sm:text-xl font-semibold text-[#E7D7B5]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#FAF5E8]/80">
                    {stat.label}
                  </p>
                </div>
              ))}
            </AnimatedGroup>
          )}
        </div>
      </ImagesSlider>
    </section>
  );
}

export function BentoGrid({ children, className = "" }) {
  return (
    <div
      className={`grid w-full grid-cols-1 md:grid-cols-3 gap-6 ${className}`}
    >
      {children}
    </div>
  );
}

export function BentoCard({
  name,
  className = "",
  image,
  Icon,
  badge,
  description,
  href,
  onClick,
  cta = "Explore More",
}) {
  const Wrapper = href ? Link : "button";
  const wrapperProps = href ? { to: href } : { type: "button", onClick };

  return (
    <Wrapper
      {...wrapperProps}
      className={`group text-left rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C9A45C] transition-all duration-300 flex flex-col justify-between ${className}`}
    >
      {image && (
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#FBF8F1]">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            {badge && (
              <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f3d26]">
                {badge}
              </span>
            )}
            {Icon && <Icon className="h-5 w-5 text-[#C9A45C] shrink-0" />}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-[#0f3d26] group-hover:text-[#8b6534] transition-colors">
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-[#0f3d26]/75 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#EDE5D5] inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f3d26] group-hover:translate-x-1 transition-transform">
          <span>{cta}</span>
          <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
        </div>
      </div>
    </Wrapper>
  );
}

export function Timeline({ data = [], title, subtitle }) {
  return (
    <div className="w-full py-12 lg:py-20 px-4 sm:px-6 lg:px-8 2xl:px-14">
      <div className="w-full">
        <div className=" mb-14">
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f3d26] leading-tight">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm sm:text-base text-[#0f3d26]/75 leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        <div className="relative space-y-12 sm:space-y-16">
          {data.map((item, index) => (
            <div
              key={item.title}
              className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start"
            >
              <div className="lg:col-span-4 lg:sticky lg:top-28 flex items-start gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-9 w-9 rounded-full border-2 border-[#C9A45C] bg-[#0f3d26] flex items-center justify-center shadow-md">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#C9A45C]" />
                  </div>
                  {index < data.length - 1 && (
                    <motion.div
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.65, ease: "easeOut" }}
                      className="hidden lg:block w-0.5 h-32 mt-3 origin-top bg-gradient-to-b from-[#C9A45C] via-[#C9A45C]/40 to-transparent"
                    />
                  )}
                </div>

                <div className="space-y-1.5">
                  {item.tag && (
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6534]">
                      {item.tag}
                    </span>
                  )}
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#0f3d26]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0f3d26]/75 leading-relaxed">
                    {item.description}
                  </p>
                  {item.to && (
                    <Link
                      to={item.to}
                      className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                    >
                      <span>{item.cta || "Open Stage"}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                    </Link>
                  )}
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45 }}
                className="lg:col-span-8 rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] p-4 sm:p-5 shadow-md space-y-4"
              >
                {item.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                )}
                {item.bullets && item.bullets.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {item.bullets.map((bullet) => (
                      <div
                        key={bullet}
                        className="rounded-xl border border-[#EDE5D5] bg-[#FBF8F1] p-3 text-xs text-[#0f3d26]/85 leading-relaxed flex items-start gap-2"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#C9A45C] shrink-0" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FocusCards({ cards = [], className = "" }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full ${className}`}
    >
      {cards.map((card, index) => {
        const isBlurred = hovered !== null && hovered !== index;
        return (
          <Link
            key={card.title}
            to={card.to || "#"}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={`group rounded-3xl overflow-hidden border border-[#EDE5D5] bg-[#FFFDF9] shadow-sm transition-all duration-300 ease-out flex flex-col ${
              isBlurred
                ? "blur-[1.5px] scale-[0.98] opacity-65"
                : "scale-100 opacity-100 hover:shadow-xl hover:border-[#C9A45C]"
            }`}
          >
            <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
              <img
                src={card.src}
                alt={card.title}
                className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6534]">
                  {card.tag}
                </span>
                <h3 className="mt-1.5 font-serif text-2xl text-[#0f3d26]">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-[#0f3d26]/75 leading-relaxed">
                  {card.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#EDE5D5] inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f3d26]">
                <span>Enter Pillar</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export function FeatureShowcase108({
  items = [],
  title,
  subtitle,
  actionTo,
  actionLabel,
  containImage = true,
  tabLayoutId = "jyaFeature108TabPill",
}) {
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;

  const activeItem = items[active] || items[0];

  const handleNext = () => {
    setActive((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="w-full bg-gradient-to-br from-[#071E14] via-[#0B2E1F] to-[#12432D] text-[#FAF5E8] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 2xl:px-14 border-y border-[#C9A45C]/25">
      <div className="w-full">
        <div className="flex flex-col items-center text-center w-full">
          {title && (
            <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#FAF5E8] leading-tight">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-4 text-sm sm:text-base text-[#FAF5E8]/85 leading-relaxed lg:w-3/4">
              {subtitle}
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
          {items.map((item, idx) => {
            const isActive = idx === active;
            return (
              <button
                key={item.title || idx}
                type="button"
                onClick={() => setActive(idx)}
                className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold tracking-wide transition-colors ${
                  isActive
                    ? "border-[#C9A45C] text-[#071E14]"
                    : "border-[#C9A45C]/30 bg-[#0A261A]/80 text-[#FAF5E8] hover:border-[#C9A45C]/70 hover:bg-[#0D3323]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId={tabLayoutId}
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                    className="absolute inset-0 rounded-full bg-[#C9A45C] shadow-md"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-2">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isActive ? "bg-[#071E14]" : "bg-[#C9A45C]"
                    }`}
                  />
                  <span>{item.shortLabel || item.title}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-[#C9A45C]/35 bg-[#0A261A]/90 p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.24, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <span className="inline-flex items-center rounded-full border border-[#C9A45C]/40 bg-[#C9A45C]/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
                    {activeItem.designation || "Confidential Flow"}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#FAF5E8] leading-snug">
                    {activeItem.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#FAF5E8]/85 leading-relaxed">
                    {activeItem.quote}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="grid grid-cols-5 gap-2 pt-1">
                {items.map((st, idx) => (
                  <button
                    key={st.title || idx}
                    type="button"
                    onClick={() => setActive(idx)}
                    aria-label={`Inspect step ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === active
                        ? "bg-[#C9A45C]"
                        : "bg-[#FAF5E8]/20 hover:bg-[#FAF5E8]/45"
                    }`}
                  />
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#C9A45C]/20">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous step"
                    className="h-11 w-11 rounded-full border border-[#C9A45C]/45 bg-[#0D3323] text-[#FAF5E8] flex items-center justify-center transition-colors hover:bg-[#C9A45C] hover:text-[#071E14]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next step"
                    className="h-11 w-11 rounded-full border border-[#C9A45C]/45 bg-[#0D3323] text-[#FAF5E8] flex items-center justify-center transition-colors hover:bg-[#C9A45C] hover:text-[#071E14]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

                {actionTo && actionLabel && (
                  <Link
                    to={actionTo}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
                  >
                    <span>{actionLabel}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="w-full sm:w-[360px] mx-auto rounded-[2rem] border-2 border-[#C9A45C]/50 bg-[#FFFDF9] p-2.5 shadow-2xl">
                <div className="relative h-[430px] sm:h-[490px] w-full overflow-hidden rounded-[1.5rem] bg-[#FBF8F1]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeItem.src || active}
                      src={activeItem.src}
                      alt={activeItem.title}
                      initial={{ opacity: 0, scale: 0.97, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, y: -8 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className={`h-full w-full ${
                        containImage
                          ? "object-contain object-center"
                          : "object-cover object-center"
                      }`}
                    />
                  </AnimatePresence>
                </div>
                <div className="pt-2.5 pb-1 text-center">
                  <span className="text-[11px] font-bold tracking-wide text-[#0f3d26]">
                    {activeItem.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function CardHoverEffect({ items = [], className = "" }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}
    >
      {items.map((item, idx) => (
        <Link
          key={item.title}
          to={item.link || "/v2/insight"}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#C9A45C]/25 block rounded-3xl"
                layoutId="jyaHoverCardBg"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.15 },
                }}
              />
            )}
          </AnimatePresence>

          <div className="relative z-20 h-full w-full rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm group-hover:border-[#0f3d26]/40 transition-colors flex flex-col justify-between">
            {item.image && (
              <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#e6efea] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0f3d26]">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="text-[11px] font-semibold text-[#8b6534]">
                      {item.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-3 font-serif text-xl text-[#0f3d26] leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#EDE5D5] inline-flex items-center gap-1.5 text-xs font-bold text-[#0f3d26]">
                <span>{item.cta || "Explore"}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function AceternityFeaturesSection({
  items = [],
  eyebrow,
  title,
  subtitle,
}) {
  if (items.length === 0) return null;

  return (
    <div className="w-full rounded-3xl border border-[#C9A45C]/30 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] text-[#FAF5E8] p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden">
      <div className="mb-8 grid gap-4">
        <div>
          {eyebrow && (
            <span className="inline-flex items-center rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E7D7B5]">
              {eyebrow}
            </span>
          )}
          {title && (
            <h3 className="mt-3 font-serif text-3xl sm:text-4xl text-[#FAF5E8] leading-tight">
              {title}
            </h3>
          )}
        </div>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#FAF5E8]/80 leading-relaxed ">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 relative z-10 border-t border-l border-[#C9A45C]/25">
        {items.map((feature, index) => {
          const isTopRow = index < 5;
          const IconComp = feature.Icon;
          return (
            <div
              key={`${feature.group}-${feature.title}`}
              className="flex flex-col border-r border-b border-[#C9A45C]/25 py-8 px-6 relative group/feature transition-colors"
            >
              {isTopRow ? (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#C9A45C]/15 to-transparent pointer-events-none" />
              ) : (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#C9A45C]/20 to-transparent pointer-events-none" />
              )}

              <div className="mb-4 relative z-10 flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#C9A45C]/30 bg-[#071E14]/70 text-[#C9A45C] group-hover/feature:bg-[#C9A45C] group-hover/feature:text-[#071E14] transition-colors">
                  {IconComp && <IconComp className="h-5 w-5" />}
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isTopRow
                      ? "border border-white/15 bg-white/5 text-[#FAF5E8]/70"
                      : "border border-[#C9A45C]/45 bg-[#C9A45C]/20 text-[#E7D7B5]"
                  }`}
                >
                  {feature.group}
                </span>
              </div>

              <div className="text-lg font-serif font-bold mb-2 relative z-10 pl-4">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[#C9A45C]/40 group-hover/feature:bg-[#C9A45C] transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-[#FAF5E8]">
                  {feature.title}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#FAF5E8]/75 relative z-10 pl-4 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function GalleryCarousel21st({
  items = [],
  filters = [],
  eyebrow,
  title,
  subtitle,
}) {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [pageIndex, setPageIndex] = useState(0);

  const visibleItems =
    selectedFilter === "all"
      ? items
      : items.filter((item) => item.kind === selectedFilter);

  const pageSize = 3;
  const totalPages = Math.max(1, Math.ceil(visibleItems.length / pageSize));
  const safePage = Math.min(pageIndex, totalPages - 1);
  const currentSlice = visibleItems.slice(
    safePage * pageSize,
    safePage * pageSize + pageSize,
  );

  const handleSelectFilter = (nextFilter) => {
    setSelectedFilter(nextFilter);
    setPageIndex(0);
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
        <div>
          {eyebrow && (
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6534]">
              {eyebrow}
            </span>
          )}
          {title && (
            <h3 className="mt-2 font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0f3d26]">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-1.5 text-xs sm:text-sm text-[#0f3d26]/75">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-3">
          {filters.length > 0 && (
            <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-[#0f3d26]/15 bg-[#FFFDF9] p-1">
              {filters.map((f) => {
                const isSelected = selectedFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => handleSelectFilter(f.id)}
                    className={`relative rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${
                      isSelected
                        ? "text-[#FAF5E8]"
                        : "text-[#0f3d26]/75 hover:text-[#0f3d26]"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="jyaGalleryFilterPill"
                        transition={{
                          type: "spring",
                          stiffness: 360,
                          damping: 28,
                        }}
                        className="absolute inset-0 rounded-full bg-[#0f3d26]"
                      />
                    )}
                    <span className="relative z-10">{f.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() =>
                setPageIndex((prev) => (prev - 1 + totalPages) % totalPages)
              }
              aria-label="Previous carousel slide"
              className="h-10 w-10 rounded-full border border-[#0f3d26]/20 bg-[#FFFDF9] text-[#0f3d26] flex items-center justify-center hover:bg-[#0f3d26] hover:text-[#FAF5E8] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setPageIndex((prev) => (prev + 1) % totalPages)}
              aria-label="Next carousel slide"
              className="h-10 w-10 rounded-full border border-[#0f3d26]/20 bg-[#FFFDF9] text-[#0f3d26] flex items-center justify-center hover:bg-[#0f3d26] hover:text-[#FAF5E8] transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <motion.div
        key={`${selectedFilter}-${safePage}`}
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {currentSlice.map((item) => (
          <Link
            key={item.id || item.title}
            to={item.to || "/v2/insight"}
            className="group rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm hover:border-[#C9A45C] hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6534]">
                  {item.category}
                </p>
                <h4 className="mt-2 font-serif text-xl text-[#0f3d26] leading-snug group-hover:text-[#8b6534] transition-colors">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-[#EDE5D5] flex items-center justify-between text-xs font-bold text-[#0f3d26]">
              <span>{item.cta || "Read / Open"}</span>
              <ArrowRight className="h-4 w-4 text-[#C9A45C] transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </motion.div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-1">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              aria-label={`Carousel slide ${idx + 1}`}
              onClick={() => setPageIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                safePage === idx
                  ? "w-8 bg-[#0f3d26]"
                  : "w-2.5 bg-[#0f3d26]/20 hover:bg-[#0f3d26]/45"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
