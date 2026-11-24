import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  GraduationCap,
  Heart,
  MapPin,
  Users,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import DatePickerField from "../../components/common/forms/DatePickerField";
import RadioField from "../../components/common/forms/RadioField";
import CheckBoxField from "../../components/common/forms/CheckBoxField";
import { useLenis } from "../../components/common/SmoothScroll";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection, V2SlotSelector } from "../components/V2FormControls";
import {
  AnimatedTabDock,
  KineticHeroHighlight,
  SpotlightBentoCard,
  SectionHeader,
} from "../components/V2InteractiveComponents";
import { TwentyFirstHero } from "../components/TwentyFirstComponents";
import {
  ECOSPHERE_CALENDAR,
  ECOSPHERE_TRACKS,
  SWAGRAM_VISIT_OPTIONS,
  V2_IMAGES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import {
  getDropdownValue,
  v2EnquirySchema,
  v2EntranceExamSchema,
  v2SwagramVisitSchema,
} from "../validation/v2Schemas";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const EXAM_BACKGROUND_OPTIONS = [
  { label: "Ayurveda Student / BAMS / Jr. Doctor", value: "Ayurveda Student" },
  { label: "Yoga & Natural Living Practitioner", value: "Yoga Practitioner" },
  { label: "Holistic Health Seeker & Career Shifter", value: "Wellness Seeker" },
];

const RESIDENTIAL_MODES = [
  { id: "Full 120+ Day Residential Stay", label: "Full 120+ Day Residential" },
  { id: "Blended Online + Stay", label: "Blended Online + Campus" },
];

const ADMISSION_SLOTS = [
  {
    value: "Morning Faculty Interaction (10:00 AM - 11:30 AM)",
    title: "Morning Faculty Review",
    time: "10:00 AM – 11:30 AM",
    availability: "4 Cohort Seats Open",
    note: "In-Campus / Video",
  },
  {
    value: "Afternoon Vaidya Discussion (02:30 PM - 04:00 PM)",
    title: "Afternoon Vaidya Slot",
    time: "02:30 PM – 04:00 PM",
    availability: "3 Seats Left",
    note: "Portfolio Review",
  },
  {
    value: "Weekend Gurukul Walkthrough (11:00 AM - 01:00 PM)",
    title: "Weekend Campus Slot",
    time: "11:00 AM – 01:00 PM",
    availability: "Open Registration",
    note: "SwaGrama Lavale",
  },
];

const SWAGRAM_VISIT_MODEL_OPTIONS = [
  { label: "Day Immersion Visit (₹1,200)", value: "Day Immersion Visit" },
  {
    label: "Swagram Business Model & Community Stay (₹3,500)",
    value: "Swagram Business Model & Community Stay",
  },
];

const VISIT_PURPOSES = [
  { label: "Personal Natural Living Tour & Wellness", value: "Personal Tour" },
  { label: "Swagram Business Model & Partnership", value: "Business Model" },
  { label: "Family Retreat & Organic Meals", value: "Family Retreat" },
  { label: "Student / Academic Research Group", value: "Academic Group" },
];

const ARRIVAL_SLOT_CARDS = [
  {
    value: "Morning Arrival (08:30 AM - Herbal Welcome)",
    title: "Morning Herbal Welcome",
    time: "08:30 AM – 12:30 PM",
    availability: "6 Passes Left",
    note: "Garden Walk + Sattvik Lunch",
  },
  {
    value: "Midday Campus Tour (11:30 AM - 03:30 PM)",
    title: "Midday Gurukul Session",
    time: "11:30 AM – 03:30 PM",
    availability: "4 Passes Left",
    note: "Business Model Briefing",
  },
  {
    value: "Afternoon Check-In (03:00 PM Overnight Stay)",
    title: "Evening & Stay Check-In",
    time: "03:00 PM Onwards",
    availability: "3 Cottages Open",
    note: "Agni Hotra & Stay",
  },
];

const CALLBACK_SLOT_CARDS = [
  {
    value: "Morning (09:00 AM - 12:00 PM)",
    title: "Morning Callback",
    time: "09:00 AM – 12:00 PM",
    availability: "Fastest Response",
    note: "Admissions Desk",
  },
  {
    value: "Afternoon (12:30 PM - 04:00 PM)",
    title: "Afternoon Callback",
    time: "12:30 PM – 04:00 PM",
    availability: "Available",
    note: "SwaGrama Team",
  },
  {
    value: "Evening (04:30 PM - 07:00 PM)",
    title: "Evening Callback",
    time: "04:30 PM – 07:00 PM",
    availability: "Open Window",
    note: "Counselor Line",
  },
];

const VILLAGE_ENQUIRY_TOPICS = [
  { label: "Residential Stay & Village Living", value: "Village Living" },
  { label: "Swagram Business Model Partnership", value: "Business Model" },
  { label: "EcoSphere Academy Admission Inquiry", value: "Academy Admission" },
];

const CALLBACK_MODES = [
  { label: "WhatsApp Message (8AM - 6PM)", value: "WhatsApp" },
  { label: "Direct Phone Call", value: "Phone Call" },
  { label: "Email Response", value: "Email" },
];

export default function V2EcoSpherePage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    getDiscountPercent,
    createEnquiry,
    createBooking,
    submitAcademyApplication,
    activateMembership,
    toggleWishlist,
    setPendingAuthIntent,
  } = useV2Store();

  const [searchParams, setSearchParams] = useSearchParams();
  const lenis = useLenis();
  const skipTabScrollRef = useRef(false);
  const activeTab = searchParams.get("tab") || "academy";
  const highlightedTrack = searchParams.get("track");
  const actionParam = searchParams.get("action");
  const setActiveTab = (tabId) => {
    skipTabScrollRef.current = true;
    setSearchParams({ tab: tabId }, { replace: true, preventScrollReset: true });
  };

  useEffect(() => {
    if (skipTabScrollRef.current) {
      skipTabScrollRef.current = false;
      return;
    }
    if (highlightedTrack || actionParam || searchParams.get("tab")) {
      const target = document.getElementById("v2-ecosphere-workspace");
      if (lenis && target) {
        lenis.scrollTo(target, { offset: -80 });
      }
    }
  }, [highlightedTrack, actionParam, searchParams, lenis]);

  const [selectedBatch, setSelectedBatch] = useState(ECOSPHERE_CALENDAR[0]);
  const [examModalOpen, setExamModalOpen] = useState(false);
  const [examResult, setExamResult] = useState(null);
  const [visitOptionModal, setVisitOptionModal] = useState(null);
  const [villageEnquiryOpen, setVillageEnquiryOpen] = useState(false);

  const discountPercent = getDiscountPercent();

  const examForm = useForm({
    resolver: yupResolver(v2EntranceExamSchema),
    defaultValues: {
      name: currentUser?.name || "",
      dob: new Date(1998, 0, 1),
      gender: GENDER_OPTIONS[0],
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      background: EXAM_BACKGROUND_OPTIONS[0],
      qualification: "",
      residentialMode: "Full 120+ Day Residential Stay",
      evaluationSlot: ADMISSION_SLOTS[0].value,
      statement: "",
      declarationExam: true,
    },
  });

  const watchedEvaluationSlot = useWatch({
    control: examForm.control,
    name: "evaluationSlot",
  });

  const visitForm = useForm({
    resolver: yupResolver(v2SwagramVisitSchema),
    defaultValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      organisation: "",
      visitDate: new Date(),
      businessModel: SWAGRAM_VISIT_MODEL_OPTIONS[0],
      visitPurpose: VISIT_PURPOSES[0],
      arrivalSlot: ARRIVAL_SLOT_CARDS[0].value,
      guests: 1,
      dietaryNotes: "",
    },
  });

  const watchedVisitSlot = useWatch({
    control: visitForm.control,
    name: "arrivalSlot",
  });
  const watchedVisitGuests = useWatch({
    control: visitForm.control,
    name: "guests",
  });

  const enquiryForm = useForm({
    resolver: yupResolver(v2EnquirySchema),
    defaultValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      callbackMode: CALLBACK_MODES[0],
      callbackSlot: CALLBACK_SLOT_CARDS[0].value,
      interest: VILLAGE_ENQUIRY_TOPICS[0],
      message: "",
    },
  });

  const watchedEnquirySlot = useWatch({
    control: enquiryForm.control,
    name: "callbackSlot",
  });

  const handleOpenEntranceExam = (batch = ECOSPHERE_CALENDAR[0]) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/ecosphere?tab=academy&action=exam",
      });
      navigate("/v2/login");
      return;
    }
    setSelectedBatch(batch);
    setExamResult(null);
    examForm.reset({
      name: currentUser.name,
      dob: new Date(1998, 0, 1),
      gender: GENDER_OPTIONS[0],
      phone: currentUser.phone,
      email: currentUser.email,
      city: currentUser.city || "Pune",
      background: EXAM_BACKGROUND_OPTIONS[0],
      qualification: "",
      residentialMode: "Full 120+ Day Residential Stay",
      evaluationSlot: ADMISSION_SLOTS[0].value,
      statement: "",
      declarationExam: true,
    });
    setExamModalOpen(true);
  };

  const onSubmitExam = (values) => {
    activateMembership("ecosphere", {
      fullName: values.name,
      city: values.city,
      mobile: values.phone,
      email: values.email,
      primaryFocus: "Gurukul Academy & Ecosphere",
      preferredSeason: `${selectedBatch.season} Academy`,
      goal: values.statement,
    });
    submitAcademyApplication({
      batchTitle: `Ecosphere ${selectedBatch.season} Academy (${selectedBatch.dates})`,
      evaluationSlot: values.evaluationSlot,
      qualification: values.qualification,
      city: values.city,
      residentialMode: values.residentialMode,
      statement: values.statement,
      background: getDropdownValue(values.background),
      discountedFee: 112000,
    });

    setExamResult({
      passed: true,
      evaluationSlot: values.evaluationSlot,
      batchTitle: `${selectedBatch.season} Batch (${selectedBatch.dates})`,
      discountedFee: 112000,
    });
  };

  const handleOpenVisitBooking = (option) => {
    const matchOption =
      SWAGRAM_VISIT_MODEL_OPTIONS.find((o) =>
        o.value.toLowerCase().includes(option.title.toLowerCase())
      ) || SWAGRAM_VISIT_MODEL_OPTIONS[0];
    visitForm.reset({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      organisation: "",
      visitDate: new Date(),
      businessModel: matchOption,
      visitPurpose: VISIT_PURPOSES[0],
      arrivalSlot: ARRIVAL_SLOT_CARDS[0].value,
      guests: 1,
      dietaryNotes: "",
    });
    setVisitOptionModal(option);
  };

  const onSubmitVisit = (values) => {
    if (!visitOptionModal) return;
    const dateStr = values.visitDate
      ? new Date(values.visitDate).toISOString().slice(0, 10)
      : "2026-12-22";
    const guestsCount = Number(values.guests) || 1;
    createBooking({
      kind: "Swagram Visit",
      title: `${visitOptionModal.title} (${guestsCount} visitor${guestsCount > 1 ? "s" : ""})`,
      provider: "SwaGrama Community Village, Lavale",
      basePrice: visitOptionModal.price * guestsCount,
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      organisation: values.organisation,
      preferredDate: dateStr,
      slot: `${getDropdownValue(values.businessModel)} · ${values.arrivalSlot}`,
      visitPurpose: getDropdownValue(values.visitPurpose),
      guests: guestsCount,
      dietaryNotes: values.dietaryNotes,
      concern: values.dietaryNotes || getDropdownValue(values.visitPurpose),
    });
    setVisitOptionModal(null);
  };

  const onSubmitVillageEnquiry = (values) => {
    createEnquiry({
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      callbackMode: getDropdownValue(values.callbackMode),
      callbackSlot: values.callbackSlot,
      interest: getDropdownValue(values.interest),
      message: values.message,
      sourcePage: "EcoSphere & SwaGrama V2",
    });
    setVillageEnquiryOpen(false);
  };

  const handleWishlistItem = (itemId) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "wishlist",
        itemId,
        returnTo: "/v2/ecosphere",
      });
      navigate("/v2/login");
      return;
    }
    toggleWishlist(itemId);
  };

  const pageTabs = [
    {
      id: "academy",
      label: "Academy & Entrance Exam",
      icon: <GraduationCap className="h-3.5 w-3.5" />,
      count: ECOSPHERE_TRACKS.length,
    },
    {
      id: "community",
      label: "Community / SwaGrama Visits",
      icon: <MapPin className="h-3.5 w-3.5" />,
      count: SWAGRAM_VISIT_OPTIONS.length,
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-clip">
      <TwentyFirstHero
        images={[
          V2_IMAGES.ecosphereCampusImg,
          V2_IMAGES.gurukulLessonImg,
          V2_IMAGES.swagramMainImg,
        ]}
        badgeLabel="EcoSphere & SwaGrama · 120+ Day Residential Gurukul"
        onBadgeClick={() => handleOpenEntranceExam(ECOSPHERE_CALENDAR[0])}
        title={
          <>
            Gurukul Living,{" "}<br/>
            <KineticHeroHighlight>Entrance Grant</KineticHeroHighlight> &
            SwaGrama Visits.
          </>
        }
        subtitle="Experience intimate 4-student residential cohorts across Summer, Rainy & Winter seasons. Apply directly for Ecosphere Life & 20% fee grant (₹1,12,000), or book a SwaGrama Business Model visit."
        actions={
          <>
            <CommonButton
              onClick={() => handleOpenEntranceExam(ECOSPHERE_CALENDAR[0])}
              label="Apply For Entrance Admission"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
            />
            <CommonButton
              onClick={() => {
                enquiryForm.reset({
                  name: currentUser?.name || "",
                  phone: currentUser?.phone || "",
                  email: currentUser?.email || "",
                  city: currentUser?.city || "Pune",
                  callbackMode: CALLBACK_MODES[0],
                  callbackSlot: CALLBACK_SLOT_CARDS[0].value,
                  interest: VILLAGE_ENQUIRY_TOPICS[0],
                  message: "",
                });
                setVillageEnquiryOpen(true);
              }}
              label="SwaGrama Village Enquiry"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#FAF5E8]/45 !bg-[#071E14]/55 !text-[#FAF5E8] hover:!bg-[#071E14]/75 !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider backdrop-blur-md"
            />
          </>
        }

      />



      <section
        id="v2-ecosphere-workspace"
        className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 lg:py-20"
      >
        <div className="flex justify-center mb-12">
          <AnimatedTabDock
            tabs={pageTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            layoutId="ecoSphereDock"
          />
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[420px]"
        >
            {activeTab === "academy" && (
          <div className="space-y-14">
            <div>
              <SectionHeader
                eyebrow="Four Learning Tracks"
                title="Structured Academy & Gurukul Tracks"
                subtitle="From Seasonal Academy cohorts and Root Healers for junior Vaidyas to full residential Gurukul life at SwaGrama."
              />

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ECOSPHERE_TRACKS.map((track, idx) => {
                  const icons = [
                    <Calendar key="c" className="h-5 w-5 text-[#C9A45C]" />,
                    <Award key="a" className="h-5 w-5 text-[#C9A45C]" />,
                    <Users key="u" className="h-5 w-5 text-[#C9A45C]" />,
                    <BookOpen key="b" className="h-5 w-5 text-[#C9A45C]" />,
                  ];
                  return (
                    <SpotlightBentoCard
                      key={track.id}
                      className={`p-6 flex flex-col justify-between ${
                        highlightedTrack === track.id
                          ? "ring-2 ring-[#C9A45C] bg-[#FAF5E8]"
                          : ""
                      }`}
                    >
                      <div>
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f3d26] shadow-sm">
                          {icons[idx]}
                        </div>
                        <h3 className="mt-4 font-serif text-xl text-[#0f3d26]">
                          {track.name}
                        </h3>
                        <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                          {track.audience}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleOpenEntranceExam(ECOSPHERE_CALENDAR[idx % 3])
                        }
                        className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0f3d26] hover:text-[#8b6534]"
                      >
                        <span>Apply & Entrance Exam</span>
                        <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                      </button>
                    </SpotlightBentoCard>
                  );
                })}
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="2027–28 Cohort Calendar"
                title="Upcoming 120+ Day Residential Batches"
                subtitle="Pass the free entrance exam to qualify for ₹1,12,000 admission (20% off ₹1,40,000)."
              />

              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {ECOSPHERE_CALENDAR.map((batch) => {
                  const batchImgs = {
                    "eco-summer": V2_IMAGES.summerAcademyImg,
                    "eco-rainy": V2_IMAGES.rainyAcademyImg,
                    "eco-winter": V2_IMAGES.winterAcademyImg,
                  };
                  const isSaved =
                    currentUser &&
                    state.wishlist.some(
                      (w) => w.userId === currentUser.id && w.itemId === batch.id
                    );
                  return (
                    <SpotlightBentoCard key={batch.id} className="flex flex-col">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={batchImgs[batch.id] || V2_IMAGES.ecosphereCampusImg}
                          alt={batch.season}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f3d26]">
                              {batch.season} Batch
                            </span>
                            <button
                              type="button"
                              onClick={() => handleWishlistItem(batch.id)}
                              className={`rounded-full p-2 border transition-colors ${
                                isSaved
                                  ? "border-[#C9A45C] bg-[#C9A45C]/20 text-[#8b6534]"
                                  : "border-[#0f3d26]/15 text-[#0f3d26]/60"
                              }`}
                              aria-label="Save batch"
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <h3 className="mt-3 font-serif text-2xl text-[#0f3d26]">
                            {batch.dates}
                          </h3>
                          <p className="mt-1.5 text-xs font-medium text-[#8b6534]">
                            {batch.format}
                          </p>
                          <div className="mt-4 rounded-xl bg-[#f0f6f2] p-3 text-xs text-[#0f3d26]">
                            Standard: ₹1,40,000 ·{" "}
                            <span className="font-bold text-[#8b6534]">
                              After Entrance Exam (20% Off): ₹1,12,000
                            </span>
                          </div>
                        </div>

                        <CommonButton
                          onClick={() => handleOpenEntranceExam(batch)}
                          label={
                            currentUser
                              ? "Start Free Entrance Exam"
                              : "Sign In for Entrance Exam"
                          }
                          className="mt-5 w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                        />
                      </div>
                    </SpotlightBentoCard>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === "community" && (
          <div className="space-y-10">
            <SectionHeader
              eyebrow="SwaGrama Community Living"
              title="Visit SwaGrama Village & Experience the Business Model"
              subtitle="Non-registered guests and members can submit village enquiries or reserve guided day visits & community immersion stays directly."
            />

            <div
              className={`rounded-3xl border p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5 ${
                actionParam === "enquiry"
                  ? "border-[#C9A45C] bg-[#0D3323] text-[#FAF5E8] shadow-xl ring-2 ring-[#C9A45C]"
                  : "border-[#EDE5D5] bg-[#FFFDF9] text-[#0f3d26]"
              }`}
            >
              <div>
                <p
                  className={`text-[10px] font-bold uppercase tracking-[0.2em] ${
                    actionParam === "enquiry" ? "text-[#C9A45C]" : "text-[#8b6534]"
                  }`}
                >
                  SwaGrama Village Enquiry Desk
                </p>
                <h3 className="mt-1 font-serif text-2xl">
                  Questions About Village Residency or Partnerships?
                </h3>
              </div>
              <CommonButton
                onClick={() => {
                  enquiryForm.reset({
                    name: currentUser?.name || "",
                    phone: currentUser?.phone || "",
                    email: currentUser?.email || "",
                    city: currentUser?.city || "Pune",
                    callbackMode: CALLBACK_MODES[0],
                    callbackSlot: CALLBACK_SLOT_CARDS[0].value,
                    interest: VILLAGE_ENQUIRY_TOPICS[0],
                    message: "",
                  });
                  setVillageEnquiryOpen(true);
                }}
                label="Open Village Enquiry Form"
                className={
                  actionParam === "enquiry"
                    ? "!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] !px-6 !py-2.5 !text-xs !font-bold"
                    : "!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
                }
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {SWAGRAM_VISIT_OPTIONS.map((option) => {
                const discounted = Math.round(
                  option.price * (1 - discountPercent / 100)
                );
                return (
                  <SpotlightBentoCard key={option.id} className="overflow-hidden flex flex-col">
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={option.image || V2_IMAGES.swagramMainImg}
                        alt={option.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-7 flex flex-1 flex-col justify-between">
                      <div>
                        <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f3d26]">
                          SwaGrama · Lavale, Pune
                        </span>
                        <h3 className="mt-3 font-serif text-2xl text-[#0f3d26]">
                          {option.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-[#0f3d26]/75 leading-relaxed">
                          {option.details}
                        </p>
                      </div>

                      <div className="mt-6 pt-5 border-t border-[#EDE5D5] flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <span className="font-serif text-2xl font-bold text-[#0f3d26]">
                            ₹{discounted.toLocaleString("en-IN")}
                          </span>
                          {discountPercent > 0 && (
                            <span className="ml-2 text-xs text-[#8b6534] line-through">
                              ₹{option.price.toLocaleString("en-IN")}
                            </span>
                          )}
                          <p className="text-[11px] text-[#8b6534]">
                            Per person ·{" "}
                            {discountPercent > 0
                              ? `${discountPercent}% member discount applied`
                              : "Ecosphere members receive 20% off"}
                          </p>
                        </div>

                        <CommonButton
                          onClick={() => handleOpenVisitBooking(option)}
                          label="Book Visit"
                          className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                        />
                      </div>
                    </div>
                  </SpotlightBentoCard>
                );
              })}
            </div>
          </div>
        )}
        </motion.div>
      </section>

      <V2ModalShell
        open={examModalOpen}
        onClose={() => setExamModalOpen(false)}
        badge="Complimentary Admission & Entrance Slot"
        title={`Ecosphere Admission · ${selectedBatch.season} Batch`}
        subtitle="Complete your academic profile, motivation statement, and reserve an orientation slot to unlock Ecosphere Life & 20% fee concession (₹1,12,000)."
        maxWidthClass="3xl"
      >
        {!examResult ? (
          <form onSubmit={examForm.handleSubmit(onSubmitExam)} className="space-y-5">
            <V2FormSection
              step="01"
              title="Candidate Identity & Academic Background"
              hint="Cohort Eligibility"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="name"
                    label="Candidate Full Name *"
                    control={examForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={examForm.formState.errors.name}
                  />
                  <FieldError error={examForm.formState.errors.name} />
                </div>
                <div>
                  <DatePickerField
                    name="dob"
                    label="Date of Birth *"
                    control={examForm.control}
                    dob
                    disableFuture
                    error={examForm.formState.errors.dob}
                  />
                  <FieldError error={examForm.formState.errors.dob} />
                </div>
                <div>
                  <DropdownField
                    name="gender"
                    control={examForm.control}
                    dataArray={GENDER_OPTIONS}
                    placeholder="Gender *"
                    error={examForm.formState.errors.gender}
                  />
                  <FieldError error={examForm.formState.errors.gender} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="phone"
                    label="Phone Number *"
                    control={examForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={examForm.formState.errors.phone}
                  />
                  <FieldError error={examForm.formState.errors.phone} />
                </div>
                <div>
                  <InputField
                    name="email"
                    label="Email Address *"
                    control={examForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={examForm.formState.errors.email}
                  />
                  <FieldError error={examForm.formState.errors.email} />
                </div>
                <div>
                  <InputField
                    name="city"
                    label="City & State *"
                    control={examForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={examForm.formState.errors.city}
                  />
                  <FieldError error={examForm.formState.errors.city} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <DropdownField
                    name="background"
                    control={examForm.control}
                    dataArray={EXAM_BACKGROUND_OPTIONS}
                    placeholder="Academic Track *"
                    error={examForm.formState.errors.background}
                  />
                  <FieldError error={examForm.formState.errors.background} />
                </div>
                <div>
                  <InputField
                    name="qualification"
                    label="Highest Qualification / Degree *"
                    control={examForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={examForm.formState.errors.qualification}
                  />
                  <FieldError error={examForm.formState.errors.qualification} />
                </div>
              </div>
            </V2FormSection>

            <V2FormSection
              step="02"
              title="Residential Format, Orientation Slot & Motivation"
              hint="No Test Required Here"
            >
              <div>
                <RadioField
                  name="residentialMode"
                  label="Study Format Commitment *"
                  control={examForm.control}
                  dataArray={RESIDENTIAL_MODES}
                  error={examForm.formState.errors.residentialMode}
                />
              </div>

              <V2SlotSelector
                label="Choose Entrance Orientation / Discussion Slot *"
                value={watchedEvaluationSlot}
                onChange={(val) =>
                  examForm.setValue("evaluationSlot", val, {
                    shouldValidate: true,
                  })
                }
                slots={ADMISSION_SLOTS}
                error={examForm.formState.errors.evaluationSlot}
              />

              <div>
                <InputArea
                  name="statement"
                  label="Statement of Purpose *"
                  placeholder="Share your motivation for 120+ days of Ayurvedic Gurukul immersion..."
                  control={examForm.control}
                  minRows={3}
                />
                <FieldError error={examForm.formState.errors.statement} />
              </div>

              <div>
                <CheckBoxField
                  name="declarationExam"
                  control={examForm.control}
                  label="I confirm that my academic details and statement of purpose are accurate for cohort evaluation."
                  className="text-[#0f3d26] text-xs"
                />
                <FieldError error={examForm.formState.errors.declarationExam} />
              </div>
            </V2FormSection>

            <div className="pt-2 flex justify-end gap-3">
              <CommonButton
                type="button"
                onClick={() => setExamModalOpen(false)}
                label="Cancel"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <CommonButton
                type="submit"
                label="Submit Application & Reserve Slot"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </form>
        ) : (
          <div className="space-y-5 text-center py-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6efea] text-[#0f3d26]">
              <CheckCircle2 className="h-9 w-9 text-[#C9A45C]" />
            </div>
            <h4 className="font-serif text-2xl text-[#0f3d26]">
              Admission Application Confirmed & Ecosphere Life Active
            </h4>
            <p className="text-sm text-[#0f3d26]/80">
              Batch:{" "}
              <span className="font-bold text-[#0f3d26]">
                {examResult.batchTitle}
              </span>
              <br />
              Orientation Slot:{" "}
              <span className="font-semibold text-[#8b6534]">
                {examResult.evaluationSlot}
              </span>
            </p>
            <p className="text-xs text-[#0f3d26]/75">
              Your Ecosphere Life (20% discount) pass is now active, reducing cohort tuition from ₹1,40,000 to ₹1,12,000.
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <CommonButton
                type="button"
                onClick={() => setExamModalOpen(false)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <CommonButton
                onClick={() => {
                  setExamModalOpen(false);
                  navigate("/v2/dashboard");
                }}
                label="Open User Dashboard"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </div>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(visitOptionModal)}
        onClose={() => setVisitOptionModal(null)}
        badge="SwaGrama Visit Booking"
        title={`Reserve ${visitOptionModal?.title || "Swagram Visit"}`}
        subtitle={`Member discount ${discountPercent}% applied · Includes herbal garden walk & organic Sattvik lunch.`}
        maxWidthClass="3xl"
      >
        {visitOptionModal && (
          <form
            onSubmit={visitForm.handleSubmit(onSubmitVisit)}
            className="space-y-5"
          >
            <V2FormSection
              step="01"
              title="Visitor Contact & Origin"
              hint="Gate Entry Pass Details"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <InputField
                    name="name"
                    label="Lead Visitor Full Name *"
                    control={visitForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={visitForm.formState.errors.name}
                  />
                  <FieldError error={visitForm.formState.errors.name} />
                </div>
                <div>
                  <InputField
                    name="phone"
                    label="Phone / WhatsApp *"
                    control={visitForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={visitForm.formState.errors.phone}
                  />
                  <FieldError error={visitForm.formState.errors.phone} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="email"
                    label="Email for Entry Pass *"
                    control={visitForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={visitForm.formState.errors.email}
                  />
                  <FieldError error={visitForm.formState.errors.email} />
                </div>
                <div>
                  <InputField
                    name="city"
                    label="Origin City *"
                    control={visitForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={visitForm.formState.errors.city}
                  />
                  <FieldError error={visitForm.formState.errors.city} />
                </div>
                <div>
                  <InputField
                    name="organisation"
                    label="Family / Org Name"
                    control={visitForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
              </div>
            </V2FormSection>

            <V2FormSection
              step="02"
              title="Visit Date, Track & Open Campus Arrival Slots"
              hint="SwaGrama Reception Windows"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <DatePickerField
                    name="visitDate"
                    label="Visit Date *"
                    control={visitForm.control}
                    disablePast
                    error={visitForm.formState.errors.visitDate}
                  />
                  <FieldError error={visitForm.formState.errors.visitDate} />
                </div>
                <div>
                  <DropdownField
                    name="businessModel"
                    control={visitForm.control}
                    dataArray={SWAGRAM_VISIT_MODEL_OPTIONS}
                    placeholder="Experience Track *"
                    error={visitForm.formState.errors.businessModel}
                  />
                  <FieldError error={visitForm.formState.errors.businessModel} />
                </div>
                <div>
                  <DropdownField
                    name="visitPurpose"
                    control={visitForm.control}
                    dataArray={VISIT_PURPOSES}
                    placeholder="Purpose of Visit *"
                    error={visitForm.formState.errors.visitPurpose}
                  />
                  <FieldError error={visitForm.formState.errors.visitPurpose} />
                </div>
              </div>

              <V2SlotSelector
                label="Available Campus Arrival Windows *"
                value={watchedVisitSlot}
                onChange={(val) =>
                  visitForm.setValue("arrivalSlot", val, {
                    shouldValidate: true,
                  })
                }
                slots={ARRIVAL_SLOT_CARDS}
                error={visitForm.formState.errors.arrivalSlot}
              />
            </V2FormSection>

            <V2FormSection
              step="03"
              title="Group Size & Dietary Hospitality Notes"
              hint="Sattvik Kitchen Prep"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="guests"
                    label="Visitor Count *"
                    type="number"
                    control={visitForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={visitForm.formState.errors.guests}
                  />
                  <FieldError error={visitForm.formState.errors.guests} />
                </div>
                <div className="sm:col-span-2">
                  <InputArea
                    name="dietaryNotes"
                    label="Dietary Needs or Stay Preferences (Optional)"
                    placeholder="Any allergies, room accessibility, or business meeting requests..."
                    control={visitForm.control}
                    minRows={2}
                  />
                </div>
              </div>
            </V2FormSection>

            <div className="rounded-2xl border border-[#C9A45C]/35 bg-[#FBF8F1] p-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0f3d26]">
                Total Estimated Visit Fee ({Math.max(1, Number(watchedVisitGuests) || 1)} Visitor(s) · {discountPercent}% Off)
              </span>
              <span className="font-serif text-lg font-bold text-[#0f3d26]">
                ₹
                {Math.round(
                  visitOptionModal.price *
                    Math.max(1, Number(watchedVisitGuests) || 1) *
                    (1 - discountPercent / 100)
                ).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <CommonButton
                type="button"
                onClick={() => setVisitOptionModal(null)}
                label="Cancel"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <CommonButton
                type="submit"
                label="Confirm Visit Booking"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </form>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={villageEnquiryOpen}
        onClose={() => setVillageEnquiryOpen(false)}
        badge="Village Enquiry"
        title="SwaGrama Community & Business Model Enquiry"
        subtitle="Non-registered guests and members can ask directly about village residences or partnerships."
        maxWidthClass="2xl"
      >
        <form
          onSubmit={enquiryForm.handleSubmit(onSubmitVillageEnquiry)}
          className="space-y-4"
        >
          <V2FormSection
            step="01"
            title="Enquirer Contact Details"
            hint="Direct Response"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="name"
                  label="Full Name *"
                  control={enquiryForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={enquiryForm.formState.errors.name}
                />
                <FieldError error={enquiryForm.formState.errors.name} />
              </div>
              <div>
                <InputField
                  name="phone"
                  label="Phone / WhatsApp *"
                  control={enquiryForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={enquiryForm.formState.errors.phone}
                />
                <FieldError error={enquiryForm.formState.errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="email"
                  label="Email Address *"
                  control={enquiryForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={enquiryForm.formState.errors.email}
                />
                <FieldError error={enquiryForm.formState.errors.email} />
              </div>
              <div>
                <InputField
                  name="city"
                  label="Origin City *"
                  control={enquiryForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={enquiryForm.formState.errors.city}
                />
                <FieldError error={enquiryForm.formState.errors.city} />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Topic & Preferred Callback Slot"
            hint="Coordinator Availability"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <DropdownField
                  name="callbackMode"
                  control={enquiryForm.control}
                  dataArray={CALLBACK_MODES}
                  placeholder="Preferred Callback Mode *"
                  error={enquiryForm.formState.errors.callbackMode}
                />
                <FieldError error={enquiryForm.formState.errors.callbackMode} />
              </div>
              <div>
                <DropdownField
                  name="interest"
                  control={enquiryForm.control}
                  dataArray={VILLAGE_ENQUIRY_TOPICS}
                  placeholder="Topic *"
                  error={enquiryForm.formState.errors.interest}
                />
                <FieldError error={enquiryForm.formState.errors.interest} />
              </div>
            </div>

            <V2SlotSelector
              label="Preferred Callback Time Slot *"
              value={watchedEnquirySlot}
              onChange={(val) =>
                enquiryForm.setValue("callbackSlot", val, {
                  shouldValidate: true,
                })
              }
              slots={CALLBACK_SLOT_CARDS}
              error={enquiryForm.formState.errors.callbackSlot}
            />

            <div>
              <InputArea
                name="message"
                label="Detailed Enquiry Message *"
                placeholder="Write your SwaGrama village enquiry, group count, or business questions..."
                control={enquiryForm.control}
                minRows={3}
              />
              <FieldError error={enquiryForm.formState.errors.message} />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setVillageEnquiryOpen(false)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Send Village Enquiry"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>
    </div>
  );
}
