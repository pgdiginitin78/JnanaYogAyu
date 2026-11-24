import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Eye,
  UserCheck,
  UserPlus,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import DatePickerField from "../../components/common/forms/DatePickerField";
import CheckBoxField from "../../components/common/forms/CheckBoxField";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection } from "../components/V2FormControls";
import {
  KineticHeroHighlight,
  SectionHeader,
  SpotlightBentoCard,
} from "../components/V2InteractiveComponents";
import {
  FeatureShowcase108,
  TwentyFirstHero,
} from "../components/TwentyFirstComponents";
import {
  MUKTIKHELA_ASSESSMENT_QUESTIONS,
  MUKTIKHELA_PREVIEW_STEPS,
  MUKTIKHELA_ZONES,
  V2_IMAGES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import {
  getDropdownValue,
  v2MuktikhelaPlayerSchema,
} from "../validation/v2Schemas";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const RELATION_OPTIONS = [
  { label: "Self", value: "Self" },
  { label: "Spouse / Partner", value: "Spouse / Partner" },
  { label: "Parent", value: "Parent" },
  { label: "Child / Young Adult", value: "Child" },
  { label: "Other Family Member", value: "Family Member" },
];

const SLEEP_OPTIONS = [
  { label: "Optimal (7 - 8 hours restful)", value: "7-8 hrs" },
  { label: "Light / Short (Under 6 hours)", value: "Under 6 hrs" },
  { label: "Broken / Interrupted Sleep", value: "Interrupted" },
  { label: "Heavy / Long (Over 8.5 hours)", value: "Over 8.5 hrs" },
];

const DIET_OPTIONS = [
  { label: "Fresh Sattvik Home-Cooked Vegetarian", value: "Fresh Vegetarian" },
  { label: "Balanced Mixed Home Diet", value: "Mixed Home Diet" },
  {
    label: "Irregular / Frequent Outside & Spicy Food",
    value: "Outside / Spicy",
  },
];

const ZONE_CLINICAL_METRICS = {
  A: {
    score: "92% Harmony",
    focus: "Dinacharya · Warm Meals · Brisk Morning Walk",
  },
  B: {
    score: "74% Kapha Balance",
    focus: "Light Spiced Foods · Dry Vigour · Active Movement",
  },
  C: {
    score: "66% Pitta Balance",
    focus: "Cooling Ghee & Herbs · Restful Evenings · Calm Pacing",
  },
  D: {
    score: "54% Vata Deep Care",
    focus: "Warm Oil Massage · Grounded Soups · Early Sleep",
  },
};

export default function V2MuktikhelaPage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    createMuktikhelaProfile,
    saveMuktikhelaReport,
    setPendingAuthIntent,
  } = useV2Store();

  const [selectedProfileId, setSelectedProfileId] = useState(
    () => state.muktikhelaProfiles[0]?.id || "",
  );
  const [answers, setAnswers] = useState({});
  const [playerModalOpen, setPlayerModalOpen] = useState(false);
  const [assessmentActive, setAssessmentActive] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);
  const [zoneInspectModal, setZoneInspectModal] = useState(null);

  const userProfiles = currentUser
    ? state.muktikhelaProfiles.filter((p) => p.userId === currentUser.id)
    : [];
  const activeProfile =
    userProfiles.find((p) => p.id === selectedProfileId) || userProfiles[0];

  const playerForm = useForm({
    resolver: yupResolver(v2MuktikhelaPlayerSchema),
    defaultValues: {
      playerName: currentUser?.name || "",
      relation: RELATION_OPTIONS[0],
      dob: new Date(1992, 0, 1),
      gender: GENDER_OPTIONS[0],
      heightCm: 172,
      weightKg: 68,
      profession: "Educator / Desk Role",
      sleepHours: SLEEP_OPTIONS[0],
      dietType: DIET_OPTIONS[0],
      existingCondition: "",
      confidentialAccepted: true,
    },
  });

  const watchedHeight = useWatch({
    control: playerForm.control,
    name: "heightCm",
  });
  const watchedWeight = useWatch({
    control: playerForm.control,
    name: "weightKg",
  });
  const liveHeightM = (Number(watchedHeight) || 170) / 100;
  const liveWeightKg = Number(watchedWeight) || 68;
  const liveBmi = (
    liveWeightKg / Math.max(0.5, liveHeightM * liveHeightM)
  ).toFixed(1);

  const handleOpenStart = () => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/muktikhela",
      });
      navigate("/v2/login");
      return;
    }
    setGeneratedReport(null);
    setAssessmentActive(true);
  };

  const onCreatePlayer = (values) => {
    const created = createMuktikhelaProfile({
      name: values.playerName,
      relation: getDropdownValue(values.relation),
      dob: values.dob
        ? new Date(values.dob).toISOString().slice(0, 10)
        : "1992-01-01",
      gender: getDropdownValue(values.gender),
      heightCm: String(values.heightCm),
      weightKg: String(values.weightKg),
      profession: values.profession,
      sleepHours: getDropdownValue(values.sleepHours),
      dietType: getDropdownValue(values.dietType),
      existingCondition: values.existingCondition,
    });
    if (created) {
      setSelectedProfileId(created.id);
    }
    setPlayerModalOpen(false);
    setAssessmentActive(true);
  };

  const handleCompleteAssessment = () => {
    const profileToUse = activeProfile || userProfiles[0];
    if (!profileToUse) return;
    const result = saveMuktikhelaReport({
      profile: profileToUse,
      answers,
    });
    setGeneratedReport(result);
    setAssessmentActive(false);
  };

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-clip">
      <TwentyFirstHero
        images={[
          V2_IMAGES.muktikhelaSanctuaryImg,
          V2_IMAGES.ayurxHeroImg,
          V2_IMAGES.shatayushSunriseImg,
        ]}
        badgeLabel="Muktikhela · Guided Dosha Self-Discovery"
        onBadgeClick={handleOpenStart}
        title={
          <>
            Decode Your <KineticHeroHighlight>Health Zone</KineticHeroHighlight>
            <br /> With Vaidya Precision.
          </>
        }
        subtitle="Inspect all 5 guided steps and Zones A–D. Signed-in members save encrypted family bio-profiles with auto-BMI and generate clinical scorecards readable directly by JYA Vaidyas."
        actions={
          <>
            <CommonButton
              onClick={handleOpenStart}
              label={
                currentUser
                  ? "Start 6-Point Health Assessment"
                  : "Sign In to Start Assessment"
              }
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
            />
            {currentUser && (
              <CommonButton
                onClick={() => {
                  playerForm.reset({
                    playerName: "",
                    relation: RELATION_OPTIONS[1],
                    dob: new Date(1992, 0, 1),
                    gender: GENDER_OPTIONS[0],
                    heightCm: 168,
                    weightKg: 64,
                    profession: "",
                    sleepHours: SLEEP_OPTIONS[0],
                    dietType: DIET_OPTIONS[0],
                    existingCondition: "",
                    confidentialAccepted: true,
                  });
                  setPlayerModalOpen(true);
                }}
                label="Add Bio-Profile & Auto-BMI"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#FAF5E8]/45 !bg-[#071E14]/55 !text-[#FAF5E8] hover:!bg-[#071E14]/75 !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider backdrop-blur-md"
              />
            )}
          </>
        }
      />

      <FeatureShowcase108
        items={MUKTIKHELA_PREVIEW_STEPS.map((st) => ({
          shortLabel: st.title,
          title: st.title,
          designation: "Encrypted Mobile Health Check",
          quote: st.desc,
          src: st.image,
        }))}
        eyebrow="Guided Assessment"
        title="Explore Every Stage of Your Confidential Self-Discovery"
        subtitle="Select any screen tab above or switch previews cleanly to inspect the encrypted Muktikhela assessment."
        containImage
      />

      {currentUser && (assessmentActive || generatedReport) && (
        <section className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 pt-14">
          {assessmentActive && (
            <SpotlightBentoCard className="p-7 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#EDE5D5]">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8b6534]">
                    Active Confidential Session
                  </span>
                  <h2 className="mt-1 font-serif text-2xl sm:text-3xl text-[#0f3d26]">
                    Participant: {activeProfile?.name || currentUser.name}
                  </h2>
                  {activeProfile && (
                    <p className="mt-1 text-xs text-[#0f3d26]/70">
                      {activeProfile.gender} · {activeProfile.heightCm} cm ·{" "}
                      {activeProfile.weightKg} kg · {activeProfile.profession}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {userProfiles.map((profile) => (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setSelectedProfileId(profile.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-colors ${
                        activeProfile?.id === profile.id
                          ? "bg-[#0f3d26] text-[#FAF5E8] border-[#0f3d26]"
                          : "bg-[#FBF8F1] text-[#0f3d26] border-[#0f3d26]/20"
                      }`}
                    >
                      <UserCheck className="h-3.5 w-3.5" />
                      <span>{profile.name}</span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setPlayerModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold border border-[#C9A45C] bg-[#FAF5E8] text-[#8b6534]"
                  >
                    <UserPlus className="h-3.5 w-3.5" />
                    <span>+ Add Player</span>
                  </button>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {MUKTIKHELA_ASSESSMENT_QUESTIONS.map((q) => (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-5"
                  >
                    <p className="font-serif text-lg text-[#0f3d26]">
                      {q.prompt}
                    </p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {q.options.map((opt) => {
                        const selected = answers[q.id] === opt.zone;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setAnswers((prev) => ({
                                ...prev,
                                [q.id]: opt.zone,
                              }))
                            }
                            className={`rounded-xl border p-3.5 text-left text-xs transition-all ${
                              selected
                                ? "border-[#0f3d26] bg-[#0f3d26] text-[#FAF5E8] shadow-md"
                                : "border-[#0f3d26]/15 bg-white text-[#0f3d26] hover:border-[#C9A45C]"
                            }`}
                          >
                            <span className="font-bold uppercase tracking-wider text-[10px] text-[#C9A45C] block mb-1">
                              Zone {opt.zone} Signal
                            </span>
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex items-center justify-end gap-3">
                <CommonButton
                  onClick={() => setAssessmentActive(false)}
                  label="Cancel"
                  className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
                />
                <CommonButton
                  onClick={handleCompleteAssessment}
                  label="Generate Vaidya Scorecard"
                  className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                />
              </div>
            </SpotlightBentoCard>
          )}

          {generatedReport && (
            <SpotlightBentoCard dark className="p-8 sm:p-10 mt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>Vaidya-Readable Scorecard Saved</span>
                  </span>
                  <h2 className="mt-3 font-serif text-3xl text-[#FAF5E8]">
                    Zone {generatedReport.dominantZone.code} ·{" "}
                    {generatedReport.dominantZone.name}
                  </h2>
                  <p className="mt-1 text-xs font-semibold text-[#C9A45C]">
                    {generatedReport.dominantZone.sanskrit} · Calculated BMI:{" "}
                    {generatedReport.bmi}
                  </p>
                  <p className="mt-3 text-sm text-[#FAF5E8]/80 lg:w-3/4 leading-relaxed">
                    {generatedReport.dominantZone.summary}
                  </p>
                </div>

                <div className="flex flex-col gap-3 shrink-0">
                  <Link
                    to="/v2/dashboard"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
                  >
                    <Activity className="h-4 w-4" />
                    <span>View in User Dashboard</span>
                  </Link>
                  <Link
                    to="/v2/global-ayurx?tab=healthcare"
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E7D7B5]/40 px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-white/10 transition-colors"
                  >
                    <span>Book OPD Follow-Up</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                  </Link>
                </div>
              </div>
            </SpotlightBentoCard>
          )}
        </section>
      )}

      <section className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-16 lg:py-24">
        <SectionHeader
          eyebrow="Four Ayurvedic Health Zones"
          title="Understand Zones A, B, C & D"
          subtitle="Clean clinical constitution breakdown guiding nutrition, daily rhythms, and consultation urgency — tap Inspect Mobile Guide on any card to read the complete scorecard view uncropped."
        />

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MUKTIKHELA_ZONES.map((zone) => {
            const metric =
              ZONE_CLINICAL_METRICS[zone.code] || ZONE_CLINICAL_METRICS.A;
            return (
              <SpotlightBentoCard
                key={zone.code}
                className="p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f3d26] font-serif text-lg font-bold text-[#E7D7B5]">
                      {zone.code}
                    </span>
                    <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0f3d26]">
                      {metric.score}
                    </span>
                  </div>

                  <h3 className="mt-4 font-serif text-2xl text-[#0f3d26]">
                    {zone.name}
                  </h3>
                  <p className="mt-1 text-[11px] font-semibold text-[#8b6534]">
                    {zone.sanskrit}
                  </p>
                  <p className="mt-3 text-xs text-[#0f3d26]/75 leading-relaxed">
                    {zone.summary}
                  </p>

                  <div className="mt-4 rounded-xl bg-[#FBF8F1] border border-[#EDE5D5] p-3 text-[11px] text-[#0f3d26]/80">
                    <span className="font-bold text-[#8b6534] block mb-0.5 uppercase tracking-wider text-[9px]">
                      Daily Rhythm Focus
                    </span>
                    {metric.focus}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setZoneInspectModal(zone)}
                  className="mt-5 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-[#0f3d26]/20 bg-[#f0f6f2] px-6 py-2.5 text-xs font-bold text-[#0f3d26] hover:bg-[#0f3d26] hover:text-[#FAF5E8] transition-colors"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>Inspect Mobile Guide</span>
                </button>
              </SpotlightBentoCard>
            );
          })}
        </div>
      </section>

      <V2ModalShell
        open={Boolean(zoneInspectModal)}
        onClose={() => setZoneInspectModal(null)}
        badge={`Health Zone ${zoneInspectModal?.code || ""}`}
        title={zoneInspectModal?.name}
        subtitle={zoneInspectModal?.sanskrit}
        maxWidthClass="md"
      >
        {zoneInspectModal && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-full sm:w-[300px] aspect-[9/17] overflow-hidden rounded-3xl border border-[#C9A45C]/40 bg-[#FAF5E8] p-2">
              <img
                src={zoneInspectModal.image}
                alt={zoneInspectModal.name}
                className="h-full w-full object-contain"
              />
            </div>
            <CommonButton
              onClick={() => setZoneInspectModal(null)}
              label="Done Reading"
              className="w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={playerModalOpen}
        onClose={() => setPlayerModalOpen(false)}
        badge="Bio-Profile + Auto-BMI"
        title="Add Muktikhela Participant Bio-Profile"
        subtitle="Provides constitutional baseline metrics & automatic BMI calculation for structured Vaidya review."
        maxWidthClass="2xl"
      >
        <form
          onSubmit={playerForm.handleSubmit(onCreatePlayer)}
          className="space-y-4"
        >
          <V2FormSection
            step="01"
            title="Participant Identity & Birth Profile"
            hint="Confidential Family Profile"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="playerName"
                  label="Participant Full Name *"
                  control={playerForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={playerForm.formState.errors.playerName}
                />
                <FieldError error={playerForm.formState.errors.playerName} />
              </div>
              <div>
                <DropdownField
                  name="relation"
                  control={playerForm.control}
                  dataArray={RELATION_OPTIONS}
                  placeholder="Relationship *"
                  error={playerForm.formState.errors.relation}
                />
                <FieldError error={playerForm.formState.errors.relation} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <DatePickerField
                  name="dob"
                  label="Date of Birth *"
                  control={playerForm.control}
                  dob
                  disableFuture
                  error={playerForm.formState.errors.dob}
                />
                <FieldError error={playerForm.formState.errors.dob} />
              </div>
              <div>
                <DropdownField
                  name="gender"
                  control={playerForm.control}
                  dataArray={GENDER_OPTIONS}
                  placeholder="Gender *"
                  error={playerForm.formState.errors.gender}
                />
                <FieldError error={playerForm.formState.errors.gender} />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Physical Metrics & Lifestyle Habits"
            hint={`Auto-BMI: ${liveBmi}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
              <div>
                <InputField
                  name="heightCm"
                  label="Height (cm) *"
                  type="number"
                  control={playerForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={playerForm.formState.errors.heightCm}
                />
                <FieldError error={playerForm.formState.errors.heightCm} />
              </div>
              <div>
                <InputField
                  name="weightKg"
                  label="Weight (kg) *"
                  type="number"
                  control={playerForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={playerForm.formState.errors.weightKg}
                />
                <FieldError error={playerForm.formState.errors.weightKg} />
              </div>
              <div className="rounded-xl border border-[#C9A45C]/45 bg-[#FFFDF9] px-4 py-2 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                  Live Auto-BMI
                </p>
                <p className="font-serif text-xl font-bold text-[#0f3d26]">
                  {liveBmi}
                </p>
              </div>
            </div>

            <div>
              <InputField
                name="profession"
                label="Profession / Daily Routine Role *"
                control={playerForm.control}
                shrink
                InputLabelProps={{ shrink: true }}
                error={playerForm.formState.errors.profession}
              />
              <FieldError error={playerForm.formState.errors.profession} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <DropdownField
                  name="sleepHours"
                  control={playerForm.control}
                  dataArray={SLEEP_OPTIONS}
                  placeholder="Nightly Sleep Quality *"
                  error={playerForm.formState.errors.sleepHours}
                />
                <FieldError error={playerForm.formState.errors.sleepHours} />
              </div>
              <div>
                <DropdownField
                  name="dietType"
                  control={playerForm.control}
                  dataArray={DIET_OPTIONS}
                  placeholder="Primary Diet Pattern *"
                  error={playerForm.formState.errors.dietType}
                />
                <FieldError error={playerForm.formState.errors.dietType} />
              </div>
            </div>

            <div>
              <InputArea
                name="existingCondition"
                label="Existing Health Conditions or Ongoing Care (Optional)"
                placeholder="Any chronic conditions, digestion sensitivity, or allergies..."
                control={playerForm.control}
                minRows={2}
              />
            </div>

            <div>
              <CheckBoxField
                name="confidentialAccepted"
                control={playerForm.control}
                label="I consent to confidential encrypted Vaidya storage."
                className="text-[#0f3d26] text-xs"
              />
              <FieldError
                error={playerForm.formState.errors.confidentialAccepted}
              />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setPlayerModalOpen(false)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Save Bio-Profile & Begin"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>
    </div>
  );
}
