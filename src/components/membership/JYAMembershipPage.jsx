import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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
  Sun,
  CloudRain,
  Snowflake,
  CheckCircle2,
} from "lucide-react";
import { FiChevronRight } from "react-icons/fi";
import { PiFlowerLotus } from "react-icons/pi";

import heroLessonImage from "./assets/membership-hero.webp";
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
    title: "शतायुस् World Life Membership",
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
  { key: "shatayus", label: "शतायुस् World" },
  { key: "ayurx", label: "GlobalAyurX" },
  { key: "ecosphere", label: "जैवमण्डल Ecosphere", highlight: true },
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
    id: "summer",
    index: "01",
    sanskrit: "स्वग्रीष्मजाविहार",
    english: "Summer Academy",
    dates: "16 February 2027 – 21 June 2027",
  },
  {
    id: "rainy",
    index: "02",
    sanskrit: "स्ववर्ष्यजाविहार",
    english: "Rainy Academy",
    dates: "18 June 2027 – 23 October 2027",
  },
  {
    id: "winter",
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
  "शतायुस् World Life Membership",
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

function SectionHeading({ parts, titleClass, description, descriptionClass }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-10">
      <SplitWords
        as="h2"
        parts={parts}
        className={`mt-4 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight ${titleClass}`}
      />
      <Reveal
        as="p"
        delay={0.25}
        className={`mt-4 font-sans text-sm sm:text-base md:text-lg ${descriptionClass}`}
      >
        {description}
      </Reveal>
    </div>
  );
}

export default function JYAMembershipPage() {
  const shouldReduce = useReducedMotion();
  const lenis = useLenis();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const [selectedSeason, setSelectedSeason] = useState(
    () => queryParams.get("season") || null,
  );
  const [selectedPlan, setSelectedPlan] = useState(
    () => queryParams.get("plan") || null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const seasonFromUrl = params.get("season");
    const planFromUrl = params.get("plan");
    if (seasonFromUrl) setSelectedSeason(seasonFromUrl);
    if (planFromUrl) setSelectedPlan(planFromUrl);
  }, [search]);

  const heroRef = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress: pageProgress } = useScroll();

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(
    heroProgress,
    [0, 1],
    ["0%", shouldReduce ? "0%" : "20%"],
  );
  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);

  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const timelineHeadTop = useTransform(
    timelineProgress,
    (v) => `${Math.min(100, Math.max(0, v * 100))}%`,
  );

  useEffect(() => {
    if (!lenis) return;
    if (isModalOpen) lenis.stop();
    else lenis.start();
  }, [lenis, isModalOpen]);

  const scrollToElement = (elementId, offset = -100) => {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (lenis) {
      lenis.resize();
      lenis.scrollTo(el, { offset, duration: 1.3, force: true });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleSelectPlan = (planId, shouldScroll = false) => {
    setSelectedPlan(planId);
    if (shouldScroll) {
      scrollToElement(`membership-${planId}`, -100);
    }
  };

  const handleOpenModal = (planId = null) => {
    const activeId = planId || selectedPlan;
    if (activeId) {
      setSelectedPlan(activeId);
      setSelectedPlanForModal(activeId);
    } else {
      setSelectedPlanForModal(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const scrollToPlans = () => {
    scrollToElement("membership-plans", -24);
  };

  return (
    <div className="w-full overflow-x-clip bg-[#F9F6EE] font-sans text-[#103F2E] antialiased selection:bg-[#C9A45C] selection:text-[#0B3326]">
      <motion.div
        style={{ scaleX: pageProgress }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left will-change-transform bg-gradient-to-r from-[#C9A45C] via-[#E7CB8A] to-[#C9A45C] shadow-[0_0_12px_rgba(201,164,92,0.8)]"
      />

      <section
        ref={heroRef}
        className="relative w-full min-h-[760px] lg:min-h-[820px] 2xl:min-h-[92dvh] py-16 lg:py-20 flex items-center overflow-hidden bg-[#FFFDF9]"
      >
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 z-0 will-change-transform"
        >
          <img
            src={heroLessonImage}
            alt="JnanaYogAyu Ayurvedic sanctuary courtyard gathering of practitioners and learners"
            width={1920}
            height={1080}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,249,236,0.9)_0%,rgba(255,249,236,0.8)_32%,rgba(255,249,236,0.42)_50%,rgba(255,249,236,0)_66%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082218]/20 via-transparent to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full px-6 md:px-12 lg:px-[6vw]"
        >
          <motion.div
            initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="relative lg:max-w-[48vw]"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-[46px] h-px bg-[#D5A354]" />
              <span className="font-sans text-[11px] xl:text-xs font-bold tracking-[0.3em] text-[#173826] uppercase">
                Learn. Experience. Connect. Grow.
              </span>
            </div>

            <h1 className="font-serif font-medium text-[clamp(40px,3.6vw,76px)] leading-[1.1] tracking-[-0.03em] text-[#103F2A] mb-7">
              <span className="block sm:whitespace-nowrap">
                Be a Part of the{" "}
              </span>
              <span className="block">
                <span className="gradient-heading italic">JYA Ecosystem</span>
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-7">
              <div className="w-[clamp(110px,12vw,230px)] h-px bg-gradient-to-r from-transparent to-[#D5A354]/80" />
              <PiFlowerLotus className="w-6 h-6 text-[#D5A354] shrink-0" />
              <div className="w-[clamp(110px,12vw,230px)] h-px bg-gradient-to-l from-transparent to-[#D5A354]/80" />
            </div>

            <div className="space-y-3.5 font-sans text-[15px] sm:text-base xl:text-[17px] leading-[1.6] text-[#143B27] max-w-[620px] mb-8 font-normal">
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

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <motion.button
                type="button"
                onClick={() => handleOpenModal()}
                whileHover={
                  shouldReduce
                    ? undefined
                    : { scale: 1.025, backgroundColor: "#18583B" }
                }
                whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="min-w-[205px] h-[56px] px-7 flex items-center justify-center gap-3 rounded-[12px] bg-[#0F4A32] text-white font-sans font-semibold text-[15px] tracking-wide shadow-[0_8px_20px_rgba(16,67,45,0.28)] cursor-pointer"
              >
                Become a Member
                <FiChevronRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                type="button"
                onClick={scrollToPlans}
                whileHover={
                  shouldReduce
                    ? undefined
                    : { scale: 1.025, backgroundColor: "rgba(255,255,255,0.9)" }
                }
                whileTap={shouldReduce ? undefined : { scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="min-w-[240px] h-[56px] px-7 flex items-center justify-center gap-3 rounded-[12px] bg-[#1C3A28]/55 border border-white/60 text-white font-sans font-semibold text-[15px] tracking-wide shadow-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.35)] cursor-pointer"
              >
                Explore Memberships
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Marquee
        items={marqueeItems}
        itemClassName="font-serif text-base italic text-[#E9DFC6] sm:text-xl"
        className="border-b border-[#C9A45C]/40 bg-[#0B3326] py-3.5 sm:py-5"
      />

      <section
        id="membership-plans"
        className="relative overflow-hidden border-b border-[#C9A45C]/30 bg-gradient-to-b from-[#F9F6EE] via-[#EDE5D5]/40 to-[#F9F6EE] py-14 md:py-10"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-1/3 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.18),transparent_68%)]"
        />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrowClass="border-[#C9A45C]/40 bg-white/80 text-[#103F2E]"
            parts={[
              { text: "Choose Your" },
              { text: "Membership", className: "gradient-heading italic" },
            ]}
            titleClass="text-[#103F2E]"
            description="Explore four curated pathways to immerse in the JYA wellness, healthcare, and educational ecosystem."
            descriptionClass="text-[#103F2E]/80"
          />

          <div className="mb-10 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:mb-12 lg:grid-cols-3 lg:gap-7">
            {memberships.slice(0, 3).map((m, idx) => {
              const isSelectedPlan = selectedPlan === m.id;
              const isFeatured = m.id === "shatayus";
              const isExecutive = m.id === "ayurx";
              const isDarkPass = isFeatured || isExecutive;

              const passSurface = isExecutive
                ? "bg-gradient-to-br from-[#071D15] via-[#0B2B1F] to-[#123D2D] text-[#F9F6EE] border-[#C9A45C]/70"
                : isFeatured
                  ? "bg-gradient-to-br from-[#0E3A2A] via-[#0A2E21] to-[#072017] text-[#F9F6EE] border-[#C9A45C]/60"
                  : "bg-gradient-to-br from-[#FFFDF9] via-[#FAF4E6] to-[#F3E9D2] text-[#103F2E] border-[#C9A45C]/45";

              const cardShell = isDarkPass
                ? "bg-gradient-to-b from-[#0C2F23] to-[#082219] text-[#F9F6EE] border-[#C9A45C]/45"
                : "bg-white text-[#103F2E] border-[#C9A45C]/40";

              return (
                <Reveal
                  key={m.id}
                  kind="up"
                  duration={0.8}
                  delay={(idx % 3) * 0.12}
                  className={`h-full ${
                    idx === 2 ? "md:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div
                    id={`membership-${m.id}`}
                    onClick={() => setSelectedPlan(m.id)}
                    className="h-full scroll-mt-28 cursor-pointer"
                  >
                    <TiltCard
                      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[28px] border p-5 shadow-[0_20px_50px_rgba(11,51,38,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#C9A45C] hover:shadow-[0_28px_70px_rgba(11,51,38,0.22)] sm:p-6 ${cardShell} ${
                        isSelectedPlan
                          ? "border-2 border-[#C9A45C] ring-4 ring-[#C9A45C]/35 shadow-[0_28px_70px_rgba(201,164,92,0.28)] -translate-y-1"
                          : selectedPlan
                            ? "opacity-90 hover:opacity-100"
                            : ""
                      }`}
                    >
                      {/* Top subtle spotlight */}
                      <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_top,rgba(201,164,92,0.22),transparent_70%)] opacity-60 transition-opacity duration-500 group-hover:opacity-100" />

                      <div>
                        {/* Physical / Digital Membership Pass Card Header */}
                        <div
                          className={`relative overflow-hidden rounded-2xl border p-5 shadow-inner transition-transform duration-500 group-hover:scale-[1.01] ${passSurface}`}
                        >
                          {/* Metallic sheen sweep on hover */}
                          <div className="pointer-events-none absolute -inset-full translate-x-[-60%] rotate-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[60%]" />

                          {/* Subtle dot-matrix / guilloche texture */}
                          <div className="pointer-events-none absolute inset-0 opacity-20 bg-[radial-gradient(rgba(201,164,92,0.45)_1px,transparent_1px)] [background-size:14px_14px]" />

                          {/* Pass Top Row: Brand Crest + Tier Code + Badge */}
                          <div className="relative flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-lg border ${
                                  isDarkPass
                                    ? "border-[#C9A45C]/50 bg-[#C9A45C]/15 text-[#E8C581]"
                                    : "border-[#C9A45C]/50 bg-[#103F2E] text-[#E8C581]"
                                }`}
                              >
                                <PiFlowerLotus className="h-4 w-4" />
                              </span>
                              <div>
                                <span
                                  className={`block font-sans text-[9px] font-bold uppercase tracking-[0.24em] ${
                                    isDarkPass
                                      ? "text-[#C9A45C]"
                                      : "text-[#103F2E]/70"
                                  }`}
                                >
                                  JYA Member Pass
                                </span>
                                <span
                                  className={`block font-mono text-[10px] font-semibold tracking-widest ${
                                    isDarkPass
                                      ? "text-[#F9F6EE]/80"
                                      : "text-[#103F2E]"
                                  }`}
                                >
                                  TIER · {m.no}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1">
                              {isSelectedPlan && (
                                <span className="rounded-full bg-[#C9A45C] px-2.5 py-0.5 font-sans text-[9px] font-bold uppercase tracking-wider text-[#082219]">
                                  Selected
                                </span>
                              )}
                              <span
                                className={`rounded-full border px-2.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider ${
                                  isDarkPass
                                    ? "border-[#C9A45C]/50 bg-[#C9A45C]/15 text-[#E8C581]"
                                    : "border-[#103F2E]/20 bg-[#103F2E]/5 text-[#103F2E]"
                                }`}
                              >
                                {m.badge}
                              </span>
                            </div>
                          </div>

                          {/* Pass Title & Tagline */}
                          <div className="relative mt-5">
                            <h3
                              className={`font-serif text-xl font-bold leading-snug sm:text-[22px] ${
                                isDarkPass ? "text-[#FFFDF8]" : "text-[#103F2E]"
                              }`}
                            >
                              {m.title}
                            </h3>
                            <p
                              className={`mt-1 line-clamp-2 font-serif text-xs italic sm:text-[13px] ${
                                isDarkPass
                                  ? "text-[#E8C581]/90"
                                  : "text-[#9A6F26]"
                              }`}
                            >
                              {m.tagline}
                            </p>
                          </div>

                          {/* Pass Bottom Row: Metallic Chip + Price */}
                          <div
                            className={`relative mt-5 flex items-end justify-between border-t pt-4 ${
                              isDarkPass
                                ? "border-[#C9A45C]/25"
                                : "border-[#C9A45C]/30"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              {/* Tactile metallic card chip */}
                              <div
                                aria-hidden="true"
                                className="h-7 w-9 rounded-md border border-[#E8C581]/60 bg-gradient-to-br from-[#E8C581]/80 via-[#C9A45C]/60 to-[#9A6F26]/70 shadow-sm flex items-center justify-center"
                              >
                                <div className="h-4 w-5 rounded-[3px] border border-[#082219]/25" />
                              </div>
                              <div className="text-[10px] leading-tight">
                                <span
                                  className={`block font-sans font-bold uppercase tracking-wider ${
                                    isDarkPass
                                      ? "text-[#F9F6EE]/85"
                                      : "text-[#103F2E]/85"
                                  }`}
                                >
                                  {isDarkPass ? "Lifetime" : "Open"}
                                </span>
                                <span
                                  className={
                                    isDarkPass
                                      ? "text-[#F9F6EE]/55"
                                      : "text-[#103F2E]/55"
                                  }
                                >
                                  {isDarkPass ? "One-time" : "No Fee"}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <div
                                className={`font-serif text-2xl font-bold leading-none sm:text-3xl ${
                                  isDarkPass
                                    ? "text-[#FFFDF8]"
                                    : "text-[#103F2E]"
                                }`}
                              >
                                <PriceValue value={m.priceDisplay} />
                              </div>
                              <div
                                className={`mt-1 text-[10px] font-medium ${
                                  isDarkPass
                                    ? "text-[#E8C581]/80"
                                    : "text-[#103F2E]/65"
                                }`}
                              >
                                {m.priceSubtitle}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Who is it for */}
                        <div
                          className={`mt-5 rounded-xl border p-3.5 ${
                            isDarkPass
                              ? "border-[#C9A45C]/20 bg-white/[0.04]"
                              : "border-[#EDE5D5] bg-[#FBF8F1]"
                          }`}
                        >
                          <h4
                            className={`mb-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.2em] ${
                              isDarkPass ? "text-[#E8C581]" : "text-[#9A6F26]"
                            }`}
                          >
                            Designed For
                          </h4>
                          <p
                            className={`text-xs leading-relaxed sm:text-[13px] ${
                              isDarkPass
                                ? "text-[#F9F6EE]/85"
                                : "text-[#103F2E]/80"
                            }`}
                          >
                            {m.whoFor[0]}
                          </p>
                        </div>

                        {/* Benefits List */}
                        <Stagger
                          stagger={0.07}
                          delay={0.12}
                          className="mt-5 space-y-2.5 px-1"
                        >
                          <h4
                            className={`mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] ${
                              isDarkPass
                                ? "text-[#E8C581]"
                                : "text-[#103F2E]/70"
                            }`}
                          >
                            {m.benefitsTitle}
                          </h4>
                          {m.benefits.slice(0, 4).map((b, bIdx) => (
                            <Item
                              key={bIdx}
                              kind="left"
                              duration={0.45}
                              className={`flex items-start gap-2.5 text-xs sm:text-[13px] ${
                                isDarkPass
                                  ? "text-[#F9F6EE]/90"
                                  : "text-[#103F2E]/85"
                              }`}
                            >
                              <AnimatedCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A45C]" />
                              <span className="line-clamp-2 leading-snug">
                                {b}
                              </span>
                            </Item>
                          ))}
                        </Stagger>
                      </div>

                      {/* Footer CTA */}
                      <div
                        className={`mt-6 space-y-2.5 border-t pt-5 ${
                          isDarkPass
                            ? "border-[#C9A45C]/20"
                            : "border-[#EDE5D5]"
                        }`}
                      >
                        <Magnetic strength={0.15} className="w-full">
                          <CommonButton
                            label={m.cta}
                            fullWidth
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenModal(m.id);
                            }}
                            icon={
                              <ArrowRight
                                className={`h-4 w-4 ${
                                  isDarkPass
                                    ? "text-[#082219]"
                                    : "text-[#C9A45C]"
                                }`}
                              />
                            }
                            className={`!h-12 !w-full !px-5 !rounded-xl font-semibold tracking-wide shadow-md transition-all ${
                              isDarkPass
                                ? "bg-gradient-to-r from-[#C9A45C] via-[#DFBE78] to-[#C9A45C] hover:brightness-105 text-[#082219] border border-[#E8C581]"
                                : "bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/40"
                            }`}
                          />
                        </Magnetic>
                        {m.ctaNote && (
                          <p
                            className={`text-center text-[11px] italic ${
                              isDarkPass
                                ? "text-[#F9F6EE]/65"
                                : "text-[#103F2E]/60"
                            }`}
                          >
                            {m.ctaNote}
                          </p>
                        )}
                      </div>
                    </TiltCard>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {(() => {
            const m = memberships[3];
            const isSelectedEcosphere = selectedPlan === m.id;
            return (
              <Reveal kind="scale" duration={0.9}>
                <article
                  id={`membership-${m.id}`}
                  onClick={() => setSelectedPlan(m.id)}
                  className={`relative scroll-mt-28 cursor-pointer overflow-hidden rounded-3xl border-2 border-[#C9A45C] bg-gradient-to-br from-[#103F2E] via-[#0B3326] to-[#103F2E] p-6 text-[#F9F6EE] shadow-2xl transition-all sm:p-8 lg:p-12 ${
                    isSelectedEcosphere
                      ? "ring-4 ring-[#C9A45C]/45 shadow-[0_25px_70px_rgba(201,164,92,0.3)]"
                      : ""
                  }`}
                >
                  <div
                    aria-hidden="true"
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
                        className="font-serif text-xl font-bold leading-tight text-[#F9F6EE] sm:text-2xl lg:text-3xl"
                      />
                      <Reveal
                        as="p"
                        kind="left"
                        delay={0.15}
                        className="font-serif text-base italic text-[#C9A45C] sm:text-lg lg:text-xl"
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

      <section
        id="seasonal-academy"
        className="relative scroll-mt-24 overflow-hidden border-b border-[#C9A45C]/30 bg-[#F9F6EE] py-16 text-[#103F2E] md:py-24"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.18),transparent_68%)]"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Gurukul Immersion"
            eyebrowClass="border-[#C9A45C]/40 bg-white text-[#103F2E]"
            parts={[
              { text: "120+ Days Residential Academy &" },
              {
                text: "Certification Programmes",
                className: "gradient-heading italic",
              },
            ]}
            titleClass="text-[#103F2E]"
            description="प्रत्यक्ष नैसर्गिक जीवनशैलीचा अनुभव — Experience a natural and sustainable way of living."
            descriptionClass="font-serif italic text-[#103F2E]/80"
          />

          {/* Unified Single-Bar Metrics Strip */}
          <Stagger
            stagger={0.08}
            className="mb-10 grid grid-cols-2 divide-y divide-[#C9A45C]/25 overflow-hidden rounded-2xl border border-[#C9A45C]/40 bg-white shadow-sm sm:mb-12 lg:grid-cols-4 lg:divide-x lg:divide-y-0"
          >
            {academyStats.map((st, idx) => (
              <Item
                key={st.label}
                kind="up"
                duration={0.5}
                className={`p-5 text-center sm:p-6 ${
                  idx % 2 === 1
                    ? "border-l border-[#C9A45C]/25 lg:border-l-0"
                    : ""
                }`}
              >
                <div className="font-serif text-3xl font-bold text-[#103F2E] sm:text-4xl">
                  <Counter value={st.value} suffix={st.suffix} />
                </div>
                <div className="mt-1.5 font-sans text-xs font-bold text-[#103F2E] sm:text-sm">
                  {st.label}
                </div>
                <div className="mt-0.5 text-[11px] text-[#103F2E]/60">
                  {st.sub}
                </div>
              </Item>
            ))}
          </Stagger>

          {/* Main 2-Column Balanced Showcase: Left = Calendar & Admissions | Right = Highlights Dossier */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left: Seasonal Academy Calendar + Apply CTA */}
            <Reveal
              kind="left"
              duration={0.75}
              className="flex flex-col justify-between rounded-3xl border border-[#C9A45C]/40 bg-white p-6 shadow-lg sm:p-8 lg:col-span-5"
            >
              <div>
                <div className="border-b border-[#EDE5D5] pb-4 text-left">
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9A45C]">
                    Schedule
                  </span>
                  <h4 className="mt-1 font-serif text-xl font-bold text-[#103F2E] sm:text-2xl">
                    Seasonal Academy Calendar – 2027–28
                  </h4>
                </div>

                <div className="mt-5 space-y-3">
                  {seasonalCalendar.map((season) => {
                    const isSelectedSeason = selectedSeason === season.id;
                    const SeasonIcon =
                      season.id === "summer"
                        ? Sun
                        : season.id === "rainy"
                          ? CloudRain
                          : Snowflake;

                    return (
                      <button
                        key={season.index}
                        type="button"
                        id={`season-${season.id}`}
                        onClick={() => setSelectedSeason(season.id)}
                        className={`w-full scroll-mt-28 rounded-2xl border p-4 text-left transition-all duration-200 cursor-pointer ${
                          isSelectedSeason
                            ? "border-[#C9A45C] bg-[#103F2E] text-[#F9F6EE] shadow-md ring-2 ring-[#C9A45C]/30"
                            : "border-[#C9A45C]/30 bg-[#FAF6EC] text-[#103F2E] hover:border-[#C9A45C] hover:bg-[#F4EDDC]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                                isSelectedSeason
                                  ? "border-[#C9A45C]/50 bg-[#0B2D20] text-[#E8C581]"
                                  : "border-[#C9A45C]/35 bg-white text-[#9A6F26]"
                              }`}
                            >
                              <SeasonIcon className="h-4 w-4" />
                            </span>
                            <div>
                              <div className="font-serif text-base font-bold leading-snug">
                                {season.sanskrit}
                              </div>
                              <div
                                className={`text-xs font-semibold ${
                                  isSelectedSeason
                                    ? "text-[#E8C581]"
                                    : "text-[#103F2E]/70"
                                }`}
                              >
                                {season.english}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`mt-3 border-t pt-2.5 font-serif text-xs font-semibold ${
                            isSelectedSeason
                              ? "border-[#C9A45C]/25 text-[#F2D492]"
                              : "border-[#C9A45C]/20 text-[#9A6F26]"
                          }`}
                        >
                          {season.dates}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 space-y-3 border-t border-[#EDE5D5] pt-5 text-center">
                <Magnetic strength={0.12} className="w-full">
                  <CommonButton
                    label="Apply for जैवमण्डल Ecosphere Life Membership"
                    fullWidth
                    onClick={() => handleOpenModal("ecosphere")}
                    className="!h-11 !w-full !px-5 bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/40 !rounded-xl font-medium tracking-wide shadow-md justify-center"
                  />
                </Magnetic>

                <button
                  type="button"
                  onClick={scrollToPlans}
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#103F2E] underline decoration-[#C9A45C] underline-offset-4 transition-colors hover:text-[#9A6F26] cursor-pointer"
                >
                  <span>
                    Want a different membership? View &amp; switch all 4 plans
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <p className="text-[11px] italic leading-relaxed text-[#103F2E]/60">
                  Admission is subject to the entrance examination,
                  qualification criteria, availability of seats and JYA
                  policies.
                </p>
              </div>
            </Reveal>

            <Reveal
              kind="right"
              duration={0.75}
              className="flex flex-col justify-between rounded-3xl border border-[#C9A45C]/50 bg-gradient-to-br from-[#0D3828] via-[#0A2B1F] to-[#072017] p-6 text-left text-[#F9F6EE] shadow-xl sm:p-8 lg:col-span-7 lg:p-10"
            >
              <div>
                <h3 className="mt-2 font-serif text-2xl font-bold text-[#FFFDF8] sm:text-3xl">
                  Academy Highlights
                </h3>

                <p className="mt-3 font-sans text-sm leading-relaxed text-[#F9F6EE]/85 sm:text-base">
                  The जैवमण्डल Ecosphere Academy offers an authentic Gurukul
                  atmosphere located at SwaGrama. Students engage in practical
                  exposure, traditional herbal preparation, pulse diagnosis,
                  dinacharya routines, and ecological living.
                </p>

                <div className="mt-7 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {academyHighlights.map((highlight, hIdx) => (
                    <div
                      key={hIdx}
                      className="flex items-start gap-3 rounded-2xl border border-[#C9A45C]/25 bg-white/[0.05] p-4 transition-colors hover:border-[#C9A45C]/60 hover:bg-white/[0.08]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#E8C581]" />
                      <span className="text-sm leading-relaxed text-[#F9F6EE]/90">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-[#0B3326] via-[#103F2E] to-[#0B3326] py-14 text-[#F9F6EE] md:py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-20 h-[380px] w-[380px] rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.14),transparent_68%)]"
        />

        <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Feature Matrix"
            eyebrowClass="border-[#C9A45C]/30 bg-white/5 text-[#C9A45C]"
            parts={[
              { text: "Find the Membership" },
              {
                text: "That Suits You",
                className: "gradient-heading-dark italic",
              },
            ]}
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
                    शतायुस् World
                  </th>
                  <th className="w-[18.75%] p-5 text-center font-serif text-sm font-bold text-[#C9A45C]">
                    GlobalAyurX
                  </th>
                  <th className="w-[18.75%] bg-[#C9A45C]/20 p-5 text-center font-serif text-sm font-bold text-[#F9F6EE]">
                    जैवमण्डल Ecosphere
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

      <section className="relative overflow-hidden border-b border-[#C9A45C]/30 bg-[#F9F6EE] py-14 text-[#103F2E] md:py-10">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="TIMELINE"
            eyebrowClass="border-[#C9A45C]/40 bg-white text-[#C9A45C]"
            parts={[
              { text: "How to Become a" },
              { text: "JYA Member", className: "gradient-heading italic" },
            ]}
            titleClass="text-[#103F2E]"
            description="Becoming a JYA member is an elegant five-step pathway to holistic learning and community living."
            descriptionClass="text-[#103F2E]/80"
          />

          <div ref={timelineRef} className="relative mx-auto mt-12 max-w-5xl">
            <div className="absolute bottom-4 left-6 top-4 -ml-px w-[2px] bg-[#C9A45C]/20 md:left-1/2" />
            <motion.div
              style={{ scaleY: shouldReduce ? 1 : timelineProgress }}
              className="absolute bottom-4 left-6 top-4 -ml-px w-[2px] origin-top will-change-transform bg-gradient-to-b from-[#C9A45C] via-[#C9A45C] to-[#103F2E] md:left-1/2"
            />
            {!shouldReduce && (
              <div className="pointer-events-none absolute inset-x-0 bottom-4 top-4">
                <motion.div
                  style={{ top: timelineHeadTop }}
                  className="absolute left-6 -ml-[6px] -mt-[6px] h-3 w-3 rounded-full bg-[#C9A45C] shadow-[0_0_16px_4px_rgba(201,164,92,0.75)] md:left-1/2"
                />
              </div>
            )}

            <div className="space-y-10 md:space-y-14">
              {journeySteps.map((st, index) => {
                const isRight = index % 2 === 0;
                const IconComp = st.icon;
                const card = (
                  <Reveal kind={isRight ? "right" : "left"} duration={0.6}>
                    <div
                      className={`group relative overflow-hidden rounded-3xl border border-[#C9A45C]/45 bg-gradient-to-br from-white via-[#FFFDF9] to-[#FAF5E8] p-6 text-left shadow-[0_18px_48px_rgba(16,63,46,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#C9A45C] hover:shadow-[0_24px_60px_rgba(16,63,46,0.14)] sm:p-8 ${
                        isRight ? "md:ml-6" : "md:mr-6"
                      }`}
                    >
                      {/* Top gold accent bar */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C9A45C] via-[#E8C581] to-transparent"
                      />

                

               

                      <h3 className="relative mt-5 font-serif text-xl font-bold leading-snug text-[#103F2E] sm:text-2xl">
                        {st.title}
                      </h3>
                      <p className="relative mt-2.5 font-sans text-sm leading-relaxed text-[#103F2E]/80">
                        {st.description}
                      </p>

                      <div className="relative mt-6 flex items-center justify-between border-t border-[#EDE5D5] pt-4">
                        <CommonButton
                          label="Learn More"
                          onClick={() => handleOpenModal()}
                          icon={
                            <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                          }
                          className="!h-9 !px-5 bg-[#103F2E] hover:bg-[#0B3326] text-[#F9F6EE] border border-[#C9A45C]/40 !rounded-full text-xs font-semibold shadow-sm transition-all"
                        />
                        <span className="font-serif text-xs italic text-[#9A6F26]">
                          Step {st.num} of 0{journeySteps.length}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                );

                return (
                  <div
                    key={st.num}
                    className="relative flex flex-col items-center md:flex-row"
                  >
                    <div className="absolute left-6 top-8 z-20 -ml-4 md:left-1/2">
                      <motion.div
                        initial={
                          shouldReduce
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.5 }
                        }
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.45, ease }}
                        className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#C9A45C] bg-[#103F2E] font-serif text-[11px] font-bold text-[#E8C581] shadow-md"
                      >
                        {st.num}
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

      <section className="relative overflow-hidden bg-[#F9F6EE] px-4 py-14 sm:px-6 md:py-20 lg:px-20">
        <div className="relative mx-auto overflow-hidden rounded-[12px] border border-[#C9A45C]/55 bg-gradient-to-br from-[#071E15] via-[#0B2D20] to-[#0F3B2A] p-7 text-[#F9F6EE] shadow-[0_32px_90px_rgba(11,45,32,0.28)] sm:p-10 lg:p-14">
          <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.2),transparent_68%)]" />
          <div className="pointer-events-none absolute -bottom-28 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(201,164,92,0.16),transparent_70%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-15 bg-[radial-gradient(rgba(201,164,92,0.45)_1px,transparent_1px)] [background-size:20px_20px]" />

          <div className="pointer-events-none absolute -right-32 top-1/2 -mt-[260px] hidden h-[520px] w-[520px] lg:block">
            <Orbit
              duration={90}
              className="h-full w-full rounded-full border border-dashed border-[#C9A45C]/25"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="text-left lg:col-span-7">
              <Reveal kind="left">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/10 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-[0.26em] text-[#E8C581]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E8C581]" />
                  JnanaYogAyu · Community
                </span>
              </Reveal>

              <SplitWords
                as="h2"
                parts={[
                  { text: "Be Part of" },
                  {
                    text: "Something Bigger",
                    className: "gradient-heading-dark italic pb-1.5 pr-2",
                  },
                ]}
                className="mt-5 font-serif text-3xl font-bold leading-[1.2] tracking-tight text-[#FFFDF8] pb-1 sm:text-4xl lg:text-5xl"
              />

              <div className="my-6 flex max-w-xs items-center gap-3">
                <div className="h-px flex-1 bg-gradient-to-r from-[#C9A45C] to-transparent" />
                <PiFlowerLotus className="h-5 w-5 shrink-0 text-[#E8C581]" />
                <div className="h-px flex-1 bg-gradient-to-l from-[#C9A45C] to-transparent" />
              </div>

              <Reveal
                as="p"
                kind="up"
                delay={0.1}
                className="max-w-2xl font-sans text-base leading-relaxed text-[#F9F6EE]/95 sm:text-lg"
              >
                {closingText}
              </Reveal>

              <Reveal
                as="p"
                delay={0.15}
                className="mt-6 font-serif text-lg font-medium italic text-[#E8C581] sm:text-xl"
              >
                Join the JYA Ecosystem. Begin Your Journey Today.
              </Reveal>

              <Reveal
                kind="up"
                delay={0.2}
                className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
              >
                <Magnetic className="w-full sm:w-auto">
                  <CommonButton
                    label="Join the JYA Community"
                    onClick={() => handleOpenModal()}
                    icon={<ArrowRight className="h-4 w-4 text-[#082218]" />}
                    className="!h-12 !w-full !px-8 sm:!w-auto bg-gradient-to-r from-[#C9A45C] via-[#DFBE78] to-[#C9A45C] hover:brightness-105 text-[#082218] font-bold !rounded-xl shadow-[0_12px_32px_rgba(201,164,92,0.3)] tracking-wide text-sm sm:text-base"
                  />
                </Magnetic>

                <button
                  type="button"
                  onClick={scrollToPlans}
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#C9A45C]/45 bg-white/[0.06] px-6 font-sans text-sm font-semibold text-[#F9F6EE] backdrop-blur-sm transition-all hover:border-[#E8C581] hover:bg-white/[0.12] sm:w-auto cursor-pointer"
                >
                  Compare All 4 Plans
                </button>
              </Reveal>
            </div>

            <Reveal kind="right" delay={0.15} className="lg:col-span-5">
              <div className="rounded-2xl border border-[#C9A45C]/40 bg-[#061A12]/90 p-5 shadow-xl sm:p-6">
                <div className="flex items-center justify-between border-b border-[#C9A45C]/25 pb-3.5">
                  <div>
                    <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.24em] text-[#C9A45C]">
                      Direct Enrolment
                    </span>
                    <h3 className="mt-0.5 font-serif text-lg font-bold text-[#FFFDF8]">
                      Choose Your Pathway
                    </h3>
                  </div>
                  <PiFlowerLotus className="h-5 w-5 text-[#C9A45C]/80" />
                </div>

                <div className="mt-4 space-y-2.5">
                  {memberships.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleOpenModal(m.id)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border border-[#C9A45C]/25 bg-white/[0.04] px-4 py-3 text-left transition-all duration-200 hover:border-[#C9A45C] hover:bg-white/[0.1] cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="truncate font-serif text-sm font-bold text-[#FFFDF8] group-hover:text-[#E8C581] transition-colors">
                            {m.title}
                          </span>
                        </div>
                        <span className="mt-0.5 block truncate text-[11px] text-[#F9F6EE]/65">
                          {m.badge}
                        </span>
                      </div>

                      <div className="flex shrink-0 items-center gap-2.5">
                        <span className="rounded-lg border border-[#C9A45C]/35 bg-[#C9A45C]/15 px-2.5 py-1 font-serif text-xs font-bold text-[#E8C581]">
                          {m.priceDisplay}
                        </span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C] transition-transform duration-200 group-hover:translate-x-1" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <MembershipModal
          open={isModalOpen}
          onClose={handleCloseModal}
          initialMembership={selectedPlanForModal}
          initialSeason={selectedSeason}
        />
      )}
    </div>
  );
}
