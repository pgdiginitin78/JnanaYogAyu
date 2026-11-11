import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  User,
  Briefcase,
  ShieldCheck,
  Layers,
  Compass,
  Leaf,
} from "lucide-react";

import heroLessonImage from "../ui/assets/Community Learning Circle Under the Tree.png";
import MembershipModal from "./MembershipModal";
import CommonButton from "../../common/button/CommonButton";
import { useLenis } from "./SmoothScroll";

import {
  AnimatedCheck,
  Counter,
  Item,
  Magnetic,
  Marquee,
  Orbit,
  Parallax,
  Reveal,
  ScrubWords,
  SplitWords,
  Stagger,
  TiltCard,
  ease,
} from "./Motionkit";

const memberships = [
  {
    id: "open",
    no: "01",
    title: "JYA Open Membership",
    tagline: "Explore the JYA Ecosystem",
    badge: "Free Access",
    discountBadge: "Open",
    priceDisplay: "Free",
    priceSubtitle: "No membership registration fee",
    fullPlanName: "JYA Open Membership – Free",
    whoFor: [
      "Open to everyone interested in exploring JYA's health, wellness, knowledge and learning initiatives.",
    ],
    benefitsTitle: "Membership Benefits",
    benefits: [
      "Access to general JYA programmes and activities.",
      "Explore available health, wellness and learning services.",
      "Participate in open programmes as per individual programme eligibility.",
      "Discover JYA's products, services and community initiatives.",
      "Access to general membership areas of the platform.",
    ],
    conditionsTitle: "Membership Conditions",
    conditions: [
      "Open to all.",
      "No membership registration fee.",
      "No special membership discounts.",
      "Access to restricted membership areas and exclusive programmes is not included.",
    ],
    lifetime: null,
    fee: "Free initial registration.",
    renewal: "Membership validity and access as per JYA policy.",
    cta: "Join JYA Open Membership",
    ctaNote: "Start exploring the JYA ecosystem.",
  },
  {
    id: "shatayus",
    no: "02",
    title: "शतायुस्World Life Membership",
    tagline: "A Lifetime Connection with Wellness, Knowledge & Community",
    badge: "5% Privilege",
    discountBadge: "5% Discount",
    priceDisplay: "₹500",
    priceSubtitle: "One-time lifetime registration: ₹500",
    fullPlanName: "शतायुस् World Life Membership – ₹500",
    whoFor: [
      "Individuals, families, wellness enthusiasts and anyone interested in learning, experiencing and adopting a healthier and more balanced way of living.",
    ],
    benefitsTitle: "Membership Benefits",
    benefits: [
      "Lifetime membership with a one-time registration.",
      "5% discount on eligible JYA programmes, services and products.",
      "Access to special membership areas.",
      "Participation in regular, weekly and monthly programmes.",
      "Access to online and offline learning and engagement programmes.",
      "Opportunities to participate in residential and non-residential programmes.",
      "Freedom to choose programmes of interest throughout the year.",
      "Access to JYA स्वज्ञानगुरुकुल – JYA Commune initiatives.",
    ],
    conditionsTitle: null,
    conditions: null,
    lifetime:
      "Explore and participate in programmes across the JYA ecosystem at your convenience, with a 5% membership benefit on eligible offerings.",
    fee: "Membership Fee: ₹500 (one-time lifetime registration).",
    renewal:
      "Membership renewal or updates, wherever applicable, will be governed by JYA policies.",
    cta: "Become a शतायुस् World Life Member",
    ctaNote: "Lifetime membership with one-time registration.",
  },
  {
    id: "ayurx",
    no: "03",
    title: "GlobalAyurX Life Membership",
    tagline: "For Ayurveda Practitioners & JYA Ecosystem Leaders",
    badge: "10% Privilege",
    discountBadge: "10% Discount",
    priceDisplay: "₹5,000",
    priceSubtitle: "One-time lifetime registration: ₹5,000",
    fullPlanName: "GlobalAyurX Life Membership – ₹5,000",
    whoFor: [
      "Ayurveda Vaidyas and registered Ayurveda practitioners.",
      "Healthcare and wellness professionals.",
      "JYA Ecosystem Leaders.",
      "The identified 20 JYA Ecosystem Runners.",
      "Individuals actively contributing to the growth of the Ayurveda and holistic healthcare ecosystem.",
    ],
    benefitsTitle: "Membership Benefits",
    benefits: [
      "Lifetime membership with a one-time registration.",
      "10% discount on eligible programmes, services and products associated with the 120+ Days Online & Offline Academy.",
      "Access to special membership areas.",
      "Participation in regular, weekly and monthly programmes.",
      "Access to online and offline learning opportunities.",
      "Participation in residential and non-residential programmes.",
      "Access to JYA स्वज्ञानगुरुकुल – JYA Commune initiatives.",
      "Opportunities to engage with the wider GlobalAyurX ecosystem.",
    ],
    conditionsTitle: null,
    conditions: null,
    lifetime:
      "A dedicated membership for Ayurveda practitioners and ecosystem contributors to deepen their knowledge, participate in specialised programmes and strengthen their association with the JYA ecosystem.",
    fee: "Membership Fee: ₹5,000 (one-time lifetime registration).",
    renewal:
      "Membership renewal or updates, wherever applicable, will be governed by JYA policies.",
    cta: "Become a GlobalAyurX Life Member",
    ctaNote: "Dedicated to Vaidyas & Ecosystem Leaders.",
  },
  {
    id: "ecosphere",
    no: "04",
    title: "जैवमण्डल Ecosphere Life Membership",
    tagline: "Experience. Learn. Live. Transform.",
    badge: "20% Discount • Featured",
    discountBadge: "20% Discount",
    priceDisplay: "Free Registration",
    priceSubtitle: "Subject to entrance qualification",
    fullPlanName:
      "जैवमण्डल Ecosphere Life Membership – Free initial registration, subject to entrance qualification",
    academyPriceOriginal: "₹1,40,000",
    academyPriceDiscounted: "₹1,12,000",
    whoFor: [
      "Individuals seeking an immersive learning experience in Ayurveda, natural living, holistic wellness and traditional knowledge systems.",
      "This membership is designed for aspiring wellness practitioners, learners, knowledge seekers and individuals who wish to experience and understand sustainable, nature-connected living.",
    ],
    benefitsTitle: "Membership & Admission Benefits",
    benefits: [
      "Free initial membership registration.",
      "Complimentary entrance examination for JYA Commune.",
      "Qualification-based admission to the Gurukul.",
      "20% discount on the academy programme fee of ₹1,40,000.",
      "Discounted programme fee after qualification: ₹1,12,000.",
      "20% discount on eligible JYA programmes, services and products.",
      "Access to special membership areas.",
      "Participation in regular, weekly and monthly online and offline programmes.",
      "Access to residential and non-residential learning opportunities.",
      "Access to the JYA स्वज्ञानगुरुकुल – JYA Commune.",
    ],
    conditionsTitle: "Admission & Qualification Criteria",
    conditions: [
      "Admission is subject to the entrance examination, qualification criteria, availability of seats and JYA policies.",
      "Residential cohort limited strictly to 10 students per batch.",
    ],
    lifetime:
      "Experience an immersive approach to learning that combines traditional knowledge, practical exposure, structured courses and a closer connection with nature.",
    fee: "Academy Programme Fee: ₹1,40,000 (Discounted to ₹1,12,000 after qualification).",
    renewal:
      "Membership renewal or updates, wherever applicable, will be governed by JYA policies.",
    cta: "Apply for जैवमण्डल Ecosphere Life Membership",
    ctaNote: "Qualification-based Gurukul admission.",
  },
];

const comparisonColumns = [
  { key: "open", label: "JYA Open" },
  { key: "shatayus", label: "शतायुस्World" },
  { key: "ayurx", label: "GlobalAyurX" },
  { key: "ecosphere", label: "जैवमण्डलEcosphere", highlight: true },
];

const comparisonData = [
  {
    feature: "Open to all",
    open: "Yes",
    shatayus: "Yes",
    ayurx: "Specific eligibility",
    ecosphere: "Yes, subject to admission",
  },
  {
    feature: "Registration fee",
    open: "Free",
    shatayus: "₹500",
    ayurx: "₹5,000",
    ecosphere: "Free initial registration",
  },
  {
    feature: "Membership validity",
    open: "As per JYA policy",
    shatayus: "Lifetime",
    ayurx: "Lifetime",
    ecosphere: "As per JYA policy",
  },
  {
    feature: "Programme discounts",
    open: "None",
    shatayus: "5%",
    ayurx: "10%",
    ecosphere: "20%",
  },
  {
    feature: "Special area access",
    open: "No",
    shatayus: "Yes",
    ayurx: "Yes",
    ecosphere: "Yes",
  },
  {
    feature: "Weekly/monthly programmes",
    open: "General access",
    shatayus: "Yes",
    ayurx: "Yes",
    ecosphere: "Yes",
  },
  {
    feature: "Online & offline programmes",
    open: "General access",
    shatayus: "Yes",
    ayurx: "Yes",
    ecosphere: "Yes",
  },
  {
    feature: "Residential learning",
    open: "As per programme",
    shatayus: "Yes",
    ayurx: "Yes",
    ecosphere: "Yes",
  },
  {
    feature: "Academy admission",
    open: "No",
    shatayus: "As per eligibility",
    ayurx: "As per eligibility",
    ecosphere: "Entrance qualification required",
  },
  {
    feature: "Gurukul access",
    open: "General access",
    shatayus: "As per programme",
    ayurx: "As per programme",
    ecosphere: "Admission benefit",
  },
];

const cellClass = {
  open: "text-[#F9F6EE]/80",
  shatayus: "text-[#F9F6EE]/90 font-medium",
  ayurx: "text-[#F9F6EE]/90 font-medium",
  ecosphere: "text-[#C9A45C] font-semibold bg-[#C9A45C]/10",
};

const seasonalCalendar = [
  {
    index: "01",
    sanskrit: "स्वग्रीष्मजाविहार",
    english: "Summer Academy",
    dates: "16 February 2027 – 21 June 2027",
  },
  {
    index: "02",
    sanskrit: "स्ववर्ष्यजाविहार",
    english: "Rainy Academy",
    dates: "18 June 2027 – 23 October 2027",
  },
  {
    index: "03",
    sanskrit: "स्वहैमन्तजाविहार",
    english: "Winter Academy",
    dates: "23 October 2027 – 21 February 2028",
  },
];

const journeySteps = [
  {
    num: "01",
    title: "Choose Your Membership",
    description:
      "Explore the four membership options and select the one that best suits your interests and requirements.",
    icon: Compass,
  },
  {
    num: "02",
    title: "Complete Registration",
    description:
      "Fill in the membership enrolment form with your basic details.",
    icon: User,
  },
  {
    num: "03",
    title: "Complete the Membership Process",
    description:
      "Proceed with the applicable registration payment or entrance examination, depending on your selected membership.",
    icon: Briefcase,
  },
  {
    num: "04",
    title: "Get Connected",
    description:
      "Receive your membership confirmation and access the relevant JYA programmes, services and membership benefits.",
    icon: Layers,
  },
  {
    num: "05",
    title: "Explore the Ecosystem",
    description:
      "Discover, participate, learn and make the most of your JYA membership.",
    icon: ShieldCheck,
  },
];

const academyStats = [
  {
    value: 10,
    suffix: "",
    label: "Residential students per batch",
    sub: "Strictly limited cohort",
  },
  {
    value: 5,
    suffix: "",
    label: "Departments",
    sub: "Comprehensive traditional faculty",
  },
  {
    value: 21,
    suffix: "",
    label: "Expertise courses",
    sub: "Structured masterclasses",
  },
  {
    value: 120,
    suffix: "+",
    label: "Days",
    sub: "Immersive residential learning",
  },
];

const academyHighlights = [
  "Only 10 residential students per batch.",
  "5 departments.",
  "21 expertise courses.",
  "120+ days of structured learning and certification programmes.",
  "Residential and non-residential learning options.",
  "SwaGrama Stay – प्रत्यक्ष नैसर्गिक जीवनशैलीचा अनुभव (Experience a natural and sustainable way of living).",
];

const featuredStats = [
  { value: 10, suffix: "", label: "Students / Batch" },
  { value: 5, suffix: "", label: "Departments" },
  { value: 21, suffix: "", label: "Expertise Courses" },
  { value: 120, suffix: "+", label: "Days Immersion" },
];

const marqueeItems = [
  "Learn",
  "Experience",
  "Connect",
  "Grow",
  "JYA Open Membership",
  "शतायुस्World Life Membership",
  "GlobalAyurX Life Membership",
  "जैवमण्डल Ecosphere Life Membership",
];

const closingText =
  "JnanaYogAyu is more than a membership. It is an opportunity to connect with knowledge, experience holistic wellness, embrace technology and participate in a community that values healthier and more conscious living.";

function PriceValue({ value }) {
  const match = value.match(/^₹([\d,]+)$/);
  if (!match) return <>{value}</>;
  return (
    <Counter value={parseInt(match[1].replace(/,/g, ""), 10)} prefix="₹" />
  );
}

function ComparisonCell({ colKey, value }) {
  if (value === "Yes") {
    return (
      <span
        className={`font-semibold ${
          colKey === "open" ? "text-[#A5B99A]" : "text-[#C9A45C]"
        }`}
      >
        ✓ Yes
      </span>
    );
  }
  if (value === "No") {
    return <span className="text-white/40">— No</span>;
  }
  return <span>{value}</span>;
}

function SectionHeading({
  eyebrow,
  eyebrowClass,
  parts,
  titleClass,
  description,
  descriptionClass,
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
      <Reveal
        as="span"
        kind="scale"
        className={`inline-block rounded-full border px-4 py-1.5 font-serif text-[10px] font-bold uppercase tracking-[0.25em] shadow-sm sm:text-xs ${eyebrowClass}`}
      >
        {eyebrow}
      </Reveal>
      <SplitWords
        as="h2"
        parts={parts}
        className={`mt-4 font-serif text-2xl font-bold leading-tight tracking-tight sm:text-3xl lg:text-4xl ${titleClass}`}
      />
      <Reveal
        as="p"
        delay={0.25}
        className={`mt-4 text-sm sm:text-base md:text-lg ${descriptionClass}`}
      >
        {description}
      </Reveal>
    </div>
  );
}

export default function JYAMembershipPage() {
  const shouldReduce = useReducedMotion();
  const lenis = useLenis();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null);

  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress: pageProgress } = useScroll();
  const progressScale = useSpring(pageProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroTextY = useTransform(
    heroProgress,
    [0, 1],
    [0, shouldReduce ? 0 : -50],
  );
  const heroImageScale = useTransform(
    heroProgress,
    [0, 1],
    [1, shouldReduce ? 1 : 1.18],
  );
  const cueOpacity = useTransform(heroProgress, [0, 0.2], [1, 0]);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 55%"],
  });
  const timelineScale = useSpring(timelineProgress, {
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });
  const timelineHeadTop = useTransform(
    timelineScale,
    (v) => `${Math.min(100, Math.max(0, v * 100))}%`,
  );

  useEffect(() => {
    if (!lenis) return;
    if (isModalOpen) lenis.stop();
    else lenis.start();
  }, [lenis, isModalOpen]);

  const handleOpenModal = (planId = null) => {
    if (planId) {
      const match = memberships.find((m) => m.id === planId);
      if (match) {
        setSelectedPlanForModal(match.fullPlanName);
      }
    } else {
      setSelectedPlanForModal(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const scrollToPlans = () => {
    const el = document.getElementById("membership-plans");
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -24, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full overflow-x-clip bg-[#F9F6EE] font-sans text-[#103F2E] antialiased selection:bg-[#C9A45C] selection:text-[#0B3326]">
      <motion.div
        style={{ scaleX: progressScale }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#C9A45C] via-[#E7CB8A] to-[#C9A45C] shadow-[0_0_12px_rgba(201,164,92,0.8)]"
      />

      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-[#C9A45C]/30 bg-[#F9F6EE] pb-16 pt-10 sm:pb-20 sm:pt-14 lg:pb-28 lg:pt-20"
      >
        <Parallax
          range={90}
          className="pointer-events-none absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.3),transparent_68%)] sm:h-[460px] sm:w-[460px]"
        />
        <Parallax
          range={-70}
          className="pointer-events-none absolute -bottom-24 -left-24 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(16,63,46,0.14),transparent_68%)] sm:h-[460px] sm:w-[460px]"
        />

        <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              style={{ y: heroTextY }}
              className="space-y-5 text-left sm:space-y-6 lg:col-span-7"
            >
              <SplitWords
                as="h1"
                animateOnMount
                delay={0.1}
                parts={[
                  { text: "Be a Part of the" },
                  { text: "JYA Ecosystem", className: "gradient-heading" },
                ]}
                className="font-serif text-[2.2rem] font-bold leading-[1.1] tracking-tight text-[#103F2E] sm:text-5xl lg:text-6xl"
              />

              <motion.p
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
                className="font-serif text-lg font-medium italic text-[#C9A45C] sm:text-xl md:text-2xl"
              >
                Learn. Experience. Connect. Grow.
              </motion.p>

              <motion.div
                initial={
                  shouldReduce ? { opacity: 0 } : { opacity: 0, scaleX: 0 }
                }
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 1, delay: 0.7, ease }}
                className="my-4 flex max-w-sm origin-left items-center gap-4"
              >
                <div className="h-px flex-1 bg-gradient-to-r from-[#C9A45C] to-transparent" />
                <div className="h-2 w-2 rotate-45 border border-[#C9A45C] bg-[#C9A45C]/30" />
                <div className="h-px flex-1 bg-gradient-to-l from-[#C9A45C] to-transparent" />
              </motion.div>

              <div className="space-y-4 font-sans text-[15px] leading-relaxed text-[#103F2E]/85 sm:text-base lg:text-lg">
                {[
                  "JnanaYogAyu (JYA) brings together health, wellness, Ayurveda, knowledge, technology and conscious living through an integrated ecosystem.",
                  "JYA Memberships offer different ways to participate in this ecosystem — whether you are an individual exploring holistic wellness, an Ayurveda practitioner, a healthcare professional, a learner or someone looking to experience a more natural and sustainable way of life.",
                  "Choose a membership that aligns with your interests and aspirations. Access programmes, learning opportunities, services, products and a growing community committed to healthier and more conscious living.",
                ].map((paragraph, i) => (
                  <motion.p
                    key={i}
                    initial={
                      shouldReduce ? { opacity: 0 } : { opacity: 0, y: 22 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 + i * 0.12, ease }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease }}
                className="flex flex-col gap-3 pt-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:pt-4"
              >
                <Magnetic className="w-full sm:w-auto">
                  <CommonButton
                    label="Become a Member"
                    onClick={() => handleOpenModal()}
                    icon={<ArrowRight className="h-4 w-4 text-[#C9A45C]" />}
                    className="!h-12 !w-full !px-7 sm:!w-auto bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/50 !rounded-xl font-medium tracking-wide shadow-lg"
                  />
                </Magnetic>
                <Magnetic className="w-full sm:w-auto">
                  <CommonButton
                    label="Explore Memberships"
                    onClick={scrollToPlans}
                    className="!h-12 !w-full !px-7 sm:!w-auto bg-white/70 hover:bg-white text-[#103F2E] border border-[#103F2E]/20 !rounded-xl font-medium tracking-wide shadow-sm"
                  />
                </Magnetic>
              </motion.div>
            </motion.div>

            <div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:max-w-none">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <Orbit
                  duration={60}
                  className="aspect-square h-full shrink-0 rounded-full border border-dashed border-[#C9A45C]/60 sm:h-[108%]"
                />
              </div>

              <Parallax range={36} className="relative z-10">
                <motion.div
                  animate={shouldReduce ? undefined : { y: [0, -10, 0] }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                >
                  <motion.div
                    initial={
                      shouldReduce
                        ? { opacity: 0 }
                        : { opacity: 0, scale: 0.92, y: 30 }
                    }
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease }}
                    className="rounded-3xl border-2 border-[#C9A45C]/40 bg-white p-2.5 shadow-2xl sm:p-3"
                  >
                    <motion.div
                      initial={
                        shouldReduce
                          ? { opacity: 0 }
                          : { clipPath: "inset(16% 16% 16% 16% round 28px)" }
                      }
                      animate={
                        shouldReduce
                          ? { opacity: 1 }
                          : { clipPath: "inset(0% 0% 0% 0% round 16px)" }
                      }
                      transition={{ duration: 1.2, delay: 0.4, ease }}
                      className="relative h-[320px] overflow-hidden rounded-2xl sm:h-[420px] lg:h-[500px] xl:h-[540px]"
                    >
                      <motion.div
                        style={{ scale: heroImageScale }}
                        className="h-full w-full"
                      >
                        <motion.img
                          initial={shouldReduce ? undefined : { scale: 1.3 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 1.6, delay: 0.4, ease }}
                          src={heroLessonImage}
                          alt="Traditional Ayurveda Gurukul Lesson"
                          className="h-full w-full object-cover"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3326]/90 via-[#0B3326]/20 to-transparent" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </Parallax>
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ opacity: cueOpacity }}
          className="absolute bottom-5 left-1/2 z-10 -ml-3 hidden h-10 w-6 justify-center rounded-full border border-[#103F2E]/30 p-1.5 lg:flex"
        >
          <motion.span
            animate={
              shouldReduce ? undefined : { y: [0, 14, 0], opacity: [1, 0.2, 1] }
            }
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]"
          />
        </motion.div>
      </section>

      <Marquee
        items={marqueeItems}
        itemClassName="font-serif text-base italic text-[#E9DFC6] sm:text-xl"
        className="border-b border-[#C9A45C]/40 bg-[#0B3326] py-3.5 sm:py-5"
      />

      <section
        id="membership-plans"
        className="relative overflow-hidden border-b border-[#C9A45C]/30 bg-gradient-to-b from-[#F9F6EE] via-[#EDE5D5]/40 to-[#F9F6EE] py-14 md:py-20"
      >
        <Parallax
          range={60}
          className="pointer-events-none absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.18),transparent_68%)]"
        />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Choose Your Tier"
            eyebrowClass="border-[#C9A45C]/40 bg-white/80 text-[#103F2E]"
            parts={[
              { text: "CHOOSE YOUR" },
              { text: "MEMBERSHIP", className: "gradient-heading" },
            ]}
            titleClass="text-[#103F2E]"
            description="Explore four curated pathways to immerse in the JYA wellness, healthcare, and educational ecosystem."
            descriptionClass="text-[#103F2E]/80"
          />

          <div className="mb-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:mb-12 lg:grid-cols-3 lg:gap-8">
            {memberships.slice(0, 3).map((m, idx) => (
              <Reveal
                key={m.id}
                kind="up"
                duration={0.8}
                delay={(idx % 3) * 0.12}
                className={`h-full ${
                  idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <TiltCard className="group flex h-full flex-col justify-between rounded-3xl border border-[#C9A45C]/40 bg-white p-6 shadow-lg transition-shadow duration-300 hover:border-[#C9A45C] hover:shadow-2xl sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-3 border-b border-[#EDE5D5] pb-5">
                      <span className="font-serif text-4xl font-light text-[#C9A45C]">
                        {m.no}
                      </span>
                      <span className="rounded-full border border-[#103F2E]/15 bg-[#103F2E]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#103F2E] sm:text-xs">
                        {m.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 font-serif text-xl font-bold leading-tight text-[#103F2E] sm:text-2xl">
                      {m.title}
                    </h3>
                    <p className="mt-2 font-serif text-sm italic text-[#C9A45C] md:min-h-[44px]">
                      {m.tagline}
                    </p>

                    <div className="mt-6 rounded-2xl border border-[#C9A45C]/30 bg-[#F9F6EE] p-4">
                      <div className="font-serif text-2xl font-bold text-[#103F2E] sm:text-3xl">
                        <PriceValue value={m.priceDisplay} />
                      </div>
                      <div className="mt-1 text-xs text-[#103F2E]/70">
                        {m.priceSubtitle}
                      </div>
                    </div>

                    <div className="mt-6 border-t border-[#EDE5D5] pt-5">
                      <h4 className="mb-2 font-serif text-xs font-bold uppercase tracking-widest text-[#103F2E]">
                        Who is it for?
                      </h4>
                      <p className="text-xs leading-relaxed text-[#103F2E]/80 sm:text-sm">
                        {m.whoFor[0]}
                      </p>
                    </div>

                    <Stagger
                      stagger={0.08}
                      delay={0.15}
                      className="mt-6 space-y-2.5 border-t border-[#EDE5D5] pt-5"
                    >
                      <h4 className="mb-2 font-serif text-xs font-bold uppercase tracking-widest text-[#103F2E]">
                        {m.benefitsTitle}
                      </h4>
                      {m.benefits.slice(0, 4).map((b, bIdx) => (
                        <Item
                          key={bIdx}
                          kind="left"
                          duration={0.5}
                          className="flex items-start gap-2.5 text-xs text-[#103F2E]/85 sm:text-sm"
                        >
                          <AnimatedCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A45C]" />
                          <span className="line-clamp-2">{b}</span>
                        </Item>
                      ))}
                    </Stagger>
                  </div>

                  <div className="mt-8 space-y-2.5 border-t border-[#EDE5D5] pt-6">
                    <Magnetic strength={0.15} className="w-full">
                      <CommonButton
                        label={m.cta}
                        fullWidth
                        onClick={() => handleOpenModal(m.id)}
                        icon={<ArrowRight className="h-4 w-4 text-[#C9A45C]" />}
                        className="!h-11 !w-full !px-5 bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/40 !rounded-xl font-medium tracking-wide shadow-sm"
                      />
                    </Magnetic>
                    {m.ctaNote && (
                      <p className="text-center text-xs italic text-[#103F2E]/60">
                        {m.ctaNote}
                      </p>
                    )}
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          {(() => {
            const m = memberships[3];
            return (
              <Reveal kind="scale" duration={0.9}>
                <article className="relative overflow-hidden rounded-3xl border-2 border-[#C9A45C] bg-gradient-to-br from-[#103F2E] via-[#0B3326] to-[#103F2E] p-6 text-[#F9F6EE] shadow-2xl sm:p-8 lg:p-12">
                  <Parallax
                    range={50}
                    className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.3),transparent_68%)]"
                  />
                  <Orbit
                    duration={80}
                    className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full border border-dashed border-[#C9A45C]/30 sm:h-80 sm:w-80"
                  />

                  <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="space-y-5 text-left sm:space-y-6 lg:col-span-7">
                      <SplitWords
                        as="h3"
                        parts={[{ text: m.title }]}
                        className="font-serif text-2xl font-bold leading-tight text-[#F9F6EE] sm:text-3xl lg:text-4xl"
                      />
                      <Reveal
                        as="p"
                        kind="left"
                        delay={0.15}
                        className="font-serif text-lg italic text-[#C9A45C] sm:text-xl md:text-2xl"
                      >
                        {m.tagline}
                      </Reveal>
                      <Reveal
                        as="p"
                        kind="left"
                        delay={0.25}
                        className="font-sans text-xs font-semibold uppercase tracking-wider text-[#A5B99A] sm:text-sm"
                      >
                        120+ Days Residential Academy &amp; Certification
                        Programmes
                      </Reveal>

                      <Reveal
                        delay={0.3}
                        className="space-y-3 text-sm leading-relaxed text-[#F9F6EE]/90"
                      >
                        <p>{m.whoFor[0]}</p>
                      </Reveal>

                      <Reveal kind="up" delay={0.35} className="max-w-xl">
                        <div className="relative overflow-hidden rounded-2xl border border-[#C9A45C]/60 bg-gradient-to-br from-[#C9A45C]/15 via-white/5 to-transparent p-5 shadow-lg sm:p-6">
                          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.28),transparent_70%)]" />
                          <div className="relative flex items-start gap-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#C9A45C]/60 bg-[#C9A45C]/15 sm:h-12 sm:w-12">
                              <Leaf className="h-5 w-5 text-[#C9A45C] sm:h-6 sm:w-6" />
                            </div>
                            <div className="min-w-0">
                            
                              <p className="text-sm font-medium leading-relaxed text-[#F9F6EE] sm:text-base">
                                {m.whoFor[1]}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Reveal>

                      <Reveal
                        kind="scale"
                        delay={0.4}
                        className="max-w-xl rounded-2xl border border-[#C9A45C]/40 bg-black/30 p-5 sm:p-6"
                      >
                        <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#F9F6EE]/70">
                          Academy Programme Fee Breakdown
                        </div>
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-serif text-xl text-white/50 line-through sm:text-2xl">
                            ₹1,40,000
                          </span>
                          <span className="text-sm font-semibold text-[#C9A45C]">
                            20% Discount with Membership
                          </span>
                        </div>
                        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-sm text-[#F9F6EE]">
                            Discounted Programme Fee:
                          </span>
                          <span className="font-serif text-3xl font-bold text-[#C9A45C] sm:text-4xl">
                            <Counter value={112000} prefix="₹" />
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-[#A5B99A]">
                          *Free initial membership registration. Admission
                          subject to entrance qualification.
                        </div>
                      </Reveal>

                    
                    </div>

                    <Reveal
                      kind="right"
                      delay={0.2}
                      duration={0.9}
                      className="space-y-6 rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6 lg:col-span-5 lg:p-8"
                    >
                      <h4 className="border-b border-white/10 pb-3 font-serif text-lg font-bold text-[#C9A45C]">
                        Membership &amp; Admission Benefits
                      </h4>
                      <Stagger stagger={0.08} delay={0.2} className="space-y-3">
                        {m.benefits.slice(0, 5).map((b, bIdx) => (
                          <Item
                            key={bIdx}
                            kind="right"
                            duration={0.5}
                            className="flex items-start gap-3 text-xs text-[#F9F6EE]/90 sm:text-sm"
                          >
                            <AnimatedCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A45C]" />
                            <span>{b}</span>
                          </Item>
                        ))}
                      </Stagger>

                      <Stagger
                        stagger={0.1}
                        delay={0.2}
                        className="grid grid-cols-2 gap-3 border-t border-white/10 pt-4"
                      >
                        {featuredStats.map((fs) => (
                          <Item
                            key={fs.label}
                            kind="scale"
                            duration={0.55}
                            className="rounded-xl border border-white/10 bg-white/5 p-3 text-center"
                          >
                            <div className="font-serif text-2xl font-bold text-[#C9A45C]">
                              <Counter value={fs.value} suffix={fs.suffix} />
                            </div>
                            <div className="mt-0.5 text-[11px] text-[#F9F6EE]/75">
                              {fs.label}
                            </div>
                          </Item>
                        ))}
                      </Stagger>
                    </Reveal>
                  </div>
                    <div className="w-full flex justify-center mt-5">
                        <Reveal delay={0.45}>
                        <Magnetic className="inline-block w-full ">
                          <CommonButton
                            label={m.cta}
                            onClick={() => handleOpenModal(m.id)}
                            icon={
                              <ArrowRight className="h-4 w-4 text-[#0B3326]" />
                            }
                            className="!h-12 !w-full !px-8 sm:!w-auto bg-[#C9A45C] hover:bg-[#B89248] text-[#0B3326] font-bold !rounded-xl shadow-lg tracking-wide"
                          />
                        </Magnetic>
                      </Reveal>
                    </div>
                </article>
              </Reveal>
            );
          })()}
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[#C9A45C]/30 bg-[#F9F6EE] py-14 text-[#103F2E] md:py-20">
        <Parallax
          range={-50}
          className="pointer-events-none absolute -right-32 top-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.18),transparent_68%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gurukul Immersion"
            eyebrowClass="border-[#C9A45C]/40 bg-white text-[#103F2E]"
            parts={[
              {
                text: "120+ Days Residential Academy & Certification Programmes",
              },
            ]}
            titleClass="text-[#103F2E]"
            description="प्रत्यक्ष नैसर्गिक जीवनशैलीचा अनुभव — Experience a natural and sustainable way of living."
            descriptionClass="font-serif italic text-[#103F2E]/80"
          />

          <Stagger
            stagger={0.1}
            className="mb-14 grid grid-cols-2 gap-3 sm:gap-6 lg:mb-16 lg:grid-cols-4"
          >
            {academyStats.map((st) => (
              <Item
                key={st.label}
                kind="scale"
                duration={0.6}
                className="rounded-2xl border border-[#C9A45C]/30 bg-white p-4 text-center shadow-md transition-colors hover:border-[#C9A45C] sm:p-6 lg:p-8"
              >
                <div className="font-serif text-3xl font-bold text-[#103F2E] sm:text-4xl lg:text-5xl">
                  <Counter value={st.value} suffix={st.suffix} />
                </div>
                <div className="mt-2 font-sans text-xs font-semibold text-[#103F2E] sm:text-sm lg:text-base">
                  {st.label}
                </div>
                <div className="mt-1 text-[11px] text-[#103F2E]/60 sm:text-xs">
                  {st.sub}
                </div>
              </Item>
            ))}
          </Stagger>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="space-y-5 text-left lg:col-span-6">
              <Reveal
                as="h3"
                kind="left"
                className="font-serif text-xl font-bold text-[#103F2E] sm:text-2xl lg:text-3xl"
              >
                Academy Highlights
              </Reveal>
              <Reveal
                as="p"
                kind="left"
                delay={0.1}
                className="font-sans text-sm leading-relaxed text-[#103F2E]/80 sm:text-base"
              >
                The जैवमण्डलEcosphere Academy offers an authentic Gurukul
                atmosphere located at SwaGrama. Students engage in practical
                exposure, traditional herbal preparation, pulse diagnosis,
                dinacharya routines, and ecological living.
              </Reveal>
              <Stagger stagger={0.08} delay={0.15} className="space-y-3">
                {academyHighlights.map((highlight, hIdx) => (
                  <Item
                    key={hIdx}
                    kind="left"
                    duration={0.55}
                    className="flex items-start gap-3 text-sm text-[#103F2E]/90"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C9A45C]" />
                    <span>{highlight}</span>
                  </Item>
                ))}
              </Stagger>
            </div>

            <Reveal kind="right" duration={0.9} className="lg:col-span-6">
              <div className="space-y-6 rounded-3xl border border-[#C9A45C]/40 bg-white p-5 shadow-xl sm:p-8">
                <div className="border-b border-[#EDE5D5] pb-4">
                  <span className="font-serif text-xs font-bold uppercase tracking-widest text-[#C9A45C]">
                    Schedule
                  </span>
                  <h4 className="mt-1 font-serif text-xl font-bold text-[#103F2E] sm:text-2xl">
                    Seasonal Academy Calendar – 2027–28
                  </h4>
                </div>

                <Stagger
                  stagger={0.12}
                  delay={0.2}
                  className="space-y-3 sm:space-y-4"
                >
                  {seasonalCalendar.map((season) => (
                    <Item
                      key={season.index}
                      kind="up"
                      duration={0.6}
                      whileHover={{ x: 6, transition: { duration: 0.25 } }}
                      className="flex flex-col justify-between gap-3 rounded-xl border border-[#C9A45C]/30 bg-[#F9F6EE] p-4 sm:flex-row sm:items-center"
                    >
                      <div className="min-w-0">
                        <div className="font-serif text-base font-bold text-[#103F2E] sm:text-lg">
                          {season.index}. {season.sanskrit}
                        </div>
                        <div className="text-xs font-semibold text-[#103F2E]/70">
                          {season.english}
                        </div>
                      </div>
                      <div className="shrink-0 self-start rounded-lg border border-[#C9A45C]/30 bg-white px-3 py-1.5 font-serif text-xs font-bold text-[#C9A45C] sm:self-auto">
                        {season.dates}
                      </div>
                    </Item>
                  ))}
                </Stagger>

                <div className="pt-2 text-center">
                  <Magnetic strength={0.12} className="w-full">
                    <CommonButton
                      label="Apply for जैवमण्डलEcosphere Life Membership"
                      fullWidth
                      onClick={() => handleOpenModal("ecosphere")}
                      className="!h-11 !w-full !px-5 bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/40 !rounded-xl font-medium tracking-wide shadow-md justify-center"
                    />
                  </Magnetic>
                  <p className="mt-2 text-[11px] italic text-[#103F2E]/60">
                    Admission is subject to the entrance examination,
                    qualification criteria, availability of seats and JYA
                    policies.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3326] via-[#103F2E] to-[#0B3326] py-14 text-[#F9F6EE] md:py-20">
        <Parallax
          range={60}
          className="pointer-events-none absolute -left-24 top-20 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.14),transparent_68%)]"
        />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Feature Matrix"
            eyebrowClass="border-[#C9A45C]/30 bg-white/5 text-[#C9A45C]"
            parts={[{ text: "FIND THE MEMBERSHIP THAT SUITS YOU" }]}
            titleClass="text-[#F9F6EE]"
            description="Compare all four membership offerings across 10 vital criteria."
            descriptionClass="text-[#F9F6EE]/80"
          />

          <Reveal
            kind="up"
            duration={0.9}
            className="hidden overflow-hidden rounded-xl border border-[#C9A45C]/40 bg-[#0B3326] shadow-2xl lg:block"
          >
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#C9A45C]/40 bg-black/40">
                  <th className="w-1/4 p-5 font-serif text-base font-bold text-[#C9A45C]">
                    Benefits &amp; Criteria
                  </th>
                  <th className="w-[18.75%] p-5 text-center font-serif text-sm font-bold text-[#F9F6EE]">
                    JYA Open
                  </th>
                  <th className="w-[18.75%] p-5 text-center font-serif text-sm font-bold text-[#C9A45C]">
                    शतायुस्World
                  </th>
                  <th className="w-[18.75%] p-5 text-center font-serif text-sm font-bold text-[#C9A45C]">
                    GlobalAyurX
                  </th>
                  <th className="w-[18.75%] bg-[#C9A45C]/20 p-5 text-center font-serif text-sm font-bold text-[#F9F6EE]">
                    जैवमण्डलEcosphere
                  </th>
                </tr>
              </thead>
              <Stagger
                as="tbody"
                stagger={0.05}
                className="divide-y divide-[#C9A45C]/20 text-sm"
              >
                {comparisonData.map((row) => (
                  <Item
                    as="tr"
                    key={row.feature}
                    kind="left"
                    duration={0.5}
                    className="transition-colors hover:bg-white/5"
                  >
                    <td className="border-r border-[#C9A45C]/20 p-5 font-semibold text-[#F9F6EE]">
                      {row.feature}
                    </td>
                    {comparisonColumns.map((col) => (
                      <td
                        key={col.key}
                        className={`p-5 text-center ${cellClass[col.key]} ${
                          col.key !== "ecosphere"
                            ? "border-r border-[#C9A45C]/20"
                            : ""
                        }`}
                      >
                        <ComparisonCell colKey={col.key} value={row[col.key]} />
                      </td>
                    ))}
                  </Item>
                ))}
              </Stagger>
            </table>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
            {comparisonData.map((row, rIdx) => (
              <Reveal
                key={row.feature}
                kind="up"
                delay={(rIdx % 2) * 0.08}
                duration={0.6}
                className="rounded-2xl border border-[#C9A45C]/30 bg-white/5 p-4 sm:p-5"
              >
                <h3 className="mb-3 border-b border-[#C9A45C]/20 pb-2 font-serif text-base font-bold text-[#C9A45C]">
                  {row.feature}
                </h3>
                <dl className="space-y-2 text-sm">
                  {comparisonColumns.map((col) => (
                    <div
                      key={col.key}
                      className={`flex items-start justify-between gap-4 ${
                        col.highlight
                          ? "-mx-2 rounded-lg bg-[#C9A45C]/10 px-2 py-1.5"
                          : ""
                      }`}
                    >
                      <dt className="shrink-0 text-xs text-[#F9F6EE]/60">
                        {col.label}
                      </dt>
                      <dd className="text-right text-[#F9F6EE]/90">
                        <ComparisonCell colKey={col.key} value={row[col.key]} />
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </div>

          <Reveal
            delay={0.1}
            className="mx-auto mt-8 max-w-4xl rounded-2xl border border-white/10 bg-white/5 p-5 text-center sm:p-6"
          >
            <p className="text-xs leading-relaxed text-[#F9F6EE]/75">
              Discounts are applicable to eligible programmes, services and
              products as specified under each membership. Specific programme
              eligibility, exclusions and access conditions will be governed by
              JYA policies.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[#C9A45C]/30 bg-[#F9F6EE] py-14 text-[#103F2E] md:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TIMELINE"
            eyebrowClass="border-[#C9A45C]/40 bg-white text-[#C9A45C]"
            parts={[{ text: "HOW TO BECOME A JYA MEMBER" }]}
            titleClass="text-[#103F2E]"
            description="Becoming a JYA member is an elegant five-step pathway to holistic learning and community living."
            descriptionClass="text-[#103F2E]/80"
          />

          <div ref={timelineRef} className="relative mx-auto mt-10 max-w-5xl">
            <div className="absolute bottom-4 left-6 top-4 -ml-px w-[2px] bg-[#C9A45C]/20 md:left-1/2" />
            <motion.div
              style={{ scaleY: shouldReduce ? 1 : timelineScale }}
              className="absolute bottom-4 left-6 top-4 -ml-px w-[2px] origin-top bg-gradient-to-b from-[#C9A45C] via-[#C9A45C] to-[#103F2E] md:left-1/2"
            />
            {!shouldReduce && (
              <div className="pointer-events-none absolute inset-x-0 bottom-4 top-4">
                <motion.div
                  style={{ top: timelineHeadTop }}
                  className="absolute left-6 -ml-[5px] -mt-[5px] h-[10px] w-[10px] rounded-full bg-[#C9A45C] shadow-[0_0_14px_3px_rgba(201,164,92,0.7)] md:left-1/2"
                />
              </div>
            )}

            <div className="space-y-10 md:space-y-16">
              {journeySteps.map((st, index) => {
                const isRight = index % 2 === 0;
                const IconComp = st.icon;
                const card = (
                  <Reveal kind={isRight ? "right" : "left"} duration={0.7}>
                    <TiltCard
                      max={4}
                      className={`group rounded-2xl border border-[#C9A45C]/35 bg-white p-5 text-left shadow-sm transition-shadow duration-300 hover:shadow-xl sm:rounded-3xl sm:p-8 ${
                        isRight ? "md:ml-6" : "md:mr-6"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-serif text-xs font-bold uppercase tracking-widest text-[#C9A45C]">
                          {st.num}
                        </span>
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#F9F6EE] text-[#103F2E]">
                          <IconComp className="h-3.5 w-3.5 text-[#C9A45C]" />
                        </div>
                      </div>

                      <h3 className="font-serif text-lg font-bold leading-snug text-[#103F2E] sm:text-xl md:text-2xl">
                        {st.title}
                      </h3>
                      <p className="mt-2.5 font-sans text-xs leading-relaxed text-[#103F2E]/80 sm:text-sm">
                        {st.description}
                      </p>

                      <CommonButton
                        label="Learn More"
                        onClick={() => handleOpenModal()}
                        icon={
                          <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                        }
                        className="mt-5 !h-8 !px-4 bg-[#F9F6EE] hover:bg-[#103F2E] text-[#103F2E] hover:text-[#F9F6EE] border border-[#103F2E]/20 hover:border-[#103F2E] !rounded-full text-xs font-semibold shadow-none transition-all"
                      />
                    </TiltCard>
                  </Reveal>
                );

                return (
                  <div
                    key={st.num}
                    className="relative flex flex-col items-center md:flex-row"
                  >
                    <div className="absolute left-6 top-8 z-20 -ml-3.5 md:left-1/2">
                      <motion.div
                        initial={
                          shouldReduce
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.3 }
                        }
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.5, ease }}
                        className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#103F2E] bg-[#F9F6EE] shadow-md"
                      >
                        {!shouldReduce && (
                          <motion.span
                            aria-hidden="true"
                            animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                            transition={{
                              duration: 2,
                              ease: "easeOut",
                              repeat: Infinity,
                            }}
                            className="absolute inset-0 rounded-full border border-[#C9A45C]"
                          />
                        )}
                        <div className="h-2.5 w-2.5 rounded-full bg-[#C9A45C]" />
                      </motion.div>
                    </div>

                    <div className="grid w-full grid-cols-1 gap-8 pl-14 md:grid-cols-2 md:gap-16 md:pl-0">
                      <div className={!isRight ? "block" : "hidden md:block"}>
                        {!isRight && card}
                      </div>
                      <div className={isRight ? "block" : "hidden md:block"}>
                        {isRight && card}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Reveal kind="scale" className="mt-14 text-center sm:mt-16">
            <Magnetic className="mx-auto inline-block w-full sm:w-auto">
              <CommonButton
                label="Start Your Membership Journey"
                onClick={() => handleOpenModal()}
                icon={<ArrowRight className="h-5 w-5 text-[#C9A45C]" />}
                className="!h-12 !w-full !px-9 sm:!w-auto bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/50 !rounded-2xl font-semibold tracking-wide shadow-xl text-base mx-auto"
              />
            </Magnetic>
            <p className="mt-3 text-xs font-medium text-[#103F2E]/70">
              Opens our multi-step membership enrolment portal.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3326] via-[#103F2E] to-[#0B3326] py-16 text-center text-[#F9F6EE] md:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,164,92,0.14)_0%,transparent_70%)]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -ml-[180px] -mt-[180px] h-[360px] w-[360px] md:-ml-[310px] md:-mt-[310px] md:h-[620px] md:w-[620px]">
          <Orbit
            duration={90}
            className="h-full w-full rounded-full border border-dashed border-[#C9A45C]/25"
          />
        </div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 -ml-[130px] -mt-[130px] h-[260px] w-[260px] md:-ml-[230px] md:-mt-[230px] md:h-[460px] md:w-[460px]">
          <Orbit
            reverse
            duration={70}
            className="h-full w-full rounded-full border border-[#C9A45C]/20"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <SplitWords
            as="h2"
            parts={[
              { text: "Be Part of" },
              { text: "Something Bigger", className: "gradient-heading-dark" },
            ]}
            className="font-serif text-3xl font-bold tracking-tight text-[#F9F6EE] sm:text-4xl lg:text-5xl mb-1"
          />

          <Reveal
            kind="fade"
            delay={0.2}
            className="mx-auto my-8 flex max-w-xs items-center justify-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A45C]" />
            <div className="h-2.5 w-2.5 rotate-45 border border-[#C9A45C] bg-[#C9A45C]/30" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A45C]" />
          </Reveal>

          <ScrubWords
            text={closingText}
            className="mx-auto max-w-3xl font-sans text-lg leading-relaxed text-[#F9F6EE] sm:text-xl md:text-2xl"
          />

          <Reveal
            as="p"
            delay={0.15}
            className="mt-8 font-serif text-lg font-medium italic text-[#C9A45C] sm:text-2xl md:text-3xl"
          >
            Join the JYA Ecosystem. Begin Your Journey Today.
          </Reveal>

          <Reveal
            kind="scale"
            delay={0.25}
            className="mt-10 flex justify-center sm:mt-12"
          >
            <Magnetic className="w-full sm:w-auto">
              <CommonButton
                label="Join the JYA Community"
                onClick={() => handleOpenModal()}
                icon={<ArrowRight className="h-4 w-4 text-[#0B3326]" />}
                className="!h-12 !w-full !px-9 sm:!w-auto bg-[#C9A45C] hover:bg-[#B89248] text-[#0B3326] font-bold !rounded-2xl shadow-xl tracking-wide text-base mx-auto"
              />
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {isModalOpen && (
        <MembershipModal
          open={isModalOpen}
          onClose={handleCloseModal}
          initialMembership={selectedPlanForModal}
        />
      )}
    </div>
  );
}