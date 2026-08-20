import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiChevronRight, FiPlayCircle, FiArrowRight } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import {
  GiLotus,
  GiMeditation,
  GiHerbsBundle,
  GiCampfire,
  GiVillage,
  GiMicrophone,
  GiScrollQuill,
  GiInkSwirl,
} from "react-icons/gi";
import {
  LuRepeat,
  LuBookOpen,
  LuCrown,
  LuCamera,
  LuCpu,
  LuBriefcase,
  LuFileText,
  LuHeadphones,
  LuNewspaper,
  LuPlay,
  LuClock,
  LuDownload,
  LuBrainCircuit,
  LuInfinity,
  LuEarth,
  LuHandHeart,
  LuSparkles,
} from "react-icons/lu";
import {
  TbBrain,
  TbHeartRateMonitor,
  TbDeviceMobile,
  TbPlugConnectedX,
  TbWorldHeart,
  TbLeaf,
  TbUsers,
  TbRobot,
  TbPlant,
  TbTree,
  TbHeartHandshake,
  TbWorldStar,
  TbTargetArrow,
  TbAtom,
  TbUsersGroup,
  TbUserHeart,
} from "react-icons/tb";

import HeroImage from "../assets/HeroImage.png";
import serviceBarter from "../assets/service-barter.jpg";
import serviceGurukul from "../assets/service-gurukul.jpg";
import serviceMembership from "../assets/service-membership.jpg";
import serviceBranding from "../assets/service-branding.jpg";
import serviceDigital from "../assets/service-digital.jpg";
import serviceConsultancy from "../assets/service-consultancy.jpg";
import communitySwagram from "../assets/swagramaMain.webp";
import resourceBlog from "../assets/resource-blog.jpg";
import resourceWhitepaper from "../assets/resource-whitepaper.jpg";
import resourcePodcast from "../assets/resource-podcast.jpg";

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
    gradient: "from-forest/[0.06] to-amber/[0.04]",
  },
  {
    number: "02",
    tag: "Digital Wellness AI",
    title: "Global AyurX",
    desc: "A unified digital wellness ecosystem integrating AI, Ayurveda, and intelligent health platforms to deliver personalized healing, preventive care, and lifelong well-being.",
    btnText: "EXPLORE NOW",
    PrimaryIcon: LuBrainCircuit,
    AccentIcon: TbAtom,
    SubIcon: TbRobot,
    gradient: "from-forest/[0.06] to-amber/[0.04]",
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
    gradient: "from-forest/[0.06] to-amber/[0.04]",
  },
];

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

const cardData = [
  {
    title: "KNOWLEDGE",
    subtitle: "Understanding Life",
    desc: "JnanaYogAyu helps individuals understand the principles of holistic health, natural living, and conscious decision-making by blending ancient wisdom with modern insights.",
    backTitle: "Discover",
    backList: [
      "Self-awareness",
      "Holistic health education",
      "Preventive lifestyle practices",
      "Sustainable living",
      "Lifelong learning",
    ],
    Icon: LuBookOpen,
  },
  {
    title: "YOGA",
    subtitle: "Aligning Life",
    desc: "JnanaYogAyu promotes daily Yoga practices that reduce stress, improve resilience, and create lasting physical and mental well-being.",
    backTitle: "Experience",
    backList: [
      "Physical wellness",
      "Mental clarity",
      "Emotional balance",
      "Mindfulness",
      "Daily wellness practices",
    ],
    Icon: GiMeditation,
  },
  {
    title: "AYURVED",
    subtitle: "Living Life",
    desc: "Rooted in Ayurvedic principles, JnanaYogAyu encourages preventive healthcare through personalized nutrition, healthy routines, natural therapies, and lifestyle choices.",
    backTitle: "Achieve",
    backList: [
      "Preventive healthcare",
      "Healthy ageing",
      "Personalized wellness",
      "Natural nutrition",
      "Long-term vitality",
    ],
    Icon: GiHerbsBundle,
  },
];

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
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
  }),
};

function SectionLabel({ children }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="flex items-center gap-3 mb-4"
    >
      <div className="h-px w-8 bg-amber" />
      <span className="text-xs font-semibold tracking-[0.25em] text-amber uppercase">
        {children}
      </span>
      <div className="h-px w-8 bg-amber" />
    </motion.div>
  );
}

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="w-full overflow-x-hidden text-forest">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full  2xl:h-[92dvh] flex items-center overflow-hidden bg-forest"
      >
        <motion.div style={{ y: heroY }} className="absolute inset-0 z-0">
          <img
            src={HeroImage}
            alt="JnanaYogAyu wellness sanctuary bathed in golden light"
            width={1920}
            height={1280}
            className="w-full h-full object-cover object-center scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/75 to-forest/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
        </motion.div>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1]">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-amber/5 blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-amber/10 blur-2xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl xl:max-w-[1240px] 2xl:max-w-[1640px] mx-auto px-4 md:px-12 w-full pt-28 pb-20 "
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-2xl lg:max-w-3xl"
          >
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-10 bg-amber/70" />
              <span className="text-xs font-semibold tracking-[0.3em] text-amber uppercase">
                One Universe. One Community. One Life.
              </span>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-serif text-3xl  md:text-4xl lg:text-[50px] text-white grid mb-6 tracking-tight"
            >
              <span>
                {" "}
                The Digital&nbsp;
                <span className="text-amber italic">Intelligence</span>
              </span>

              <span className="mt-3"> of Natural Living</span>
            </motion.h1>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4 mb-8"
            >
              <div className="h-px w-12 bg-amber" />
              <HiSparkles className="w-5 h-5 text-amber shrink-0" />
              <div className="h-px w-80 bg-amber/50" />
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl"
            >
              Your gateway to Ayurveda, Wellness, Learning, Community and a
              Sustainable Life.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: "#1a5c3a" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex items-center rounded justify-center gap-3 px-8 py-4 bg-forest border border-amber/60 text-white font-semibold tracking-wider text-sm hover:border-amber transition-all duration-300"
              >
                Explore JYA <FiChevronRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  backgroundColor: "rgba(255,255,255,0.12)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center rounded gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold tracking-wider text-sm hover:border-white/60 transition-all duration-300"
              >
               Join The Movement 
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHAT IS JYA */}
      <section className="py-10 md:py-16 bg-ivory px-4 sm:px-6 lg:px-14 2xl:px-[75px]">
        <div className="max-w-7xl xl:max-w-[1240px] 2xl:max-w-[1640px]  mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
            <div>
              <SectionLabel>What is JYA</SectionLabel>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="font-serif text-3xl md:text-4xl text-forest leading-[1.15] mb-5"
              >
                Ancient Wisdom.
                <br />
                <span className="text-amber italic">Modern Intelligence.</span>
                <br />A Better Way of Living.
              </motion.h2>
              <motion.div
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="space-y-3 text-forest/75 leading-relaxed text-[17px]"
              >
                <p>
                  <span className="font-semibold text-forest">JnanaYogAyu</span>{" "}
                  is an integrated wellness ecosystem that combines the timeless
                  principles of{" "}
                  <span className="font-bold text-forest">
                    Knowledge (Jnana), Yoga, and Ayurveda (Ayu)
                  </span>{" "}
                  with modern science and digital intelligence. It empowers
                  individuals, families, communities, and organizations to
                  embrace a healthier, more balanced, and sustainable way of
                  life.
                </p>
                <p>
                  Whether your goal is preventive healthcare, holistic wellness,
                  longevity, or conscious living,{" "}
                  <span className="font-semibold text-forest">JnanaYogAyu</span>{" "}
                  provides a practical framework to help you reconnect with your
                  mind, body, nature, and purpose.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {cardData.map((card, index) => (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  custom={index * 0.5}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className="group  h-[380px] [perspective:1200px] cursor-pointer"
                >
                  <div className="relative w-full h-full  transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    <div className="absolute inset-0 rounded-lg bg-white border border-forest/15 p-6 flex flex-col items-center justify-center text-center [backface-visibility:hidden] shadow-sm hover:shadow-md transition-shadow">
                      <card.Icon className="w-8 h-8 text-amber mb-3" />
                      <h3 className="text-sm font-bold text-forest tracking-[0.2em] mb-2">
                        {card.title}
                      </h3>
                      <p className="text-xs text-amber font-medium mb-5 tracking-wide italic">
                        {card.subtitle}
                      </p>
                      <div className="w-8 h-px bg-amber/50 mb-5" />
                      <p className="text-forest/70 leading-relaxed text-xs">
                        {card.desc}
                      </p>
                    </div>
                    <div className="absolute inset-0 rounded-lg bg-forest border border-forest p-6 flex flex-col justify-center [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-xl">
                      <h4 className="text-xs font-bold text-amber tracking-[0.2em] uppercase mb-5">
                        {card.backTitle}
                      </h4>
                      <ul className="space-y-3">
                        {card.backList.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <div className="w-1 h-1 rounded-full bg-amber mt-2 shrink-0" />
                            <span className="text-white/85 text-xs leading-snug">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NEEDS */}
      <section className="py-10 md:py-16 bg-forest px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-moss/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-moss/30 blur-3xl" />
        </div>
        <div className="max-w-5xl 2xl:max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-7 md:mb-12">
            <SectionLabel>Why Choose JYA</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-serif text-3xl md:text-4xl text-white leading-tight"
            >
              Why Humanity <span className="italic text-amber">Needs</span> JYA
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-4xl mx-auto gap-5">
            {needsData.map((box, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber/30 transition-all duration-500 group"
              >
                <div
                  className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-[0.07] rounded-bl-full"
                  style={{
                    background:
                      "radial-gradient(circle, #C9A96E 0%, transparent 70%)",
                  }}
                />
                <div className="px-6 pt-5 pb-3 flex items-center justify-between border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-px bg-amber/60" />
                    <span className="text-[10px] font-bold tracking-[0.3em] text-amber/70 uppercase">
                      {box.label}
                    </span>
                    <div className="w-4 h-px bg-amber/60" />
                  </div>
                  <span className="text-[9px] font-semibold tracking-[0.2em] text-white/20">
                    0{index + 1} / 02
                  </span>
                </div>
                <ul className="px-6 py-3 divide-y divide-white/[0.06]">
                  {box.items.map(({ text, Icon, desc }, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.08 + index * 0.12,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ x: 3 }}
                      className="flex items-center gap-4 py-3 group/item cursor-default"
                    >
                      <div className="shrink-0 w-9 h-9 rounded-lg flex items-center justify-center border border-amber/20 bg-amber/[0.08] group-hover/item:bg-amber/[0.14] group-hover/item:border-amber/35 transition-all duration-300">
                        <Icon className="w-4 h-4 text-amber" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white leading-tight">
                          {text}
                        </p>
                        <p className="text-[11px] text-white/35 mt-0.5 leading-snug">
                          {desc}
                        </p>
                      </div>
                      <span className="shrink-0 text-[10px] font-semibold tabular-nums text-amber/20 group-hover/item:text-amber/45 transition-colors duration-300">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </motion.li>
                  ))}
                </ul>
                <div
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(201,169,110,0.4), transparent)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-ivory px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl  mx-auto">
          <div className="text-center mb-7">
            <SectionLabel>Our Pillars</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-serif text-3xl md:text-4xl text-forest"
            >
              The <span className="italic text-amber">JYA</span> Ecosystem
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px w-16 bg-amber/50 mx-auto mt-5 origin-center"
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
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.4 }}
                className="group relative flex flex-col bg-white rounded-2xl border border-forest/8 px-8 pt-10 pb-8 hover:shadow-[0_24px_56px_-12px_rgba(15,61,38,0.13)] hover:border-amber/35 transition-all duration-500 overflow-hidden cursor-pointer"
              >
                <span className="absolute top-5 right-6 font-serif text-7xl font-bold text-forest/[0.05] select-none leading-none group-hover:text-amber/10 transition-colors duration-500">
                  {card.number}
                </span>

                <div className="relative z-10 mb-7">
                  <div className="w-14 h-14 rounded-full border border-amber/30 bg-amber/[0.07] flex items-center justify-center group-hover:bg-amber/[0.13] group-hover:border-amber/55 transition-all duration-400">
                    <card.PrimaryIcon
                      className="w-6 h-6 text-amber"
                      strokeWidth={1.4}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="h-px w-5 bg-amber/50" />
                  <span className="text-[10px] font-semibold tracking-[0.28em] text-amber/65 uppercase">
                    {card.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-bold text-forest mb-3 leading-snug group-hover:text-moss transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-forest/55 text-sm leading-relaxed flex-grow mb-8">
                  {card.desc}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-forest/8">
                  <motion.button
                    whileHover={{ gap: "12px" }}
                    className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] text-forest uppercase transition-all duration-300"
                  >
                    {card.btnText}
                    <FiArrowRight className="w-3.5 h-3.5 text-amber group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                  <div className="w-6 h-6 rounded-full border border-forest/10 flex items-center justify-center group-hover:border-amber/40 group-hover:bg-amber/[0.08] transition-all duration-300">
                    <card.AccentIcon
                      className="w-3 h-3 text-forest/25 group-hover:text-amber/60 transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-10 md:py-16 bg-white px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto">
          <div className="text-center mb-7">
            <SectionLabel>What We Offer</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-serif text-4xl md:text-5xl text-forest"
            >
              Our <span className="italic text-amber">Services</span>
            </motion.h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-px w-24 bg-amber mx-auto mt-6 origin-left"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {servicesData.map((service, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                custom={index * 0.5}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-ivory rounded-lg border border-forest/10 overflow-hidden cursor-pointer hover:shadow-[0_28px_56px_-12px_rgba(15,61,38,0.25)] hover:border-amber/40 transition-all duration-500"
              >
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-11 h-11 flex items-center justify-center bg-amber/95 backdrop-blur-md border border-amber">
                      <service.Icon className="w-5 h-5 text-forest" />
                    </div>
                  </div>
                </div>
                <div className="relative p-6 md:p-7">
                  <h3 className="text-base font-bold text-forest tracking-wide leading-snug mb-2 group-hover:text-moss transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-forest/60 text-xs leading-relaxed mb-4">
                    {service.blurb}
                  </p>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-amber tracking-[0.25em] uppercase">
                    <span>Discover</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITIES */}
      <section className="py-10 md:py-16 bg-forest px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
          <div className="absolute -top-64 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-moss/20 blur-3xl" />
        </div>
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="mb-16">
            <SectionLabel>Communities</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-serif text-3xl md:text-4xl text-white"
            >
              Our <span className="italic text-amber">Communities</span>
            </motion.h2>
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="relative rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:border-amber/30 transition-all duration-500 group overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 ">
              <div className="relative min-h-[280px] md:min-h-[420px] overflow-hidden">
                <img
                  src={communitySwagram}
                  alt="Swagram — sustainable community living"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-forest/60 via-transparent to-forest/40" />
              </div>
              <div className="relative z-10 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-amber" />
                  <span className="text-xs font-semibold tracking-[0.25em] text-amber uppercase">
                    Featured Community
                  </span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">
                  {communitiesData.title}
                </h3>
                <p className="text-white/65 leading-relaxed text-lg max-w-2xl mb-8">
                  {communitiesData.desc}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    style={{
                      backgroundColor: "#FDFBF7",
                      color: "#0F3D26",
                      border: "1px solid #FDFBF7",
                    }}

                    whileTap={{ scale: 0.97 }}
                    className="self-start flex items-center gap-4 font-bold py-3 px-6 tracking-[0.2em] text-sm transition-all duration-300 group/btn rounded-md"
                  >
                    {communitiesData.btnText}
                    <FiArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ BLOGS ============ */}
      <section className="py-10 md:py-16 bg-ivory px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16">
            <div>
              <SectionLabel>Journal</SectionLabel>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="font-serif text-3xl md:text-4xl text-forest"
              >
                Blogs
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-forest/65 max-w-xl mt-4 text-[16px] leading-relaxed"
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
              viewport={{ once: true }}
              className="hidden md:inline-flex items-center gap-2 text-[11px] font-semibold text-amber tracking-[0.25em] uppercase cursor-pointer hover:gap-3 transition-all duration-300"
            >
              View All Articles <FiArrowRight className="w-3.5 h-3.5" />
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
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white rounded-lg border border-forest/10 overflow-hidden hover:border-amber/40 hover:shadow-[0_28px_56px_-12px_rgba(15,61,38,0.2)] transition-all duration-500 flex flex-col cursor-pointer"
              >
                <div className="relative h-56 2xl:h-72 overflow-hidden">
                  <img
                    src={resourceBlog}
                    alt={post.title}
                    loading="lazy"
                    style={{
                      objectPosition: `${20 + i * 30}% ${30 + i * 15}%`,
                    }}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent" />
                  <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md text-[10px] font-bold text-forest tracking-[0.2em] uppercase">
                    {post.tag}
                  </span>
                </div>
                <div className="p-6 md:p-7 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[11px] text-forest/50 mb-3">
                    <LuClock className="w-3 h-3" />
                    <span>{post.meta}</span>
                  </div>
                  <h3 className="font-serif text-xl text-forest leading-snug mb-4 group-hover:text-moss transition-colors duration-300 flex-grow">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-amber tracking-[0.25em] uppercase pt-4 border-t border-forest/10">
                    <span>Read Article</span>
                    <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-amber group-hover:w-full transition-all duration-700 ease-out" />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHITEPAPERS ============ */}
      <section className="py-10 md:py-16 bg-white px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <SectionLabel>Research</SectionLabel>
              <motion.h2
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="font-serif text-3xl md:text-4xl text-forest leading-tight"
              >
                <span className="italic text-amber">Whitepapers</span>&nbsp; &
                Reports
              </motion.h2>
              <motion.p
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-forest/65 max-w-md mt-5 text-[16px] leading-relaxed mb-8"
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
                viewport={{ once: true }}
                className="relative aspect-[4/3] overflow-hidden rounded-lg border border-forest/10"
              >
                <img
                  src={resourceWhitepaper}
                  alt="Whitepapers reading desk"
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-amber">
                    <LuFileText className="w-4 h-4 text-forest" />
                  </div>
                  <span className="text-white text-xs font-semibold tracking-[0.25em] uppercase">
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
                  viewport={{ once: true, margin: "-60px" }}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.35 }}
                  className="group relative bg-ivory rounded-lg border border-forest/10 hover:border-amber/50 hover:shadow-[0_20px_40px_-12px_rgba(15,61,38,0.15)] transition-all duration-500 p-6 md:p-8 flex items-start gap-5 md:gap-7 cursor-pointer"
                >
                  <div className="shrink-0 w-16 h-20 md:w-20 md:h-24 rounded bg-forest text-amber flex flex-col items-center justify-center relative overflow-hidden">
                    <LuFileText className="w-6 h-6 md:w-7 md:h-7 mb-1" />
                    <span className="text-[9px] font-bold tracking-[0.15em]">
                      PDF
                    </span>
                    <div className="absolute top-0 right-0 w-3 h-3 bg-amber/30 [clip-path:polygon(100%_0,0_0,100%_100%)]" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[10px] font-bold text-amber tracking-[0.25em] uppercase">
                        {paper.tag}
                      </span>
                      <span className="text-forest/30">·</span>
                      <span className="text-[11px] text-forest/55">
                        {paper.meta}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl md:text-2xl text-forest leading-snug mb-4 group-hover:text-moss transition-colors duration-300">
                      {paper.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] font-semibold text-forest/70 tracking-[0.25em] uppercase group-hover:text-amber transition-colors duration-300">
                      <LuDownload className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PODCAST VIDEOS ============ */}
      <section className="py-10 md:py-16 bg-ivory px-4 sm:px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber/30 to-transparent" />
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-moss/25 blur-3xl" />
        </div>
        <div className="max-w-7xl 2xl:max-w-[1540px] mx-auto relative z-10">
          <div className="text-center mb-7">
            <SectionLabel>Listen & Watch</SectionLabel>
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="font-serif text-3xl md:text-4xl text-forest"
            >
              Podcast <span className="italic text-moss">Videos</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-forest/70 max-w-2xl mx-auto mt-5 text-[16px] leading-relaxed"
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
                viewport={{ once: true, margin: "-60px" }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white border border-forest/10 hover:border-amber/50 rounded-lg overflow-hidden transition-all duration-500 cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={resourcePodcast}
                    alt={ep.title}
                    loading="lazy"
                    style={{ objectPosition: `${25 + i * 25}% center` }}
                    className="w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/30 to-forest/40" />

                  {/* Play button */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-amber/30 blur-xl group-hover:bg-amber/50 transition-colors duration-500" />
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-amber flex items-center justify-center shadow-2xl">
                        <LuPlay className="w-6 h-6 md:w-7 md:h-7 text-forest ml-1 fill-forest" />
                      </div>
                    </div>
                  </motion.div>

                  {/* Duration badge */}
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 bg-forest/85 backdrop-blur-md">
                    <LuClock className="w-3 h-3 text-amber" />
                    <span className="text-[11px] text-white font-semibold tracking-wide">
                      {ep.meta}
                    </span>
                  </div>

                  {/* Episode tag */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-amber text-forest text-[10px] font-bold tracking-[0.2em] uppercase">
                    {ep.tag}
                  </div>
                </div>

                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-lg md:text-xl text-forest leading-snug mb-4 group-hover:text-moss transition-colors duration-300">
                    {ep.title}
                  </h3>
                  <div className="flex items-center justify-between pt-4 border-t border-forest/10">
                    <div className="flex items-center gap-2 text-[10px] font-semibold text-amber tracking-[0.25em] uppercase">
                      <LuHeadphones className="w-3.5 h-3.5" />
                      <span>Watch Now</span>
                    </div>
                    <FiArrowRight className="w-4 h-4 text-amber group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <motion.button
              whileHover={{
                scale: 1.02,
                backgroundColor: "#0f3d26",
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-lg gap-3 border border-forest/20 text-forest hover:text-white font-semibold py-4 px-10 tracking-[0.2em] text-xs uppercase transition-all duration-300"
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
