import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRight,
  CheckCircle2,
  CloudRain,
  CreditCard,
  ShieldCheck,
  Snowflake,
  Sun,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import DatePickerField from "../../components/common/forms/DatePickerField";
import RadioField from "../../components/common/forms/RadioField";
import CheckBoxField from "../../components/common/forms/CheckBoxField";
import {
  TiltCard,
  Reveal,
  AnimatedCheck,
  Counter,
  Marquee,
} from "../../components/membership/MotionKit";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection } from "../components/V2FormControls";
import {
  KineticHeroHighlight,
  SectionHeader,
  SpotlightBentoCard,
} from "../components/V2InteractiveComponents";
import { TwentyFirstHero } from "../components/TwentyFirstComponents";
import {
  MEMBERSHIP_ACADEMY_HIGHLIGHTS,
  MEMBERSHIP_ACADEMY_STATS,
  MEMBERSHIP_COMPARISON_ROWS,
  MEMBERSHIP_JOIN_PATH,
  MEMBERSHIP_TIERS,
  SEASONAL_ACADEMIES,
  V2_IMAGES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import {
  getDropdownValue,
  v2MembershipEnrollmentSchema,
} from "../validation/v2Schemas";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const SEASON_COHORT_OPTIONS = [
  { label: "Rainy Academy (Varsha · Jul - Oct)", value: "Rainy Academy" },
  { label: "Summer Academy (Grishma · Mar - Jun)", value: "Summer Academy" },
  { label: "Winter Academy (Hemanta · Nov - Feb)", value: "Winter Academy" },
];

const VAIDYA_SPECIALTIES = [
  { label: "Panchakarma & Detox Vaidya", value: "Panchakarma" },
  { label: "Kayachikitsa (Internal Medicine)", value: "Kayachikitsa" },
  { label: "Prakriti & Muktikhela Specialist", value: "Prakriti Specialist" },
];

const PARTICIPATION_MODES = [
  { id: "Online", label: "Online" },
  { id: "Residential", label: "Residential" },
  { id: "Both", label: "Both" },
];

const HOUSEHOLD_OPTIONS = [
  { label: "Individual Pass (1 Member)", value: "Individual (1 Member)" },
  { label: "Couple Pass (2 Adults)", value: "Couple (2 Members)" },
  { label: "Family Household (3-5 Members)", value: "Family (3-5 Members)" },
  { label: "Joint Family / Clinic Team (6+ Members)", value: "Joint (6+ Members)" },
];

const PRIMARY_FOCUS_OPTIONS = [
  { label: "Preventive Shatayush Longevity & Daily Rhythm", value: "Preventive Longevity" },
  { label: "Chronic Care & Seasonal Panchakarma", value: "Panchakarma & Care" },
  { label: "Herbal Formulations, Diet & Muktikhela Check", value: "Nutrition & Prakriti" },
  { label: "Gurukul Academy & Community Living", value: "Gurukul Academy" },
];

const MEMBERSHIP_PAYMENT_MODES = [
  { id: "UPI Instant", label: "UPI / QR Instant" },
  { id: "Card / NetBanking", label: "Card / NetBanking" },
  { id: "SwaGrama Desk Invoice", label: "Pay at SwaGrama / Desk" },
];

export default function V2MembershipPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightedTier = searchParams.get("tier");
  const {
    currentUser,
    activateMembership,
    submitPractitionerApplication,
    setPendingAuthIntent,
  } = useV2Store();

  const [selectedTierModal, setSelectedTierModal] = useState(null);
  const [selectedSeasonId, setSelectedSeasonId] = useState("summer");

  const enrollmentForm = useForm({
    resolver: yupResolver(v2MembershipEnrollmentSchema),
    defaultValues: {
      firstName: currentUser?.name?.split(" ")[0] || "",
      lastName: currentUser?.name?.split(" ").slice(1).join(" ") || "",
      dob: new Date(1992, 0, 1),
      gender: GENDER_OPTIONS[0],
      mobile: currentUser?.phone || "",
      whatsapp: currentUser?.phone || "",
      email: currentUser?.email || "",
      addressLine: "",
      city: currentUser?.city || "Pune",
      state: "Maharashtra",
      pinCode: "",
      householdSize: HOUSEHOLD_OPTIONS[0],
      primaryFocus: PRIMARY_FOCUS_OPTIONS[0],
      emergencyName: "",
      emergencyPhone: "",
      paymentMethod: "UPI Instant",
      profession: "Wellness Seeker",
      organisation: "",
      modeOfParticipation: "Both",
      preferredSeason: SEASON_COHORT_OPTIONS[0],
      requirePractitioner: false,
      credentials: "",
      specialty: VAIDYA_SPECIALTIES[0],
      goal: "",
      declarationAccurate: true,
      declarationPolicy: true,
    },
  });

  const handleChooseTier = (tier) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: `/v2/membership?tier=${tier.id}`,
      });
      navigate("/v2/login");
      return;
    }

    if (tier.id === "ecosphere") {
      navigate("/v2/ecosphere?tab=academy&action=exam");
      return;
    }

    const isGlobalAyurx = tier.id === "globalayurx";
    const nameParts = (currentUser.name || "").split(" ");
    enrollmentForm.reset({
      firstName: nameParts[0] || "",
      lastName: nameParts.slice(1).join(" ") || "Member",
      dob: new Date(1992, 0, 1),
      gender: GENDER_OPTIONS[0],
      mobile: currentUser.phone || "",
      whatsapp: currentUser.phone || "",
      email: currentUser.email || "",
      addressLine: currentUser.enrollmentProfile?.addressLine || "",
      city: currentUser.city || "Pune",
      state: currentUser.enrollmentProfile?.state || "Maharashtra",
      pinCode: currentUser.enrollmentProfile?.pinCode || "",
      householdSize: HOUSEHOLD_OPTIONS[0],
      primaryFocus: PRIMARY_FOCUS_OPTIONS[0],
      emergencyName: "",
      emergencyPhone: "",
      paymentMethod: "UPI Instant",
      profession: isGlobalAyurx ? "Ayurveda Vaidya" : "Wellness Seeker",
      organisation: "",
      modeOfParticipation: "Both",
      preferredSeason: SEASON_COHORT_OPTIONS[0],
      requirePractitioner: isGlobalAyurx,
      credentials: isGlobalAyurx ? "NCISM-BAMS-2026" : "",
      specialty: VAIDYA_SPECIALTIES[0],
      goal: "",
      declarationAccurate: true,
      declarationPolicy: true,
    });
    setSelectedTierModal({ tier, activated: false });
  };

  const onSubmitEnrollment = (values) => {
    const activeTargetTier = selectedTierModal?.tier;
    if (!activeTargetTier) return;

    if (activeTargetTier.id === "globalayurx") {
      submitPractitionerApplication({
        name: `${values.firstName} ${values.lastName}`,
        phone: values.mobile,
        specialty: getDropdownValue(values.specialty),
        credentials: values.credentials,
        centerLocation: `${values.city}, ${values.state}`,
      });
    }

    activateMembership(activeTargetTier.id, {
      fullName: `${values.firstName} ${values.lastName}`,
      dob: values.dob ? new Date(values.dob).toISOString().slice(0, 10) : "",
      gender: getDropdownValue(values.gender),
      mobile: values.mobile,
      whatsapp: values.whatsapp,
      email: values.email,
      addressLine: values.addressLine,
      city: values.city,
      state: values.state,
      pinCode: values.pinCode,
      householdSize: getDropdownValue(values.householdSize),
      primaryFocus: getDropdownValue(values.primaryFocus),
      emergencyName: values.emergencyName,
      emergencyPhone: values.emergencyPhone,
      paymentMethod: values.paymentMethod,
      feeLabel: activeTargetTier.feeLabel,
      profession: values.profession,
      organisation: values.organisation,
      modeOfParticipation: values.modeOfParticipation,
      preferredSeason: getDropdownValue(values.preferredSeason),
      goal: values.goal,
    });

    setSelectedTierModal({ tier: activeTargetTier, activated: true });
  };

  return (
    <div className="bg-[#0B2E1F] text-[#F9F6EE] overflow-x-clip">
      <div className="h-1 w-full bg-gradient-to-r from-[#0B2E1F] via-[#C9A45C] to-[#0B2E1F]" />

      <TwentyFirstHero
        images={[
          V2_IMAGES.membershipSanctuaryHeroImg,
          V2_IMAGES.shatayushSunriseImg,
          V2_IMAGES.homeSanctuaryImg,
        ]}
        badgeLabel="Learn. Experience. Connect. Grow · JYA Membership"
        badgeTo="/v2/ecosphere?tab=academy&action=exam"
        title={
          <>
            Be a Part of the{" "}
            <KineticHeroHighlight>JYA Ecosystem.</KineticHeroHighlight>
          </>
        }
        subtitle="JnanaYogAyu (JYA) brings together health, wellness, Ayurveda, knowledge, technology and conscious living. Whether you are an individual exploring holistic wellness, an Ayurveda practitioner, a healthcare leader, or a learner — begin with JYA Open (Free), शतायुस् World Life (₹500 · 5%), GlobalAyurX Life (₹5,000 · 10%), or जैवमण्डल Ecosphere Life (20% academy concession)."
        actions={
          <>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("v2-membership-tiers")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] shadow-lg hover:bg-[#E7D7B5] transition-colors"
            >
              <span>Compare & Select Pass</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link
              to="/v2/ecosphere?tab=academy&action=exam"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#FAF5E8]/45 bg-[#071E14]/55 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] backdrop-blur-md hover:border-[#C9A45C] hover:bg-[#071E14]/75 transition-colors"
            >
              <span>Qualify Ecosphere 20% Off</span>
            </Link>
          </>
        }

      />

      <div className="bg-[#071E14] border-y border-[#C9A45C]/25 py-3">
        <Marquee
          items={[
            "JYA Open Membership (Free)",
            "शतायुस् World Life Membership (5% Discount · ₹500)",
            "GlobalAyurX Life Membership (10% Discount · ₹5,000)",
            "जैवमण्डल Ecosphere Life Membership (20% Discount · ₹1,40,000 → ₹1,12,000)",
          ]}
          itemClassName="text-xs font-semibold uppercase tracking-[0.22em] text-[#E7D7B5]"
        />
      </div>

      <section
        id="v2-membership-tiers"
        className="bg-[#FDFBF7] text-[#0f3d26] py-16 lg:py-24"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14">
          <SectionHeader
            align="left"
            eyebrow="Choose Your Membership"
            title="Membership Cards & Complete Application Flow"
            subtitle="Explore four curated pathways to immerse in the JYA wellness, healthcare, and educational ecosystem."
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {MEMBERSHIP_TIERS.map((tier) => {
              const isCurrent = currentUser?.membershipTier === tier.id;
              const isHighlighted = highlightedTier === tier.id;
              const isDarkPass =
                tier.id === "ecosphere" || tier.id === "globalayurx";
              return (
                <TiltCard
                  key={tier.id}
                  max={6}
                  className={`group rounded-3xl border p-7 flex flex-col justify-between transition-all duration-300 ${
                    isDarkPass
                      ? "border-[#C9A45C]/50 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] text-[#FAF5E8] shadow-[0_24px_60px_rgba(7,30,20,0.28)]"
                      : "border-[#C9A45C]/35 bg-[#FFFDF9] text-[#0f3d26] shadow-[0_18px_45px_rgba(15,61,38,0.08)]"
                  } ${isHighlighted ? "ring-2 ring-[#C9A45C]" : ""}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="h-7 w-10 rounded-md bg-gradient-to-br from-[#E7D7B5] to-[#C9A45C]" />
                      <span
                        className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
                          isDarkPass
                            ? "bg-[#C9A45C]/20 text-[#E7D7B5]"
                            : "bg-[#e6efea] text-[#0f3d26]"
                        }`}
                      >
                        {tier.discountPercent > 0
                          ? `${tier.discountPercent}% Off`
                          : "Free Pass"}
                      </span>
                    </div>

                    <h3 className="mt-5 font-serif text-2xl">{tier.name}</h3>
                    {tier.tagline && (
                      <p className="mt-1 text-xs font-semibold italic text-[#C9A45C]">
                        {tier.tagline}
                      </p>
                    )}
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        isDarkPass ? "text-[#FAF5E8]/75" : "text-[#0f3d26]/75"
                      }`}
                    >
                      {tier.whoFor}
                    </p>

                    <div className="mt-5 pb-4 border-b border-[#C9A45C]/25">
                      <span className="font-serif text-2xl font-bold text-[#C9A45C]">
                        {tier.feeLabel}
                      </span>
                      <p
                        className={`mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${
                          isDarkPass ? "text-[#E7D7B5]/80" : "text-[#8b6534]"
                        }`}
                      >
                        {tier.gate}
                      </p>
                    </div>

                    <ul className="mt-5 space-y-2">
                      {tier.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2 text-xs leading-relaxed"
                        >
                          <AnimatedCheck className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                          <span
                            className={
                              isDarkPass
                                ? "text-[#FAF5E8]/85"
                                : "text-[#0f3d26]/80"
                            }
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {tier.conditions && tier.conditions.length > 0 && (
                      <div
                        className={`mt-4 rounded-xl border p-3 text-[11px] space-y-1 ${
                          isDarkPass
                            ? "border-[#C9A45C]/25 bg-white/5 text-[#FAF5E8]/75"
                            : "border-[#EDE5D5] bg-[#FBF8F1] text-[#0f3d26]/70"
                        }`}
                      >
                        <p className="font-bold uppercase tracking-wider text-[#C9A45C]">
                          Criteria &amp; Conditions
                        </p>
                        {tier.conditions.map((cond) => (
                          <p key={cond}>• {cond}</p>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-7 space-y-2">
                    <CommonButton
                      onClick={() => handleChooseTier(tier)}
                      disabled={isCurrent}
                      label={
                        isCurrent
                          ? "Active Pass"
                          : tier.id === "ecosphere"
                            ? "Take Entrance Exam"
                            : !currentUser
                              ? "Sign In to Join"
                              : "Enroll Now"
                      }
                      className={`w-full !rounded-full !h-auto !min-h-[44px] !px-6 !py-2.5 !text-xs !font-bold ${
                        isDarkPass
                          ? "!bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5]"
                          : "!bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a]"
                      }`}
                    />
                    {tier.renewalPolicy && (
                      <p
                        className={`text-center text-[10px] ${
                          isDarkPass ? "text-[#FAF5E8]/55" : "text-[#0f3d26]/55"
                        }`}
                      >
                        {tier.renewalPolicy}
                      </p>
                    )}
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F9F6EE] text-[#0f3d26] py-16 lg:py-24 border-y border-[#C9A45C]/30">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 space-y-10">
          <SectionHeader
            align="left"
            eyebrow="Gurukul Immersion"
            title="120+ Days Residential Academy & Certification Programmes"
            subtitle="प्रत्यक्ष नैसर्गिक जीवनशैलीचा अनुभव — Experience a natural and sustainable way of living at SwaGrama."
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#C9A45C]/25 rounded-3xl border border-[#C9A45C]/35 bg-[#FFFDF9] shadow-sm overflow-hidden">
            {MEMBERSHIP_ACADEMY_STATS.map((st) => (
              <div key={st.label} className="p-6 text-center">
                <p className="font-serif text-3xl sm:text-4xl font-bold text-[#0f3d26]">
                  <Counter value={st.value} suffix={st.suffix} />
                </p>
                <p className="mt-1.5 text-xs font-bold text-[#0f3d26]">
                  {st.label}
                </p>
                <p className="mt-0.5 text-[11px] text-[#8b6534]">{st.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 rounded-3xl border border-[#C9A45C]/40 bg-[#FFFDF9] p-6 sm:p-8 flex flex-col justify-between shadow-lg">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6534]">
                  Schedule
                </span>
                <h3 className="mt-1 font-serif text-2xl text-[#0f3d26]">
                  Seasonal Academy Calendar – 2027–28
                </h3>

                <div className="mt-5 space-y-3">
                  {SEASONAL_ACADEMIES.map((season) => {
                    const isSelectedSeason = selectedSeasonId === season.id;
                    const SeasonIcon =
                      season.id === "summer"
                        ? Sun
                        : season.id === "rainy"
                          ? CloudRain
                          : Snowflake;
                    return (
                      <button
                        key={season.id}
                        type="button"
                        onClick={() => setSelectedSeasonId(season.id)}
                        className={`w-full rounded-2xl border p-4 text-left transition-all ${
                          isSelectedSeason
                            ? "border-[#C9A45C] bg-[#0f3d26] text-[#FAF5E8] shadow-md"
                            : "border-[#C9A45C]/30 bg-[#FBF8F1] text-[#0f3d26] hover:border-[#C9A45C]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${
                              isSelectedSeason
                                ? "border-[#C9A45C]/50 bg-[#071E14] text-[#C9A45C]"
                                : "border-[#C9A45C]/30 bg-[#FFFDF9] text-[#8b6534]"
                            }`}
                          >
                            <SeasonIcon className="h-4 w-4" />
                          </span>
                          <div>
                            <p className="font-serif text-base font-bold">
                              {season.sanskrit}
                            </p>
                            <p
                              className={`text-xs ${
                                isSelectedSeason
                                  ? "text-[#E7D7B5]"
                                  : "text-[#0f3d26]/70"
                              }`}
                            >
                              {season.name} · {season.dates}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-[#EDE5D5] space-y-2.5 text-center">
                <CommonButton
                  label="Apply for जैवमण्डल Ecosphere Life Membership"
                  onClick={() => handleChooseTier(MEMBERSHIP_TIERS[3])}
                  className="w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                />
                <p className="text-[11px] italic text-[#0f3d26]/65">
                  Admission is subject to the entrance examination, qualification criteria, availability of seats and JYA policies.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-[#C9A45C]/45 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-6 sm:p-10 text-[#FAF5E8] shadow-xl flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9A45C]">
                  SwaGrama · स्वज्ञानगुरुकुल
                </span>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#FAF5E8]">
                  Academy Highlights &amp; Fee Scholarship
                </h3>
                <p className="mt-3 text-sm text-[#FAF5E8]/85 leading-relaxed">
                  The जैवमण्डल Ecosphere Academy offers an authentic Gurukul atmosphere located at SwaGrama. Students engage in practical exposure, traditional herbal preparation, pulse diagnosis, dinacharya routines, and ecological living.
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {MEMBERSHIP_ACADEMY_HIGHLIGHTS.map((highlight) => (
                    <div
                      key={highlight}
                      className="flex items-start gap-2.5 rounded-2xl border border-[#C9A45C]/25 bg-white/5 p-4 text-xs sm:text-sm text-[#FAF5E8]/90 leading-relaxed"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#FAF5E8]/65 line-through">
                    Standard Programme Fee: ₹1,40,000
                  </p>
                  <p className="font-serif text-2xl font-bold text-[#C9A45C]">
                    ₹1,12,000 After 20% Qualification Grant
                  </p>
                </div>
                <Link
                  to="/v2/ecosphere?tab=academy&action=exam"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
                >
                  <span>Take Free Entrance Exam</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 w-full px-4 sm:px-6 lg:px-8 2xl:px-14">
        <SectionHeader
          dark
          eyebrow="Feature Matrix"
          title="Find the Membership That Suits You"
          subtitle="Clear comparison across consultation savings, member handbook downloads, academy admission, and SwaGrama privileges."
        />

        <div className="mt-10 overflow-x-auto rounded-3xl border border-[#C9A45C]/30 bg-[#071E14]/90 shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="border-b border-[#C9A45C]/30 bg-[#0D3323] text-xs uppercase tracking-wider">
                <th className="py-4 px-5 font-semibold text-[#FAF5E8]">
                  Benefit / Privilege
                </th>
                <th className="py-4 px-5 font-semibold text-[#A5B99A]">
                  JYA Open
                </th>
                <th className="py-4 px-5 font-semibold text-[#FAF5E8]">
                  शतायुस् World (5%)
                </th>
                <th className="py-4 px-5 font-semibold text-[#FAF5E8]">
                  GlobalAyurX (10%)
                </th>
                <th className="py-4 px-5 font-semibold text-[#C9A45C] bg-[#C9A45C]/10">
                  जैवमण्डल Ecosphere (20%)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C9A45C]/15 text-xs sm:text-sm">
              {MEMBERSHIP_COMPARISON_ROWS.map((row) => (
                <tr key={row.benefit} className="hover:bg-white/5 transition-colors">
                  <td className="py-3.5 px-5 font-semibold text-[#FAF5E8]">
                    {row.benefit}
                  </td>
                  <td className="py-3.5 px-5 text-[#A5B99A]">{row.open}</td>
                  <td className="py-3.5 px-5 text-[#FAF5E8]/90">
                    {row.shatayush}
                  </td>
                  <td className="py-3.5 px-5 text-[#FAF5E8]/90">
                    {row.globalayurx}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-[#C9A45C] bg-[#C9A45C]/10">
                    {row.ecosphere}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5 text-center">
          <p className="text-xs text-[#FAF5E8]/80 leading-relaxed">
            Discounts are applicable to eligible programmes, services and products as specified under each membership. Specific programme eligibility, exclusions and access conditions will be governed by JYA policies.
          </p>
        </div>
      </section>

      <section className="bg-[#FDFBF7] text-[#0f3d26] py-16 lg:py-20 space-y-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 space-y-12">
          <div>
            <SectionHeader
              eyebrow="Membership Pathway"
              title="How to Become a JYA Member"
              subtitle="Streamlined pathway across JYA Open, शतायुस् World, GlobalAyurX, and जैवमण्डल Ecosphere."
            />

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {MEMBERSHIP_JOIN_PATH.map((item) => (
                <Reveal key={item.step}>
                  <SpotlightBentoCard className="p-6 h-full">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C9A45C]/45 bg-[#FAF5E8] text-[#8b6534]">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <h3 className="mt-3 font-serif text-lg text-[#0f3d26]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                      {item.note}
                    </p>
                  </SpotlightBentoCard>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#C9A45C]/50 bg-gradient-to-br from-[#071E15] via-[#0B2D20] to-[#0F3B2A] p-7 sm:p-12 text-[#FAF5E8] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-flex rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
                Direct Enrolment · Choose Your Pathway
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF5E8]">
                Be Part of <span className="italic text-[#E7D7B5]">Something Bigger</span>
              </h3>
              <p className="text-sm text-[#FAF5E8]/85 leading-relaxed">
                JnanaYogAyu is more than a membership. It is an opportunity to connect with knowledge, experience holistic wellness, embrace technology and participate in a community that values healthier and more conscious living.
              </p>
            </div>
            <div className="lg:col-span-5 grid grid-cols-1 gap-2.5">
              {MEMBERSHIP_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => handleChooseTier(tier)}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[#C9A45C]/35 bg-[#061A12]/80 px-4 py-3 text-left hover:border-[#C9A45C] transition-colors"
                >
                  <div>
                    <p className="font-serif text-sm font-bold text-[#FAF5E8]">
                      {tier.name}
                    </p>
                    <p className="text-[11px] text-[#E7D7B5]/80">
                      {tier.discountLabel}
                    </p>
                  </div>
                  <span className="rounded-lg border border-[#C9A45C]/40 bg-[#C9A45C]/15 px-3 py-1 font-serif text-xs font-bold text-[#E7D7B5] shrink-0">
                    {tier.feeLabel}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <V2ModalShell
        open={Boolean(selectedTierModal)}
        onClose={() => setSelectedTierModal(null)}
        badge={
          selectedTierModal?.activated
            ? "Membership Confirmed"
            : `Enroll · ${selectedTierModal?.tier?.name || "Pass"}`
        }
        title={
          selectedTierModal?.activated
            ? `${selectedTierModal?.tier?.name} Active`
            : "Complete JYA Membership Enrollment Application"
        }
        subtitle={
          selectedTierModal?.activated
            ? "Your pass benefits and profile records are now synchronized with your User Dashboard."
            : `${selectedTierModal?.tier?.feeLabel || ""} · ${selectedTierModal?.tier?.discountLabel || ""} privileges apply across JYA upon completion.`
        }
        maxWidthClass="3xl"
      >
        {selectedTierModal?.activated ? (
          <div className="space-y-5 text-center py-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e6efea] text-[#0f3d26]">
              <CheckCircle2 className="h-8 w-8 text-[#C9A45C]" />
            </div>
            <div>
              <p className="text-sm text-[#0f3d26]/80">
                Active Privilege Unlocked:{" "}
                <span className="font-bold text-[#0f3d26]">
                  {selectedTierModal?.tier?.discountLabel}
                </span>
              </p>
              <p className="mt-1 text-xs text-[#8b6534]">
                Dispatch Address, Household Coverage & Fee Record saved to your User Dashboard.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <CommonButton
                type="button"
                onClick={() => setSelectedTierModal(null)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <Link
                to="/v2/dashboard"
                onClick={() => setSelectedTierModal(null)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                <span>Open User Dashboard</span>
                <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={enrollmentForm.handleSubmit(onSubmitEnrollment)}
            className="space-y-5"
          >
            <div className="rounded-2xl border border-[#C9A45C]/45 bg-gradient-to-r from-[#071E14] to-[#12432D] p-4 sm:p-5 text-[#FAF5E8] flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A45C]">
                  Selected Pass Purchase
                </p>
                <p className="font-serif text-xl sm:text-2xl">
                  {selectedTierModal?.tier?.name}
                </p>
                <p className="text-xs text-[#FAF5E8]/75">
                  {selectedTierModal?.tier?.whoFor} · {selectedTierModal?.tier?.discountLabel}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-bold text-[#C9A45C]">
                  {selectedTierModal?.tier?.feeLabel}
                </p>
                <span className="inline-block rounded-full bg-[#C9A45C]/20 px-2.5 py-0.5 text-[10px] font-semibold text-[#E7D7B5]">
                  Lifetime Access
                </span>
              </div>
            </div>

            <V2FormSection
              step="01"
              title="Member Identity & Contact Details"
              hint="Pass holder KYC"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="firstName"
                    label="First Name *"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.firstName}
                  />
                  <FieldError error={enrollmentForm.formState.errors.firstName} />
                </div>
                <div>
                  <InputField
                    name="lastName"
                    label="Last Name *"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.lastName}
                  />
                  <FieldError error={enrollmentForm.formState.errors.lastName} />
                </div>
                <div>
                  <DropdownField
                    name="gender"
                    control={enrollmentForm.control}
                    dataArray={GENDER_OPTIONS}
                    placeholder="Gender *"
                    error={enrollmentForm.formState.errors.gender}
                  />
                  <FieldError error={enrollmentForm.formState.errors.gender} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <DatePickerField
                    name="dob"
                    label="Date of Birth *"
                    control={enrollmentForm.control}
                    dob
                    disableFuture
                    error={enrollmentForm.formState.errors.dob}
                  />
                  <FieldError error={enrollmentForm.formState.errors.dob} />
                </div>
                <div>
                  <InputField
                    name="mobile"
                    label="Mobile Number *"
                    control={enrollmentForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.mobile}
                  />
                  <FieldError error={enrollmentForm.formState.errors.mobile} />
                </div>
                <div>
                  <InputField
                    name="whatsapp"
                    label="WhatsApp Number"
                    control={enrollmentForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.whatsapp}
                  />
                  <FieldError error={enrollmentForm.formState.errors.whatsapp} />
                </div>
              </div>

              <div>
                <InputField
                  name="email"
                  label="Official Email for Digital Pass & Receipts *"
                  control={enrollmentForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={enrollmentForm.formState.errors.email}
                />
                <FieldError error={enrollmentForm.formState.errors.email} />
              </div>
            </V2FormSection>

            <V2FormSection
              step="02"
              title="Residential Address, Pass Dispatch & Family Coverage"
              hint="Welcome Kit & Safety"
            >
              <div>
                <InputField
                  name="addressLine"
                  label="Street / House Address (For Member Kit Dispatch) *"
                  control={enrollmentForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={enrollmentForm.formState.errors.addressLine}
                />
                <FieldError error={enrollmentForm.formState.errors.addressLine} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="city"
                    label="City / Village *"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.city}
                  />
                  <FieldError error={enrollmentForm.formState.errors.city} />
                </div>
                <div>
                  <InputField
                    name="state"
                    label="State *"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.state}
                  />
                  <FieldError error={enrollmentForm.formState.errors.state} />
                </div>
                <div>
                  <InputField
                    name="pinCode"
                    label="6-Digit PIN Code *"
                    control={enrollmentForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.pinCode}
                  />
                  <FieldError error={enrollmentForm.formState.errors.pinCode} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <DropdownField
                    name="householdSize"
                    control={enrollmentForm.control}
                    dataArray={HOUSEHOLD_OPTIONS}
                    placeholder="Family Members Covered *"
                    error={enrollmentForm.formState.errors.householdSize}
                  />
                  <FieldError error={enrollmentForm.formState.errors.householdSize} />
                </div>
                <div>
                  <InputField
                    name="emergencyName"
                    label="Emergency Contact Name *"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.emergencyName}
                  />
                  <FieldError error={enrollmentForm.formState.errors.emergencyName} />
                </div>
                <div>
                  <InputField
                    name="emergencyPhone"
                    label="Emergency Contact Phone *"
                    control={enrollmentForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.emergencyPhone}
                  />
                  <FieldError error={enrollmentForm.formState.errors.emergencyPhone} />
                </div>
              </div>
            </V2FormSection>

            <V2FormSection
              step="03"
              title="Wellness Focus, Seasonal Cohort & Participation"
              hint="Personalizes Dashboard"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="profession"
                    label="Profession / Vocation *"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={enrollmentForm.formState.errors.profession}
                  />
                  <FieldError error={enrollmentForm.formState.errors.profession} />
                </div>
                <div>
                  <InputField
                    name="organisation"
                    label="Organisation / Clinic"
                    control={enrollmentForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                  />
                </div>
                <div>
                  <DropdownField
                    name="primaryFocus"
                    control={enrollmentForm.control}
                    dataArray={PRIMARY_FOCUS_OPTIONS}
                    placeholder="Primary Health Goal *"
                    error={enrollmentForm.formState.errors.primaryFocus}
                  />
                  <FieldError error={enrollmentForm.formState.errors.primaryFocus} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <RadioField
                    name="modeOfParticipation"
                    label="Preferred Mode of Participation *"
                    control={enrollmentForm.control}
                    dataArray={PARTICIPATION_MODES}
                    error={enrollmentForm.formState.errors.modeOfParticipation}
                  />
                </div>
                <div>
                  <DropdownField
                    name="preferredSeason"
                    control={enrollmentForm.control}
                    dataArray={SEASON_COHORT_OPTIONS}
                    placeholder="Preferred Academy Cohort *"
                    error={enrollmentForm.formState.errors.preferredSeason}
                  />
                  <FieldError
                    error={enrollmentForm.formState.errors.preferredSeason}
                  />
                </div>
              </div>

              {selectedTierModal?.tier?.id === "globalayurx" && (
                <div className="rounded-2xl border border-[#C9A45C]/45 bg-[#FFFDF9] p-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#8b6534]">
                    <ShieldCheck className="h-4 w-4 text-[#C9A45C]" />
                    <span>Ayurveda Practitioner Verification (GlobalAyurX)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        name="credentials"
                        label="BAMS / NCISM Registration No *"
                        control={enrollmentForm.control}
                        dontCapitalize
                        shrink
                        InputLabelProps={{ shrink: true }}
                        error={enrollmentForm.formState.errors.credentials}
                      />
                      <FieldError
                        error={enrollmentForm.formState.errors.credentials}
                      />
                    </div>
                    <div>
                      <DropdownField
                        name="specialty"
                        control={enrollmentForm.control}
                        dataArray={VAIDYA_SPECIALTIES}
                        placeholder="Clinical Specialization *"
                        error={enrollmentForm.formState.errors.specialty}
                      />
                      <FieldError
                        error={enrollmentForm.formState.errors.specialty}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <InputArea
                  name="goal"
                  label="What Brings You to JYA? *"
                  placeholder="Share your health goals, family participation, or study interest..."
                  control={enrollmentForm.control}
                  minRows={2}
                />
                <FieldError error={enrollmentForm.formState.errors.goal} />
              </div>
            </V2FormSection>

            <V2FormSection
              title="Payment Confirmation & Declaration"
              hint="Review & Confirm"
            >
              <div>
                <RadioField
                  name="paymentMethod"
                  label="Select Membership Fee Payment Mode *"
                  control={enrollmentForm.control}
                  dataArray={MEMBERSHIP_PAYMENT_MODES}
                  error={enrollmentForm.formState.errors.paymentMethod}
                />
              </div>

              <div className="rounded-2xl border border-[#C9A45C]/40 bg-[#FFFDF9] p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <CreditCard className="h-4 w-4 text-[#8b6534] shrink-0" />
                  <div>
                    <p className="font-bold text-[#0f3d26]">
                      {selectedTierModal?.tier?.name} · Lifetime Coverage
                    </p>
                    <p className="text-[11px] text-[#0f3d26]/65">
                      Includes {selectedTierModal?.tier?.discountLabel} on OPD, E-Shop & Resource Library
                    </p>
                  </div>
                </div>
                <span className="font-serif text-xl font-bold text-[#0f3d26]">
                  {selectedTierModal?.tier?.feeLabel}
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div>
                  <CheckBoxField
                    name="declarationAccurate"
                    control={enrollmentForm.control}
                    label="I confirm that the personal, residential, and emergency details above are accurate."
                    className="text-[#0f3d26] text-xs"
                  />
                  <FieldError
                    error={enrollmentForm.formState.errors.declarationAccurate}
                  />
                </div>
                <div>
                  <CheckBoxField
                    name="declarationPolicy"
                    control={enrollmentForm.control}
                    label="I accept JYA Lifetime Membership guidelines and seasonal programme conduct."
                    className="text-[#0f3d26] text-xs"
                  />
                  <FieldError
                    error={enrollmentForm.formState.errors.declarationPolicy}
                  />
                </div>
              </div>
            </V2FormSection>

            <div className="pt-2 flex justify-end gap-3">
              <CommonButton
                type="button"
                onClick={() => setSelectedTierModal(null)}
                label="Cancel"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <CommonButton
                type="submit"
                label={`Complete Purchase · ${selectedTierModal?.tier?.feeLabel || "Activate"}`}
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </form>
        )}
      </V2ModalShell>
    </div>
  );
}
