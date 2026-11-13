import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import CommonButton from "../../common/button/CommonButton";

import step1Welcome from "./assets/muktikhela/muktikhela-step1-welcome.webp";
import step2Profile from "./assets/muktikhela/muktikhela-step2-profile.webp";
import step3Chat from "./assets/muktikhela/muktikhela-step3-chat-suggestion.webp";
import step4Options from "./assets/muktikhela/muktikhela-step4-options.webp";
import step5Scorecard from "./assets/muktikhela/muktikhela-step5-scorecard.webp";
import zoneAWellness from "./assets/muktikhela/muktikhela-zone-a-wellness.webp";
import zoneBKapha from "./assets/muktikhela/muktikhela-zone-b-kapha.webp";
import zoneCPitta from "./assets/muktikhela/muktikhela-zone-c-pitta.webp";
import zoneDVata from "./assets/muktikhela/muktikhela-zone-d-vata.webp";

const vp = { once: false, amount: 0.15 };

const fadeUp = (reduceMotion) => ({
  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: reduceMotion ? 0.4 : 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
});

/* Custom SVG Vector Icons */
const ShieldCheckSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const UsersProfileSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const StethoscopeSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
    <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
    <circle cx="20" cy="10" r="2" />
  </svg>
);

const ActivityBmiSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const CompassLifestyleSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const GlobeHistorySvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChatFlowSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M8 9h8" />
    <path d="M8 13h5" />
  </svg>
);

const LightbulbSuggestionSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const StarRewardSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const GridChoicesSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

const SkipForwardSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" y1="5" x2="19" y2="19" />
  </svg>
);

const TrophyScoreSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const DietBowlSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M4 11h16a1 1 0 0 1 1 1v.5a8.5 8.5 0 0 1-17 0V12a1 1 0 0 1 1-1Z" />
    <path d="M7 21h10" />
    <path d="M9 7c0-1.5 1-2.5 2-4" />
    <path d="M14 7c0-1.5 1-2.5 2-4" />
  </svg>
);

const SunRhythmSvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

const LeafTherapySvg = ({ className = "h-4 w-4" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const gameSteps = [
  {
    step: "01",
    shortLabel: "Welcome",
    badge: "Confidential & Doctor-Ready",
    title: "Select Player & Begin Securely",
    subtitle: "Namaste — Tell us about your health",
    description:
      "Start your self-discovery journey by selecting a player profile for yourself or a family member. Every response is 100% confidential and structured so an Ayurvedic physician can understand your health completely.",
    highlights: [
      {
        label: "Privacy First",
        text: "100% confidential & encrypted health assessment record",
        Icon: ShieldCheckSvg,
      },
      {
        label: "Family Profiles",
        text: "Create & switch between individual or family player profiles",
        Icon: UsersProfileSvg,
      },
      {
        label: "Physician Ready",
        text: "Structured clinical insights to help your Vaidya diagnose root causes",
        Icon: StethoscopeSvg,
      },
    ],
    image: step1Welcome,
    imageAlt: "Muktikhela Step 1 — Welcome and Select Player screen",
  },
  {
    step: "02",
    shortLabel: "Bio-Profile",
    badge: "Personalised Calibration",
    title: "Build Your Bio-Profile & Auto-BMI",
    subtitle: "Context-aware Ayurvedic baseline",
    description:
      "Enter your basic details—date of birth, gender, height, weight (with automatic BMI calculation), preferred language, profession, and existing health conditions—so the game calibrates questions to your life stage.",
    highlights: [
      {
        label: "Instant Auto-BMI",
        text: "Real-time Body Mass Index calculation from height & weight",
        Icon: ActivityBmiSvg,
      },
      {
        label: "Lifestyle Context",
        text: "Adapts assessment to your age, occupation & daily work pace",
        Icon: CompassLifestyleSvg,
      },
      {
        label: "Health History",
        text: "Multi-language support with pre-existing condition awareness",
        Icon: GlobeHistorySvg,
      },
    ],
    image: step2Profile,
    imageAlt: "Muktikhela Step 2 — Personal Bio-Profile and BMI setup screen",
  },
  {
    step: "03",
    shortLabel: "Chat & Tip",
    badge: "Instant Micro-Coaching",
    title: "Chat Q&A with Live Suggestions & Stars",
    subtitle: "Learn while you play — every answer rewards you",
    description:
      "No boring medical forms! Answer conversational questions in an interactive chat flow. Right after you answer, Muktikhela gives you a real-time Suggestion and rewards your self-awareness with +1 star points.",
    highlights: [
      {
        label: "7-Level Chat Flow",
        text: "Conversational Q&A interface across 7 progressive mastery levels",
        Icon: ChatFlowSvg,
      },
      {
        label: "Live Coaching",
        text: "Instant personalised Ayurvedic suggestion after every single answer",
        Icon: LightbulbSuggestionSvg,
      },
      {
        label: "+1 Star Rewards",
        text: "Gamified point rewards that celebrate honest self-reflection",
        Icon: StarRewardSvg,
      },
    ],
    image: step3Chat,
    imageAlt:
      "Muktikhela Step 3 — Interactive chat question with instant suggestion and star reward",
  },
  {
    step: "04",
    shortLabel: "Vitals Choice",
    badge: "Zero-Stress Vitals & Choices",
    title: "4 Simple Options + Practical Doctor Tips",
    subtitle: "Guided ranges & Skip button freedom",
    description:
      "Each question offers 4 clear options mapped to the 4 Ayurvedic Health Zones (A, B, C, D), accompanied by practical physician notes. Don't have a reading like Blood Pressure handy? Use the Skip button anytime.",
    highlights: [
      {
        label: "4 Zone-Mapped Choices",
        text: "Every option directly maps your patterns to Zones A, B, C, or D",
        Icon: GridChoicesSvg,
      },
      {
        label: "Clinical Notes",
        text: "Built-in doctor guidance on how to monitor vitals accurately",
        Icon: StethoscopeSvg,
      },
      {
        label: "Skip Anytime",
        text: "Unblocked flow—skip any unknown parameter and resume later",
        Icon: SkipForwardSvg,
      },
    ],
    image: step4Options,
    imageAlt: "Muktikhela Step 4 — 4-option selection and Skip button screen",
  },
  {
    step: "05",
    shortLabel: "Scorecard",
    badge: "7-Level Mastery Matrix",
    title: "Unlock Your 7-Level Scorecard",
    subtitle: "From Beginner to Legend — see your full distribution",
    description:
      "Upon completing the game, view your Total Score and a complete Level-wise Option Selection Matrix across all 7 tiers: Beginner, Intermediate, Advanced, Expert, Master, Elite, and Legend.",
    highlights: [
      {
        label: "7-Tier Progression",
        text: "Beginner → Intermediate → Advanced → Expert → Master → Elite → Legend",
        Icon: TrophyScoreSvg,
      },
      {
        label: "Zone Distribution",
        text: "Transparent matrix of your A, B, C & D selections at every level",
        Icon: GridChoicesSvg,
      },
      {
        label: "1-Tap Health Record",
        text: "Instant access to your personalised Ayurvedic Zone prescription",
        Icon: ShieldCheckSvg,
      },
    ],
    image: step5Scorecard,
    imageAlt:
      "Muktikhela Step 5 — Game Completed 74 Total Score and 7-Level matrix",
  },
];

const healthZones = [
  {
    zone: "Zone A",
    code: "A",
    shortLabel: "Wellness",
    name: "Wellness Zone",
    sanskrit: "समदोष · Sama-Dosha EQ State",
    doshaBadge: "Balanced Tridosha · 44 Questions",
    accentBorder: "border-emerald-600/30",
    accentBg: "bg-emerald-50/70",
    badgeClass: "bg-emerald-700 text-white",
    pillClass: "bg-emerald-100 text-emerald-900 border-emerald-300",
    tagline: "World of Wellness — Protect your rare natural harmony",
    summary:
      "You are in the समदोष (Sama-Dosha) EQ state—the highest level of health where your wellness graph, immunity, constitution, and dosha exam all show equal balance. Your body, mind, digestion, sleep, and emotions function in a naturally synchronized rhythm.",
    diet: "Warm, fresh, moderate meals; timely dining; avoid extreme spicy, oily, cold, or heavy foods.",
    movement:
      "Steady daily rhythm, early sleep & waking, yoga, brisk walking, and light strength training.",
    therapies:
      "Weekly oil massage (Abhyanga), gentle pranayama, 10–15 min meditation, mild seasonal detox & sunlight.",
    image: zoneAWellness,
    imageAlt: "Muktikhela Zone A — Wellness Zone Sama-Dosha EQ State report",
  },
  {
    zone: "Zone B",
    code: "B",
    shortLabel: "Balance",
    name: "Balance Zone (Mild Imbalance)",
    sanskrit: "Kapha Dominance · Strength & Stability",
    doshaBadge: "Kapha Dominant · 30 Questions",
    accentBorder: "border-sky-600/30",
    accentBg: "bg-sky-50/70",
    badgeClass: "bg-sky-700 text-white",
    pillClass: "bg-sky-100 text-sky-900 border-sky-300",
    tagline: "Between Wellness & Healing — Mild corrections restore balance",
    summary:
      "Your wellness graph shows medium health, good immunity, and a Kapha-dominant constitution. Nature has given you stability, strength, and calmness—but Kapha can become heavy, slow, or sluggish without warmth, lightness, and daily movement.",
    diet: "Warm, light, spicy foods (ginger, black pepper, cinnamon), millets, barley, leafy greens & warm soups; avoid sweets, dairy & cold oily meals.",
    movement:
      "Wake before sunrise, avoid daytime sleep, high-intensity exercise, brisk walking, jogging & dynamic yoga for daily sweating.",
    therapies:
      "Dry herbal powder massage (Udvartan), steam therapy, ginger-lemon warm water, weekly mild detox & active pranayama.",
    image: zoneBKapha,
    imageAlt:
      "Muktikhela Zone B — Balance Zone Mild Imbalance Kapha Dominance report",
  },
  {
    zone: "Zone C",
    code: "C",
    shortLabel: "Imbalance",
    name: "Imbalance Zone (Moderate Imbalance)",
    sanskrit: "Pitta Dominance · Sharp Fire & Focus",
    doshaBadge: "Pitta Dominant · 36 Questions",
    accentBorder: "border-amber/40",
    accentBg: "bg-amber/10",
    badgeClass: "bg-amber text-white",
    pillClass: "bg-amber/15 text-forest border-amber/40",
    tagline: "World of Healing — Guided cooling, calmness & moderation needed",
    summary:
      "Both your constitution and dosha exam confirm Pitta dominance. Your body naturally has sharp digestion, strong focus, and high drive, but overheats quickly—leading to acidity, irritation, inflammation, or emotional reactivity when pushed too hard.",
    diet: "Cooling foods like pure ghee, coconut, cucumber & sweet-bitter-astringent tastes; early light dinners; avoid spicy, sour, salty, fried or fermented foods.",
    movement:
      "Calm steady daily rhythm, avoid midday heat & late-night screen heat; moderate swimming, cycling, brisk walking & cooling yoga.",
    therapies:
      "Sheetali & Sheetkari cooling pranayama, cooling oil massage, aloe vera juice & soothing moonlight exposure.",
    image: zoneCPitta,
    imageAlt:
      "Muktikhela Zone C — Moderate Imbalance Zone Pitta Dominance report",
  },
  {
    zone: "Zone D",
    code: "D",
    shortLabel: "Deep Care",
    name: "Deep Imbalance Zone",
    sanskrit: "Vata Dominance · Creative & Sensitive",
    doshaBadge: "Vata Dominant · 16 Questions",
    accentBorder: "border-rose-600/30",
    accentBg: "bg-rose-50/70",
    badgeClass: "bg-rose-700 text-white",
    pillClass: "bg-rose-100 text-rose-900 border-rose-300",
    tagline:
      "World of Deep Healing — Immediate warmth, nourishment & grounding",
    summary:
      "Your constitution and dosha exam confirm Vata dominance. Your body and mind are naturally creative, fast, and sensitive, but easily become dry, cold, anxious, irregular, or unstable when routine breaks. You need warmth, oiliness, stability, and strict regularity.",
    diet: "Warm, oily, grounding foods—ghee, sesame oil, soups, stews, khichdi, rice, wheat & oats; strictly avoid cold, raw, dry foods and fasting.",
    movement:
      "Fixed daily schedule, regular meals, early sleep, slow calm work pace; gentle yoga, tai chi, stretching & light walking.",
    therapies:
      "Daily warm oil massage (Abhyanga), Nasya, gentle pranayama, warm water through the day, foot massage before sleep & warm baths.",
    image: zoneDVata,
    imageAlt: "Muktikhela Zone D — Deep Imbalance Zone Vata Dominance report",
  },
];

const allScreensGallery = [
  {
    id: "step-0",
    mode: "steps",
    index: 0,
    code: "01",
    label: "1. Welcome",
    img: step1Welcome,
  },
  {
    id: "step-1",
    mode: "steps",
    index: 1,
    code: "02",
    label: "2. Bio-Profile",
    img: step2Profile,
  },
  {
    id: "step-2",
    mode: "steps",
    index: 2,
    code: "03",
    label: "3. Chat & Tip",
    img: step3Chat,
  },
  {
    id: "step-3",
    mode: "steps",
    index: 3,
    code: "04",
    label: "4. Vitals Options",
    img: step4Options,
  },
  {
    id: "step-4",
    mode: "steps",
    index: 4,
    code: "05",
    label: "5. Scorecard",
    img: step5Scorecard,
  },
  {
    id: "zone-0",
    mode: "zones",
    index: 0,
    code: "A",
    label: "Zone A · Wellness",
    img: zoneAWellness,
  },
  {
    id: "zone-1",
    mode: "zones",
    index: 1,
    code: "B",
    label: "Zone B · Balance",
    img: zoneBKapha,
  },
  {
    id: "zone-2",
    mode: "zones",
    index: 2,
    code: "C",
    label: "Zone C · Imbalance",
    img: zoneCPitta,
  },
  {
    id: "zone-3",
    mode: "zones",
    index: 3,
    code: "D",
    label: "Zone D · Deep Care",
    img: zoneDVata,
  },
];

export default function MuktikhelaAyurvedaSection() {
  const shouldReduce = useReducedMotion();
  const v = fadeUp(shouldReduce);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sectionTab, setSectionTab] = useState("steps");
  const [sectionStepIdx, setSectionStepIdx] = useState(0);
  const [sectionZoneIdx, setSectionZoneIdx] = useState(0);

  const [modalTab, setModalTab] = useState("steps");
  const [modalStepIdx, setModalStepIdx] = useState(0);
  const [modalZoneIdx, setModalZoneIdx] = useState(0);

  const activeSectionStep = gameSteps[sectionStepIdx];
  const activeSectionZone = healthZones[sectionZoneIdx];

  const activeModalStep = gameSteps[modalStepIdx];
  const activeModalZone = healthZones[modalZoneIdx];

  const handleOpenModal = (
    mode = sectionTab,
    index = mode === "steps" ? sectionStepIdx : sectionZoneIdx,
  ) => {
    setModalTab(mode);
    if (mode === "steps") {
      setModalStepIdx(index);
    } else {
      setModalZoneIdx(index);
    }
    setIsModalOpen(true);
  };

  const handleSectionPrev = () => {
    if (sectionTab === "steps") {
      setSectionStepIdx((prev) =>
        prev === 0 ? gameSteps.length - 1 : prev - 1,
      );
    } else {
      setSectionZoneIdx((prev) =>
        prev === 0 ? healthZones.length - 1 : prev - 1,
      );
    }
  };

  const handleSectionNext = () => {
    if (sectionTab === "steps") {
      setSectionStepIdx((prev) =>
        prev === gameSteps.length - 1 ? 0 : prev + 1,
      );
    } else {
      setSectionZoneIdx((prev) =>
        prev === healthZones.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const handleModalPrev = () => {
    if (modalTab === "steps") {
      setModalStepIdx((prev) => (prev === 0 ? gameSteps.length - 1 : prev - 1));
    } else {
      setModalZoneIdx((prev) =>
        prev === 0 ? healthZones.length - 1 : prev - 1,
      );
    }
  };

  const handleModalNext = () => {
    if (modalTab === "steps") {
      setModalStepIdx((prev) => (prev === gameSteps.length - 1 ? 0 : prev + 1));
    } else {
      setModalZoneIdx((prev) =>
        prev === healthZones.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const handleModalGallerySelect = (item) => {
    setModalTab(item.mode);
    if (item.mode === "steps") {
      setModalStepIdx(item.index);
    } else {
      setModalZoneIdx(item.index);
    }
  };

  const currentSectionImg =
    sectionTab === "steps" ? activeSectionStep.image : activeSectionZone.image;
  const currentSectionAlt =
    sectionTab === "steps"
      ? activeSectionStep.imageAlt
      : activeSectionZone.imageAlt;

  return (
    <section
      id="muktikhela"
      className="w-full bg-[#FDFBF7] py-14  lg:py-14 text-forest relative overflow-hidden"
    >
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-amber/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-96 w-96 rounded-full bg-forest/5 blur-3xl" />

      <div className="mx-auto w-full px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-10 sm:mb-12">
          <div>
            <motion.div
              variants={v}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
            >
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-forest">
                <span className="italic gradient-heading">Muktikhela</span>
              </h2>
              <div className="flex flex-wrap items-baseline gap-2">
                <p className="font-serif text-lg sm:text-xl lg:text-2xl leading-tight text-amber">
                  मुक्तिः जीवनस्य उत्सवः
                </p>
                <span className="text-amber/50">·</span>
                <p className="font-serif text-base sm:text-lg lg:text-xl font-medium italic leading-tight text-amber/90">
                  The Play of Liberation
                </p>
              </div>
            </motion.div>

            <motion.p
              variants={v}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="mt-3 font-sans text-forest/75 text-sm sm:text-base leading-relaxed"
            >
              An Ayurvedic self-discovery game that helps you understand your
              unique mind-body nature (Prakriti), lifestyle, and holistic
              wellbeing through a thoughtful question-and-answer journey.
            </motion.p>
          </div>
        </div>

        <motion.div
          initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-[2rem] border border-[#D5A354]/40 bg-gradient-to-br from-white via-[#FCF9F2] to-[#F7F0E2] shadow-[0_30px_80px_rgba(15,61,38,0.10)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 xl:col-span-4 bg-gradient-to-b from-[#0D3323] via-[#103F2E] to-[#082217] p-6 sm:p-7 flex flex-col items-center justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#C9A45C]/30">
              <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-[#C9A45C]/15 blur-3xl" />

              <div className="relative z-10 my-auto flex flex-col items-center">
                <div className="rounded-[1.5rem] border-[5px] border-[#C9A45C]/70 bg-[#061A11] p-2 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
                  <div className="mx-auto mb-1.5 h-1.5 w-14 rounded-full bg-[#C9A45C]/40" />

                  <button
                    type="button"
                    onClick={() =>
                      handleOpenModal(
                        sectionTab,
                        sectionTab === "steps"
                          ? sectionStepIdx
                          : sectionZoneIdx,
                      )
                    }
                    className="group relative block overflow-hidden rounded-[0.5rem] bg-white cursor-zoom-in"
                    aria-label="Open full-size game guide modal"
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSectionImg}
                        src={currentSectionImg}
                        alt={currentSectionAlt}
                        initial={
                          shouldReduce
                            ? { opacity: 0 }
                            : { opacity: 0, scale: 0.98 }
                        }
                        animate={{ opacity: 1, scale: 1 }}
                        exit={shouldReduce ? { opacity: 0 } : { opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="h-[420px] sm:h-[460px] lg:h-[470px] w-auto object-contain select-none"
                      />
                    </AnimatePresence>
                  </button>
                </div>
              </div>

              <div className="relative z-10 mt-5 flex w-full items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={handleSectionPrev}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A45C]/50 bg-white/10 font-sans text-lg font-bold text-white hover:bg-[#C9A45C] hover:text-[#0D3323] transition cursor-pointer"
                  aria-label="Previous screen"
                >
                  ‹
                </button>

                <div className="flex flex-col items-center">
                  <span className="font-sans text-xs font-bold tracking-wide text-white">
                    {sectionTab === "steps"
                      ? `Step ${sectionStepIdx + 1} of ${gameSteps.length}`
                      : `${activeSectionZone.zone} (${sectionZoneIdx + 1} of ${healthZones.length})`}
                  </span>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    {(sectionTab === "steps" ? gameSteps : healthZones).map(
                      (_, i) => {
                        const isDotActive =
                          sectionTab === "steps"
                            ? i === sectionStepIdx
                            : i === sectionZoneIdx;
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() =>
                              sectionTab === "steps"
                                ? setSectionStepIdx(i)
                                : setSectionZoneIdx(i)
                            }
                            className={`h-1.5 rounded-full transition-all cursor-pointer ${
                              isDotActive
                                ? "w-6 bg-[#E6C677]"
                                : "w-1.5 bg-white/30 hover:bg-white/60"
                            }`}
                            aria-label={`Go to item ${i + 1}`}
                          />
                        );
                      },
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSectionNext}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A45C]/50 bg-white/10 font-sans text-lg font-bold text-white hover:bg-[#C9A45C] hover:text-[#0D3323] transition cursor-pointer"
                  aria-label="Next screen"
                >
                  ›
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 xl:col-span-8 p-5 sm:p-8 lg:p-8 flex flex-col justify-center gap-6">
              <div className="space-y-4 border-b border-forest/10 pb-5">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <div className="inline-flex w-full sm:w-auto rounded-2xl border border-[#D5A354]/40 bg-[#F4ECE0] p-1.5 shadow-inner">
                    <button
                      type="button"
                      onClick={() => setSectionTab("steps")}
                      className={`flex-1 sm:flex-initial rounded-xl px-4 sm:px-5 py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                        sectionTab === "steps"
                          ? "bg-forest text-[#E6C677] shadow-md"
                          : "text-forest/75 hover:text-forest"
                      }`}
                    >
                      How to Play
                    </button>
                    <button
                      type="button"
                      onClick={() => setSectionTab("zones")}
                      className={`flex-1 sm:flex-initial rounded-xl px-4 sm:px-5 py-2.5 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all cursor-pointer ${
                        sectionTab === "zones"
                          ? "bg-forest text-[#E6C677] shadow-md"
                          : "text-forest/75 hover:text-forest"
                      }`}
                    >
                      Health Zones
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {sectionTab === "steps" ? (
                  <motion.div
                    key={`step-${activeSectionStep.step}`}
                    initial={
                      shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduce ? { opacity: 0 } : { opacity: 0, y: -10 }
                    }
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-forest leading-tight">
                        {activeSectionStep.title}
                      </h3>
                      <p className="mt-1 font-serif text-sm sm:text-base lg:text-lg font-medium italic text-amber">
                        {activeSectionStep.subtitle}
                      </p>
                    </div>

                    <p className="font-sans text-sm sm:text-base leading-relaxed text-forest/80">
                      {activeSectionStep.description}
                    </p>

                    <div>
                      <p className="mb-3 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-amber">
                        Why This Step Matters
                      </p>
                      <div className="grid gap-3.5 sm:grid-cols-3">
                        {activeSectionStep.highlights.map((item, i) => {
                          const ItemIcon = item.Icon;
                          return (
                            <div
                              key={item.label}
                              className="rounded-2xl border border-[#D5A354]/30 bg-white p-4 shadow-[0_8px_24px_rgba(15,61,38,0.04)] hover:border-amber transition"
                            >
                              <div className="mb-2.5 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber/15 text-amber">
                                    <ItemIcon className="h-3.5 w-3.5" />
                                  </span>
                                  <span>{item.label}</span>
                                </span>
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-forest/5 font-serif text-xs font-bold text-forest/70">
                                  0{i + 1}
                                </span>
                              </div>
                              <p className="font-sans text-xs sm:text-sm leading-relaxed text-forest/85">
                                {item.text}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`zone-${activeSectionZone.code}`}
                    initial={
                      shouldReduce ? { opacity: 0 } : { opacity: 0, y: 10 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      shouldReduce ? { opacity: 0 } : { opacity: 0, y: -10 }
                    }
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span
                          className={`rounded-full px-3.5 py-1 font-sans text-xs font-bold ${activeSectionZone.badgeClass}`}
                        >
                          {activeSectionZone.zone}
                        </span>
                        <span
                          className={`rounded-full border px-3.5 py-1 font-sans text-xs font-bold ${activeSectionZone.pillClass}`}
                        >
                          {activeSectionZone.doshaBadge}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-forest leading-tight">
                        {activeSectionZone.name}
                      </h3>
                      <p className="mt-1 font-serif text-sm sm:text-base lg:text-lg font-medium italic text-amber">
                        {activeSectionZone.sanskrit} — “
                        {activeSectionZone.tagline}”
                      </p>
                    </div>

                    <p className="font-sans text-sm sm:text-base leading-relaxed text-forest/80">
                      {activeSectionZone.summary}
                    </p>

                    <div className="grid gap-3.5 sm:grid-cols-3">
                      <div className="rounded-2xl border border-[#D5A354]/30 bg-white p-4 shadow-[0_8px_24px_rgba(15,61,38,0.04)]">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/15 text-amber">
                            <DietBowlSvg className="h-4 w-4" />
                          </span>
                          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                            Diet &amp; Six Tastes
                          </p>
                        </div>
                        <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-forest/85">
                          {activeSectionZone.diet}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#D5A354]/30 bg-white p-4 shadow-[0_8px_24px_rgba(15,61,38,0.04)]">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/15 text-amber">
                            <SunRhythmSvg className="h-4 w-4" />
                          </span>
                          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                            Daily Rhythm &amp; Movement
                          </p>
                        </div>
                        <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-forest/85">
                          {activeSectionZone.movement}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-[#D5A354]/30 bg-white p-4 shadow-[0_8px_24px_rgba(15,61,38,0.04)]">
                        <div className="flex items-center gap-2">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/15 text-amber">
                            <LeafTherapySvg className="h-4 w-4" />
                          </span>
                          <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                            Ayurvedic Self-Care
                          </p>
                        </div>
                        <p className="mt-2.5 font-sans text-xs sm:text-sm leading-relaxed text-forest/85">
                          {activeSectionZone.therapies}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.div
                variants={v}
                custom={2.5}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="flex flex-wrap items-center gap-4 sm:gap-5 justify-center mt-10 shrink-0"
              >
                <Link
                  to="/muktikhela"
                  className="inline-flex min-h-[50px] items-center justify-center gap-3 rounded-xl bg-forest px-7 sm:px-8 py-3.5 font-sans text-sm sm:text-base font-semibold tracking-wide text-white shadow-[0_10px_25px_rgba(15,61,38,0.22)] hover:shadow-[0_14px_30px_rgba(15,61,38,0.3)] hover:bg-moss transition duration-300 focus:outline-none focus:ring-2 focus:ring-amber focus:ring-offset-2"
                >
                  Play Muktikhela
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    handleOpenModal(
                      sectionTab,
                      sectionTab === "steps" ? sectionStepIdx : sectionZoneIdx,
                    )
                  }
                  className="inline-flex min-h-[50px] items-center gap-3 rounded-xl border border-[#D5A354]/50 bg-white px-5 py-2.5 font-sans text-sm sm:text-base font-semibold text-forest shadow-sm hover:border-amber hover:bg-[#FCF9F2] transition duration-300 cursor-pointer"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber/15 text-amber border border-amber/40">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m9 6 9 6-9 6z" />
                    </svg>
                  </span>
                  How It Works
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
        closeAfterTransition
        data-lenis-prevent="true"
      >
        <div
          data-lenis-prevent="true"
          className="relative w-full max-w-6xl max-h-[92vh] rounded-2xl bg-[#FBF8F1] shadow-2xl overflow-y-auto lg:overflow-hidden flex flex-col my-auto border border-[#EADFC7] focus:outline-none"
        >
          <CancelButtonModal onClick={() => setIsModalOpen(false)} />

          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[660px] max-h-none lg:max-h-[90vh] overflow-visible lg:overflow-hidden">
            <div className="lg:col-span-4 bg-[#0F3826] text-[#FBF8F1] p-5 sm:p-6 lg:p-7 flex flex-col justify-between border-r border-[#1B5137]/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center space-x-2 text-[#C9A45C] text-xs font-semibold tracking-widest uppercase mb-2">
                  <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />
                  <span>MUKTIKHELA GUIDE</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-1.5 leading-tight">
                  How It Works &amp; Benefits
                </h3>
                <p className="text-white/70 text-xs font-sans leading-relaxed mb-5">
                  Switch between the 5-step gameplay walkthrough and the 4
                  Ayurvedic Health Zones you unlock.
                </p>

                <div className="grid grid-cols-2 gap-1.5 rounded-xl bg-white/10 p-1 mb-5">
                  <button
                    type="button"
                    onClick={() => setModalTab("steps")}
                    className={`rounded-lg py-2 px-2 font-sans text-xs font-bold transition cursor-pointer ${
                      modalTab === "steps"
                        ? "bg-[#C9A45C] text-[#0D3323] shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    How to Play
                  </button>
                  <button
                    type="button"
                    onClick={() => setModalTab("zones")}
                    className={`rounded-lg py-2 px-2 font-sans text-xs font-bold transition cursor-pointer ${
                      modalTab === "zones"
                        ? "bg-[#C9A45C] text-[#0D3323] shadow-sm"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    Health Zones
                  </button>
                </div>

                <div className="space-y-2.5">
                  {modalTab === "steps"
                    ? gameSteps.map((s, idx) => {
                        const isCurrent = idx === modalStepIdx;
                        return (
                          <button
                            key={s.step}
                            type="button"
                            onClick={() => setModalStepIdx(idx)}
                            className={`w-full text-left flex items-start space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                              isCurrent
                                ? "bg-white/15 border border-[#C9A45C]/60 shadow-sm"
                                : "opacity-80 hover:opacity-100 hover:bg-white/5"
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                isCurrent
                                  ? "bg-[#C9A45C] text-[#0D3323]"
                                  : "border border-white/30 text-white/70"
                              }`}
                            >
                              {s.step}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-white leading-tight truncate">
                                {s.title}
                              </p>
                              <p className="text-[11px] text-white/60 truncate mt-0.5">
                                {s.badge}
                              </p>
                            </div>
                          </button>
                        );
                      })
                    : healthZones.map((z, idx) => {
                        const isCurrent = idx === modalZoneIdx;
                        return (
                          <button
                            key={z.zone}
                            type="button"
                            onClick={() => setModalZoneIdx(idx)}
                            className={`w-full text-left flex items-start space-x-3 p-2.5 rounded-xl transition-all cursor-pointer ${
                              isCurrent
                                ? "bg-white/15 border border-[#C9A45C]/60 shadow-sm"
                                : "opacity-80 hover:opacity-100 hover:bg-white/5"
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                isCurrent
                                  ? "bg-[#C9A45C] text-[#0D3323]"
                                  : "border border-white/30 text-white/70"
                              }`}
                            >
                              {z.code}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-white leading-tight truncate">
                                {z.zone}: {z.name.split(" (")[0]}
                              </p>
                              <p className="text-[11px] text-white/60 truncate mt-0.5">
                                {z.sanskrit}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  7-LEVEL PROGRESSION
                </p>
                <p className="font-sans text-xs text-white/85 mt-1 leading-relaxed">
                  Beginner → Intermediate → Advanced → Expert → Master → Elite →
                  Legend
                </p>
              </div>
            </div>

            <div
              data-lenis-prevent="true"
              className="lg:col-span-8 p-5 sm:p-7 lg:p-8 flex flex-col justify-between overflow-y-auto bg-[#FBF8F1] max-h-[85vh] lg:max-h-[90vh]"
            >
              <div>
                <div className="grid items-center gap-6 md:grid-cols-[1fr_auto]">
                  {modalTab === "steps" ? (
                    <div className="space-y-4">
                      <div>
                        <h2 className="mt-2 font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-forest leading-tight">
                          {activeModalStep.title}
                        </h2>
                        <p className="mt-1 font-serif text-sm sm:text-base italic text-amber">
                          {activeModalStep.subtitle}
                        </p>
                      </div>

                      <p className="font-sans text-xs sm:text-sm leading-relaxed text-forest/80">
                        {activeModalStep.description}
                      </p>

                      <div className="rounded-2xl border border-forest/10 bg-white p-4 space-y-2.5 shadow-sm">
                        <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                          Key Player Benefits in Step {activeModalStep.step}
                        </p>
                        <ul className="space-y-2.5">
                          {activeModalStep.highlights.map((point) => {
                            const PointIcon = point.Icon;
                            return (
                              <li
                                key={point.label}
                                className="flex items-start gap-2.5 font-sans text-xs sm:text-sm text-forest/85"
                              >
                                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-amber/15 text-amber">
                                  <PointIcon className="h-3.5 w-3.5" />
                                </span>
                                <span>
                                  <strong className="text-forest">
                                    {point.label}:
                                  </strong>{" "}
                                  {point.text}
                                </span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-full px-3 py-0.5 font-sans text-xs font-bold ${activeModalZone.badgeClass}`}
                          >
                            {activeModalZone.zone}
                          </span>
                          <span
                            className={`rounded-full border px-3 py-0.5 font-sans text-xs font-bold ${activeModalZone.pillClass}`}
                          >
                            {activeModalZone.doshaBadge}
                          </span>
                        </div>

                        <h2 className="mt-2 font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-forest leading-tight">
                          {activeModalZone.name}
                        </h2>
                        <p className="mt-0.5 font-serif text-sm sm:text-base italic text-amber">
                          {activeModalZone.sanskrit}
                        </p>
                      </div>

                      <p className="font-serif text-xs sm:text-sm font-semibold italic text-forest">
                        “{activeModalZone.tagline}”
                      </p>

                      <p className="font-sans text-xs sm:text-sm leading-relaxed text-forest/80">
                        {activeModalZone.summary}
                      </p>

                      <div className="space-y-2.5">
                        <div className="rounded-xl border border-forest/10 bg-white p-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber/15 text-amber">
                              <DietBowlSvg className="h-3.5 w-3.5" />
                            </span>
                            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                              Diet &amp; Six Tastes
                            </p>
                          </div>
                          <p className="mt-1.5 font-sans text-xs leading-relaxed text-forest/80">
                            {activeModalZone.diet}
                          </p>
                        </div>

                        <div className="rounded-xl border border-forest/10 bg-white p-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber/15 text-amber">
                              <SunRhythmSvg className="h-3.5 w-3.5" />
                            </span>
                            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                              Daily Rhythm &amp; Exercise
                            </p>
                          </div>
                          <p className="mt-1.5 font-sans text-xs leading-relaxed text-forest/80">
                            {activeModalZone.movement}
                          </p>
                        </div>

                        <div className="rounded-xl border border-forest/10 bg-white p-3">
                          <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber/15 text-amber">
                              <LeafTherapySvg className="h-3.5 w-3.5" />
                            </span>
                            <p className="font-sans text-[11px] font-bold uppercase tracking-wider text-amber">
                              Ayurvedic Therapies
                            </p>
                          </div>
                          <p className="mt-1.5 font-sans text-xs leading-relaxed text-forest/80">
                            {activeModalZone.therapies}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col items-center">
                    <div className="rounded-[2.2rem] border-4 border-[#C9A45C]/70 bg-[#0D3323] p-1.5 shadow-xl">
                      <div className="mx-auto mb-1.5 h-1 w-12 rounded-full bg-[#C9A45C]/40" />
                      <div className="overflow-hidden rounded-[1.7rem] bg-white">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={
                              modalTab === "steps"
                                ? activeModalStep.image
                                : activeModalZone.image
                            }
                            src={
                              modalTab === "steps"
                                ? activeModalStep.image
                                : activeModalZone.image
                            }
                            alt={
                              modalTab === "steps"
                                ? activeModalStep.imageAlt
                                : activeModalZone.imageAlt
                            }
                            initial={
                              shouldReduce
                                ? { opacity: 0 }
                                : { opacity: 0, y: 8 }
                            }
                            animate={{ opacity: 1, y: 0 }}
                            exit={
                              shouldReduce
                                ? { opacity: 0 }
                                : { opacity: 0, y: -8 }
                            }
                            transition={{ duration: 0.22 }}
                            className="h-[460px] sm:h-[500px] w-auto object-contain select-none"
                          />
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-forest/10 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <CommonButton
                    label="← Prev"
                    onClick={handleModalPrev}
                    className="!h-9 !px-4 bg-white text-forest border border-forest/20 hover:border-amber !rounded-lg"
                  />
                  <CommonButton
                    label="Next →"
                    onClick={handleModalNext}
                    className="!h-9 !px-4 bg-white text-forest border border-forest/20 hover:border-amber !rounded-lg"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <CommonButton
                    label="Close"
                    onClick={() => setIsModalOpen(false)}
                    className="!h-9 !px-5 bg-forest text-white hover:bg-moss !rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
