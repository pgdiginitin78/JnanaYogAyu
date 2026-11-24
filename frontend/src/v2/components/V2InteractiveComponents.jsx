import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TiltCard, ease } from "../../components/membership/MotionKit";

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
      visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.3, duration: 0.9 } },
    },
  },
  blur: {
    container: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
    },
    item: {
      hidden: { opacity: 0, filter: "blur(12px)", y: 14 },
      visible: {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        transition: { type: "spring", bounce: 0.25, duration: 1.1 },
      },
    },
  },
};

export function AnimatedGroup({ children, className = "", preset = "blur" }) {
  const selected = ANIMATED_GROUP_PRESETS[preset] || ANIMATED_GROUP_PRESETS.blur;
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

export function FloatingPaths({ position = 1, className = "" }) {
  const paths = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 8 * position} -${189 + i * 7}C-${
      380 - i * 8 * position
    } -${189 + i * 7} -${312 - i * 8 * position} ${216 - i * 7} ${
      152 - i * 7
    } ${343 - i * 7}C${616 - i * 7} ${470 - i * 7} ${
      684 - i * 7
    } ${875 - i * 7} ${684 - i * 7} ${875 - i * 7}`,
    width: 0.6 + i * 0.04,
    duration: 24 + (i % 5) * 4,
  }));

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <svg
        className="h-full w-full text-[#E7D7B5]"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.07 + path.id * 0.014}
            initial={{ pathLength: 0.35, opacity: 0.35 }}
            animate={{
              pathLength: 1,
              opacity: [0.22, 0.55, 0.22],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function KineticHeroHighlight({ children, className = "" }) {
  return (
    <span
      className={`inline-block italic bg-gradient-to-r from-[#FAF5E8] via-[#E7D7B5] to-[#C9A45C] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

export function TailarkAnnouncementPill({ label, actionLabel, to, onClick }) {
  const pillContent = (
    <span className="group inline-flex items-center gap-3 rounded-full border border-[#FAF5E8]/25 bg-[#071E14]/55 p-1 pl-4 pr-1.5 text-xs text-[#FAF5E8] shadow-md backdrop-blur-md transition-colors duration-300 hover:border-[#C9A45C]/70 hover:bg-[#071E14]/75">
      <Sparkles className="h-3.5 w-3.5 text-[#C9A45C] shrink-0" />
      <span className="font-medium tracking-wide">{label}</span>
      {actionLabel && (
        <>
          <span className="h-3.5 w-px bg-[#FAF5E8]/25" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E7D7B5]">
            {actionLabel}
          </span>
        </>
      )}
      <span className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-[#C9A45C]/20 text-[#E7D7B5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:bg-[#C9A45C] group-hover:text-[#071E14]">
        <ArrowRight className="h-3.5 w-3.5" />
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {pillContent}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="inline-block">
        {pillContent}
      </button>
    );
  }
  return pillContent;
}

export function Editorial21stHero({
  backgroundImage,
  imageAlt,
  announcement,
  title,
  subtitle,
  actions,
  bottomStats = [],
  rightAddon = null,
  align = "left",
}) {
  const isCentered = align === "center" && !rightAddon;

  return (
    <section className="relative isolate min-h-[calc(100svh-5rem)] w-full overflow-hidden bg-[#071E14] text-[#FAF5E8] flex flex-col justify-between">
      {backgroundImage && (
        <motion.img
          src={backgroundImage}
          alt={imageAlt || "JnanaYogAyu Sanctuary"}
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.1, ease }}
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-100"
        />
      )}

      {isCentered ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-[#071E14]/70 via-[#071E14]/55 to-[#071E14]/88"
        />
      ) : (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-[#071E14]/85 via-[#071E14]/45 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-t from-[#071E14]/82 via-transparent to-[#071E14]/25"
          />
        </>
      )}

      <FloatingPaths position={1} className="opacity-70 -z-10" />

      <div className="relative z-10 w-full flex-1 flex flex-col justify-between px-4 sm:px-6 lg:px-8 2xl:px-14 py-8 sm:py-10 lg:py-12">
        <div
          className={`my-auto w-full ${
            rightAddon
              ? "grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
              : isCentered
                ? "flex flex-col items-center text-center"
                : "w-full lg:w-3/4"
          }`}
        >
          <AnimatedGroup
            preset="blur"
            className={`space-y-5 ${
              rightAddon
                ? "lg:col-span-6"
                : isCentered
                  ? "w-full flex flex-col items-center"
                  : ""
            }`}
          >
            {announcement && <div>{announcement}</div>}

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-[4.15rem] font-normal leading-[1.06] tracking-tight text-[#FAF5E8] drop-shadow-sm">
              {title}
            </h1>

            {subtitle && (
              <p
                className={`text-sm sm:text-base lg:text-lg leading-relaxed text-[#FAF5E8]/90 ${
                  isCentered ? "lg:w-3/4 mx-auto" : "lg:w-4/5"
                }`}
              >
                {subtitle}
              </p>
            )}

            {actions && (
              <div
                className={`pt-2 flex flex-wrap items-center gap-3 ${
                  isCentered ? "justify-center" : ""
                }`}
              >
                {actions}
              </div>
            )}
          </AnimatedGroup>

          {rightAddon && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="lg:col-span-6"
            >
              {rightAddon}
            </motion.div>
          )}
        </div>

        {bottomStats.length > 0 && (
          <AnimatedGroup
            preset="slide"
            className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
          >
            {bottomStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[#FAF5E8]/20 bg-[#071E14]/55 px-4 sm:px-5 py-3.5 backdrop-blur-md transition-colors hover:border-[#C9A45C]/60 hover:bg-[#071E14]/70"
              >
                <p className="font-serif text-xl sm:text-2xl font-medium text-[#E7D7B5]">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#FAF5E8]/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </AnimatedGroup>
        )}
      </div>
    </section>
  );
}

export function AnimatedTabDock({ tabs, activeTab, onChange, layoutId = "v2TabDock" }) {
  return (
    <div className="inline-flex w-full sm:w-auto items-center justify-start sm:justify-center gap-1.5 overflow-x-auto rounded-full border border-[#0f3d26]/15 bg-[#FBF8F1] p-1.5 shadow-[0_10px_30px_rgba(15,61,38,0.08)]">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onChange(tab.id)}
            className={`relative shrink-0 rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A45C] ${
              isActive
                ? "text-[#FAF5E8]"
                : "text-[#0f3d26]/70 hover:text-[#0f3d26]"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0D3323] via-[#12432D] to-[#1a5c3a] shadow-md"
              />
            )}
            <span className="relative z-10 inline-flex items-center gap-2 whitespace-nowrap">
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    isActive
                      ? "bg-[#C9A45C]/25 text-[#E7D7B5]"
                      : "bg-[#e6efea] text-[#0f3d26]"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SpotlightBentoCard({
  children,
  className = "",
  dark = false,
  tiltMax = 5,
}) {
  return (
    <TiltCard
      max={tiltMax}
      className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${
        dark
          ? "border-[#C9A45C]/25 bg-gradient-to-br from-[#0B3326] via-[#0D3323] to-[#12432D] text-[#FAF5E8] shadow-[0_20px_50px_rgba(7,30,20,0.28)] hover:border-[#C9A45C]/55"
          : "border-[#0f3d26]/12 bg-[#FFFDF9] text-[#0f3d26] shadow-[0_14px_40px_rgba(15,61,38,0.06)] hover:border-[#C9A45C]/50 hover:shadow-[0_24px_60px_rgba(15,61,38,0.12)]"
      } ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#C9A45C]/12 blur-2xl transition-opacity duration-500 opacity-40 group-hover:opacity-100"
      />
      <div className="relative z-10 h-full">{children}</div>
    </TiltCard>
  );
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  dark = false,
}) {
  const isLeft = align === "left";
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 0.35, ease }}
      className={isLeft ? "text-left w-full" : "text-center w-full"}
    >
   
      <h2
        className={`mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight leading-[1.12] ${
          dark ? "text-[#FAF5E8]" : "text-[#0f3d26]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-sm sm:text-base leading-relaxed ${
            dark ? "text-[#FAF5E8]/85" : "text-[#0f3d26]/85"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

export function UserFlowJourneyStrip({
  currentStep,
  userRoleLabel,
  discountLabel,
  steps,
  className = "",
}) {
  return (
    <div
      className={`rounded-2xl border border-[#C9A45C]/30 bg-[#FFFDF9]/95 px-4 sm:px-6 py-4 shadow-[0_10px_32px_rgba(15,61,38,0.06)] ${className}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f3d26] to-[#1a5c3a] text-[#E7D7B5] shadow-sm">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8b6534]">
              Active User Flow • {userRoleLabel}
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#0f3d26]">
              {currentStep}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {steps?.map((step, index) => (
            <div key={step} className="inline-flex items-center gap-2">
              <span className="rounded-full border border-[#0f3d26]/15 bg-[#f0f6f2] px-3 py-1 text-[11px] font-medium text-[#0f3d26]">
                {step}
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
              )}
            </div>
          ))}
          {discountLabel && (
            <Link
              to="/v2/membership"
              className="rounded-full bg-[#C9A45C]/20 border border-[#C9A45C]/45 px-3 py-1 text-[11px] font-semibold text-[#8b6534] hover:bg-[#C9A45C]/30 transition-colors"
            >
              {discountLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
