import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { FiArrowRight, FiChevronRight, FiPlayCircle } from "react-icons/fi";
import {
  GiHerbsBundle,
  GiInkSwirl,
  GiMeditation,
  GiMicrophone,
  GiScrollQuill,
} from "react-icons/gi";
import {
  LuBookOpen,
  LuBrainCircuit,
  LuBriefcase,
  LuCamera,
  LuClock,
  LuCpu,
  LuCrown,
  LuDownload,
  LuEarth,
  LuFileText,
  LuHeadphones,
  LuInfinity,
  LuNewspaper,
  LuPlay,
  LuRepeat,
} from "react-icons/lu";
import {
  PiBookOpen,
  PiFlowerLotus,
  PiShoppingCart,
  PiUsersThree,
} from "react-icons/pi";
import {
  TbAtom,
  TbBrain,
  TbDeviceMobile,
  TbHeartHandshake,
  TbHeartRateMonitor,
  TbLeaf,
  TbPlant,
  TbPlugConnectedX,
  TbRobot,
  TbTree,
  TbUserHeart,
  TbUsers,
  TbUsersGroup,
  TbWorldHeart,
  TbWorldStar,
} from "react-icons/tb";
import HeroImage from "../assets/Golden Sunrise River Retreat.webp";
import resourceBlog from "../assets/resource-blog.webp";
import resourcePodcast from "../assets/resource-podcast.webp";
import resourceWhitepaper from "../assets/resource-whitepaper.webp";
import serviceBarter from "../assets/service-barter.webp";
import serviceBranding from "../assets/service-branding.webp";
import serviceConsultancy from "../assets/service-consultancy.webp";
import serviceDigital from "../assets/service-digital.webp";
import serviceGurukul from "../assets/service-gurukul.webp";
import serviceMembership from "../assets/service-membership.webp";
import communitySwagram from "../assets/swagramaMain.webp";
import LearnWithGurukul from "./ui/LearnWithGurukul";
import MuktikhelaAyurvedaSection from "./ui/MuktikhelaAyurvedaSection";
import SwagramaCommunity from "./ui/SwagramaCommunity";
import WellnessMarketplace from "./ui/WellnessMarketplace";

import JyaBg from "../components/ui/assets/section-two/Elegant Cream and Gold Wave Haze.webp";
import JyaLotusImg from "../components/ui/assets/section-two/Golden Lotus with Halo and Ripples.webp";
import card1Img from "../components/ui/assets/section-two/card1-clinic-tech.webp";
import card2Img from "../components/ui/assets/section-two/card2-organic-market.webp";
import card3Img from "../components/ui/assets/section-two/card3-community-ecosystem.webp";

const MonitorLeaf = ({ className }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="4" y="6" width="40" height="28" rx="3" />
    <path d="M17 42h14M24 34v8" />
    <path d="M24 28v-6" />
    <path d="M24 22c0-4-3-6-7-6 0 4 2 6 7 6Z" />
    <path d="M24 22c0-3.5 2.5-5.5 6.5-5.5 0 3.5-2 5.5-6.5 5.5Z" />
  </svg>
);

const needsData = [
  {
    label: "THE PROBLEM",
    items: [
      {
        text: "Stress",
        Icon: TbBrain,
        desc: "Mental & emotional burnout in modern life",
      },
      {
        text: "Lifestyle Diseases",
        Icon: TbHeartRateMonitor,
        desc: "Chronic illness driven by unhealthy habits",
      },
      {
        text: "Technology Overload",
        Icon: TbDeviceMobile,
        desc: "Digital noise drowning our inner silence",
      },
      {
        text: "Disconnection",
        Icon: TbPlugConnectedX,
        desc: "Loss of community, nature & self",
      },
      {
        text: "Climate",
        Icon: TbWorldHeart,
        desc: "Environmental collapse & ecological grief",
      },
    ],
  },
  {
    label: "THE SOLUTION",
    items: [
      {
        text: "Natural Living",
        Icon: TbLeaf,
        desc: "Rooted rhythms aligned with nature's wisdom",
      },
      {
        text: "Community Culture",
        Icon: TbUsers,
        desc: "Conscious villages built on shared values",
      },
      {
        text: "AI enabled Wellness",
        Icon: TbRobot,
        desc: "Personalized healing through intelligent systems",
      },
      {
        text: "Ayurved",
        Icon: TbPlant,
        desc: "Ancient science of life, revived for today",
      },
      {
        text: "Ecology",
        Icon: TbTree,
        desc: "Regenerative living in harmony with Earth",
      },
    ],
  },
];

const ecosystemData = [
  {
    number: "01",
    tag: "Longevity Movement",
    title: "Shatayus World Movement",
    desc: "Join a people-first movement dedicated to creating a healthier, happier, and more sustainable world where living beyond 100 years becomes a way of life.",
    btnText: "JOIN NOW",
    PrimaryIcon: TbHeartHandshake,
    AccentIcon: LuInfinity,
    SubIcon: TbUserHeart,
  },
  {
    number: "02",
    tag: "Digital Wellness",
    title: "Global AyurX",
    desc: "A unified digital wellness ecosystem integrating AI, Ayurveda, and intelligent health platforms to deliver personalized healing, preventive care, and lifelong well-being.",
    btnText: "EXPLORE NOW",
    PrimaryIcon: LuBrainCircuit,
    AccentIcon: TbAtom,
    SubIcon: TbRobot,
  },
  {
    number: "03",
    tag: "Global Advisory",
    title: "Ecosphere",
    desc: "A global advisory ecosystem driving visionary leadership, strategic partnerships, and collaborative expansion to scale holistic wellness worldwide.",
    btnText: "CONNECT NOW",
    PrimaryIcon: TbWorldStar,
    AccentIcon: LuEarth,
    SubIcon: TbUsersGroup,
  },
];

// eslint-disable-next-line no-unused-vars
const servicesData = [
  {
    name: "Barter",
    Icon: LuRepeat,
    image: serviceBarter,
    blurb: "Value-for-value exchange within a conscious community.",
  },
  {
    name: "Commune Gurukul",
    Icon: LuBookOpen,
    image: serviceGurukul,
    blurb: "Timeless learning under masters, rooted in nature.",
  },
  {
    name: "Membership",
    Icon: LuCrown,
    image: serviceMembership,
    blurb: "Curated access to the full JYA wellness universe.",
  },
  {
    name: "Branding & Media Services",
    Icon: LuCamera,
    image: serviceBranding,
    blurb: "Editorial storytelling for wellness-first brands.",
  },
  {
    name: "Digital Ecosystem (Global AyurX)",
    Icon: LuCpu,
    image: serviceDigital,
    blurb: "AI-guided Ayurveda for personalized preventive care.",
  },
  {
    name: "Consultancy (Ecosphere)",
    Icon: LuBriefcase,
    image: serviceConsultancy,
    blurb: "Visionary advisory for holistic wellness ventures.",
  },
];

const communitiesData = {
  title: "Swagram",
  desc: "A community living ecosystem fostering wellness, self-reliance, and meaningful human connections through conscious and sustainable living.",
  btnText: "EXPLORE",
};

const resourcesData = [
  {
    kind: "Blogs",
    tagIcon: LuNewspaper,
    accent: "Read",
    accentIcon: FiArrowRight,
    image: resourceBlog,
    posts: [
      {
        tag: "AYURVEDA",
        title: "The Six Tastes: How Your Plate Balances the Doshas",
        meta: "6 min read",
        Icon: GiInkSwirl,
      },
      {
        tag: "MINDFULNESS",
        title: "Morning Rituals to Reset Your Nervous System",
        meta: "4 min read",
        Icon: GiInkSwirl,
      },
      {
        tag: "LONGEVITY",
        title: "What Shatayushi Living Teaches Modern Science",
        meta: "8 min read",
        Icon: GiInkSwirl,
      },
    ],
  },
  {
    kind: "Whitepapers",
    tagIcon: LuFileText,
    accent: "Download",
    accentIcon: LuDownload,
    image: resourceWhitepaper,
    posts: [
      {
        tag: "RESEARCH",
        title: "Ayurveda : A Framework for Preventive Healthcare",
        meta: "PDF · 24 pages",
        Icon: GiScrollQuill,
      },
      {
        tag: "POLICY",
        title: "Community Living as Public Health Infrastructure",
        meta: "PDF · 18 pages",
        Icon: GiScrollQuill,
      },
      {
        tag: "ECOLOGY",
        title: "The Regenerative Economy of Wellness Villages",
        meta: "PDF · 32 pages",
        Icon: GiScrollQuill,
      },
    ],
  },
  {
    kind: "Podcast Videos",
    tagIcon: LuHeadphones,
    accent: "Watch",
    accentIcon: LuPlay,
    image: resourcePodcast,
    posts: [
      {
        tag: "EP · 12",
        title: "Conversations with a Vaidya : The Modern Body, Ancient Answers",
        meta: "42 min",
        Icon: GiMicrophone,
      },
      {
        tag: "EP · 11",
        title: "Building Swagram: A Village Designed for a Hundred Years",
        meta: "56 min",
        Icon: GiMicrophone,
      },
      {
        tag: "EP · 10",
        title: "The Digital Rishi — Can AI Carry Sacred Knowledge?",
        meta: "38 min",
        Icon: GiMicrophone,
      },
    ],
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.4, delay: i * 0.06 },
  }),
};

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? fadeUpReduced : fadeUp;

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="w-full overflow-x-hidden text-forest">
      {/* SECTION 1: HERO (Theme B — Clean White / Warm Cream) */}
      <section
        ref={heroRef}
        className="relative w-full h-[800px] min-h-[700px] 2xl:h-[92dvh] flex items-center overflow-hidden bg-[#FFFDF9]"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={HeroImage}
            alt="JnanaYogAyu natural living sanctuary"
            width={1920}
            height={1280}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,249,236,0.58) 0%, rgba(255,249,236,0.46) 22%, rgba(255,249,236,0.26) 38%, rgba(255,249,236,0.09) 52%, rgba(255,249,236,0) 64%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, #000 24%, #000 60%, transparent 82%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, #000 24%, #000 60%, transparent 82%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 30% 40% at 20% 24%, rgba(255,246,222,0.75) 0%, rgba(255,238,196,0.48) 26%, rgba(255,230,170,0.18) 54%, transparent 78%)",
              mixBlendMode: "screen",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 36% 24% at 22% 50%, rgba(255,252,246,0.62) 0%, rgba(255,252,246,0.36) 45%, transparent 100%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 30% 16% at 38% 60%, rgba(255,252,246,0.38) 0%, transparent 100%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 30% 14% at 8% 66%, rgba(255,240,205,0.35) 0%, transparent 100%)",
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(18,42,26,0.14) 0%, transparent 28%)",
            }}
          />
        </motion.div>

        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <motion.div
            animate={{ x: [0, 40, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[4%] top-[40%] w-[38vw] h-[22vh] rounded-full bg-[#FFFCF4]/35 blur-[80px]"
          />
          <motion.div
            animate={{ x: [0, -30, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[22%] top-[56%] w-[28vw] h-[16vh] rounded-full bg-[#FFFCF4]/25 blur-[70px]"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 w-full px-6 md:px-12 lg:px-[6vw]"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.12,
                },
              },
            }}
            className="relative lg:max-w-[48vw]"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-6"
            >
              <span className="w-[46px] h-px bg-[#D5A354]" />

              <span className="font-sans text-[11px] xl:text-xs font-bold tracking-[0.3em] text-[#173826] uppercase">
                One Universe. One Community. One Life.
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-serif font-medium text-[clamp(40px,3.6vw,76px)] leading-[1.1] tracking-[-0.03em] text-[#103F2A] mb-7"
            >
              <span className="block sm:whitespace-nowrap">
                The Digital{" "}
                <span className="gradient-heading italic">Intelligence</span>
              </span>

              <span className="block">of Natural Living</span>
            </motion.h1>

            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-[clamp(110px,12vw,230px)] h-px bg-gradient-to-r from-transparent to-[#D5A354]/80" />

              <PiFlowerLotus className="w-6 h-6 text-[#D5A354] shrink-0" />

              <div className="w-[clamp(110px,12vw,230px)] h-px bg-gradient-to-l from-transparent to-[#D5A354]/80" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="font-sans text-base xl:text-[clamp(17px,1.1vw,22px)] leading-[1.5] text-[#1E4630] max-w-[600px] mb-8"
            >
              Your gateway to Ayurveda, Wellness, Learning, Community and a
              Sustainable Life.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.025,
                  backgroundColor: "#18583B",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="min-w-[205px] h-[56px] flex items-center justify-center gap-3 rounded-[12px] bg-[#0F4A32] text-white font-sans font-semibold text-[15px] tracking-wide shadow-[0_8px_20px_rgba(16,67,45,0.28)]"
              >
                Explore JYA
                <FiChevronRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.025,
                  backgroundColor: "rgba(28,58,40,0.42)",
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="min-w-[270px] h-[56px] flex items-center justify-center gap-3 rounded-[12px] bg-[#1C3A28]/30 backdrop-blur-md border border-white/60 text-white font-sans font-semibold text-[15px] tracking-wide shadow-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.35)]"
              >
                <FiPlayCircle className="w-5 h-5" />
                Join The Movement
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: WHAT IS JYA (The JnanaYogAyu Ecosystem) */}

      <section className="relative isolate overflow-hidden bg-[#FAF5E8] py-10 lg:py-18">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src={JyaBg}
            alt=""
            className="h-full w-full object-cover opacity-25 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF7]/90 via-[#FAF5E8]/80 to-[#F5ECE0]/95" />
          <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F7E7C4]/40 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto  px-5 sm:px-8 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest">
              Ancient Wisdom. Modern Intelligence. <br />
              <span className="gradient-heading italic mt-1 inline-block">
                A Better Way of Living.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className=" mt-6 "
          >
            <div className="relative  ">
              <p className="font-serif text-base sm:text-lg lg:text-xl font-bold leading-relaxed text-[#0F3D29]">
                JnanaYogAyu (JYA) is an integrated ecosystem bringing together
                health, wellness, Ayurveda, technology, learning and conscious
                living on a single platform.
              </p>

              <div className="mx-auto my-5 flex items-center justify-center gap-3">
                <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#C8933F]/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8933F]" />
                <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#C8933F]/60" />
              </div>

              <p className=" text-sm leading-7 text-[#354237] sm:text-base">
                Rooted in the timeless principles of Jnana (Knowledge), Yoga and
                Ayurveda (Ayu), JYA connects individuals, healthcare
                practitioners, clinics, hospitals, wellness centres and
                businesses through a comprehensive range of services and digital
                solutions.
              </p>
            </div>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            <motion.article
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#E7D7B5] bg-white/85 shadow-[0_14px_45px_rgba(42,67,43,0.07)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(42,67,43,0.14)]"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#FAF5E8]">
                <img
                  src={card1Img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 pt-4 sm:p-9 sm:pt-4">
                <div className="mb-5 h-[2px] w-12 rounded-full bg-[#C8933F]" />

                <p className="text-[15px] leading-[1.85] text-[#29382E] sm:text-base">
                  From clinic management and automation solutions that help
                  Ayurvedic practitioners streamline their practice, to a
                  unified platform that enables individuals to access services
                  and track their wellness journey, JYA bridges traditional
                  healthcare wisdom with modern technology.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.12 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#E7D7B5] bg-white/85 shadow-[0_14px_45px_rgba(42,67,43,0.07)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(42,67,43,0.14)]"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#FAF5E8]">
                <img
                  src={card2Img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 pt-4 sm:p-9 sm:pt-4">
                <div className="mb-5 h-[2px] w-12 rounded-full bg-[#C8933F]" />

                <p className="text-[15px] leading-[1.85] text-[#29382E] sm:text-base">
                  The ecosystem also supports clinics, hospitals and Ayurvedic
                  centres with digital marketing and growth services, enables
                  access to organic and high-quality products through its
                  commerce and barter network, creates opportunities to source
                  and sell organic produce, and makes knowledge accessible
                  through curated learning programmes and courses.
                </p>
              </div>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.24 }}
              className="group relative flex flex-col overflow-hidden rounded-[28px] border border-[#E7D7B5] bg-white/85 shadow-[0_14px_45px_rgba(42,67,43,0.07)] backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_55px_rgba(42,67,43,0.14)]"
            >
              <div className="relative h-60 w-full overflow-hidden bg-[#FAF5E8]">
                <img
                  src={card3Img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-7 pt-4 sm:p-9 sm:pt-4">
                <div className="mb-5 h-[2px] w-12 rounded-full bg-[#C8933F]" />

                <p className="text-[15px] leading-[1.85] text-[#29382E] sm:text-base">
                  Whether you are a healthcare practitioner looking to modernise
                  your practice, an individual seeking a more informed approach
                  to wellness, a healthcare institution looking to strengthen
                  its digital presence, or someone interested in learning,
                  sourcing and sharing quality products, JYA brings these
                  opportunities together.
                </p>
              </div>
            </motion.article>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mt-20 overflow-hidden rounded-[32px] border border-[#D5A354]/40 bg-gradient-to-r from-[#07281A] via-[#103F2A] to-[#07281A] px-6 py-12 text-center shadow-[0_20px_55px_rgba(15,61,41,0.22)] sm:px-14 sm:py-16"
          >
            <div className="relative z-10 mx-auto max-w-3xl">
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-snug tracking-wide text-[#FFFDF5]">
                One ecosystem. Multiple possibilities.
              </h3>

              <div className="mx-auto my-4 h-[2px] w-20 rounded-full bg-[#D5A354]/60" />

              <p className="font-serif text-sm sm:text-base lg:text-lg italic text-[#F2C56B]">
                A more connected approach to health, wellness and living.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: OUR PILLARS (Theme B — Clean White / Warm Cream) */}
      <section className="py-10 md:py-14 bg-[#FDFBF7] px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest"
            >
              The <span className="italic gradient-heading">JYA</span> Ecosystem
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px w-20 bg-amber mx-auto mt-5 origin-center"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {ecosystemData.map((card, index) => (
              <motion.div
                key={card.title}
                variants={fadeUp}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col bg-white rounded-2xl sm:rounded-3xl border border-forest/10 px-8 pt-10 pb-8 hover:shadow-[0_24px_56px_-12px_rgba(15,61,38,0.14)] hover:border-amber/50 transition-all duration-500 overflow-hidden cursor-pointer shadow-sm"
              >
                <span className="absolute top-5 right-6 font-serif text-7xl font-bold text-forest/[0.05] select-none leading-none group-hover:text-forest/10 transition-colors duration-500">
                  {card.number}
                </span>

                <div className="relative z-10 mb-7">
                  <div className="w-14 h-14 rounded-full border border-forest/20 bg-forest/[0.06] flex items-center justify-center group-hover:bg-forest group-hover:border-forest transition-all duration-400">
                    <card.PrimaryIcon
                      className="w-6 h-6 text-forest group-hover:text-amber transition-colors"
                      strokeWidth={1.4}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-5 bg-amber" />
                  <span className="font-sans text-[10px] font-semibold tracking-[0.28em] text-forest/70 uppercase">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest mb-3 leading-snug group-hover:text-moss transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="font-sans text-forest/70 text-sm leading-relaxed flex-grow mb-8">
                  {card.desc}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-forest/10">
                  <motion.button
                    whileHover={{ gap: "12px" }}
                    className="flex items-center gap-2 font-sans text-[11px] font-bold tracking-[0.2em] text-forest group-hover:text-amber uppercase transition-all duration-300"
                  >
                    {card.btnText}
                    <FiArrowRight className="w-3.5 h-3.5 text-forest group-hover:text-amber group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  <div className="w-7 h-7 rounded-full border border-forest/15 flex items-center justify-center group-hover:border-amber/50 group-hover:bg-amber/10 transition-all duration-300">
                    <card.AccentIcon
                      className="w-3.5 h-3.5 text-forest/40 group-hover:text-amber transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY HUMANITY NEEDS JYA (Theme A — Premium Dark Gradient) */}
      {/* <section className="py-10 md:py-14 bg-gradient-to-br from-[#0D3323] via-[#12432D] to-[#1B5137] text-[#FDFBF7] px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-moss/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-amber/10 blur-3xl" />
        </div>
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-14">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#FDFBF7] leading-tight"
            >
              Why Humanity{" "}
              <span className="italic gradient-heading-dark">Needs</span> JYA
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-4xl mx-auto gap-6 md:gap-8">
            {needsData.map((box, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="relative rounded-2xl overflow-hidden bg-white/[0.07] backdrop-blur-md border border-white/15 hover:border-amber/40 shadow-2xl transition-all duration-500 group"
              >
                <div className="px-6 pt-5 pb-3.5 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-px bg-amber" />
                    <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-amber uppercase">
                      {box.label}
                    </span>
                    <div className="w-4 h-px bg-amber" />
                  </div>
                  <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-white/40">
                    0{index + 1} / 02
                  </span>
                </div>
                <ul className="px-6 py-3 divide-y divide-white/10">
                  {box.items.map(({ text, Icon, desc }, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.08 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-4 py-3.5 group/item cursor-default"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border border-white/20 bg-white/10 group-hover/item:bg-amber group-hover/item:border-amber transition-all duration-300">
                        <Icon className="w-4 h-4 text-amber group-hover/item:text-forest transition-colors" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-sans text-sm font-semibold text-[#FDFBF7] leading-tight">
                          {text}
                        </p>
                        <p className="font-sans text-xs text-white/70 mt-1 leading-snug">
                          {desc}
                        </p>
                      </div>
                      <span className="font-sans shrink-0 text-[10px] font-semibold tabular-nums text-white/40 group-hover/item:text-amber transition-colors duration-300">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* SECTION 5: MUKTIKHELA (Theme B — Clean White / Warm Cream) */}
      <MuktikhelaAyurvedaSection />

      {/* SECTION 6: SWAGURUKUL (Theme A — Premium Dark Gradient) */}
      <LearnWithGurukul />

      {/* SECTION 7: WELLNESS & MARKETPLACE (Theme B — Clean White / Warm Cream) */}
      <WellnessMarketplace />

      {/* SECTION 8: SWAGRAMA COMMUNITY (Theme A — Premium Dark Gradient) */}
      <SwagramaCommunity />

      {/* SECTION 9: COMMUNITIES / SWAGRAM FEATURE (Theme B — Clean White / Warm Cream) */}
      {/* <section className="py-10 md:py-14 bg-[#FDFBF7] px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="mb-12">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest"
            >
              Our <span className="italic gradient-heading">Communities</span>
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="relative rounded-3xl bg-white border border-forest/10 hover:border-amber/40 transition-all duration-500 group overflow-hidden shadow-[0_20px_50px_rgba(15,61,38,0.08)] hover:shadow-[0_28px_60px_rgba(15,61,38,0.15)]"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative min-h-[280px] md:min-h-[440px] overflow-hidden">
                <img
                  src={communitySwagram}
                  alt="Swagram — sustainable community living"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
              </div>
              <div className="relative z-10 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-amber" />
                  <span className="font-sans text-xs font-semibold tracking-[0.25em] text-amber uppercase">
                    Featured Community
                  </span>
                </div>
                <h3 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-6">
                  {communitiesData.title}
                </h3>
                <p className="font-sans text-forest/75 leading-relaxed text-base sm:text-lg max-w-2xl mb-8">
                  {communitiesData.desc}
                </p>
                <div className="flex">
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ scale: 1.02 }}
                    className="self-start flex items-center gap-4 font-sans font-bold py-3.5 px-8 tracking-[0.2em] text-sm bg-forest text-white hover:bg-moss transition-all duration-300 group/btn rounded-xl shadow-md"
                  >
                    {communitiesData.btnText}
                    <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* SECTION 10: BLOGS / JOURNAL (Theme A — Premium Dark Gradient) */}
      <section className="py-10 md:py-14 bg-gradient-to-br from-[#0D3323] via-[#12432D] to-[#1B5137] text-[#FDFBF7] px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/40 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber/10 blur-3xl" />
        </div>
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-10">
            <div>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#FDFBF7]"
              >
                <span className="gradient-heading-dark italic">Blogs</span>
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="font-sans text-white/80 max-w-4xl mt-4 text-base sm:text-[17px] leading-relaxed"
              >
                Reflections on Ayurveda, mindfulness, and the quiet science of
                living well.
              </motion.p>
            </div>
            <motion.a
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="hidden md:inline-flex items-center gap-2 font-sans text-xs font-semibold text-amber tracking-[0.25em] uppercase cursor-pointer hover:gap-3 hover:text-white transition-all duration-300"
            >
              View All Articles <FiArrowRight className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {resourcesData[0].posts.map((post, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white/[0.07] backdrop-blur-md rounded-2xl border border-white/15 hover:border-amber/50 hover:shadow-2xl transition-all duration-500 flex flex-col cursor-pointer overflow-hidden shadow-xl"
              >
                <div className="relative h-56 2xl:h-72 overflow-hidden">
                  <img
                    src={resourceBlog}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 font-sans text-xs text-white/60 mb-3">
                    <LuClock className="w-3.5 h-3.5 text-amber" />
                    <span>{post.meta}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#FDFBF7] font-bold leading-snug mb-4 group-hover:text-amber transition-colors duration-300 flex-grow">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 font-sans text-xs font-semibold text-amber tracking-[0.25em] uppercase pt-4 border-t border-white/10">
                    <span>Read Article</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11: WHITEPAPERS & REPORTS (Theme B — Clean White / Warm Cream) */}
      <section className="py-10 md:py-14 bg-[#FDFBF7] px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-forest leading-tight tracking-tight"
              >
                <span className="italic gradient-heading">Whitepapers</span>&nbsp; &
                Reports
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="font-sans text-forest/75 max-w-md mt-5 text-base sm:text-[17px] leading-relaxed mb-8"
              >
                Peer-reviewed thinking on the intersection of Ayurveda,
                artificial intelligence, and regenerative living. Download and
                read at your own pace.
              </motion.p>
              <motion.div
                variants={fadeUp}
                custom={2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl sm:rounded-3xl border border-forest/10 shadow-lg"
              >
                <img
                  src={resourceWhitepaper}
                  alt="Whitepapers reading desk"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-amber rounded-lg shadow-md">
                    <LuFileText className="w-5 h-5 text-forest" />
                  </div>
                  <span className="font-sans text-white text-xs font-semibold tracking-[0.25em] uppercase">
                    Library
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="space-y-5">
              {resourcesData[1].posts.map((paper, i) => (
                <motion.article
                  key={i}
                  variants={fadeUp}
                  custom={i * 0.4}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.35 }}
                  className="group relative bg-white rounded-2xl border border-forest/10 hover:border-amber/50 hover:shadow-[0_20px_40px_-12px_rgba(15,61,38,0.15)] transition-all duration-500 p-6 sm:p-8 flex items-start gap-5 sm:gap-7 cursor-pointer shadow-sm"
                >
                  <div className="shrink-0 w-16 h-20 sm:w-20 sm:h-24 rounded-xl bg-forest text-amber flex flex-col items-center justify-center relative overflow-hidden shadow-md">
                    <LuFileText className="w-6 h-6 sm:w-7 sm:h-7 mb-1" />
                    <span className="font-sans text-[9px] font-bold tracking-[0.15em]">
                      PDF
                    </span>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-amber/30 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-sans text-xs font-bold text-amber tracking-[0.25em] uppercase">
                        {paper.tag}
                      </span>
                      <span className="text-forest/30">·</span>
                      <span className="font-sans text-xs text-forest/55">
                        {paper.meta}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest leading-snug mb-4 group-hover:text-moss transition-colors duration-300">
                      {paper.title}
                    </h3>
                    <div className="flex items-center gap-2 font-sans text-xs font-semibold text-forest/70 tracking-[0.25em] uppercase group-hover:text-amber transition-colors duration-300">
                      <LuDownload className="w-4 h-4" />
                      <span>Download PDF</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12: PODCAST VIDEOS (Theme A — Premium Dark Gradient) */}
      <section className="py-10 md:py-14 bg-gradient-to-br from-[#FFFDF9] via-[#F7F2E4] to-[#E4EEE1] text-[#103F2A] px-4 sm:px-6 lg:px-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/50 to-transparent" />
          <div className="absolute -top-32 -right-24 w-[560px] h-[560px] rounded-full bg-[#E9C47A]/25 blur-[120px]" />
          <div className="absolute -bottom-40 -left-24 w-[620px] h-[620px] rounded-full bg-[#7FA98A]/25 blur-[130px]" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-white/60 blur-[110px]" />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(16,63,42,0.07) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
              maskImage:
                "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
            }}
          />
        </div>

        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="text-center mb-14">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#103F2A] tracking-tight"
            >
              Podcast <span className="italic gradient-heading">Videos</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="flex items-center justify-center gap-3 mt-6"
            >
              <span className="w-16 h-px bg-gradient-to-r from-transparent to-amber/80" />
              <span className="w-2 h-2 rotate-45 bg-amber" />
              <span className="w-16 h-px bg-gradient-to-l from-transparent to-amber/80" />
            </motion.div>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              className="font-sans text-[#3F5F4C] max-w-2xl mx-auto mt-6 text-base sm:text-[17px] leading-relaxed"
            >
              Long-form conversations with vaidyas, researchers, and community
              builders reimagining a hundred-year life.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {resourcesData[2].posts.map((ep, i) => (
              <motion.article
                key={i}
                variants={fadeUp}
                custom={i * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white/90 backdrop-blur-xl border border-[#EADFC3] hover:border-amber/60 rounded-[26px] overflow-hidden transition-all duration-500 cursor-pointer shadow-[0_12px_40px_rgba(16,63,42,0.08)] hover:shadow-[0_28px_70px_rgba(16,63,42,0.18)]"
              >
                <div className="p-3 pb-0">
                  <div className="relative aspect-video overflow-hidden rounded-[18px]">
                    <img
                      src={resourcePodcast}
                      alt={ep.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D3323]/65 via-[#0D3323]/10 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber/15 via-transparent to-transparent" />

                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="relative">
                        <div className="absolute -inset-3 rounded-full bg-white/30 blur-xl group-hover:bg-amber/50 transition-colors duration-500" />
                        <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-white/25 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-2xl">
                          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-amber flex items-center justify-center">
                            <LuPlay className="w-5 h-5 text-forest ml-0.5 fill-forest" />
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm font-sans">
                      <LuClock className="w-3 h-3 text-[#B8862F]" />
                      <span className="text-[11px] text-[#103F2A] font-semibold tracking-wide">
                        {ep.meta}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pt-6 pb-6">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#103F2A] leading-snug mb-5 group-hover:text-[#B8862F] transition-colors duration-300">
                    {ep.title}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-[#EFE6CE]">
                    <div className="flex items-center gap-2 font-sans text-xs font-semibold text-[#B8862F] tracking-[0.25em] uppercase">
                      <LuHeadphones className="w-4 h-4" />
                      <span>Watch Now</span>
                    </div>
                    <span className="w-9 h-9 rounded-full border border-[#E3D7B5] flex items-center justify-center text-[#B8862F] group-hover:bg-[#103F2A] group-hover:border-[#103F2A] group-hover:text-white transition-all duration-300">
                      <FiArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            className="text-center mt-14"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded gap-3 bg-[#10432D] text-white hover:bg-[#18583B] font-sans font-bold py-3 px-10 tracking-[0.2em] text-xs uppercase shadow-[0_14px_34px_rgba(16,67,45,0.28)] transition-all duration-300"
            >
              Browse All Episodes
              <FiArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
