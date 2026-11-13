import { yupResolver } from "@hookform/resolvers/yup";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiArrowRight,
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiCompass,
  FiDownload,
  FiExternalLink,
  FiHeart,
  FiLock,
  FiMoon,
  FiSun,
  FiUsers,
  FiWind,
  FiX,
} from "react-icons/fi";
import {
  PiCloudRain,
  PiPlant,
  PiSnowflake,
  PiSparkle,
  PiSunHorizon,
} from "react-icons/pi";
import { Link } from "react-router-dom";
import Snowfall from "react-snowfall";
import DropdownField from "../../common/formFields/DropdownField";
import InputArea from "../../common/formFields/InputArea";
import InputField from "../../common/formFields/InputField";
import { ModalStyle } from "../../common/modalStyle/ModalStyle";

import sunriseRiverImg from "../../assets/Golden Sunrise River Retreat.webp";
import gardenLessonImg from "../ui/assets/joincommunity/Ayurvedic Garden Lesson with the Guru.webp";
import botanicalStillLifeImg from "../ui/assets/marketplace/Ayurvedic Herbal Still Life.webp";
import forestStreamImg from "../ui/assets/marketplace/Serene Forest Stream Meditation.webp";
import shirodharaImg from "../ui/assets/marketplace/Serene Shirodhara Ayurvedic Spa Ritual.webp";
import heroImg from "../ui/assets/marketplace/Sunrise Garden Meditation Retreat.webp";
import rainyAcademyHd from "./assets/rainy-academy-hd.webp";
import summerAcademyHd from "./assets/summer-academy-hd.webp";
import winterAcademyHd from "./assets/winter-academy-hd.webp";
import {
  ageGroups,
  challengeDefaults,
  challengeSchema,
  enquireDefaults,
  enquireSchema,
  languages,
  referralSources,
  step1Fields,
} from "./shatayusSchema";

import GoldenGardenWellnessChecklist from "./assets/resource-conscious-living-checklist.webp";
import BotanicalBookCoverMeditation from "./assets/resource-healthy-longevity-guide.webp";
import ABeginnersGuidetoSeasonalLiving from "./assets/resource-seasonal-living-guide.webp";
import SereneHerbalWellnessJournalStillLife from "./assets/resource-self-awareness-journal.webp";
import shatayusCommunityLivingImg from "./assets/shatayus-community-living.webp";
import shatayusConsciousLongevityImg from "./assets/shatayus-conscious-longevity.webp";
import shatayusHolisticLivingImg from "./assets/shatayus-holistic-living.webp";
import shatayusSeasonalWisdomImg from "./assets/shatayus-seasonal-wisdom.webp";
import shatayusSelfAwarenessImg from "./assets/shatayus-self-awareness.webp";

const philosophyPillars = [
  {
    num: "01",
    image: shatayusSelfAwarenessImg,
    alt: "Ayurvedic mindful self-awareness with herbal infusion and whole spices",
    text: "We live in a world where people know their diagnoses, medicines and symptoms, but often know very little about their own bodies, minds and lifestyle patterns.",
  },
  {
    num: "02",
    image: shatayusHolisticLivingImg,
    alt: "Ayurvedic open-air wellness sanctuary surrounded by nature",
    text: "Shatayus invites you to look beyond illness and discover the deeper dimensions of wellbeing. It is a transformative journey of self-discovery, lifestyle awareness and holistic living, inspired by the wisdom of Ayurveda, the rhythms of nature and the importance of community.",
  },
  {
    num: "03",
    image: shatayusConsciousLongevityImg,
    alt: "Radiant elder walking peacefully in an Ayurvedic garden sanctuary",
    text: "Through four progressive phases, Shatayus takes you from understanding yourself to making conscious lifestyle choices and building a way of life that supports healthy ageing and longevity.",
    motto:
      "Shatayus brings greater awareness, balance and meaning to the years we live.",
  },
];

const transformationPhases = [
  {
    num: "01",
    title: "Who Am I? – Discover Yourself",
    lead: "Every transformation begins with self-awareness. Understand your body constitution, mental tendencies, energy levels and overall wellness through guided assessments and personal reflection.",
    detail:
      "Explore your Wellness Graph, Constitution, Mind and Immunity to develop a deeper understanding of your unique health profile.",
    icon: FiCompass,
    image: forestStreamImg,
  },
  {
    num: "02",
    title: "Why Am I Suffering? – Understand Your Patterns",
    lead: "Your everyday choices shape your wellbeing. Explore the influence of lifestyle, habits, emotions and stress on your physical and mental health.",
    detail:
      "Understand how sleep, food, relationships, work patterns and emotional responses influence the way you feel and live. The focus is on awareness, not blame.",
    icon: FiMoon,
    image: shirodharaImg,
  },
  {
    num: "03",
    title: "How Do I Heal? – Build a Foundation for Wellness",
    lead: "Discover the principles of Ayurveda and natural living through mindful nutrition, yoga, breathwork, movement, rest and connection with nature.",
    detail:
      "Experience practical approaches to building healthier routines and supporting your body's natural wellbeing. Learn to make informed, sustainable lifestyle choices.",
    icon: FiWind,
    image: botanicalStillLifeImg,
  },
  {
    num: "04",
    title: "How Do I Live 100 Years? – Embrace Longevity",
    lead: "Explore the foundations of a conscious, longevity-oriented lifestyle through Shatayus Living, Seasonal Living and Community Living.",
    detail:
      "Learn the relevance of daily and seasonal routines, family culture, mindful living and social connections in supporting healthy ageing and a meaningful life.",
    icon: FiSun,
    image: gardenLessonImg,
  },
];

const RainStreaksCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const setSize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : canvas.offsetWidth || 700;
      canvas.height = parent ? parent.clientHeight : canvas.offsetHeight || 450;
    };
    setSize();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => setSize())
        : null;
    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", setSize);

    const drops = Array.from({ length: 85 }, () => ({
      x: Math.random() * (canvas.width || 700),
      y: Math.random() * (canvas.height || 450),
      length: Math.random() * 24 + 16,
      speed: Math.random() * 10 + 14,
      opacity: Math.random() * 0.55 + 0.3,
      thickness: Math.random() * 1.4 + 0.9,
    }));

    const render = () => {
      if (!canvas.width || !canvas.height) setSize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(215, 240, 255, ${drop.opacity})`;
        ctx.lineWidth = drop.thickness;
        ctx.lineCap = "round";
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 4, drop.y + drop.length);
        ctx.stroke();

        drop.y += drop.speed;
        drop.x -= 1.6;

        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * (canvas.width + 140);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
};

const SummerSunlightCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;

    const setSize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : canvas.offsetWidth || 700;
      canvas.height = parent ? parent.clientHeight : canvas.offsetHeight || 450;
    };
    setSize();

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => setSize())
        : null;
    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener("resize", setSize);

    // Volumetric sunbeams radiating from the upper-right solar source
    const rays = [
      {
        angle: 0.52,
        spread: 0.09,
        lengthFactor: 1.35,
        alpha: 0.22,
        speed: 0.012,
        phase: 0,
      },
      {
        angle: 0.68,
        spread: 0.12,
        lengthFactor: 1.45,
        alpha: 0.28,
        speed: 0.016,
        phase: 1.4,
      },
      {
        angle: 0.86,
        spread: 0.08,
        lengthFactor: 1.25,
        alpha: 0.19,
        speed: 0.014,
        phase: 2.8,
      },
      {
        angle: 1.04,
        spread: 0.11,
        lengthFactor: 1.3,
        alpha: 0.24,
        speed: 0.011,
        phase: 4.1,
      },
      {
        angle: 1.22,
        spread: 0.07,
        lengthFactor: 1.15,
        alpha: 0.17,
        speed: 0.015,
        phase: 5.2,
      },
    ];

    // Warm golden bokeh flares & rising heat-shimmer orbs (drifting upward, never falling like snow)
    const bokehOrbs = Array.from({ length: 18 }, () => ({
      xRatio: Math.random(),
      yRatio: Math.random(),
      radius: Math.random() * 26 + 10,
      driftX: (Math.random() - 0.5) * 0.25,
      driftY: -(Math.random() * 0.35 + 0.12),
      alpha: Math.random() * 0.18 + 0.08,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.025 + 0.015,
    }));

    const render = () => {
      if (!canvas.width || !canvas.height) setSize();
      const w = canvas.width;
      const h = canvas.height;
      time += 1;

      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      // 1. Radiant Sun Source in Upper-Right Corner
      const sunX = w * 0.92;
      const sunY = h * 0.06;
      const sunPulse = 1 + 0.08 * Math.sin(time * 0.025);
      const sunGrad = ctx.createRadialGradient(
        sunX,
        sunY,
        4,
        sunX,
        sunY,
        Math.max(w, h) * 0.55 * sunPulse,
      );
      sunGrad.addColorStop(0, "rgba(255, 250, 220, 0.75)");
      sunGrad.addColorStop(0.18, "rgba(255, 220, 130, 0.42)");
      sunGrad.addColorStop(0.48, "rgba(255, 185, 75, 0.16)");
      sunGrad.addColorStop(1, "rgba(255, 170, 50, 0)");
      ctx.fillStyle = sunGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Volumetric Diagonal Sunbeams (God-Rays)
      const maxLen = Math.hypot(w, h);
      rays.forEach((ray) => {
        const sway = Math.sin(time * ray.speed + ray.phase) * 0.025;
        const currentAlpha =
          ray.alpha *
          (0.75 + 0.25 * Math.sin(time * ray.speed * 1.3 + ray.phase));
        const a1 = Math.PI - (ray.angle - ray.spread + sway);
        const a2 = Math.PI - (ray.angle + ray.spread + sway);
        const rayLen = maxLen * ray.lengthFactor;

        const grad = ctx.createLinearGradient(
          sunX,
          sunY,
          sunX + Math.cos((a1 + a2) / 2) * rayLen,
          sunY + Math.sin((a1 + a2) / 2) * rayLen,
        );
        grad.addColorStop(0, `rgba(255, 242, 185, ${currentAlpha})`);
        grad.addColorStop(0.45, `rgba(255, 210, 115, ${currentAlpha * 0.55})`);
        grad.addColorStop(1, "rgba(255, 190, 80, 0)");

        ctx.beginPath();
        ctx.moveTo(sunX, sunY);
        ctx.lineTo(sunX + Math.cos(a1) * rayLen, sunY + Math.sin(a1) * rayLen);
        ctx.lineTo(sunX + Math.cos(a2) * rayLen, sunY + Math.sin(a2) * rayLen);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // 3. Rising Warm Golden Bokeh & Sun-Flare Orbs
      bokehOrbs.forEach((orb) => {
        orb.pulse += orb.pulseSpeed;
        orb.xRatio += orb.driftX / Math.max(w, 400);
        orb.yRatio += orb.driftY / Math.max(h, 300);

        if (orb.yRatio < -0.1) {
          orb.yRatio = 1.1;
          orb.xRatio = Math.random();
        }
        if (orb.xRatio < -0.1) orb.xRatio = 1.1;
        if (orb.xRatio > 1.1) orb.xRatio = -0.1;

        const ox = orb.xRatio * w;
        const oy = orb.yRatio * h;
        const r = orb.radius * (0.9 + 0.15 * Math.sin(orb.pulse));
        const a = orb.alpha * (0.65 + 0.35 * Math.sin(orb.pulse));

        const orbGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, r);
        orbGrad.addColorStop(0, `rgba(255, 240, 175, ${a})`);
        orbGrad.addColorStop(0.65, `rgba(255, 200, 95, ${a * 0.5})`);
        orbGrad.addColorStop(1, "rgba(255, 180, 60, 0)");

        ctx.beginPath();
        ctx.arc(ox, oy, r, 0, Math.PI * 2);
        ctx.fillStyle = orbGrad;
        ctx.fill();
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
    />
  );
};

const SeasonalAtmosphere = ({ seasonId }) => {
  if (seasonId === "winter") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <Snowfall
          color="#ffffff"
          snowflakeCount={110}
          speed={[0.6, 1.8]}
          wind={[-0.4, 1.0]}
          radius={[1.0, 3.2]}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2E1F]/50 via-transparent to-transparent" />
      </div>
    );
  }

  if (seasonId === "rainy") {
    return (
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        <Snowfall
          color="#cfeaff"
          snowflakeCount={150}
          speed={[9.0, 16.0]}
          wind={[-2.2, -1.0]}
          radius={[1.0, 2.3]}
        />
        <RainStreaksCanvas />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#071E14]/65 via-[#071E14]/15 to-transparent" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <SummerSunlightCanvas />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B2E1F]/40 via-transparent to-[#FFE49E]/15" />
    </div>
  );
};

const seasonalAcademiesData = [
  {
    id: "rainy",
    name: "Rainy Academy",
    image: rainyAcademyHd,
    icon: PiCloudRain,
  },
  {
    id: "summer",
    name: "Summer Academy",
    image: summerAcademyHd,
    icon: PiSunHorizon,
  },
  {
    id: "winter",
    name: "Winter Academy",
    image: winterAcademyHd,
    icon: PiSnowflake,
  },
];

const whyDimensions = [
  {
    num: "01",
    title: "Self-awareness",
    text: "Understanding your body, mind and individual constitution.",
    icon: FiHeart,
    image: shatayusSelfAwarenessImg,
    alt: "Ayurvedic mindful self-awareness and herbal reflection",
  },
  {
    num: "02",
    title: "Natural living",
    text: "Applying the principles of Ayurveda and mindful lifestyle practices.",
    icon: PiPlant,
    image: shatayusHolisticLivingImg,
    alt: "Ayurvedic natural living courtyard and botanicals",
  },
  {
    num: "03",
    title: "Seasonal wisdom",
    text: "Aligning everyday living with nature's changing rhythms.",
    icon: FiSun,
    image: shatayusSeasonalWisdomImg,
    alt: "Ayurvedic seasonal transition and medicinal herbs",
  },
  {
    num: "04",
    title: "Community living",
    text: "Building healthier relationships, families and communities through shared learning and conscious living.",
    icon: FiUsers,
    image: shatayusCommunityLivingImg,
    alt: "Ayurvedic community gathering under the sacred banyan tree",
  },
];

const downloadableResources = [
  {
    id: 1,
    title: "The 7-Day Self-Awareness Journal",
    desc: "A guided journal to observe sleep, food, energy, emotions and daily habits.",
    image: SereneHerbalWellnessJournalStillLife,
  },
  {
    id: 2,
    title: "A Beginner's Guide to Seasonal Living",
    desc: "An introduction to seasonal routines, food and nature-inspired living.",
    image: ABeginnersGuidetoSeasonalLiving,
  },
  {
    id: 3,
    title: "The Conscious Living Checklist",
    desc: "25 everyday questions to reflect on personal wellbeing and lifestyle.",
    image: GoldenGardenWellnessChecklist,
  },
  {
    id: 4,
    title: "The Shatayus Guide to Healthy Longevity",
    desc: "A concise introduction to the philosophy and five pillars of Shatayus.",
    image: BotanicalBookCoverMeditation,
  },
];

const challengeModalSx = {
  ...ModalStyle,
  width: { xs: "95vw", sm: 650 },
  borderRadius: "28px",
  p: 0,
  maxHeight: "92vh",
  overflow: "hidden",
  bgcolor: "#FAF5E8",
  border: "1px solid rgba(213, 163, 84, 0.45)",
  boxShadow: "0 28px 80px rgba(7, 30, 20, 0.45)",
};

const enquireModalSx = {
  ...ModalStyle,
  width: { xs: "92vw", sm: 500 },
  borderRadius: "24px",
  p: { xs: 3, sm: 4.5 },
  maxHeight: "90vh",
  bgcolor: "#FAF5E8",
  border: "1px solid #E7D7B5",
};

const membershipModalSx = {
  ...ModalStyle,
  width: { xs: "90vw", sm: 440 },
  borderRadius: "24px",
  p: { xs: 3.5, sm: 4 },
  bgcolor: "#FAF5E8",
  border: "1px solid #D5A354",
};

export default function ShatayushWorld() {
  const reduced = useReducedMotion();

  const [challengeOpen, setChallengeOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [membershipOpen, setMembershipOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  const [challengeStep, setChallengeStep] = useState(1);
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);
  const [enquireSubmitted, setEnquireSubmitted] = useState(false);

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [seasonIndex, setSeasonIndex] = useState(0);
  const [resourceIndex, setResourceIndex] = useState(0);

  const anyModalOpen = challengeOpen || enquireOpen || membershipOpen;

  useEffect(() => {
    if (anyModalOpen) {
      document.documentElement.setAttribute("data-lenis-prevent", "true");
      document.body.setAttribute("data-lenis-prevent", "true");
      document.documentElement.classList.add(
        "overflow-hidden",
        "lenis-stopped",
      );
      document.body.classList.add("overflow-hidden", "lenis-stopped");
    } else {
      document.documentElement.removeAttribute("data-lenis-prevent");
      document.body.removeAttribute("data-lenis-prevent");
      document.documentElement.classList.remove(
        "overflow-hidden",
        "lenis-stopped",
      );
      document.body.classList.remove("overflow-hidden", "lenis-stopped");
    }

    return () => {
      document.documentElement.removeAttribute("data-lenis-prevent");
      document.body.removeAttribute("data-lenis-prevent");
      document.documentElement.classList.remove(
        "overflow-hidden",
        "lenis-stopped",
      );
      document.body.classList.remove("overflow-hidden", "lenis-stopped");
    };
  }, [anyModalOpen]);

  const {
    control: cControl,
    handleSubmit: cHandleSubmit,
    trigger: cTrigger,
    reset: cReset,
    formState: { errors: cErrors },
  } = useForm({
    resolver: yupResolver(challengeSchema),
    defaultValues: challengeDefaults,
    mode: "onChange",
  });

  const {
    control: eControl,
    handleSubmit: eHandleSubmit,
    reset: eReset,
    formState: { errors: eErrors },
  } = useForm({
    resolver: yupResolver(enquireSchema),
    defaultValues: enquireDefaults,
    mode: "onChange",
  });

  const handleOpenChallenge = () => {
    cReset(challengeDefaults);
    setChallengeStep(1);
    setChallengeSubmitted(false);
    setChallengeOpen(true);
  };

  const handleNextChallengeStep = async () => {
    const isValid = await cTrigger(step1Fields);
    if (isValid) setChallengeStep(2);
  };

  const handleChallengeSubmit = () => {
    setChallengeSubmitted(true);
  };

  const handleOpenEnquire = () => {
    eReset(enquireDefaults);
    setEnquireSubmitted(false);
    setEnquireOpen(true);
  };

  const handleEnquireSubmit = () => {
    setEnquireSubmitted(true);
  };

  const handleResourceClick = (title) => {
    setSelectedResource(title);
    setMembershipOpen(true);
  };

  const nextPhase = () =>
    setPhaseIndex((prev) => (prev + 1) % transformationPhases.length);
  const prevPhase = () =>
    setPhaseIndex(
      (prev) =>
        (prev - 1 + transformationPhases.length) % transformationPhases.length,
    );

  const nextSeason = () =>
    setSeasonIndex((prev) => (prev + 1) % seasonalAcademiesData.length);
  const prevSeason = () =>
    setSeasonIndex(
      (prev) =>
        (prev - 1 + seasonalAcademiesData.length) %
        seasonalAcademiesData.length,
    );

  const nextResource = () =>
    setResourceIndex((prev) => (prev + 1) % downloadableResources.length);
  const prevResource = () =>
    setResourceIndex(
      (prev) =>
        (prev - 1 + downloadableResources.length) %
        downloadableResources.length,
    );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FAF5E8] text-[#29382E] antialiased">
      <aside
        aria-label="Quick Challenge Registration"
        className="fixed bottom-5 right-5 z-50"
      >
        <button
          onClick={handleOpenChallenge}
          className="flex items-center gap-2.5 rounded-full border border-[#D5A354] bg-[#0F3D29] px-5 py-3 font-sans text-sm font-semibold text-[#FFFDF7] shadow-[0_12px_36px_rgba(15,61,41,0.4)] transition-all hover:bg-[#145235] hover:shadow-[0_16px_40px_rgba(200,147,63,0.35)]"
        >
          <PiSparkle className="h-4 w-4 text-[#E8C581]" />
          <span className="font-serif">Take a Challenge</span>
          <FiArrowRight className="h-3.5 w-3.5 text-[#E8C581]" />
        </button>
      </aside>

      <section className="relative isolate flex min-h-screen w-full flex-col overflow-hidden bg-[#071E14] text-[#FFFDF7]">
        <div className="absolute inset-0 -z-30">
          <motion.img
            src={heroImg}
            alt="Shatayus meditation sanctuary surrounded by calm greenery"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1.02 }}
            transition={{ duration: 14, ease: "easeOut" }}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#071E14]/85 via-[#071E14]/60 to-[#071E14]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,rgba(213,163,84,0.18),transparent_60%)]" />
        <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-72 w-72 rounded-full bg-[#D5A354]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-1/4 -z-10 h-72 w-72 rounded-full bg-[#2F8F63]/20 blur-3xl" />

        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 py-12 text-center sm:px-8 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#D5A354]/40 bg-[#144832]/70 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8C581] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8C581]" />
            </span>
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#E8C581] sm:text-xs">
              ILLNESS TO WELLNESS TO CENTENARIAN LIFE
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-5 font-serif font-medium text-[clamp(40px,3.6vw,76px)] leading-[1.1] tracking-[-0.03em] text-[#FFFDF7]"
          >
            Shatayus <span className="gradient-heading-dark italic">World</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-3 font-serif text-lg sm:text-xl md:text-2xl font-medium italic tracking-wide text-[#F2C56B]"
          >
            Journey Within
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-8 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center sm:gap-4"
          >
            <button
              onClick={handleOpenEnquire}
              className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C8933F] via-[#D5A354] to-[#E5B566] px-7 py-3.5 font-sans text-sm font-bold text-[#071E14] shadow-[0_10px_30px_rgba(200,147,63,0.4)] transition-all hover:brightness-110 sm:text-base"
            >
              Enquire Now
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>

        <div className="mx-auto w-full max-w-6xl px-5 pb-8 sm:px-8">
          <div className="mt-6 hidden justify-center sm:flex">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#E8C581]/80"
            >
              <FiChevronDown className="h-5 w-5" />
            </motion.span>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FFFDF8] py-14 sm:py-16 lg:py-24">
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#FAF5E8] opacity-60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#E7D7B5]/20 opacity-50 blur-3xl" />

        <div className="relative mx-auto px-5 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#E7D7B5] pb-6 md:flex-row md:items-end">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest">
                Why <span className="gradient-heading italic">Shatayus</span>{" "}
                and what makes it different.
              </h2>
              <div className="mt-1">
                <span className="font-serif text-base sm:text-lg lg:text-xl font-medium italic text-[#C8933F]">
                  One Universe. One Health. One Life.
                </span>
              </div>
              <p className="mt-3 font-sans text-base sm:text-lg leading-relaxed text-[#29382E]">
                A journey towards understanding yourself, transforming the way
                you live and embracing a healthier, more conscious way of life.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {philosophyPillars.map((pillar) => (
              <div
                key={pillar.num}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#E7D7B5] bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#C8933F] hover:shadow-[0_20px_40px_-15px_rgba(200,147,63,0.18)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F3D29]/10">
                  <img
                    src={pillar.image}
                    alt={pillar.alt}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E1F]/90 via-[#0B2E1F]/20 to-transparent" />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                  <div>
                    <p className="text-[15px] sm:text-base leading-[1.8] text-[#29382E]">
                      {pillar.text}
                    </p>
                  </div>

                  {pillar.motto && (
                    <div className="mt-6 pt-4 border-t border-[#E7D7B5]/70">
                      <div className="rounded-xl border border-[#D5A354]/40 bg-[#FAF5E8] p-4 shadow-xs">
                        <p className="font-serif text-sm sm:text-[15px] font-bold italic text-[#0F3D29] leading-relaxed">
                          {pillar.motto}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#071E14] py-14 sm:py-16 lg:py-20 text-[#FFFDF7]">
        <div className="mx-auto px-5 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#D5A354]/25 pb-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-[#FFFDF7]">
                Four phases : The complete{" "}
                <span className="gradient-heading-dark italic">
                  transformation journey.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={prevPhase}
                  aria-label="Previous Transformation Phase"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5A354]/50 bg-[#144832]/60 text-[#E8C581] transition-all hover:bg-[#144832] hover:scale-105"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextPhase}
                  aria-label="Next Transformation Phase"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5A354]/50 bg-[#144832]/60 text-[#E8C581] transition-all hover:bg-[#144832] hover:scale-105"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative mt-8">
            <motion.div
              key={phaseIndex}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -40) nextPhase();
                if (info.offset.x > 40) prevPhase();
              }}
              className="group overflow-hidden rounded-3xl border border-[#D5A354]/40 bg-gradient-to-br from-[#0B2E1F] via-[#09261A] to-[#071E14] p-5 sm:p-7 lg:p-8 shadow-2xl cursor-grab active:cursor-grabbing"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-[400px] lg:col-span-5 overflow-hidden rounded-2xl border border-[#D5A354]/30 shadow-lg">
                  <img
                    src={transformationPhases[phaseIndex].image}
                    alt={transformationPhases[phaseIndex].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071E14]/80 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col justify-between lg:col-span-7 py-1">
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFFDF7] leading-tight">
                      {transformationPhases[phaseIndex].title}
                    </h3>

                    <p className="mt-4 text-base sm:text-[17px] leading-[1.8] text-[#FAF5E8]/90">
                      {transformationPhases[phaseIndex].lead}
                    </p>

                    <div className="mt-5 rounded-2xl border border-[#D5A354]/30 border-l-4 border-l-[#C8933F] bg-[#144832]/60 p-4.5 sm:p-5 shadow-xs">
                      <p className="text-sm sm:text-base leading-relaxed text-[#E8C581]">
                        {transformationPhases[phaseIndex].detail}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-5 border-t border-[#D5A354]/20">
                    <div className="flex gap-2">
                      {transformationPhases.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setPhaseIndex(idx)}
                          aria-label={`Jump to Phase ${idx + 1}`}
                          className={`h-2.5 rounded-full transition-all ${
                            phaseIndex === idx
                              ? "w-8 bg-[#E8C581]"
                              : "w-2.5 bg-[#D5A354]/30 hover:bg-[#D5A354]/60"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-end">
                      <Link
                        to="/muktikhela"
                        className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C8933F] to-[#E5B566] px-8 py-3 font-sans text-sm sm:text-base font-bold text-[#071E14] shadow-md transition-all hover:brightness-110 active:scale-95"
                      >
                        <span>Start Assessment</span>
                        <FiExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FAF5E8] py-14 sm:py-16 lg:py-20">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#E7D7B5]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#144832]/10 blur-3xl" />

        <div className="relative mx-auto px-5 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#E7D7B5] pb-5 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest">
                Explore Our{" "}
                <span className="gradient-heading italic">
                  Seasonal Academy
                </span>
              </h2>
              <p className="mt-1 font-serif text-base sm:text-lg lg:text-xl font-medium italic text-[#C8933F]">
                Three Seasons. Three Academies. One Transformation.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={prevSeason}
                  aria-label="Previous Seasonal Academy"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5A354] bg-white text-[#0F3D29] shadow-xs transition-all hover:bg-[#0F3D29] hover:text-[#E8C581] hover:scale-105 active:scale-95"
                >
                  <FiChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextSeason}
                  aria-label="Next Seasonal Academy"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D5A354] bg-white text-[#0F3D29] shadow-xs transition-all hover:bg-[#0F3D29] hover:text-[#E8C581] hover:scale-105 active:scale-95"
                >
                  <FiChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-5 text-base sm:text-[17px] leading-[1.8] text-[#354237]">
            Shatayus follows the rhythms of nature through three seasonal
            academies, conducted across the year. Each academy offers a
            distinctive opportunity to understand how seasonal changes influence
            our bodies, habits, food choices and everyday routines.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3.5 sm:grid-cols-3">
            {seasonalAcademiesData.map((acad, idx) => {
              const AcadIcon = acad.icon;
              const isActive = seasonIndex === idx;

              return (
                <button
                  key={acad.id}
                  onClick={() => setSeasonIndex(idx)}
                  className={`group relative flex items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? "border-[#0F3D29] bg-[#0F3D29] text-[#FFFDF7] shadow-lg -translate-y-0.5"
                      : "border-[#E7D7B5] bg-white text-[#29382E] hover:border-[#C8933F] hover:bg-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                        isActive
                          ? "bg-[#165037] text-[#E8C581] shadow-xs"
                          : "bg-[#FAF5E8] text-[#0F3D29] group-hover:bg-[#0F3D29] group-hover:text-[#E8C581]"
                      }`}
                    >
                      <AcadIcon className="h-5 w-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-serif text-base sm:text-lg font-bold ${
                          isActive ? "text-[#FFFDF7]" : "text-[#0F3D29]"
                        }`}
                      >
                        {acad.name}
                      </span>
                      {isActive && (
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#E8C581] opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E8C581]" />
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="relative mt-7">
            <motion.div
              key={seasonIndex}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -40) nextSeason();
                if (info.offset.x > 40) prevSeason();
              }}
              className="overflow-hidden rounded-3xl border border-[#E7D7B5] bg-white shadow-xl cursor-grab active:cursor-grabbing"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="relative h-80 sm:h-96 lg:h-auto lg:col-span-7 overflow-hidden bg-[#071E14]">
                  <img
                    src={seasonalAcademiesData[seasonIndex].image}
                    alt={seasonalAcademiesData[seasonIndex].name}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <SeasonalAtmosphere
                    seasonId={seasonalAcademiesData[seasonIndex].id}
                  />
                </div>

                <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10 lg:col-span-5 bg-[#FFFDF8]">
                  <div>
                    <div className="border-b border-[#E7D7B5] pb-3.5">
                      <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F3D29]">
                        {seasonalAcademiesData[seasonIndex].name}
                      </h3>
                    </div>

                    <p className="mt-4 text-base sm:text-[17px] leading-[1.8] text-[#354237]">
                      Each academy is designed as a 120+ day blended learning
                      and living experience, combining residential and
                      online-offline engagement.
                    </p>

                    <p className="mt-4 text-base sm:text-[17px] leading-[1.8] text-[#354237]">
                      The changing seasons become an integral part of the
                      learning experience, helping participants connect with
                      nature, understand seasonal living and develop sustainable
                      practices.
                    </p>
                  </div>

                  <div className="mt-7 pt-5 border-t border-[#E7D7B5]">
                    <Link
                      to={`/membership?season=${seasonalAcademiesData[seasonIndex].id}&plan=ecosphere#season-${seasonalAcademiesData[seasonIndex].id}`}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F3D29] to-[#145235] py-3.5 font-sans text-sm font-semibold text-[#FFFDF7] shadow-sm transition-all hover:bg-[#155438] hover:shadow-md"
                    >
                      <span>{seasonalAcademiesData[seasonIndex].name}</span>
                      <FiChevronRight className="h-4 w-4 text-[#E8C581] transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FFFDF8] py-14 lg:py-10">
        <div className="mx-auto px-5 lg:px-20">
          <div className="border-b border-[#E7D7B5] pb-4">
            <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest">
              Why <span className="gradient-heading italic">Shatayus?</span>
            </h2>
            <p className="mt-1 font-serif text-base sm:text-lg lg:text-xl font-medium italic text-[#C8933F]">
              More Than a Programme. A Way of Life.
            </p>
          </div>

          <p className="mt-4 font-serif text-base sm:text-lg font-semibold text-[#145235]">
            Shatayus brings together four interconnected dimensions of
            transformation:
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyDimensions.map((dim) => {
              const IconComp = dim.icon;

              return (
                <div
                  key={dim.num}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E7D7B5] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C8933F] hover:shadow-xl"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-[#0F3D29]/10">
                    <img
                      src={dim.image}
                      alt={dim.alt || dim.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E1F]/80 via-transparent to-transparent" />

                    <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-xl border border-[#D5A354]/40 bg-[#0F3D29]/85 text-[#E8C581] backdrop-blur-md shadow-xs">
                      <IconComp className="h-4 w-4" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F3D29] group-hover:text-[#0B2E1F] transition-colors">
                        {dim.title}
                      </h3>

                      <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-[#354237]">
                        {dim.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-[#D5A354]/60 bg-[#FAF5E8] p-5 sm:p-6 text-center">
            <p className="font-serif text-base sm:text-lg font-bold leading-relaxed text-[#0F3D29]">
              The idea is simple: wellbeing should extend beyond the individual.
              It should influence how we live, how we connect with others and
              what we pass on to future generations.
            </p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#FFFDF8] py-14 lg:py-10">
        <div className="mx-auto w-full px-5 sm:px-8 lg:px-20">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-[#E7D7B5] pb-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="mt-1 font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest">
                Downloadable{" "}
                <span className="gradient-heading italic">resources</span>
              </h2>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={prevResource}
                  aria-label="Previous Resource"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5A354] bg-white text-[#0F3D29] shadow-xs transition-all hover:bg-[#FAF5E8]"
                >
                  <FiChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextResource}
                  aria-label="Next Resource"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5A354] bg-white text-[#0F3D29] shadow-xs transition-all hover:bg-[#FAF5E8]"
                >
                  <FiChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="relative mt-6">
            <motion.div
              key={resourceIndex}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -40) nextResource();
                if (info.offset.x > 40) prevResource();
              }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 cursor-grab active:cursor-grabbing"
            >
              {[
                downloadableResources[resourceIndex],
                downloadableResources[
                  (resourceIndex + 1) % downloadableResources.length
                ],
              ].map((res) => (
                <div
                  key={res.id}
                  onClick={() => handleResourceClick(res.title)}
                  className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-[#E7D7B5] bg-white p-5 sm:p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#C8933F] hover:shadow-xl"
                >
                  <div className="flex flex-1 flex-col">
                    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#FAF5E8] shadow-xs">
                      {res.image && (
                        <img
                          src={res.image}
                          alt={res.title}
                          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                      )}
                      <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#0F3D29]/85 text-[#E8C581] shadow-xs backdrop-blur-sm">
                        <FiLock className="h-4 w-4" />
                      </div>
                    </div>

                    <h3 className="mt-4 font-serif text-xl sm:text-2xl font-bold leading-snug text-[#0F3D29] transition-colors duration-300 group-hover:text-[#A27128]">
                      {res.title}
                    </h3>

                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#354237]">
                      {res.desc}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#E7D7B5] pt-4 text-xs sm:text-sm font-bold text-[#A27128]">
                    <span className="flex items-center gap-2">
                      <FiLock className="h-4 w-4" />
                      Membership required
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FAF5E8] text-[#A27128] transition-all duration-300 group-hover:bg-[#C8933F] group-hover:text-white shadow-xs">
                      <FiDownload className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2">
            {downloadableResources.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setResourceIndex(idx)}
                aria-label={`Jump to Resource ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  resourceIndex === idx
                    ? "w-6 bg-[#C8933F]"
                    : "w-2 bg-[#E7D7B5]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-20 text-center text-[#FFFDF7] lg:py-10">
        <div className="absolute inset-0 -z-20">
          <img
            src={sunriseRiverImg}
            alt="Sunrise over a calm river with a person meditating"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#071E14]/95 via-[#0A2A1C]/88 to-[#071E14]/96" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(213,163,84,0.2),transparent_65%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="rounded-3xl border border-[#D5A354]/30 bg-[#071E14]/60 px-5 py-10 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md sm:px-12 sm:py-14"
          >
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#FFFDF7] [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              Discover yourself. Reconnect with nature.{" "}
              <span className="gradient-heading-dark italic">
                Transform the way you live.
              </span>
            </h2>

            <p className="mt-4 font-serif text-base sm:text-lg lg:text-xl font-medium italic text-[#F2C56B]">
              Shatayus – Journey Within
            </p>

            <p className="mt-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#E8C581] sm:text-sm">
              Illness to Wellness to Centenarian Life
            </p>

            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <button
                onClick={handleOpenEnquire}
                className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C8933F] via-[#D5A354] to-[#E5B566] px-8 py-4 font-sans text-sm font-bold text-[#071E14] shadow-[0_10px_30px_rgba(200,147,63,0.4)] transition-all hover:scale-[1.02] hover:brightness-110 sm:text-base"
              >
                Enquire Now
                <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <Link
                to="/membership?plan=shatayus#membership-shatayus"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D5A354]/80 bg-[#144832]/80 px-7 py-4 font-sans text-sm font-semibold text-[#FFFDF7] backdrop-blur-md transition-all hover:border-[#E8C581] hover:bg-[#144832] sm:text-base"
              >
                Explore the Shatayus Programme
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Modal
        open={challengeOpen}
        onClose={() => setChallengeOpen(false)}
        aria-labelledby="challenge-modal-heading"
        disableScrollLock={false}
        data-lenis-prevent="true"
      >
        <Box
          sx={challengeModalSx}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[92vh] flex-col overflow-hidden bg-gradient-to-b from-[#FFFDF9] to-[#FAF5E8]"
          >
            {/* Attractive Emerald & Gold Header with Animated Stepper */}
            <div className="relative shrink-0 overflow-hidden bg-gradient-to-br from-[#071E14] via-[#0F3D29] to-[#164A33] px-5 pt-5 pb-5 sm:px-8 sm:pt-6 sm:pb-6 border-b border-[#D5A354]/30">
              <div className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-[#C8933F]/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-44 w-44 rounded-full bg-[#E8C581]/10 blur-3xl" />

              <button
                onClick={() => setChallengeOpen(false)}
                className="
                  absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center
                  rounded-full border border-[#D5A354]/40 bg-white/10 text-[#FFFDF7]
                  backdrop-blur-md transition-all hover:rotate-90 hover:border-[#E8C581]
                  hover:bg-[#C8933F] hover:text-[#071E14] cursor-pointer
                "
                aria-label="Close modal"
              >
                <FiX className="h-4 w-4" />
              </button>

              <div className="relative text-center">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#D5A354]/35 bg-[#144832]/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#E8C581]">
                  <PiSparkle className="h-3.5 w-3.5 text-[#E8C581]" />
                  <span>Step {challengeStep} of 2</span>
                </div>

                <h3
                  id="challenge-modal-heading"
                  className="mt-2 font-serif text-2xl font-bold tracking-tight text-[#FFFDF7] sm:text-3xl"
                >
                  Take a Challenge
                </h3>
              </div>

              {!challengeSubmitted && (
                <div className="relative mx-auto mt-5 max-w-md">
                  <div className="relative flex items-center justify-between">
                    {/* Background Track */}
                    <div className="absolute left-10 right-10 top-5 h-1 -translate-y-1/2 rounded-full bg-white/15" />
                    {/* Animated Progress Track */}
                    <motion.div
                      initial={false}
                      animate={{ scaleX: challengeStep === 2 ? 1 : 0 }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="absolute left-10 right-10 top-5 h-1 -translate-y-1/2 origin-left rounded-full bg-gradient-to-r from-[#C8933F] via-[#E8C581] to-[#C8933F] shadow-[0_0_12px_rgba(232,197,129,0.6)]"
                    />

                    {[1, 2].map((s) => {
                      const isActive = challengeStep === s;
                      const isDone = challengeStep > s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => {
                            if (s === 1 && challengeStep === 2) {
                              setChallengeStep(1);
                            } else if (s === 2 && challengeStep === 1) {
                              handleNextChallengeStep();
                            }
                          }}
                          className="group relative z-10 flex flex-col items-center gap-1.5 focus:outline-none cursor-pointer"
                        >
                          <motion.div
                            animate={{
                              scale: isActive ? 1.08 : 1,
                            }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className={`relative flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors duration-300 ${
                              isActive
                                ? "border-2 border-[#E8C581] bg-gradient-to-br from-[#C8933F] to-[#E5B566] text-[#071E14] shadow-[0_0_20px_rgba(232,197,129,0.5)]"
                                : isDone
                                  ? "border-2 border-[#E8C581] bg-[#145235] text-[#E8C581] shadow-md"
                                  : "border border-white/25 bg-[#0A291C] text-white/60"
                            }`}
                          >
                            {isActive && (
                              <motion.span
                                layoutId="activeStepPulse"
                                className="absolute -inset-1.5 rounded-full border border-[#E8C581]/50"
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                            {isDone ? (
                              <motion.span
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  type: "spring",
                                  stiffness: 260,
                                  damping: 18,
                                }}
                              >
                                <FiCheck className="h-4 w-4 stroke-[2.5]" />
                              </motion.span>
                            ) : (
                              <span>{s}</span>
                            )}
                          </motion.div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Scrollable Form Body with Framer Motion Step Transitions */}
            <div
              data-lenis-prevent="true"
              className="overflow-y-auto px-5 py-5 sm:px-8 sm:py-6"
            >
              <AnimatePresence mode="wait">
                {!challengeSubmitted ? (
                  <form
                    key="challenge-form"
                    onSubmit={cHandleSubmit(handleChallengeSubmit)}
                  >
                    <AnimatePresence mode="wait">
                      {challengeStep === 1 ? (
                        <motion.div
                          key="step-1"
                          initial={{ opacity: 0, x: -24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -24 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="space-y-4"
                        >
                          <div className="rounded-2xl border border-[#E7D7B5] bg-white p-4 sm:p-5 shadow-[0_8px_30px_rgba(15,61,41,0.05)] space-y-3.5">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.04, duration: 0.25 }}
                            >
                              <InputField
                                name="name"
                                label="Name"
                                control={cControl}
                                error={cErrors.name}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.08, duration: 0.25 }}
                              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
                            >
                              <InputField
                                name="email"
                                label="Email ID"
                                type="email"
                                control={cControl}
                                error={cErrors.email}
                                dontCapitalize
                              />
                              <InputField
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                control={cControl}
                                error={cErrors.phone}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.12, duration: 0.25 }}
                              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
                            >
                              <InputField
                                name="country"
                                label="Country"
                                control={cControl}
                                error={cErrors.country}
                              />
                              <InputField
                                name="city"
                                label="City"
                                control={cControl}
                                error={cErrors.city}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.16, duration: 0.25 }}
                              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
                            >
                              <div>
                                <DropdownField
                                  name="ageGroup"
                                  placeholder="Select Age Group"
                                  control={cControl}
                                  dataArray={ageGroups}
                                  error={cErrors.ageGroup}
                                />
                              </div>
                              <InputField
                                name="profession"
                                label="Profession"
                                control={cControl}
                                error={cErrors.profession}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.2, duration: 0.25 }}
                              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
                            >
                              <div>
                                <DropdownField
                                  name="preferredLanguage"
                                  placeholder="Select Language"
                                  control={cControl}
                                  dataArray={languages}
                                  error={cErrors.preferredLanguage}
                                />
                              </div>

                              <div>
                                <DropdownField
                                  name="referralSource"
                                  placeholder="Select Source"
                                  control={cControl}
                                  dataArray={referralSources}
                                  error={cErrors.referralSource}
                                />
                              </div>
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.24, duration: 0.25 }}
                            className="pt-1"
                          >
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={handleNextChallengeStep}
                              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F3D29] via-[#145235] to-[#0F3D29] py-3.5 font-sans text-sm sm:text-base font-bold text-[#FFFDF7] shadow-[0_10px_25px_rgba(15,61,41,0.28)] transition-all hover:brightness-110 cursor-pointer"
                            >
                              <span>Next</span>
                              <FiArrowRight className="h-4 w-4 text-[#E8C581] transition-transform duration-300 group-hover:translate-x-1" />
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step-2"
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 24 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="space-y-4"
                        >
                          <div className="rounded-2xl border border-[#E7D7B5] bg-white p-4 sm:p-5 shadow-[0_8px_30px_rgba(15,61,41,0.05)] space-y-4">
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.05, duration: 0.25 }}
                              className="rounded-xl border border-[#E7D7B5]/70 bg-[#FAF5E8]/45 p-3.5"
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F3D29] font-serif text-[10px] font-bold text-[#E8C581]">
                                  01
                                </span>
                                <p className="text-xs sm:text-sm font-bold text-[#0F3D29]">
                                  What motivated you to join this 21-day
                                  journey?
                                </p>
                              </div>
                              <InputArea
                                name="motivation"
                                label="What motivated you to join this 21-day journey?"
                                control={cControl}
                                minRows={2}
                                maxRows={4}
                                error={cErrors.motivation}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1, duration: 0.25 }}
                              className="rounded-xl border border-[#E7D7B5]/70 bg-[#FAF5E8]/45 p-3.5"
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F3D29] font-serif text-[10px] font-bold text-[#E8C581]">
                                  02
                                </span>
                                <p className="text-xs sm:text-sm font-bold text-[#0F3D29]">
                                  What aspect of your lifestyle would you like
                                  to become more aware of?
                                </p>
                              </div>
                              <InputArea
                                name="lifestyleAspect"
                                label="What aspect of your lifestyle would you like to become more aware of?"
                                control={cControl}
                                minRows={2}
                                maxRows={4}
                                error={cErrors.lifestyleAspect}
                              />
                            </motion.div>

                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.15, duration: 0.25 }}
                              className="rounded-xl border border-[#E7D7B5]/70 bg-[#FAF5E8]/45 p-3.5"
                            >
                              <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0F3D29] font-serif text-[10px] font-bold text-[#E8C581]">
                                  03
                                </span>
                                <p className="text-xs sm:text-sm font-bold text-[#0F3D29]">
                                  What are you hoping to take away from these 21
                                  days?
                                </p>
                              </div>
                              <InputArea
                                name="takeawayHope"
                                label="What are you hoping to take away from these 21 days?"
                                control={cControl}
                                minRows={2}
                                maxRows={4}
                                error={cErrors.takeawayHope}
                              />
                            </motion.div>
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.25 }}
                            className="flex gap-3 pt-1"
                          >
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => setChallengeStep(1)}
                              className="flex w-1/3 items-center justify-center gap-1.5 rounded-xl border border-[#D5A354]/60 bg-white py-3.5 font-sans text-sm font-semibold text-[#0F3D29] shadow-xs transition-colors hover:bg-[#FAF5E8] cursor-pointer"
                            >
                              <FiChevronLeft className="h-4 w-4" />
                              <span>Back</span>
                            </motion.button>
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.01 }}
                              whileTap={{ scale: 0.98 }}
                              className="flex w-2/3 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C8933F] via-[#D5A354] to-[#E5B566] py-3.5 font-sans text-sm sm:text-base font-bold text-[#071E14] shadow-[0_10px_25px_rgba(200,147,63,0.35)] transition-all hover:brightness-105 cursor-pointer"
                            >
                              <span>Submit</span>
                              <FiCheck className="h-4 w-4 stroke-[2.5]" />
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                ) : (
                  <motion.div
                    key="challenge-success"
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="rounded-2xl border border-[#E7D7B5] bg-white px-6 py-8 text-center shadow-sm"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 18,
                        delay: 0.1,
                      }}
                      className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#C8933F] bg-gradient-to-br from-[#0F3D29] to-[#145235] text-[#E8C581] shadow-[0_0_25px_rgba(200,147,63,0.4)]"
                    >
                      <FiCheckCircle className="h-8 w-8" />
                    </motion.div>
                    <h3 className="mt-4 font-serif text-2xl font-bold text-[#0F3D29]">
                      Registration Successful!
                    </h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-[#354237]">
                      You will receive the survey{" "}
                      <strong className="text-[#0F3D29]">
                        My Conscious Living Baseline
                      </strong>{" "}
                      on your WhatsApp.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setChallengeOpen(false)}
                      className="mt-6 rounded-xl bg-gradient-to-r from-[#0F3D29] to-[#145235] px-8 py-2.5 font-sans text-sm font-semibold text-[#FFFDF7] shadow-md cursor-pointer"
                    >
                      Close
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </Box>
      </Modal>

      <Modal
        open={enquireOpen}
        onClose={() => setEnquireOpen(false)}
        aria-labelledby="enquire-modal-heading"
        disableScrollLock={false}
        data-lenis-prevent="true"
      >
        <Box
          sx={enquireModalSx}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setEnquireOpen(false)}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E7D7B5] bg-white text-[#0F3D29] transition-colors hover:bg-[#FAF5E8]"
            aria-label="Close modal"
          >
            <FiX className="h-4 w-4" />
          </button>

          {!enquireSubmitted ? (
            <div>
              <h3
                id="enquire-modal-heading"
                className="font-serif text-2xl font-bold text-[#0F3D29]"
              >
                Enquire Now
              </h3>

              <form
                onSubmit={eHandleSubmit(handleEnquireSubmit)}
                className="mt-5 space-y-3.5"
              >
                <InputField
                  name="name"
                  label="Name"
                  control={eControl}
                  error={eErrors.name}
                />
                <InputField
                  name="email"
                  label="Email ID"
                  type="email"
                  control={eControl}
                  error={eErrors.email}
                  dontCapitalize
                />
                <InputField
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  control={eControl}
                  error={eErrors.phone}
                />
                <div>
                  <p className="mb-1 text-xs font-bold text-[#0F3D29]">
                    Message (optional)
                  </p>
                  <InputArea
                    name="message"
                    label="Message"
                    control={eControl}
                    minRows={3}
                    maxRows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-[#0F3D29] to-[#145235] py-3.5 font-sans font-bold text-[#FFFDF7] shadow-sm transition-all hover:brightness-110"
                >
                  Submit Enquiry
                </button>
              </form>
            </div>
          ) : (
            <div className="py-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#145235] text-[#E8C581]">
                <FiCheck className="h-6 w-6" />
              </div>
              <h4 className="mt-3 font-serif text-xl font-bold text-[#0F3D29]">
                Thank You!
              </h4>
              <p className="mt-1 text-sm leading-relaxed text-[#354237]">
                Your enquiry has been received. Our team will contact you
                shortly.
              </p>
              <button
                onClick={() => setEnquireOpen(false)}
                className="mt-5 rounded-xl bg-[#0F3D29] px-6 py-2 font-sans text-sm font-semibold text-[#FFFDF7]"
              >
                Close
              </button>
            </div>
          )}
        </Box>
      </Modal>

      <Modal
        open={membershipOpen}
        onClose={() => setMembershipOpen(false)}
        aria-labelledby="membership-notice-heading"
        disableScrollLock={false}
        data-lenis-prevent="true"
      >
        <Box
          sx={membershipModalSx}
          data-lenis-prevent="true"
          onWheel={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setMembershipOpen(false)}
            className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-[#E7D7B5] bg-white text-[#0F3D29] transition-colors hover:bg-[#FAF5E8]"
            aria-label="Close"
          >
            <FiX className="h-4 w-4" />
          </button>

          <div className="text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0F3D29] text-[#E8C581] shadow-md">
              <FiLock className="h-7 w-7" />
            </div>

            <h3
              id="membership-notice-heading"
              className="mt-3.5 font-serif text-xl font-bold text-[#0F3D29]"
            >
              Membership required
            </h3>

            {selectedResource && (
              <p className="mt-2 text-sm leading-relaxed text-[#354237]">
                <strong>{selectedResource}</strong>
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2.5">
              <Link
                to="/membership?plan=shatayus#membership-shatayus"
                className="rounded-xl bg-gradient-to-r from-[#C8933F] to-[#E5B566] py-3 font-sans font-bold text-[#071E14] shadow-sm transition-transform hover:scale-102"
              >
                Take membership
              </Link>
              <button
                onClick={() => setMembershipOpen(false)}
                className="rounded-xl border border-[#E7D7B5] bg-white py-2 font-sans text-xs font-semibold text-[#666] hover:bg-[#FAF5E8]"
              >
                Cancel
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
