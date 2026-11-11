import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "@mui/material/Modal";
import {
  Sparkles,
  Check,
  CheckCircle2,
  User,
  Briefcase,
  Layers,
  Compass,
  ShieldCheck,
  ClipboardList,
  CreditCard,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import successBgImage from "../ui/assets/success-modal-bg.jpg";
import ayurvedicSuccessImage from "../ui/assets/ayurvedic-success-mortar.jpg";

import {
  membershipSchema,
  defaultFormValues,
} from "./validation/membershipSchema";
import CommonButton from "../../common/button/CommonButton";
import CancelButtonModal from "../../common/button/CancelButtonModal";
import InputField from "../../common/formFields/InputField";
import DatePickerField from "../../common/formFields/DatePickerField";
import DropdownField from "../../common/formFields/DropdownField";
import CheckBoxField from "../../common/formFields/CheckBoxField";
import RadioField from "../../common/formFields/RadioField";
import InputArea from "../../common/formFields/InputArea";
import openRazorpayPayment from "../../common/razorpay/razorpay";

const membershipSelectOptions = [
  {
    id: "open",
    value: "JYA Open Membership – Free",
    label: "JYA Open Membership – Free",
    sub: "Free exploration of general JYA programmes, products, and services",
    fee: "Free",
  },
  {
    id: "shatayus",
    value: "शतायुस्World Life Membership – ₹500",
    label: "शतायुस्World Life Membership – ₹500",
    sub: "One-time lifetime registration with 5% ecosystem discount",
    fee: "₹500",
  },
  {
    id: "ayurx",
    value: "GlobalAyurX Life Membership – ₹5,000",
    label: "GlobalAyurX Life Membership – ₹5,000",
    sub: "For Ayurveda Practitioners & Ecosystem Leaders with 10% discount",
    fee: "₹5,000",
  },
  {
    id: "ecosphere",
    value:
      "जैवमण्डलEcosphere Life Membership – Free initial registration, subject to entrance qualification",
    label: "जैवमण्डलEcosphere Life Membership – Free initial registration",
    sub: "Gurukul entrance examination qualification & 20% academy discount",
    fee: "Free initial (Subject to admission)",
  },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to say", label: "Prefer not to say" },
];

const seasonOptions = [
  { value: "Summer Batch", label: "Summer Batch" },
  { value: "Monsoon Batch", label: "Monsoon Batch" },
  { value: "Autumn Batch", label: "Autumn Batch" },
  { value: "Winter Batch", label: "Winter Batch" },
  { value: "Spring Batch", label: "Spring Batch" },
];

const residentialOptions = [
  { value: "Non-residential", label: "Non-residential" },
  { value: "7-day Immersive", label: "7-day Immersive" },
  { value: "14-day Deep Immersion", label: "14-day Deep Immersion" },
  { value: "Full Semester Gurukul", label: "Full Semester Gurukul" },
];

const participationModes = [
  { id: "Online", value: "Online", label: "Online" },
  { id: "Residential", value: "Residential", label: "Residential" },
  { id: "Both", value: "Both", label: "Both" },
];

const stepDefinitions = [
  {
    step: 1,
    label: "Personal Information",
    desc: "Basic contact details",
    icon: User,
  },
  {
    step: 2,
    label: "Professional Information",
    desc: "Background & interests",
    icon: Briefcase,
  },
  {
    step: 3,
    label: "Membership Selection",
    desc: "Choose your tier",
    icon: Compass,
  },
  {
    step: 4,
    label: "Additional Details",
    desc: "Preferences & academy",
    icon: Layers,
  },
  {
    step: 5,
    label: "Review & Submit",
    desc: "Summary & declaration",
    icon: ShieldCheck,
  },
];

const generateApplicationId = () => {
  return "JYA-" + Math.floor(100000 + Math.random() * 900000);
};

const getFeeAmount = (tier = "") => {
  if (!tier) return 500;
  const lower = tier.toLowerCase();
  if (
    lower.includes("5,000") ||
    lower.includes("5000") ||
    lower.includes("ayurx")
  )
    return 5000;
  if (lower.includes("500") || lower.includes("shatayus")) return 500;
  if (lower.includes("free") || lower.includes("open")) return 1;
  return 500;
};

export default function MembershipModal({
  open,
  onClose,
  initialMembership = null,
}) {
  const [modalStep, setModalStep] = useState(1);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(null);

  const {
    control,
    handleSubmit,
    trigger,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(membershipSchema),
    defaultValues: defaultFormValues,
    mode: "onBlur",
  });

  const selectedTier = useWatch({ control, name: "membershipOption" });
  const formValues = useWatch({ control });

  useEffect(() => {
    if (initialMembership) {
      const match = membershipSelectOptions.find(
        (o) =>
          o.id === initialMembership ||
          o.value.toLowerCase().includes(initialMembership.toLowerCase()),
      );
      if (match) {
        setValue("membershipOption", match.value);
      }
    }
  }, [initialMembership, setValue]);

  const handleNext = async () => {
    let isValid = false;
    if (modalStep === 1) {
      isValid = await trigger(["fullName", "email", "mobile", "city"]);
    } else if (modalStep === 2) {
      isValid = true;
    } else if (modalStep === 3) {
      isValid = await trigger(["membershipOption", "modeOfParticipation"]);
    } else if (modalStep === 4) {
      isValid = true;
    }

    if (isValid && modalStep < 5) {
      setModalStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (modalStep > 1) {
      setModalStep((prev) => prev - 1);
    }
  };

  const onSubmit = () => {
    const fee = getFeeAmount(selectedTier);
    openRazorpayPayment({
      amount: fee,
      description: `${selectedTier} Membership Registration`,
      prefill: {
        name: formValues?.fullName || "",
        email: formValues?.email || "",
        contact: formValues?.mobile || "",
      },
      notes: {
        tier: selectedTier,
        city: formValues?.city || "",
        mode: formValues?.modeOfParticipation || "Both",
      },
      onSuccess: (paymentRes) => {
        setPaymentInfo(paymentRes);
        setApplicationId(generateApplicationId());
        setSubmissionSuccess(true);
      },
      onFailure: (err) => {
        console.warn("Payment dismissed or failed:", err);
      },
    });
  };

  const handleClose = () => {
    reset();
    setModalStep(1);
    setSubmissionSuccess(false);
    setPaymentInfo(null);
    onClose();
  };

  const formatDateDisplay = (dateVal) => {
    if (!dateVal) return "—";
    try {
      const d = new Date(dateVal);
      if (isNaN(d.getTime())) return String(dateVal);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return String(dateVal);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
      closeAfterTransition
      data-lenis-prevent="true"
    >
      <div
        data-lenis-prevent="true"
        className={`relative w-full ${
          submissionSuccess ? "max-w-6xl" : "max-w-5xl"
        } max-h-[92vh] rounded-xl shadow-2xl overflow-y-auto ${
          submissionSuccess ? "" : "lg:overflow-hidden"
        } flex flex-col my-auto border border-[#EADFC7] focus:outline-none`}
        style={
          submissionSuccess
            ? {
                backgroundImage: `url(${successBgImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : { backgroundColor: "#FBF8F1" }
        }
      >
        <CancelButtonModal onClick={handleClose} />

        {submissionSuccess ? (
          <div className="relative w-full max-w-[1440px] mx-auto overflow-hidden rounded-[12px] border border-white/80 bg-gradient-to-b from-[#FCFAF3] via-[#F8F4E8] to-[#F2EDDB] shadow-[0_25px_70px_rgba(16,63,46,0.22)]">
            <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[#7FB05A]/30 blur-3xl" />
            <div className="pointer-events-none absolute -top-16 -right-10 w-64 h-64 rounded-full bg-[#5E9A47]/25 blur-3xl" />
            <svg
              className="pointer-events-none absolute bottom-0 left-0 w-full h-24 sm:h-28"
              viewBox="0 0 1200 160"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 80C150 30 300 50 450 90C600 130 750 110 900 70C1020 40 1120 50 1200 70V160H0Z"
                fill="#CFE0BE"
                fillOpacity="0.55"
              />
              <path
                d="M0 110C200 70 380 90 560 125C740 160 900 120 1050 95C1120 83 1170 85 1200 90V160H0Z"
                fill="#2F7A47"
                fillOpacity="0.85"
              />
              <path
                d="M0 135C220 105 420 125 640 145C860 165 1020 130 1200 120V160H0Z"
                fill="#0F4A2E"
              />
            </svg>

            <div className="relative z-10 max-h-[calc(100vh-2rem)] overflow-y-auto overflow-x-hidden px-5 sm:px-10 pt-5 pb-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-b from-[#0F5A2F] to-[#06401F] border-[3px] border-[#C9A45C] shadow-[0_0_26px_rgba(201,164,92,0.55)] flex items-center justify-center mb-2 shrink-0">
                <Check className="w-9 h-9 text-white" strokeWidth={3.5} />
              </div>

              <div className="flex items-center justify-center space-x-3 mb-1.5">
                <span className="h-px w-10 sm:w-14 bg-[#C9A45C]" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-[0.3em] text-[#103F2E] uppercase font-sans">
                  REGISTRATION SUCCESSFUL
                </span>
                <span className="h-px w-10 sm:w-14 bg-[#C9A45C]" />
              </div>

              <h2 className="font-serif text-3xl sm:text-[44px] text-[#103F2E] font-bold tracking-tight leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-to-b from-[#D4AF5F] to-[#A27B26] bg-clip-text text-transparent">
                  JnanaYogAyu
                </span>
              </h2>

              <div className="w-44 h-3 mx-auto mt-0.5 mb-3">
                <svg viewBox="0 0 200 16" fill="none" className="w-full h-full">
                  <path
                    d="M10 10C50 5 100 6 190 3"
                    stroke="#B88A2E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M60 13C100 10 140 10 170 8"
                    stroke="#C9A45C"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <p className="text-[#1B2A22] text-sm sm:text-[17px] leading-relaxed mb-5 font-serif max-w-3xl">
                Thank you,{" "}
                <strong className="font-bold">
                  {formValues?.fullName || "Member"}
                </strong>
                . Your application for{" "}
                <strong className="font-bold">{selectedTier}</strong> has been
                registered. Our academy admissions and membership coordinator
                will contact you via WhatsApp and email within 24 hours.
              </p>

              <div className="bg-white/95 rounded-3xl border border-[#E8E0CC] shadow-[0_8px_30px_rgba(16,63,46,0.08)] overflow-hidden flex flex-col md:flex-row items-stretch w-full max-w-[960px] text-left mb-5">
                <div className="relative w-full md:w-[34%] shrink-0 min-h-[170px]">
                  <img
                    src={ayurvedicSuccessImage}
                    alt="Ayurvedic Traditional Mortar and Herbs"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="hidden md:block absolute inset-y-0 right-0 w-10 bg-gradient-to-r from-transparent to-white/90" />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center px-4 sm:px-8 py-2 font-sans text-[13px] sm:text-[15px] text-[#1F2D26] divide-y divide-[#EFE7D3]">
                  <div className="flex items-center py-2">
                    <div className="flex items-center space-x-3 w-40 sm:w-52 shrink-0">
                      <ClipboardList
                        className="w-5 h-5 text-[#C9A45C] shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium whitespace-nowrap">
                        Application ID
                      </span>
                    </div>
                    <span className="mr-3 shrink-0">:</span>
                    <span className="min-w-0 break-all">
                      {applicationId || "JYA-223495"}
                    </span>
                  </div>

                  <div className="flex items-center py-2">
                    <div className="flex items-center space-x-3 w-40 sm:w-52 shrink-0">
                      <CreditCard
                        className="w-5 h-5 text-[#C9A45C] shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium whitespace-nowrap">
                        Razorpay Payment ID
                      </span>
                    </div>
                    <span className="mr-3 shrink-0">:</span>
                    <span className="min-w-0 break-all">
                      {paymentInfo?.paymentId || "pay_TwnDIBlaIVHryb"}
                    </span>
                  </div>

                  <div className="flex items-center py-2">
                    <div className="flex items-center space-x-3 w-40 sm:w-52 shrink-0">
                      <CheckCircle2
                        className="w-5 h-5 text-[#C9A45C] shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium whitespace-nowrap">
                        Payment Status
                      </span>
                    </div>
                    <span className="mr-3 shrink-0">:</span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#E4F3E6] text-[#14532D] text-[11px] sm:text-[13px] font-semibold whitespace-nowrap">
                      <CheckCircle2
                        className="w-4 h-4 text-[#14532D] shrink-0"
                        strokeWidth={2.5}
                      />
                      <span>Payment Received &amp; Verified</span>
                    </span>
                  </div>

                  <div className="flex items-center py-2">
                    <div className="flex items-center space-x-3 w-40 sm:w-52 shrink-0">
                      <Mail
                        className="w-5 h-5 text-[#C9A45C] shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium whitespace-nowrap">
                        Registered Email
                      </span>
                    </div>
                    <span className="mr-3 shrink-0">:</span>
                    <span className="min-w-0 break-all">
                      {formValues?.email || "aarti.gosavi@soulsootra.com"}
                    </span>
                  </div>

                  <div className="flex items-center py-2">
                    <div className="flex items-center space-x-3 w-40 sm:w-52 shrink-0">
                      <Phone
                        className="w-5 h-5 text-[#C9A45C] shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium whitespace-nowrap">
                        Registered Mobile
                      </span>
                    </div>
                    <span className="mr-3 shrink-0">:</span>
                    <span className="min-w-0">
                      {formValues?.mobile || "9876543567"}
                    </span>
                  </div>

                  <div className="flex items-center py-2">
                    <div className="flex items-center space-x-3 w-40 sm:w-52 shrink-0">
                      <Layers
                        className="w-5 h-5 text-[#C9A45C] shrink-0"
                        strokeWidth={1.5}
                      />
                      <span className="font-medium whitespace-nowrap">
                        Selected Tier
                      </span>
                    </div>
                    <span className="mr-3 shrink-0">:</span>
                    <span className="min-w-0 break-words">
                      {selectedTier || "JYA Open Membership – Free"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center w-full">
                <CommonButton
                  label="RETURN TO MEMBERSHIPS"
                  onClick={handleClose}
                  icon={
                    <ArrowRight
                      className="w-5 h-5 ml-3 text-white inline"
                      strokeWidth={2.5}
                    />
                  }
                  className="!h-12 !px-12 bg-gradient-to-b from-[#0F5A2F] to-[#06401F] hover:from-[#12663A] hover:to-[#08502A] text-white border-2 border-[#C9A45C] !rounded-full shadow-[0_6px_22px_rgba(16,63,46,0.35)] tracking-wide text-sm sm:text-base font-medium font-sans mx-auto transition-all cursor-pointer"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-0 lg:min-h-[620px] max-h-none lg:max-h-[90vh] overflow-visible lg:overflow-hidden">
            <div className="lg:col-span-4 bg-[#0F3826] text-[#FBF8F1] p-6 lg:p-8 flex flex-col justify-between border-r border-[#1B5137]/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A45C]/5 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center space-x-2 text-[#C9A45C] text-xs font-semibold tracking-widest uppercase mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>JYA ENROLMENT</span>
                </div>
                <h3 className="font-serif text-2xl lg:text-3xl font-normal text-white mb-2 leading-tight">
                  Begin Your Journey
                </h3>
                <p className="text-white/70 text-xs font-serif leading-relaxed mb-8">
                  Complete all 5 stages to register your membership in the JYA
                  ecosystem.
                </p>

                <div className="space-y-4">
                  {stepDefinitions.map((s) => {
                    const isCompleted = modalStep > s.step;
                    const isCurrent = modalStep === s.step;

                    return (
                      <div
                        key={s.step}
                        className={`flex items-start space-x-3.5 p-2 rounded transition-all ${
                          isCurrent
                            ? "bg-white/10 border border-[#C9A45C]/50 shadow-sm"
                            : "opacity-80"
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium shrink-0 mt-0.5 ${
                            isCompleted
                              ? "bg-[#C9A45C] text-[#0D3323]"
                              : isCurrent
                                ? "border-2 border-[#C9A45C] text-[#C9A45C] bg-[#0F3826]"
                                : "border border-white/30 text-white/50"
                          }`}
                        >
                          {isCompleted ? "✓" : s.step}
                        </div>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-semibold leading-tight ${
                              isCurrent ? "text-white" : "text-white/80"
                            }`}
                          >
                            {s.label}
                          </p>
                          <p className="text-[11px] text-white/50 truncate">
                            {s.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-wider text-[#C9A45C] font-semibold">
                  SELECTED MEMBERSHIP
                </p>
                <p className="font-serif text-sm text-white/90 font-medium mt-0.5 truncate">
                  {selectedTier || "शतायुस्World Life Membership"}
                </p>
              </div>
            </div>

            <div
              data-lenis-prevent="true"
              className="lg:col-span-8 p-6 lg:p-9 flex flex-col justify-between overflow-y-auto bg-[#FBF8F1] max-h-[85vh] lg:max-h-[90vh]"
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  <div className="mb-6 pr-8">
                    <span className="text-[11px] font-semibold text-[#C9A45C] uppercase tracking-wider">
                      STEP {modalStep} OF 5
                    </span>
                    <h2 className="font-serif text-2xl lg:text-3xl text-[#0D3323] font-normal mt-1 mb-1">
                      {stepDefinitions[modalStep - 1].label}
                    </h2>
                    <p className="text-xs text-[#1B5137]/80 font-serif">
                      {modalStep === 1 &&
                        "Please enter your legal name and primary contact details."}
                      {modalStep === 2 &&
                        "Help us understand your background and ecosystem interests."}
                      {modalStep === 3 &&
                        "Select your preferred membership tier and mode of participation."}
                      {modalStep === 4 &&
                        "Configure your academy preferences and entrance exam participation."}
                      {modalStep === 5 &&
                        "Review your entered summary and confirm the declarations."}
                    </p>
                  </div>

                  {modalStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <InputField
                            name="firstName"
                            label="First Name *"
                            control={control}
                            error={errors.firstName}
                          />
                          {errors.firstName && (
                            <p className="text-red-600 text-[11px] mt-1">
                              {errors.firstName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <InputField
                            name="lastName"
                            label="Last Name *"
                            control={control}
                            error={errors.lastName}
                          />
                          {errors.lastName && (
                            <p className="text-red-600 text-[11px] mt-1">
                              {errors.lastName.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <InputField
                            name="email"
                            label="Email Address *"
                            type="email"
                            dontCapitalize
                            control={control}
                            error={errors.email}
                          />
                          {errors.email && (
                            <p className="text-red-600 text-[11px] mt-1">
                              {errors.email.message}
                            </p>
                          )}
                        </div>
        
                        <div>
                          <InputField
                            name="mobile"
                            label="Mobile Number *"
                            type="tel"
                            control={control}
                            error={errors.mobile}
                          />
                          {errors.mobile && (
                            <p className="text-red-600 text-[11px] mt-1">
                              {errors.mobile.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <InputField
                            name="whatsapp"
                            label="WhatsApp Number (optional)"
                            type="tel"
                            control={control}
                            error={errors.whatsapp}
                          />
                        </div>
             
                        <div>
                          <DatePickerField
                            name="dob"
                            label="Date of Birth"
                            control={control}
                            error={errors.dob}
                            dob={true}
                          />
                        </div>
                        <div>
                          <DropdownField
                            name="gender"
                            placeholder="Gender"
                            control={control}
                            dataArray={genderOptions}
                            error={errors.gender}
                          />
                        </div>
  
                           <div>
                          <InputField
                            name="country"
                            label="Country"
                            control={control}
                            defaultValue="India"
                            error={errors.country}
                          />
                        </div>
                        <div>
                          <InputField
                            name="city"
                            label="City *"
                            control={control}
                            error={errors.city}
                          />
                          {errors.city && (
                            <p className="text-red-600 text-[11px] mt-1">
                              {errors.city.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <InputField
                            name="state"
                            label="State"
                            control={control}
                            error={errors.state}
                          />
                        </div>
                        <div>
                          <InputField
                            name="pincode"
                            label="Pin-Code"
                            control={control}
                            error={errors.pincode}
                          />
                        </div>
                    
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Professional Information */}
                  {modalStep === 2 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <InputField
                            name="profession"
                            label="Profession / Occupation"
                            control={control}
                            error={errors.profession}
                          />
                        </div>
                        <div>
                          <InputField
                            name="organisation"
                            label="Organisation / Clinic / Hospital"
                            control={control}
                            error={errors.organisation}
                          />
                        </div>
                      </div>

                      <div>
                        <InputArea
                          name="background"
                          label="Brief Professional Background / Experience in Ayurveda"
                          control={control}
                          minRows={3}
                        />
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-[#0D3323] uppercase tracking-wider mb-2">
                          Areas of Interest:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-white/70 p-3 rounded border border-[#E5DAC1]">
                          <CheckBoxField
                            name="interest_ayurveda"
                            label="Ayurveda & Traditional Healthcare"
                            control={control}
                          />
                          <CheckBoxField
                            name="interest_wellness"
                            label="Health & Wellness"
                            control={control}
                          />
                          <CheckBoxField
                            name="interest_yoga"
                            label="Yoga & Holistic Living"
                            control={control}
                          />
                          <CheckBoxField
                            name="interest_clinic"
                            label="Healthcare Practice Management"
                            control={control}
                          />
                          <CheckBoxField
                            name="interest_organic"
                            label="Organic Farming & Natural Products"
                            control={control}
                          />
                          <CheckBoxField
                            name="interest_education"
                            label="Learning & Education"
                            control={control}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Membership Selection */}
                  {modalStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold text-[#0D3323] uppercase tracking-wider mb-2">
                          Select Membership Tier:
                        </p>
                        <div className="grid grid-cols-1 gap-2.5">
                          {membershipSelectOptions.map((opt) => {
                            const isSelected = selectedTier === opt.value;
                            return (
                              <div
                                key={opt.id}
                                onClick={() =>
                                  setValue("membershipOption", opt.value)
                                }
                                className={`p-3.5 rounded border cursor-pointer transition-all flex items-start justify-between ${
                                  isSelected
                                    ? "bg-[#103F2E] text-white border-[#C9A45C] shadow-md"
                                    : "bg-white hover:bg-white/90 text-[#0D3323] border-[#E5DAC1]"
                                }`}
                              >
                                <div className="pr-4">
                                  <div className="flex items-center space-x-2">
                                    <div
                                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                                        isSelected
                                          ? "border-[#C9A45C] bg-[#C9A45C]"
                                          : "border-gray-400 bg-white"
                                      }`}
                                    >
                                      {isSelected && (
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#103F2E]" />
                                      )}
                                    </div>
                                    <p
                                      className={`text-sm font-serif font-medium ${
                                        isSelected
                                          ? "text-white"
                                          : "text-[#0D3323]"
                                      }`}
                                    >
                                      {opt.label}
                                    </p>
                                  </div>
                                  <p
                                    className={`text-xs mt-1 ml-6 ${
                                      isSelected
                                        ? "text-white/70"
                                        : "text-[#1B5137]/70"
                                    }`}
                                  >
                                    {opt.sub}
                                  </p>
                                </div>
                                <span
                                  className={`text-xs font-bold shrink-0 px-2.5 py-1 rounded-full ${
                                    isSelected
                                      ? "bg-[#C9A45C] text-[#0D3323]"
                                      : "bg-[#F3EFE6] text-[#0D3323]"
                                  }`}
                                >
                                  {opt.fee}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Dropdown selector fallback from src/common/formFields/DropdownField */}
                      <div className="pt-2">
                        <DropdownField
                          name="membershipOption"
                          control={control}
                          placeholder="Or choose tier from dropdown"
                          dataArray={membershipSelectOptions}
                          isSearchable={false}
                          error={errors.membershipOption}
                        />
                      </div>

                      {/* Radio field from src/common/formFields/RadioField */}
                      <div className="pt-2 bg-white/80 p-3.5 rounded border border-[#E5DAC1]">
                        <p className="text-xs font-semibold text-[#0D3323] mb-1">
                          Mode of Participation:
                        </p>
                        <RadioField
                          name="modeOfParticipation"
                          control={control}
                          dataArray={participationModes}
                          error={errors.modeOfParticipation}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 4: Additional Details & Academy */}
                  {modalStep === 4 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <DropdownField
                            name="ecosphereSeason"
                            placeholder="Preferred Season / Batch"
                            control={control}
                            dataArray={seasonOptions}
                          />
                        </div>
                        <div>
                          <DropdownField
                            name="ecosphereResidential"
                            placeholder="Residential Mode"
                            control={control}
                            dataArray={residentialOptions}
                          />
                        </div>
                      </div>

                      <div className="bg-white/80 p-3.5 rounded border border-[#E5DAC1]">
                        <CheckBoxField
                          name="entranceExamApplied"
                          label="I intend to appear for the जैवमण्डलEcosphere Gurukul Entrance Examination"
                          control={control}
                          className="font-medium text-[#0D3323]"
                        />
                      </div>

                      <div>
                        <InputArea
                          name="academyInterest"
                          label="Learning Aspirations & Specific Programme Requirements"
                          control={control}
                          minRows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* STEP 5: Review & Submit (strictly matching media_1793943603158_93733d00.jpg) */}
                  {modalStep === 5 && (
                    <div className="space-y-4">
                      {/* Summary Box matching screenshot */}
                      <div className="bg-white rounded p-4 sm:p-5 border border-[#E5DAC1] shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 mb-3 border-b border-[#F0E6D2] gap-1">
                          <span className="text-xs text-[#1B5137]/70 font-medium">
                            Selected Membership:
                          </span>
                          <span className="font-serif text-sm font-semibold text-[#C9A45C]">
                            {selectedTier}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                          <div className="flex">
                            <span className="w-24 shrink-0 font-medium text-[#1B5137]/70">
                              Applicant:
                            </span>
                            <span className="text-[#0D3323] font-semibold truncate">
                              {formValues?.fullName || "—"}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 shrink-0 font-medium text-[#1B5137]/70">
                              Phone:
                            </span>
                            <span className="text-[#0D3323] font-semibold">
                              {formValues?.mobile || "—"}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-24 shrink-0 font-medium text-[#1B5137]/70">
                              Email:
                            </span>
                            <span className="text-[#0D3323] truncate">
                              {formValues?.email || "—"}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 shrink-0 font-medium text-[#1B5137]/70">
                              City:
                            </span>
                            <span className="text-[#0D3323]">
                              {formValues?.city || "—"}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-24 shrink-0 font-medium text-[#1B5137]/70">
                              Date of Birth:
                            </span>
                            <span className="text-[#0D3323]">
                              {formatDateDisplay(formValues?.dob)}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-20 shrink-0 font-medium text-[#1B5137]/70">
                              Profession:
                            </span>
                            <span className="text-[#0D3323]">
                              {formValues?.profession || "—"}
                            </span>
                          </div>
                          <div className="flex sm:col-span-2">
                            <span className="w-24 shrink-0 font-medium text-[#1B5137]/70">
                              Mode:
                            </span>
                            <span className="text-[#0D3323] font-semibold">
                              {formValues?.modeOfParticipation || "Both"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Declarations (All 4 cards with soft beige background matching screenshot) */}
                      <div>
                        <p className="text-[11px] font-semibold text-[#2563EB] tracking-wider uppercase mb-2">
                          DECLARATIONS (ALL REQUIRED):
                        </p>

                        <div className="space-y-2">
                          <div className="bg-[#F5EEDC] hover:bg-[#F2E7D0] border border-[#E7DDCA] rounded px-3 py-2 transition-all">
                            <CheckBoxField
                              name="declaration1"
                              label="I confirm that the information provided above is accurate."
                              control={control}
                              defaultValue={true}
                              className="text-xs text-[#0D3323]"
                            />
                          </div>

                          <div className="bg-[#F5EEDC] hover:bg-[#F2E7D0] border border-[#E7DDCA] rounded px-3 py-2 transition-all">
                            <CheckBoxField
                              name="declaration2"
                              label="I have read and understood the membership terms and conditions."
                              control={control}
                              defaultValue={true}
                              className="text-xs text-[#0D3323]"
                            />
                          </div>

                          <div className="bg-[#F5EEDC] hover:bg-[#F2E7D0] border border-[#E7DDCA] rounded px-3 py-2 transition-all">
                            <CheckBoxField
                              name="declaration3"
                              label="I agree to abide by JYA membership policies and programme-specific guidelines."
                              control={control}
                              defaultValue={true}
                              className="text-xs text-[#0D3323]"
                            />
                          </div>

                          <div className="bg-[#F5EEDC] hover:bg-[#F2E7D0] border border-[#E7DDCA] rounded px-3 py-2 transition-all">
                            <CheckBoxField
                              name="declaration4"
                              label="I consent to receiving membership-related communications from JYA."
                              control={control}
                              defaultValue={true}
                              className="text-xs text-[#0D3323]"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons (using CommonButton from src/common/button) */}
                <div className="pt-6 mt-6 border-t border-[#E5DAC1] flex items-center justify-between">
                  {modalStep > 1 ? (
                    <CommonButton
                      label="< BACK"
                      onClick={handlePrev}
                      className="!h-10 !px-5 bg-white hover:bg-[#F3EFE6] text-[#0D3323] border border-[#E5DAC1] !rounded font-medium tracking-wide shadow-sm"
                    />
                  ) : (
                    <div />
                  )}

                  {modalStep < 5 ? (
                    <CommonButton
                      label="CONTINUE"
                      onClick={handleNext}
                      className="!h-10 !px-7 bg-[#C9A45C] hover:bg-[#B89248] text-[#0D3323] font-semibold !rounded shadow-md tracking-wide"
                    />
                  ) : (
                    <CommonButton
                      type="button"
                      onClick={(e) => {
                        if (e && e.preventDefault) e.preventDefault();
                        onSubmit();
                      }}
                      label="SUBMIT APPLICATION"
                      icon={
                        <CheckCircle2 className="w-4 h-4 ml-1 inline text-[#0D3323]" />
                      }
                      className="!h-11 !px-7 bg-[#C9A45C] hover:bg-[#B89248] text-[#0D3323] font-bold !rounded shadow-md tracking-wider text-xs sm:text-sm cursor-pointer"
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
