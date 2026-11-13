import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import membershipHeroImg from "../membership/assets/membership-hero.webp";

export default function JYAEcosystemHero({
  onBecomeMember,
  onExploreMemberships,
}) {
  const heroRef = useRef(null);
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });
  const smoothPointerY = useSpring(pointerY, {
    stiffness: 55,
    damping: 22,
    mass: 0.7,
  });

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imageScrollY = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.035, 1.13]);
  const contentScrollY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const imagePointerX = useTransform(smoothPointerX, [-0.5, 0.5], [9, -9]);
  const imagePointerY = useTransform(smoothPointerY, [-0.5, 0.5], [7, -7]);

  const handlePointerMove = (event) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const imageY = reduceMotion ? 0 : imageScrollY;
  const scale = reduceMotion ? 1.035 : imageScale;
  const contentY = reduceMotion ? 0 : contentScrollY;
  const imgX = reduceMotion ? 0 : imagePointerX;
  const imgPointerY = reduceMotion ? 0 : imagePointerY;

  return (
    <section
      ref={heroRef}
      aria-labelledby="jya-membership-hero-title"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative isolate min-h-[760px] overflow-hidden bg-[#071F17] text-[#F8F3E8] lg:min-h-[min(900px,calc(100svh-5rem))]"
    >
      {/* Base atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-30 bg-[radial-gradient(ellipse_at_78%_45%,rgba(49,102,69,0.36),transparent_42%),radial-gradient(ellipse_at_12%_80%,rgba(17,75,51,0.44),transparent_44%),linear-gradient(115deg,#071F17_0%,#0B2A1E_48%,#103B2B_100%)]"
      />

      {/* Restrained topographic line texture */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 h-full w-[58%] opacity-[0.13]"
        viewBox="0 0 900 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <g stroke="#C9A15B" strokeWidth="0.8">
          <path d="M430 -60C620 20 830 -4 930 150C1030 304 820 385 915 520C1010 655 840 810 650 940" />
          <path d="M390 -60C580 20 790 -4 890 150C990 304 780 385 875 520C970 655 800 810 610 940" />
          <path d="M350 -60C540 20 750 -4 850 150C950 304 740 385 835 520C930 655 760 810 570 940" />
          <path d="M310 -60C500 20 710 -4 810 150C910 304 700 385 795 520C890 655 720 810 530 940" />
          <path d="M270 -60C460 20 670 -4 770 150C870 304 660 385 755 520C850 655 680 810 490 940" />
        </g>
      </svg>

      {/* Main Membership Sanctuary Background Image Plane (Matches Home Page Hero) */}
      <motion.div
        aria-hidden="true"
        style={{ y: imageY, scale, x: imgX }}
        className="pointer-events-none absolute -right-[10%] top-[15%] -z-20 h-[72%] w-[82%] origin-center overflow-hidden rounded-l-[42%] rounded-br-[5rem] rounded-tr-[1.5rem] border border-[#C9A15B]/25 shadow-[0_35px_100px_rgba(0,0,0,0.34)] sm:top-[13%] sm:h-[76%] lg:-right-[4%] lg:top-[10%] lg:h-[82%] lg:w-[69%]"
      >
        <motion.img
          src={membershipHeroImg}
          alt="JnanaYogAyu Ayurvedic sanctuary courtyard gathering of practitioners and learners"
          draggable="false"
          style={{ y: imgPointerY }}
          className="h-[112%] w-full object-cover object-center opacity-[0.94]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#071F17]/85 via-[#071F17]/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071F17]/45 via-transparent to-[#071F17]/10" />
        <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(248,243,232,0.12)]" />
      </motion.div>

      {/* Edge shading keeps the editorial text crisp and 100% visible */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(90deg,#071F17_0%,rgba(7,31,23,0.97)_32%,rgba(7,31,23,0.78)_52%,rgba(7,31,23,0.14)_80%,rgba(7,31,23,0.05)_100%)]"
      />

      <div className="relative mx-auto flex min-h-[760px] max-w-[1720px] flex-col px-6 pb-8 pt-5 sm:px-10 lg:min-h-[min(900px,calc(100svh-5rem))] lg:px-16 xl:px-24">
        {/* Editorial metadata rail */}
        <div className="flex items-center justify-between gap-4 border-b border-[#F8F3E8]/15 pb-4 font-sans text-[9px] font-medium uppercase tracking-[0.25em] text-[#C6C7B8] sm:text-[10px] sm:tracking-[0.3em]">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A15B]" />
            JnanaYogAyu <span className="text-[#C9A15B]">/</span> Membership
          </span>
          <span className="hidden text-center md:block">
            Learn · Experience · Connect · Grow
          </span>
          <span className="text-right text-[#C9A15B]">
            Community · Gurukul · Conscious Living
          </span>
        </div>

        {/* Main content */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-10 flex flex-1 items-center py-12 sm:py-16 lg:py-14"
        >
          <div className="w-full max-w-[760px] lg:w-[58%]">
            <div className="mb-6 flex items-center gap-4 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-[#C9A15B] sm:text-xs">
              <span className="rounded-sm border border-[#C9A15B]/40 px-3 py-1.5 text-[9px] tracking-[0.22em] text-[#D9B66F]">
                JYA · MEMBERSHIP
              </span>
              <span className="h-px w-8 bg-[#C9A15B]/70" />
              <span>Learn. Experience. Connect. Grow.</span>
            </div>

            <h1
              id="jya-membership-hero-title"
              className="max-w-[760px] font-serif text-[clamp(3.25rem,6.1vw,6.8rem)] font-normal leading-[0.91] tracking-[-0.055em] text-[#F8F3E8]"
            >
              <span className="block">Be a Part of the</span>
              <span className="block py-1 italic gradient-heading-dark">
                JYA Ecosystem
              </span>
            </h1>

            <div className="my-7 flex max-w-[470px] items-center gap-4 text-[#C9A15B]">
              <span className="h-px w-14 bg-[#C9A15B]/60" />
              <span aria-hidden="true" className="text-lg">
                ✦
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-[#C9A15B]/50 to-transparent" />
            </div>

            <div className="max-w-[600px] space-y-3.5 font-sans text-sm leading-6 text-[#E2E5D9]/90 sm:text-base sm:leading-7">
              <p>
                JnanaYogAyu (JYA) brings together health, wellness, Ayurveda,
                knowledge, technology and conscious living through an integrated
                ecosystem.
              </p>
              <p>
                JYA Memberships offer different ways to participate in this
                ecosystem — whether you are an individual exploring holistic
                wellness, an Ayurveda practitioner, a healthcare professional, a
                learner or someone looking to experience a more natural and
                sustainable way of life.
              </p>
              <p>
                Choose a membership that aligns with your interests and
                aspirations. Access programmes, learning opportunities,
                services, products and a growing community committed to
                healthier and more conscious living.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3, scale: 1.015 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              >
                <button
                  type="button"
                  onClick={onBecomeMember}
                  className="group inline-flex min-h-14 items-center gap-5 rounded-full bg-[#C9A15B] px-8 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#10271C] shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-colors hover:bg-[#D8B978] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A15B] cursor-pointer"
                >
                  Become a Member
                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    ›
                  </span>
                </button>
              </motion.div>

              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              >
                <button
                  type="button"
                  onClick={onExploreMemberships}
                  className="inline-flex min-h-14 items-center rounded-full border border-[#F8F3E8]/25 bg-[#F8F3E8]/[0.045] px-8 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F8F3E8] backdrop-blur-sm transition-colors hover:border-[#C9A15B]/65 hover:bg-[#F8F3E8]/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A15B] cursor-pointer"
                >
                  Explore Memberships
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Membership Tiers Rail */}
        <div className="relative z-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#F8F3E8]/15 pt-5 font-sans text-[9px] font-medium uppercase tracking-[0.22em] text-[#C6C7B8] sm:gap-x-9 sm:text-[10px] sm:tracking-[0.25em]">
          {[
            "JYA Open",
            "शतायुस् World",
            "GlobalAyurX",
            "जैवमण्डल Ecosphere",
            "Gurukul Commune",
          ].map((item) => (
            <span key={item} className="flex items-center gap-2.5">
              <span className="h-1 w-1 rounded-full bg-[#C9A15B]" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Gentle bottom fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071F17]/45 to-transparent"
      />
    </section>
  );
}

