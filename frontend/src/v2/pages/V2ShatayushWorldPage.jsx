import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import Snowfall from "react-snowfall";
import {
  ArrowRight,
  CheckCircle2,
  CloudRain,
  Download,
  Heart,
  Lock,
  Snowflake,
  Sun,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import { ease } from "../../components/membership/MotionKit";
import { useLenis } from "../../components/common/SmoothScroll";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection, V2SlotSelector } from "../components/V2FormControls";
import {
  AnimatedTabDock,
  KineticHeroHighlight,
  SectionHeader,
  SpotlightBentoCard,
} from "../components/V2InteractiveComponents";
import { TwentyFirstHero } from "../components/TwentyFirstComponents";
import {
  SEASONAL_ACADEMIES,
  SHATAYUSH_FOUR_DIMENSIONS,
  SHATAYUSH_PHASES,
  SHATAYUSH_PHILOSOPHY_PILLARS,
  SHATAYUSH_RESOURCES,
  V2_IMAGES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import { getDropdownValue, v2EnquirySchema } from "../validation/v2Schemas";

const SHATAYUSH_ENQUIRY_OPTIONS = [
  { label: "Rainy Academy (Varsha · Jul - Oct 2027)", value: "Rainy Academy" },
  { label: "Summer Academy (Grishma · Mar - Jun 2027)", value: "Summer Academy" },
  { label: "Winter Academy (Hemanta · Nov 2027 - Feb 2028)", value: "Winter Academy" },
  { label: "Shatayush World Life Membership (₹500)", value: "Membership" },
];

const CALLBACK_MODES = [
  { label: "WhatsApp Message (8AM - 6PM)", value: "WhatsApp" },
  { label: "Direct Phone Call", value: "Phone Call" },
  { label: "Detailed Email Response", value: "Email" },
];

const SHATAYUSH_CALLBACK_SLOTS = [
  {
    value: "Morning (09:00 AM - 12:00 PM)",
    title: "Morning Callback",
    time: "09:00 AM – 12:00 PM",
    availability: "Open Window",
    note: "Academy Counselor",
  },
  {
    value: "Afternoon (12:30 PM - 04:00 PM)",
    title: "Afternoon Callback",
    time: "12:30 PM – 04:00 PM",
    availability: "Available",
    note: "Course Desk",
  },
  {
    value: "Evening (04:30 PM - 07:00 PM)",
    title: "Evening Callback",
    time: "04:30 PM – 07:00 PM",
    availability: "Open Window",
    note: "Program Guidance",
  },
];

export default function V2ShatayushWorldPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lenis = useLenis();

  useEffect(() => {
    if (searchParams.get("section") === "seasonal") {
      if (lenis) {
        lenis.scrollTo("#v2-seasonal-stage", { offset: -80 });
      }
    }
  }, [searchParams, lenis]);
  const {
    state,
    currentUser,
    getTierInfo,
    getDiscountPercent,
    createEnquiry,
    toggleWishlist,
    setPendingAuthIntent,
  } = useV2Store();

  const [activePhase, setActivePhase] = useState(0);
  const [activeSeason, setActiveSeason] = useState("rainy");
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [membershipGateModal, setMembershipGateModal] = useState(null);
  const [unlockedResourceModal, setUnlockedResourceModal] = useState(null);

  const activeTier = currentUser
    ? getTierInfo(currentUser.membershipTier)
    : null;
  const discountPercent = getDiscountPercent();
  const isPaidMember =
    currentUser &&
    ["shatayush", "globalayurx", "ecosphere"].includes(
      currentUser.membershipTier
    );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(v2EnquirySchema),
    defaultValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      callbackMode: CALLBACK_MODES[0],
      callbackSlot: SHATAYUSH_CALLBACK_SLOTS[0].value,
      interest: SHATAYUSH_ENQUIRY_OPTIONS[0],
      message: "",
    },
  });

  const watchedCallbackSlot = useWatch({ control, name: "callbackSlot" });

  const openEnquiry = (defaultTitle) => {
    const matched =
      SHATAYUSH_ENQUIRY_OPTIONS.find((opt) =>
        opt.label.toLowerCase().includes((defaultTitle || "").toLowerCase())
      ) || SHATAYUSH_ENQUIRY_OPTIONS[0];
    reset({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      callbackMode: CALLBACK_MODES[0],
      callbackSlot: SHATAYUSH_CALLBACK_SLOTS[0].value,
      interest: matched,
      message: "",
    });
    setEnquiryOpen(true);
  };

  const onSubmitEnquiry = (values) => {
    createEnquiry({
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      callbackMode: getDropdownValue(values.callbackMode),
      callbackSlot: values.callbackSlot,
      interest: getDropdownValue(values.interest),
      message: values.message,
      sourcePage: "Shatayush World V2",
    });
    setEnquiryOpen(false);
  };

  const handleStartAssessment = () => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/muktikhela",
      });
      navigate("/v2/login");
      return;
    }
    navigate("/v2/muktikhela");
  };

  const handleDownloadResource = (resource) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/membership",
      });
      navigate("/v2/login");
      return;
    }
    if (!isPaidMember) {
      setMembershipGateModal(resource);
      return;
    }
    setUnlockedResourceModal(resource);
  };

  const handleWishlistSeason = (seasonId) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "wishlist",
        itemId: seasonId,
        returnTo: "/v2/shatayush-world",
      });
      navigate("/v2/login");
      return;
    }
    toggleWishlist(seasonId);
  };

  const currentPhase = SHATAYUSH_PHASES[activePhase];
  const selectedAcademy =
    SEASONAL_ACADEMIES.find((a) => a.id === activeSeason) ||
    SEASONAL_ACADEMIES[0];
  const academyFinalFee = Math.round(
    selectedAcademy.fee * (1 - discountPercent / 100)
  );
  const seasonSaved =
    currentUser &&
    state.wishlist.some(
      (w) => w.userId === currentUser.id && w.itemId === selectedAcademy.id
    );

  const seasonTabs = [
    {
      id: "rainy",
      label: "Rainy (Varsha)",
      icon: <CloudRain className="h-3.5 w-3.5" />,
    },
    {
      id: "summer",
      label: "Summer (Grishma)",
      icon: <Sun className="h-3.5 w-3.5" />,
    },
    {
      id: "winter",
      label: "Winter (Hemanta)",
      icon: <Snowflake className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-clip">
      <TwentyFirstHero
        images={[
          V2_IMAGES.shatayushSunriseImg,
          V2_IMAGES.rainyAcademyImg,
          V2_IMAGES.summerAcademyImg,
          V2_IMAGES.winterAcademyImg,
        ]}
        badgeLabel="Illness to Wellness to Centenarian Life · Shatayus World"
        onBadgeClick={handleStartAssessment}
        title={
          <>
            Designing Life <br/> Around{" "}
            <KineticHeroHighlight>Health</KineticHeroHighlight>, Not Disease.
          </>
        }
        subtitle="Shatayus – Journey Within. One Universe. One Health. One Life. Four guided phases moving from Who Am I self-discovery through daily Dinacharya alignment, blended Seasonal Academy cohorts, and sustained community longevity."
        actions={
          <>
            <CommonButton
              onClick={() => {
                if (lenis) {
                  lenis.scrollTo("#v2-seasonal-stage", { offset: -80 });
                } else {
                  document
                    .getElementById("v2-seasonal-stage")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              label="Explore Seasonal Academy"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
            />
            <CommonButton
              onClick={() => openEnquiry("Seasonal Academy")}
              label="Enquire Now"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#FAF5E8]/45 !bg-[#071E14]/55 !text-[#FAF5E8] hover:!bg-[#071E14]/75 !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider backdrop-blur-md"
            />
            <button
              type="button"
              onClick={handleStartAssessment}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C9A45C]/50 bg-[#071E14]/55 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#E7D7B5] backdrop-blur-md hover:bg-[#C9A45C]/20 transition-colors"
            >
              <span>Self-Discovery Assessment</span>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </button>
          </>
        }

      />

      <section className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-16 lg:py-20">
        <SectionHeader
          align="left"
          eyebrow="Why Shatayus · One Universe. One Health. One Life."
          title="A Journey Beyond Symptoms Into Conscious Wellbeing"
          subtitle="A journey towards understanding yourself, transforming the way you live, and building a sustainable rhythm for longevity."
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SHATAYUSH_PHILOSOPHY_PILLARS.map((item) => (
            <SpotlightBentoCard key={item.num} className="overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#0f3d26]/85 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
              {item.motto && (
                <div className="px-6 pb-6 pt-3 border-t border-[#EDE5D5] bg-[#FAF5E8]/60">
                  <p className="font-serif text-sm font-bold italic text-[#0f3d26]">
                    {item.motto}
                  </p>
                </div>
              )}
            </SpotlightBentoCard>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#0B3326] text-[#FAF5E8] border-y border-[#C9A45C]/25">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14">
          <SectionHeader
            dark
            eyebrow="Transformation Journey"
            title="Four Phases: The Complete Transformation Journey"
            subtitle="Flow naturally from personal self-discovery through daily rhythm alignment and sustained centenarian practice."
          />

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-3">
              {SHATAYUSH_PHASES.map((phase, idx) => {
                const selected = activePhase === idx;
                return (
                  <button
                    key={phase.id}
                    type="button"
                    onClick={() => setActivePhase(idx)}
                    className={`w-full rounded-2xl border p-5 text-left transition-all ${
                      selected
                        ? "border-[#C9A45C] bg-[#C9A45C]/20 shadow-lg"
                        : "border-[#C9A45C]/20 bg-white/5 hover:border-[#C9A45C]/45"
                    }`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                      {phase.phaseLabel}
                    </p>
                    <h3 className="mt-1 font-serif text-xl text-[#FAF5E8]">
                      {phase.title}
                    </h3>
                    {selected && (
                      <div className="mt-2.5 space-y-2.5">
                        <p className="text-xs text-[#FAF5E8]/85 leading-relaxed">
                          {phase.description}
                        </p>
                        {phase.detail && (
                          <div className="rounded-xl border-l-2 border-[#C9A45C] bg-[#071E14]/65 px-3.5 py-2.5 text-xs text-[#E7D7B5] leading-relaxed">
                            {phase.detail}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                );
              })}

              <div className="pt-3 flex flex-wrap gap-3">
                {currentPhase.hasAssessment ? (
                  <button
                    type="button"
                    onClick={handleStartAssessment}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
                  >
                    <span>
                      {currentUser
                        ? "Start Muktikhela Assessment"
                        : "Sign In & Start Assessment"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                ) : (
                  <CommonButton
                    onClick={() => openEnquiry(currentPhase.title)}
                    label="Enquire About This Phase"
                    className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              <motion.div
                key={currentPhase.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease }}
                className="w-full"
              >
                {currentPhase.hasAssessment ? (
                  <div className="mx-auto w-[280px] sm:w-[310px] rounded-[2.6rem] border-[6px] border-[#C9A45C]/50 bg-[#071E14] p-3 shadow-2xl">
                    <div className="aspect-[9/19] w-full overflow-hidden rounded-[2rem] bg-[#FBF8F1]">
                      <img
                        src={currentPhase.image}
                        alt={currentPhase.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="aspect-[16/10] w-full overflow-hidden rounded-3xl border border-[#C9A45C]/30 shadow-2xl">
                    <img
                      src={currentPhase.image}
                      alt={currentPhase.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="v2-seasonal-stage"
        className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-16 lg:py-24"
      >
        <SectionHeader
          eyebrow="Three Seasons. Three Academies. One Transformation."
          title="Explore Our Seasonal Academy"
          subtitle="Shatayus follows the rhythms of nature through three seasonal blended academies across Rainy (स्ववर्ष्यजाविहार), Summer (स्वग्रीष्मजाविहार), and Winter (स्वहैमन्तजाविहार) with privileges up to 20%."
        />

        <div className="mt-8 flex justify-center">
          <AnimatedTabDock
            tabs={seasonTabs}
            activeTab={activeSeason}
            onChange={setActiveSeason}
            layoutId="shatayushSeasonDock"
          />
        </div>

        <motion.div
          key={selectedAcademy.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="relative mt-10 rounded-3xl border border-[#0f3d26]/15 bg-[#071E14] overflow-hidden shadow-[0_28px_70px_rgba(7,30,20,0.2)] grid grid-cols-1 lg:grid-cols-12"
        >
          <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto w-full overflow-hidden">
            <img
              src={selectedAcademy.image}
              alt={selectedAcademy.name}
              className="h-full w-full object-cover"
            />
            {activeSeason === "winter" && (
              <div className="pointer-events-none absolute inset-0">
                <Snowfall
                  color="#ffffff"
                  snowflakeCount={75}
                  speed={[0.5, 1.5]}
                  radius={[1.0, 2.8]}
                />
              </div>
            )}
            {activeSeason === "rainy" && (
              <div className="pointer-events-none absolute inset-0">
                <Snowfall
                  color="#cfeaff"
                  snowflakeCount={100}
                  speed={[7.0, 12.0]}
                  wind={[-2.0, -0.8]}
                  radius={[0.9, 2.0]}
                />
              </div>
            )}
            {activeSeason === "summer" && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,220,130,0.45),transparent_60%)]"
              />
            )}
          </div>

          <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between bg-[#F9F6EE] text-[#0f3d26]">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0f3d26]">
                  {selectedAcademy.season}
                </span>
                <button
                  type="button"
                  onClick={() => handleWishlistSeason(selectedAcademy.id)}
                  className={`rounded-full p-2 border transition-colors ${
                    seasonSaved
                      ? "border-[#C9A45C] bg-[#C9A45C]/20 text-[#8b6534]"
                      : "border-[#0f3d26]/15 text-[#0f3d26]/70"
                  }`}
                  aria-label="Save seasonal academy"
                >
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <h3 className="mt-4 font-serif text-3xl text-[#0f3d26]">
                {selectedAcademy.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#8b6534]">
                {selectedAcademy.sanskrit ? `${selectedAcademy.sanskrit} · ` : ""}{selectedAcademy.dates} · {selectedAcademy.duration}
              </p>
              <p className="mt-4 text-sm text-[#0f3d26]/80 leading-relaxed">
                {selectedAcademy.description}
              </p>

              <div className="mt-6 rounded-2xl border border-[#C9A45C]/35 bg-[#FFFDF9] p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8b6534]">
                  Programme Investment
                </p>
                <div className="mt-1 flex items-baseline gap-2.5">
                  <span className="font-serif text-2xl font-bold text-[#0f3d26]">
                    ₹{academyFinalFee.toLocaleString("en-IN")}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs text-[#8b6534] line-through">
                      ₹{selectedAcademy.fee.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-[#0f3d26]/65">
                  {discountPercent > 0
                    ? `Your ${discountPercent}% ${activeTier?.name} privilege is active.`
                    : "Members save 5% (Shatayush), 10% (GlobalAyurX), or 20% (Ecosphere)."}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <CommonButton
                onClick={() => openEnquiry(selectedAcademy.name)}
                label="Enquire / Request Syllabus"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <Link
                to="/v2/ecosphere"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#0f3d26]/20 px-6 py-2.5 text-xs font-bold text-[#0f3d26] hover:bg-[#e6efea] transition-colors"
              >
                <span>Apply via EcoSphere</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 lg:py-20 bg-[#FFFDF9] border-t border-[#EDE5D5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 space-y-10">
          <SectionHeader
            align="left"
            eyebrow="Why Shatayus?"
            title="More Than a Programme. A Way of Life."
            subtitle="Shatayus brings together four interconnected dimensions of conscious wellbeing spanning body, mind, season, and community."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHATAYUSH_FOUR_DIMENSIONS.map((dim) => (
              <SpotlightBentoCard key={dim.num} className="overflow-hidden flex flex-col">
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
                  <img
                    src={dim.image}
                    alt={dim.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-5 flex-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8b6534]">
                    Dimension
                  </span>
                  <h3 className="mt-1 font-serif text-xl text-[#0f3d26]">
                    {dim.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                    {dim.text}
                  </p>
                </div>
              </SpotlightBentoCard>
            ))}
          </div>

          <div className="rounded-2xl border border-[#C9A45C]/50 bg-[#FAF5E8] p-6 text-center">
            <p className="font-serif text-base sm:text-lg font-bold text-[#0f3d26] leading-relaxed">
              The idea is simple: wellbeing should extend beyond the individual. It should influence how we live, how we connect with others and how we care for the world around us.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-[#F9F6EE] border-t border-[#EDE5D5]">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14">
          <SectionHeader
            eyebrow="Member Resource Library"
            title="Downloadable Journals & Longevity Guides"
            subtitle="Unlocked automatically for Shatayush World Life (₹500), GlobalAyurX Life, and Ecosphere Life members."
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SHATAYUSH_RESOURCES.map((resource) => (
              <SpotlightBentoCard key={resource.id} className="flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#071E14]/85 border border-[#C9A45C]/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#E7D7B5]">
                    {isPaidMember ? (
                      <CheckCircle2 className="h-3 w-3 text-[#C9A45C]" />
                    ) : (
                      <Lock className="h-3 w-3 text-[#C9A45C]" />
                    )}
                    {isPaidMember ? "Unlocked" : "Membership Required"}
                  </span>
                </div>

                <div className="p-5 flex flex-1 flex-col">
                  <h3 className="font-serif text-lg text-[#0f3d26]">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#0f3d26]/70 flex-1 leading-relaxed">
                    {resource.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleDownloadResource(resource)}
                    className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                  >
                    <Download className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>
                      {isPaidMember ? "Download Handbook" : "Unlock & Download"}
                    </span>
                  </button>
                </div>
              </SpotlightBentoCard>
            ))}
          </div>
          <div className="mt-12 rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-8 sm:p-12 text-center text-[#FAF5E8] shadow-xl space-y-5">
            <span className="inline-flex rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
              Illness to Wellness to Centenarian Life
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF5E8]">
              Transform the Way You Live. <span className="italic text-[#E7D7B5]">Shatayus – Journey Within</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <CommonButton
                onClick={() => openEnquiry("Seasonal Academy")}
                label="Enquire Now"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
              />
              <Link
                to="/v2/membership?tier=shatayush"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E7D7B5]/45 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] hover:bg-white/10 transition-colors"
              >
                <span>Explore the Shatayus Programme</span>
                <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <V2ModalShell
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        badge="Shatayush World Enquiry"
        title="Enquire About Seasonal Academy & Transformation"
        subtitle="Guests and registered users receive full schedule details and seasonal guidance directly."
      >
        <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-4">
          <V2FormSection
            step="01"
            title="Participant Information"
            hint="Direct Guidance"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="name"
                  label="Full Name *"
                  control={control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={errors.name}
                />
                <FieldError error={errors.name} />
              </div>
              <div>
                <InputField
                  name="phone"
                  label="Phone / WhatsApp *"
                  control={control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={errors.phone}
                />
                <FieldError error={errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="email"
                  label="Email Address *"
                  control={control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={errors.email}
                />
                <FieldError error={errors.email} />
              </div>
              <div>
                <InputField
                  name="city"
                  label="Origin City *"
                  control={control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={errors.city}
                />
                <FieldError error={errors.city} />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Seasonal Academy Track & Callback Slot"
            hint="Open Desk Windows"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <DropdownField
                  name="callbackMode"
                  control={control}
                  dataArray={CALLBACK_MODES}
                  placeholder="Preferred Callback Mode *"
                  error={errors.callbackMode}
                />
                <FieldError error={errors.callbackMode} />
              </div>
              <div>
                <DropdownField
                  name="interest"
                  control={control}
                  dataArray={SHATAYUSH_ENQUIRY_OPTIONS}
                  placeholder="Select Seasonal Track *"
                  error={errors.interest}
                />
                <FieldError error={errors.interest} />
              </div>
            </div>

            <V2SlotSelector
              label="Select Open Callback Slot *"
              value={watchedCallbackSlot}
              onChange={(val) =>
                setValue("callbackSlot", val, { shouldValidate: true })
              }
              slots={SHATAYUSH_CALLBACK_SLOTS}
              error={errors.callbackSlot}
            />

            <div>
              <InputArea
                name="message"
                label="Message or Preferred Batch *"
                placeholder="Share which seasonal academy or phase you wish to join..."
                control={control}
                minRows={3}
                maxRows={5}
              />
              <FieldError error={errors.message} />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setEnquiryOpen(false)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Submit Enquiry"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(membershipGateModal)}
        onClose={() => setMembershipGateModal(null)}
        badge="Membership Gate"
        title="Membership Required for Resource Library"
        subtitle="Upgrade to Shatayush World Life (₹500 lifetime) or higher to download all classical handbooks."
        maxWidthClass="lg"
      >
        {membershipGateModal && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-[#C9A45C]/35 bg-[#FBF8F1] p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8b6534]">
                Requested Handbook
              </p>
              <p className="mt-1 font-serif text-xl text-[#0f3d26]">
                {membershipGateModal.title}
              </p>
            </div>
            <div className="flex flex-wrap justify-end gap-3">
              <CommonButton
                onClick={() => setMembershipGateModal(null)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <Link
                to="/v2/membership"
                onClick={() => setMembershipGateModal(null)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                <span>Choose Lifetime Membership</span>
                <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
              </Link>
            </div>
          </div>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(unlockedResourceModal)}
        onClose={() => setUnlockedResourceModal(null)}
        badge="Member Resource Unlocked"
        title={unlockedResourceModal?.title}
        subtitle={`Unlocked via your active ${activeTier?.name || "Member"} pass.`}
        maxWidthClass="lg"
      >
        {unlockedResourceModal && (
          <div className="space-y-5">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#EDE5D5]">
              <img
                src={unlockedResourceModal.image}
                alt={unlockedResourceModal.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-[#0f3d26]/80 leading-relaxed">
              {unlockedResourceModal.description}
            </p>
            <div className="flex justify-end gap-3">
              <CommonButton
                onClick={() => setUnlockedResourceModal(null)}
                label="Done"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </div>
        )}
      </V2ModalShell>
    </div>
  );
}
