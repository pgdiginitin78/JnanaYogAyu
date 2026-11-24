import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Clock,
  Cpu,
  Edit3,
  Eye,
  Heart,
  ImagePlus,
  MapPin,
  PackageCheck,
  Phone,
  PlusCircle,
  Repeat,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Stethoscope,
  Trash2,
  Upload,
  UserCheck,
  XCircle,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import DatePickerField from "../../components/common/forms/DatePickerField";
import RadioField from "../../components/common/forms/RadioField";
import CheckBoxField from "../../components/common/forms/CheckBoxField";
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
  BARTER_PHOTO_PRESETS,
  GLOBAL_AYURX_SOLUTIONS,
  V2_IMAGES,
  WELLNESS_SERVICES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import {
  getDropdownValue,
  v2BarterListingSchema,
  v2BarterOfferSchema,
  v2BookingSchema,
  v2DigitalClinicSchema,
  v2RejectReasonSchema,
} from "../validation/v2Schemas";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

const CONSULTATION_MODES = [
  { id: "In-Clinic at SwaGrama", label: "In-Clinic (Lavale)" },
  { id: "Online Video Vaidya", label: "Online Video Consultation" },
  { id: "Patient Camp", label: "Outreach Patient Camp" },
];

const CONSULTATION_SLOT_CARDS = [
  {
    value: "Morning (09:00 AM - 12:00 PM)",
    title: "Morning Brahma OPD",
    time: "09:00 AM – 12:00 PM",
    availability: "5 Slots Open",
    note: "Best for Nadi Pariksha",
  },
  {
    value: "Afternoon (01:00 PM - 04:00 PM)",
    title: "Afternoon Clinical OPD",
    time: "01:00 PM – 04:00 PM",
    availability: "3 Slots Open",
    note: "Panchakarma & Review",
  },
  {
    value: "Evening Video (05:00 PM - 07:30 PM)",
    title: "Evening Video Vaidya",
    time: "05:00 PM – 07:30 PM",
    availability: "Fast Filling · 2 Left",
    note: "Remote Tele-Vaidya",
  },
];

const DOSHA_CONCERN_CATEGORIES = [
  { label: "Digestive Agni & Gut Balance", value: "Digestive / Agni" },
  { label: "Joint Mobility & Vata Care", value: "Joint / Vata" },
  { label: "Skin, Acidity & Pitta Care", value: "Skin / Pitta" },
  { label: "Stress, Sleep & Nervous System", value: "Stress / Sleep" },
  { label: "Seasonal Panchakarma Detoxification", value: "Panchakarma Detox" },
  { label: "Preventive Prakriti Consultation", value: "Preventive Wellness" },
];

const BARTER_CATEGORIES = [
  { label: "Herbs, Roots & Organic Harvest", value: "Barter Goods" },
  {
    label: "Handcrafted Brass, Kansa & Clay Vessels",
    value: "Barter Goods - Vessels",
  },
  {
    label: "Handspun Khadi, Textiles & Meditation",
    value: "Barter Goods - Textiles",
  },
  {
    label: "Classical Oils, A2 Ghee & Formulations",
    value: "Barter Goods - Formulations",
  },
  { label: "Heirloom Seeds, Saplings & Grains", value: "Barter Goods - Seeds" },
];

const TRADE_TYPES = [
  { id: "Sell or Barter", label: "Sell (₹) or Barter" },
  { id: "Barter Only", label: "Barter Exchange Only" },
  { id: "Direct Sale", label: "Direct Sale Only (₹)" },
];

const CONDITION_GRADES = [
  {
    label: "Freshly Harvested / First Press",
    value: "Freshly Harvested / First Press",
  },
  {
    label: "Artisanal / Handcrafted New",
    value: "Artisanal / Handcrafted New",
  },
  {
    label: "Sealed Clinical-Grade Batch",
    value: "Sealed Clinical-Grade Batch",
  },
  {
    label: "Sun-Dried & Stone-Processed",
    value: "Sun-Dried & Stone-Processed",
  },
  {
    label: "Gently Used / Vintage Instrument",
    value: "Gently Used / Vintage Instrument",
  },
];

const PURITY_STANDARDS = [
  { label: "Certified Chemical-Free Homegrown", value: "Homegrown Organic" },
  { label: "Classical Small-Batch Ayurvedic Method", value: "Classical Prep" },
  { label: "Artisan Handloom & Natural Dye", value: "Artisan Handloom" },
  { label: "Wildcrafted Sahyadri Harvest", value: "Wildcrafted Harvest" },
];

const EXCHANGE_MODES = [
  { id: "In-Person at SwaGrama", label: "Swap at SwaGrama" },
  { id: "Either", label: "Either Local or Courier" },
  { id: "Courier Both Sides", label: "Courier Both Sides" },
];

const FULFILLMENT_MODES = [
  { label: "Meet In Person at SwaGrama Lavale", value: "Swap at SwaGrama" },
  { label: "Local Exchange in Pune", value: "Pune Local Pickup" },
  { label: "Insured Local Courier", value: "Direct Dispatch" },
];

const CLINIC_ROLES = [
  { label: "Ayurveda Physician / Vaidya", value: "Ayurveda Vaidya" },
  { label: "Clinic Director / Owner", value: "Clinic Director" },
  { label: "Hospital Administrator", value: "Hospital Admin" },
  { label: "Wellness Center Partner", value: "Wellness Partner" },
];

const CLINIC_TEAM_SIZES = [
  { label: "1 - 5 Practitioners & Staff", value: "1-5 Staff" },
  { label: "6 - 20 Multi-Specialty Staff", value: "6-20 Staff" },
  { label: "21+ Multi-Center Hospital Network", value: "21+ Multi-Center" },
];

const DIGITAL_SOL_INTERESTS = [
  { label: "Ayurmitra Patient & Companion Platform", value: "Ayurmitra" },
  {
    label: "Digital Clinic & Muktikhela EMR Suite",
    value: "Digital Solutions",
  },
  { label: "Clinical HRMS & Practitioner Roster", value: "HRMS" },
  {
    label: "Full Integrated Global AyurX Suite",
    value: "Full Integrated Suite",
  },
];

export default function V2GlobalAyurXPage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    currentRole,
    getDiscountPercent,
    switchRoleQuick,
    createBooking,
    createEnquiry,
    toggleWishlist,
    addToCart,
    submitListing,
    resubmitListing,
    sendBarterOffer,
    decideBarterOffer,
    decideListingBySuperAdmin,
    setPendingAuthIntent,
    notify,
  } = useV2Store();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "healthcare";
  const setActiveTab = (tabId) =>
    setSearchParams({ tab: tabId }, { replace: true, preventScrollReset: true });
  const [bookingService, setBookingService] = useState(null);
  const [digitalEnquiryOpen, setDigitalEnquiryOpen] = useState(false);
  const [barterOfferItem, setBarterOfferItem] = useState(null);
  const [listBarterOpen, setListBarterOpen] = useState(false);
  const [editingBarterItem, setEditingBarterItem] = useState(null);
  const [inspectBarterItem, setInspectBarterItem] = useState(null);
  const [rejectTargetItem, setRejectTargetItem] = useState(null);
  const [barterTradeFilter, setBarterTradeFilter] = useState("All");
  const [uploadedImageName, setUploadedImageName] = useState("");

  const discountPercent = getDiscountPercent();
  const isVerifierAdmin =
    currentRole === "admin" || currentRole === "super_admin";

  const eshopProducts = state.listings.filter(
    (item) => item.status === "approved" && item.type === "product",
  );
  const barterItems = state.listings.filter(
    (item) => item.status === "approved" && item.type === "barter",
  );
  const filteredBarterItems = barterItems.filter((item) =>
    barterTradeFilter === "All"
      ? true
      : (item.tradeType || "Sell or Barter") === barterTradeFilter,
  );
  const pendingVerificationItems = state.listings.filter(
    (item) => item.type === "barter" && item.status === "pending",
  );
  const rejectedBarterItems = state.listings.filter(
    (item) => item.type === "barter" && item.status === "rejected",
  );
  const mySubmittedBarterItems = currentUser
    ? state.listings.filter(
        (item) => item.type === "barter" && item.ownerId === currentUser.id,
      )
    : [];
  const myIncomingBarterOffers = currentUser
    ? state.barterOffers.filter((o) => o.targetOwnerId === currentUser.id)
    : [];
  const mySentBarterOffers = currentUser
    ? state.barterOffers.filter((o) => o.proposerUserId === currentUser.id)
    : [];

  const bookingForm = useForm({
    resolver: yupResolver(v2BookingSchema),
    defaultValues: {
      name: currentUser?.name || "",
      age: 32,
      gender: GENDER_OPTIONS[0],
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      consultationMode: "In-Clinic at SwaGrama",
      preferredDate: new Date(),
      slot: CONSULTATION_SLOT_CARDS[0].value,
      doshaCategory: DOSHA_CONCERN_CATEGORIES[0],
      medications: "",
      concern: "",
      clinicalConsent: true,
    },
  });

  const watchedBookingSlot = useWatch({
    control: bookingForm.control,
    name: "slot",
  });

  const digitalForm = useForm({
    resolver: yupResolver(v2DigitalClinicSchema),
    defaultValues: {
      name: currentUser?.name || "",
      clinicName: "",
      role: CLINIC_ROLES[0],
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      teamSize: CLINIC_TEAM_SIZES[0],
      interest: DIGITAL_SOL_INTERESTS[0],
      message: "",
    },
  });

  const barterOfferForm = useForm({
    resolver: yupResolver(v2BarterOfferSchema),
    defaultValues: {
      offeredItem: "",
      offeredCondition: CONDITION_GRADES[0],
      offeredQuantity: "",
      estimatedValue: 750,
      fulfillmentMode: FULFILLMENT_MODES[0],
      proposedDate: new Date(),
      pickupCity: currentUser?.city || "Pune",
      contactPhone: currentUser?.phone || "",
      message: "",
    },
  });

  const listBarterForm = useForm({
    resolver: yupResolver(v2BarterListingSchema),
    defaultValues: {
      title: "",
      category: BARTER_CATEGORIES[0],
      tradeType: TRADE_TYPES[0].id,
      conditionGrade: CONDITION_GRADES[0],
      originLocation: currentUser?.city || "Lavale, Pune",
      pinCode: currentUser?.enrollmentProfile?.pinCode || "412115",
      sellerPhone: currentUser?.phone || "",
      harvestDate: new Date(),
      quantityLabel: "",
      shelfLife: "12 Months in cool dry storage",
      purityStandard: PURITY_STANDARDS[0],
      exchangeMode: EXCHANGE_MODES[0].id,
      packagingDetails: "Food-grade amber jar / breathable cotton pouch",
      want: "",
      valueLabel: 900,
      imageUrl: "",
      description: "",
      acceptPolicy: true,
    },
  });

  const watchedListingTradeType = useWatch({
    control: listBarterForm.control,
    name: "tradeType",
  });
  const watchedListingImageUrl = useWatch({
    control: listBarterForm.control,
    name: "imageUrl",
  });

  const rejectReasonForm = useForm({
    resolver: yupResolver(v2RejectReasonSchema),
    defaultValues: {
      reason: "",
    },
  });

  const handleOpenBooking = (service) => {
    bookingForm.reset({
      name: currentUser?.name || "",
      age: 32,
      gender: GENDER_OPTIONS[0],
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      consultationMode: "In-Clinic at SwaGrama",
      preferredDate: new Date(),
      slot: CONSULTATION_SLOT_CARDS[0].value,
      doshaCategory: DOSHA_CONCERN_CATEGORIES[0],
      medications: "",
      concern: "",
      clinicalConsent: true,
    });
    setBookingService(service);
  };

  const onSubmitBooking = (values) => {
    if (!bookingService) return;
    const dateStr = values.preferredDate
      ? new Date(values.preferredDate).toISOString().slice(0, 10)
      : "2026-12-20";
    createBooking({
      kind: bookingService.category,
      title: bookingService.title,
      provider: bookingService.provider,
      basePrice: bookingService.price,
      name: values.name,
      age: values.age,
      gender: getDropdownValue(values.gender),
      phone: values.phone,
      email: values.email,
      city: values.city,
      consultationMode: values.consultationMode,
      preferredDate: dateStr,
      slot: values.slot,
      doshaCategory: getDropdownValue(values.doshaCategory),
      medications: values.medications,
      concern: values.concern,
    });
    setBookingService(null);
  };

  const onSubmitDigitalEnquiry = (values) => {
    createEnquiry({
      name: values.name,
      clinicName: values.clinicName,
      role: getDropdownValue(values.role),
      phone: values.phone,
      email: values.email,
      city: values.city,
      teamSize: getDropdownValue(values.teamSize),
      interest: getDropdownValue(values.interest),
      message: values.message,
      sourcePage: "Global AyurX Digital",
    });
    setDigitalEnquiryOpen(false);
  };

  const handleWishlistAction = (itemId) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "wishlist",
        itemId,
        returnTo: "/v2/global-ayurx",
      });
      navigate("/v2/login");
      return;
    }
    toggleWishlist(itemId);
  };

  const handleOpenBarterOffer = (item) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/global-ayurx?tab=barter",
      });
      navigate("/v2/login");
      return;
    }
    if (item.ownerId === currentUser.id) {
      notify("You cannot propose a barter offer on your own listing");
      return;
    }
    barterOfferForm.reset({
      offeredItem: "",
      offeredCondition: CONDITION_GRADES[0],
      offeredQuantity: "",
      estimatedValue: item.price || 750,
      fulfillmentMode: FULFILLMENT_MODES[0],
      proposedDate: new Date(),
      pickupCity: currentUser.city || "Pune",
      contactPhone: currentUser.phone || "",
      message: "",
    });
    setBarterOfferItem(item);
  };

  const onSubmitBarterOffer = (values) => {
    if (!barterOfferItem) return;
    sendBarterOffer(barterOfferItem, {
      offeredItem: values.offeredItem,
      offeredCondition: getDropdownValue(values.offeredCondition),
      offeredQuantity: values.offeredQuantity,
      estimatedValue: values.estimatedValue,
      fulfillmentMode: getDropdownValue(values.fulfillmentMode),
      proposedDate: values.proposedDate
        ? new Date(values.proposedDate).toISOString().slice(0, 10)
        : "",
      pickupCity: values.pickupCity,
      contactPhone: values.contactPhone,
      message: values.message,
    });
    setBarterOfferItem(null);
  };

  const handleOpenListBarter = () => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/global-ayurx?tab=barter",
      });
      navigate("/v2/login");
      return;
    }
    setEditingBarterItem(null);
    setUploadedImageName("");
    listBarterForm.reset({
      title: "",
      category: BARTER_CATEGORIES[0],
      tradeType: TRADE_TYPES[0].id,
      conditionGrade: CONDITION_GRADES[0],
      originLocation: currentUser.city || "Lavale, Pune",
      pinCode: currentUser.enrollmentProfile?.pinCode || "412115",
      sellerPhone: currentUser.phone || "",
      harvestDate: new Date(),
      quantityLabel: "",
      shelfLife: "12 Months in cool dry storage",
      purityStandard: PURITY_STANDARDS[0],
      exchangeMode: EXCHANGE_MODES[0].id,
      packagingDetails: "Food-grade amber jar / breathable cotton pouch",
      want: "",
      valueLabel: 900,
      imageUrl: "",
      description: "",
      acceptPolicy: true,
    });
    setListBarterOpen(true);
  };

  const handleOpenEditBarter = (item) => {
    setEditingBarterItem(item);
    setUploadedImageName(item.imageName || "Existing Listing Image");
    listBarterForm.reset({
      title: item.title || "",
      category:
        BARTER_CATEGORIES.find((c) => c.value === item.category) ||
        BARTER_CATEGORIES[0],
      tradeType: item.tradeType || TRADE_TYPES[0].id,
      conditionGrade:
        CONDITION_GRADES.find((g) => g.value === item.conditionGrade) ||
        CONDITION_GRADES[0],
      originLocation: item.originLocation || "Lavale, Pune",
      pinCode: item.pinCode || "412115",
      sellerPhone: item.sellerPhone || currentUser?.phone || "",
      harvestDate: item.harvestDate ? new Date(item.harvestDate) : new Date(),
      quantityLabel: item.quantityLabel || "",
      shelfLife: item.shelfLife || "12 Months",
      purityStandard:
        PURITY_STANDARDS.find((p) => p.value === item.purityStandard) ||
        PURITY_STANDARDS[0],
      exchangeMode: item.exchangeMode || EXCHANGE_MODES[0].id,
      packagingDetails: item.packagingDetails || "Sealed eco packaging",
      want: item.wantsInReturn || "",
      valueLabel: item.price || 900,
      imageUrl: item.image || "",
      description: item.description || "",
      acceptPolicy: true,
    });
    setListBarterOpen(true);
  };

  const handleBarterImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      notify("Please select a valid JPG, PNG, or WEBP image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const rawDataUrl = reader.result;
      if (typeof rawDataUrl !== "string") return;
      const img = new Image();
      img.onload = () => {
        const maxW = 800;
        const scale = img.width > maxW ? maxW / img.width : 1;
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressedUrl = canvas.toDataURL("image/jpeg", 0.85);
          listBarterForm.setValue("imageUrl", compressedUrl, {
            shouldValidate: true,
          });
        } else {
          listBarterForm.setValue("imageUrl", rawDataUrl, {
            shouldValidate: true,
          });
        }
        setUploadedImageName(file.name);
        notify("Product image uploaded cleanly");
      };
      img.onerror = () => {
        listBarterForm.setValue("imageUrl", rawDataUrl, {
          shouldValidate: true,
        });
        setUploadedImageName(file.name);
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const onSubmitListBarter = (values) => {
    const listingPayload = {
      type: "barter",
      title: values.title,
      category: getDropdownValue(values.category),
      tradeType: values.tradeType,
      conditionGrade: getDropdownValue(values.conditionGrade),
      originLocation: values.originLocation,
      pinCode: values.pinCode,
      sellerPhone: values.sellerPhone,
      harvestDate: values.harvestDate
        ? new Date(values.harvestDate).toISOString().slice(0, 10)
        : "",
      quantityLabel: values.quantityLabel,
      shelfLife: values.shelfLife,
      purityStandard: getDropdownValue(values.purityStandard),
      exchangeMode: values.exchangeMode,
      packagingDetails: values.packagingDetails,
      price: Number(values.valueLabel) || 800,
      wantsInReturn:
        values.tradeType === "Direct Sale"
          ? "Direct Purchase Only (No Barter Swap)"
          : values.want,
      description: values.description,
      image: values.imageUrl,
      imageName: uploadedImageName || "Uploaded Photo",
    };

    if (editingBarterItem) {
      resubmitListing(editingBarterItem.id, listingPayload);
    } else {
      submitListing(listingPayload);
    }
    setEditingBarterItem(null);
    setListBarterOpen(false);
  };

  const handleOpenRejectModal = (item) => {
    rejectReasonForm.reset({ reason: "" });
    setRejectTargetItem(item);
  };

  const onSubmitRejectListing = (values) => {
    if (!rejectTargetItem) return;
    decideListingBySuperAdmin(rejectTargetItem.id, "rejected", values.reason);
    if (inspectBarterItem?.id === rejectTargetItem.id) {
      setInspectBarterItem(null);
    }
    setRejectTargetItem(null);
  };

  const serviceTabs = [
    {
      id: "healthcare",
      label: "Healthcare (OPD · IPD · Camps)",
      icon: <Stethoscope className="h-3.5 w-3.5" />,
      count: WELLNESS_SERVICES.length,
    },
    {
      id: "digital",
      label: "AyurX Digital Solutions",
      icon: <Cpu className="h-3.5 w-3.5" />,
      count: GLOBAL_AYURX_SOLUTIONS.length,
    },
    {
      id: "eshop",
      label: "E-Shop Products",
      icon: <ShoppingBag className="h-3.5 w-3.5" />,
      count: eshopProducts.length,
    },
    {
      id: "barter",
      label: "Barter Goods Exchange",
      icon: <Repeat className="h-3.5 w-3.5" />,
      count: barterItems.length,
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-clip">
      <TwentyFirstHero
        images={[
          V2_IMAGES.ayurxHeroImg,
          V2_IMAGES.barterHeroImg,
          V2_IMAGES.panchakarmaImg,
          V2_IMAGES.opdImg,
        ]}

        onBadgeClick={() => setActiveTab("barter")}
        title={
          <>
            Classical Healthcare, <br />
            <KineticHeroHighlight>Digital Vaidya</KineticHeroHighlight> Tools &
            Herbal Exchange.
          </>
        }
        subtitle="Book OPD clinics, IPD residential healing, Panchakarma rituals & patient camps; deploy Ayurmitra & HRMS clinic suites; shop classical herbal formulations; or sell & exchange Admin-verified Barter Goods."
        actions={
          <>
            <Link
              to="/v2/cart"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] shadow-lg hover:bg-[#E7D7B5] transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>View Cart & Checkout</span>
            </Link>
            <button
              type="button"
              onClick={() => {
                setActiveTab("barter");
                document
                  .getElementById("v2-ayurx-workspace")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#FAF5E8]/45 bg-[#071E14]/55 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] backdrop-blur-md hover:border-[#C9A45C] hover:bg-[#071E14]/75 transition-colors"
            >
              <Repeat className="h-4 w-4 text-[#C9A45C]" />
              <span>Sell / Exchange Barter</span>
            </button>
            <CommonButton
              onClick={() => {
                digitalForm.reset({
                  name: currentUser?.name || "",
                  clinicName: "",
                  role: CLINIC_ROLES[0],
                  phone: currentUser?.phone || "",
                  email: currentUser?.email || "",
                  city: currentUser?.city || "Pune",
                  teamSize: CLINIC_TEAM_SIZES[0],
                  interest: DIGITAL_SOL_INTERESTS[0],
                  message: "",
                });
                setDigitalEnquiryOpen(true);
              }}
              label="Clinic Digital Enquiry"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#C9A45C]/50 !bg-[#071E14]/55 !text-[#E7D7B5] hover:!bg-[#C9A45C]/20 !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider backdrop-blur-md"
            />
          </>
        }
      />

      <section
        id="v2-ayurx-workspace"
        className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 lg:py-20"
      >
        <div className="flex justify-center mb-12">
          <AnimatedTabDock
            tabs={serviceTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            layoutId="globalAyurxDock"
          />
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[420px]"
        >
            {activeTab === "healthcare" && (
              <div className="space-y-10">
                <SectionHeader
                  eyebrow="Clinical Care"
                  title="Healthcare Bookings: OPD, IPD, Panchakarma & Camps"
                  subtitle="Non-registered guests and members can reserve appointments directly; members automatically receive their tier privilege."
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {WELLNESS_SERVICES.map((srv) => {
                    const discounted = Math.round(
                      srv.price * (1 - discountPercent / 100),
                    );
                    const isSaved =
                      currentUser &&
                      state.wishlist.some(
                        (w) =>
                          w.userId === currentUser.id && w.itemId === srv.id,
                      );
                    return (
                      <SpotlightBentoCard
                        key={srv.id}
                        className="flex flex-col"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={srv.image}
                            alt={srv.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex flex-1 flex-col">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#0f3d26]">
                              {srv.category}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleWishlistAction(srv.id)}
                              className={`rounded-full p-2 border transition-colors ${
                                isSaved
                                  ? "border-[#C9A45C] bg-[#C9A45C]/20 text-[#8b6534]"
                                  : "border-[#0f3d26]/15 text-[#0f3d26]/60"
                              }`}
                              aria-label="Wishlist service"
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <h3 className="mt-3 font-serif text-xl text-[#0f3d26]">
                            {srv.title}
                          </h3>
                          <p className="mt-1 text-[11px] font-semibold text-[#8b6534]">
                            {srv.provider}
                          </p>
                          <p className="mt-2.5 text-xs text-[#0f3d26]/75 flex-1 leading-relaxed">
                            {srv.summary}
                          </p>
                          <div className="mt-5 pt-4 border-t border-[#EDE5D5] flex items-center justify-between">
                            <div>
                              <span className="font-serif text-lg font-bold text-[#0f3d26]">
                                ₹{discounted.toLocaleString("en-IN")}
                              </span>
                              {discountPercent > 0 && (
                                <span className="ml-1.5 text-xs text-[#8b6534] line-through">
                                  ₹{srv.price.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                            <CommonButton
                              onClick={() => handleOpenBooking(srv)}
                              label="Book Slot"
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

            {activeTab === "digital" && (
              <div className="space-y-10">
                <SectionHeader
                  eyebrow="Digital Ecosystem"
                  title="Ayurmitra, Digital Solutions & Clinical HRMS"
                  subtitle="Purpose-built clinical software unifying Muktikhela assessments, Vaidya diagnostics, and clinic staffing."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {GLOBAL_AYURX_SOLUTIONS.map((sol) => (
                    <SpotlightBentoCard key={sol.id} className="flex flex-col">
                      <div className="aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={sol.image}
                          alt={sol.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-1 flex-col">
                        <span className="self-start rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f3d26]">
                          Global AyurX Module
                        </span>
                        <h3 className="mt-3 font-serif text-2xl text-[#0f3d26]">
                          {sol.title}
                        </h3>
                        <p className="mt-2.5 text-sm text-[#0f3d26]/75 flex-1 leading-relaxed">
                          {sol.description}
                        </p>
                        <CommonButton
                          onClick={() => setDigitalEnquiryOpen(true)}
                          label="Request Walkthrough"
                          className="mt-5 !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
                        />
                      </div>
                    </SpotlightBentoCard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "eshop" && (
              <div className="space-y-10">
                <SectionHeader
                  eyebrow="E-Shop Provisions"
                  title="Herbal & Ayurvedic Formulations"
                  subtitle="Add pure formulations directly to your cart as a Guest or Member; tier savings apply automatically at checkout."
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {eshopProducts.map((product) => {
                    const discounted = Math.round(
                      product.price * (1 - discountPercent / 100),
                    );
                    const isSaved =
                      currentUser &&
                      state.wishlist.some(
                        (w) =>
                          w.userId === currentUser.id &&
                          w.itemId === product.id,
                      );
                    return (
                      <SpotlightBentoCard
                        key={product.id}
                        className="flex flex-col"
                      >
                        <div className="aspect-[16/10] w-full overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex flex-1 flex-col">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-[#FAF5E8] border border-[#C9A45C]/40 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8b6534]">
                              {product.sellerName}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleWishlistAction(product.id)}
                              className={`rounded-full p-2 border transition-colors ${
                                isSaved
                                  ? "border-[#C9A45C] bg-[#C9A45C]/20 text-[#8b6534]"
                                  : "border-[#0f3d26]/15 text-[#0f3d26]/60"
                              }`}
                              aria-label="Save product"
                            >
                              <Heart className="h-4 w-4" />
                            </button>
                          </div>
                          <h3 className="mt-3 font-serif text-xl text-[#0f3d26]">
                            {product.title}
                          </h3>
                          <p className="mt-2 text-xs text-[#0f3d26]/75 flex-1 leading-relaxed">
                            {product.description}
                          </p>
                          <div className="mt-5 pt-4 border-t border-[#EDE5D5] flex items-center justify-between">
                            <div>
                              <span className="font-serif text-lg font-bold text-[#0f3d26]">
                                ₹{discounted.toLocaleString("en-IN")}
                              </span>
                              {discountPercent > 0 && (
                                <span className="ml-1.5 text-xs text-[#8b6534] line-through">
                                  ₹{product.price.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>
                            <CommonButton
                              onClick={() => addToCart(product)}
                              label="Add to Cart"
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

            {activeTab === "barter" && (
              <div className="space-y-8">
                <div className="rounded-3xl border border-[#C9A45C]/30 bg-gradient-to-br from-[#0B3326] to-[#12432D] p-7 sm:p-10 text-[#FAF5E8] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#C9A45C]" />
                        <span>Admin-Verified Barter & Sell Network</span>
                      </span>
                      {isVerifierAdmin && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#C9A45C] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#071E14]">
                          <span>
                            {pendingVerificationItems.length} Pending Approval
                          </span>
                        </span>
                      )}
                    </div>
                    <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
                      Add Items to Sell or Exchange with Mandatory Admin
                      Verification
                    </h2>
                    <p className="mt-3 text-sm text-[#FAF5E8]/80 leading-relaxed">
                      Every seller submission first enters Admin Quality
                      Verification and stays private to the seller until an
                      Admin approves it. Once verified, all other users can
                      inspect purity specs, Buy directly, or send Barter
                      Exchange offers.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={handleOpenListBarter}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
                      >
                        <PlusCircle className="h-4 w-4" />
                        <span>Add Item to Sell / Exchange</span>
                      </button>
                      <Link
                        to="/v2/dashboard"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E7D7B5]/40 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] hover:bg-white/10 transition-colors"
                      >
                        <span>Track My Submissions & Offers</span>
                        <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
                      </Link>
                    </div>
                  </div>
                  <div className="lg:col-span-5 aspect-[16/10] overflow-hidden rounded-2xl border border-[#C9A45C]/30">
                    <img
                      src={V2_IMAGES.barterHeroImg}
                      alt="Ayurvedic Barter Goods Still Life"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] p-5 sm:p-6 shadow-sm space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                      {
                        step: "Submission",
                        title: "Seller Adds Item",
                        desc: "Submit full harvest/craft details, selling price, & return goods.",
                        icon: <PlusCircle className="h-4 w-4 text-[#8b6534]" />,
                      },
                      {
                        step: "Verification",
                        title: "Admin Verifies Purity",
                        desc: "Held in Admin Queue (hidden from others) until approved or returned.",
                        icon: (
                          <ShieldCheck className="h-4 w-4 text-[#8b6534]" />
                        ),
                      },
                      {
                        step: "Marketplace",
                        title: "Shown to Other Users",
                        desc: "Approved goods go live publicly with an Admin Verified seal.",
                        icon: <BadgeCheck className="h-4 w-4 text-[#0f3d26]" />,
                      },
                      {
                        step: "Exchange",
                        title: "Buy or Swap Exchange",
                        desc: "Other users Buy via cart or propose timed barter exchanges.",
                        icon: <Repeat className="h-4 w-4 text-[#0f3d26]" />,
                      },
                    ].map((stage) => (
                      <div
                        key={stage.step}
                        className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 flex items-start gap-3"
                      >
                        <div className="h-8 w-8 rounded-xl bg-[#FAF5E8] border border-[#C9A45C]/40 flex items-center justify-center shrink-0">
                          {stage.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                            {stage.step}
                          </p>
                          <h3 className="text-sm font-bold text-[#0f3d26] mt-0.5">
                            {stage.title}
                          </h3>
                          <p className="text-[11px] text-[#0f3d26]/75 leading-relaxed mt-0.5">
                            {stage.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#EDE5D5] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#0f3d26]/80">
                      <UserCheck className="h-4 w-4 text-[#8b6534]" />
                      <span>
                        Active View:{" "}
                        <strong className="text-[#0f3d26]">
                          {currentUser
                            ? `${currentUser.name} (${currentRole})`
                            : "Guest Buyer Preview"}
                        </strong>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                        Test Verification Role:
                      </span>
                      {[
                        { id: "user", label: "Seller / Other User (Aarav)" },
                        { id: "admin", label: "Admin Verifier (Dr. Meera)" },
                        { id: "super_admin", label: "Super Admin" },
                        { id: "guest", label: "Guest Buyer" },
                      ].map((r) => {
                        const isActive =
                          (r.id === "guest" && !currentUser) ||
                          currentRole === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => switchRoleQuick(r.id)}
                            className={`rounded-full px-3.5 py-1.5 text-[11px] font-bold transition-colors ${
                              isActive
                                ? "bg-[#0f3d26] text-[#FAF5E8]"
                                : "border border-[#0f3d26]/20 bg-[#FBF8F1] text-[#0f3d26] hover:bg-[#e6efea]"
                            }`}
                          >
                            {r.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {isVerifierAdmin && (
                  <div className="rounded-3xl border-2 border-[#C9A45C]/60 bg-[#FAF5E8] p-6 sm:p-7 space-y-5 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0f3d26] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FAF5E8]">
                          <ShieldCheck className="h-3.5 w-3.5 text-[#C9A45C]" />
                          <span>Admin Verification Desk</span>
                        </span>
                        <h3 className="mt-2 font-serif text-2xl text-[#0f3d26]">
                          Seller Items Waiting for Admin Approval (
                          {pendingVerificationItems.length})
                        </h3>
                        <p className="text-xs text-[#0f3d26]/75 mt-1">
                          Unverified listings are hidden from other buyers.
                          Inspect authenticity details and Approve to publish
                          live, or Reject with feedback so the seller can
                          revise.
                        </p>
                      </div>
                      <span className="rounded-full border border-[#8b6534]/30 bg-[#FFFDF9] px-3.5 py-1.5 text-xs font-bold text-[#8b6534]">
                        {rejectedBarterItems.length} Returned for Seller
                        Revision
                      </span>
                    </div>

                    {pendingVerificationItems.length === 0 ? (
                      <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-6 text-center text-sm text-[#0f3d26]/75">
                        All submitted sell & barter items have been verified.
                        Switch to Seller or add a new item above to test
                        verification.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {pendingVerificationItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-2xl border border-[#C9A45C]/45 bg-[#FFFDF9] p-5 flex flex-col justify-between gap-4"
                          >
                            <div className="flex items-start gap-4">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-20 w-20 rounded-xl object-cover border border-[#EDE5D5] shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="rounded-full bg-[#FAF5E8] border border-[#C9A45C] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#8b6534]">
                                    Pending Verification
                                  </span>
                                  <span className="rounded-full bg-[#e6efea] px-2.5 py-0.5 text-[10px] font-bold text-[#0f3d26]">
                                    {item.tradeType || "Sell or Barter"}
                                  </span>
                                </div>
                                <h4 className="mt-1.5 font-serif text-lg text-[#0f3d26] leading-snug">
                                  {item.title}
                                </h4>
                                <p className="mt-1 text-xs text-[#0f3d26]/75">
                                  Seller: <strong>{item.sellerName}</strong> ·{" "}
                                  {item.sellerPhone || "Phone verified"}
                                </p>
                                <p className="mt-0.5 text-xs text-[#0f3d26]/75">
                                  Origin: {item.originLocation}{" "}
                                  {item.pinCode ? `(${item.pinCode})` : ""} ·
                                  Qty: {item.quantityLabel} · ₹
                                  {Number(item.price || 0).toLocaleString(
                                    "en-IN",
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="rounded-xl bg-[#FBF8F1] border border-[#EDE5D5] p-3 text-xs text-[#0f3d26]/85 space-y-1">
                              <p>
                                <strong>Purity & Condition:</strong>{" "}
                                {item.purityStandard} ·{" "}
                                {item.conditionGrade || "Fresh Batch"}
                              </p>
                              <p>
                                <strong>Seeking:</strong> {item.wantsInReturn}
                              </p>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#EDE5D5]">
                              <button
                                type="button"
                                onClick={() => setInspectBarterItem(item)}
                                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#0f3d26]/20 bg-[#FBF8F1] px-6 py-2.5 text-xs font-bold text-[#0f3d26] hover:bg-[#e6efea] transition-colors"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>Inspect Full Spec</span>
                              </button>
                              <div className="flex flex-wrap gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleOpenRejectModal(item)}
                                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#8b6534]/40 bg-[#FAF5E8] px-6 py-2.5 text-xs font-bold text-[#8b6534] hover:bg-[#EDE5D5] transition-colors"
                                >
                                  <XCircle className="h-3.5 w-3.5" />
                                  <span>Reject</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    decideListingBySuperAdmin(
                                      item.id,
                                      "approved",
                                    )
                                  }
                                  className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#071E14] transition-colors"
                                >
                                  <CheckCircle2 className="h-3.5 w-3.5 text-[#C9A45C]" />
                                  <span>Verify & Approve Live</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {currentUser && mySubmittedBarterItems.length > 0 && (
                  <div className="rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6534]">
                          Seller Submission Tracker
                        </p>
                        <h3 className="font-serif text-xl text-[#0f3d26]">
                          My Submitted Items & Verification Status (
                          {mySubmittedBarterItems.length})
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenListBarter}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                      >
                        <PlusCircle className="h-3.5 w-3.5" />
                        <span>Add Another Item</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mySubmittedBarterItems.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 flex flex-col justify-between gap-3"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              {item.status === "approved" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#e6efea] px-2.5 py-1 text-[10px] font-bold uppercase text-[#0f3d26]">
                                  <BadgeCheck className="h-3 w-3" />
                                  <span>Verified Live to All Users</span>
                                </span>
                              )}
                              {item.status === "pending" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#FAF5E8] border border-[#C9A45C] px-2.5 py-1 text-[10px] font-bold uppercase text-[#8b6534]">
                                  <Clock className="h-3 w-3" />
                                  <span>Pending Admin Verification</span>
                                </span>
                              )}
                              {item.status === "rejected" && (
                                <span className="inline-flex items-center gap-1 rounded-full bg-[#071E14] px-2.5 py-1 text-[10px] font-bold uppercase text-[#E7D7B5]">
                                  <AlertCircle className="h-3 w-3 text-[#C9A45C]" />
                                  <span>Returned by Admin</span>
                                </span>
                              )}
                              <span className="text-xs font-bold text-[#0f3d26]">
                                ₹
                                {Number(item.price || 0).toLocaleString(
                                  "en-IN",
                                )}
                              </span>
                            </div>
                            <h4 className="font-serif text-base text-[#0f3d26]">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-[#0f3d26]/75">
                              {item.tradeType || "Sell or Barter"} ·{" "}
                              {item.quantityLabel}
                            </p>
                            {item.status === "pending" && (
                              <p className="rounded-xl bg-[#FAF5E8] border border-[#C9A45C]/30 p-2.5 text-[11px] text-[#8b6534]">
                                Hidden from other buyers until verified by
                                Admin. Switch to Admin Verifier above to approve
                                immediately.
                              </p>
                            )}
                            {item.status === "rejected" &&
                              item.rejectionReason && (
                                <p className="rounded-xl bg-[#FAF5E8] border border-[#8b6534]/40 p-2.5 text-[11px] text-[#071E14]">
                                  <strong>Admin Feedback:</strong>{" "}
                                  {item.rejectionReason}
                                </p>
                              )}
                          </div>

                          <div className="pt-2 border-t border-[#EDE5D5] flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => setInspectBarterItem(item)}
                              className="inline-flex items-center gap-1 text-xs font-bold text-[#0f3d26] hover:underline"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>Inspect</span>
                            </button>
                            {item.status === "rejected" && (
                              <button
                                type="button"
                                onClick={() => handleOpenEditBarter(item)}
                                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#8b6534] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#0f3d26] transition-colors"
                              >
                                <Edit3 className="h-3.5 w-3.5" />
                                <span>Edit & Resubmit</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6534]">
                        Admin-Verified Public Marketplace
                      </p>
                      <h3 className="font-serif text-2xl text-[#0f3d26]">
                        Live Verified Goods Available to Other Users (
                        {filteredBarterItems.length})
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "All",
                        "Sell or Barter",
                        "Barter Only",
                        "Direct Sale",
                      ].map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => setBarterTradeFilter(f)}
                          className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                            barterTradeFilter === f
                              ? "bg-[#0f3d26] text-[#FAF5E8]"
                              : "border border-[#EDE5D5] bg-[#FFFDF9] text-[#0f3d26]/80 hover:border-[#C9A45C]"
                          }`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredBarterItems.map((item) => {
                      const isOwnItem =
                        currentUser && item.ownerId === currentUser.id;
                      const itemTradeType = item.tradeType || "Sell or Barter";
                      const canBuy = itemTradeType !== "Barter Only";
                      const canBarter = itemTradeType !== "Direct Sale";
                      const isSaved =
                        currentUser &&
                        state.wishlist.some(
                          (w) =>
                            w.userId === currentUser.id && w.itemId === item.id,
                        );

                      return (
                        <SpotlightBentoCard
                          key={item.id}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-5 h-full">
                            <div className="sm:col-span-2 aspect-[4/3] sm:aspect-auto relative overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                              <button
                                type="button"
                                aria-label="Toggle Barter Wishlist"
                                onClick={() => handleWishlistAction(item.id)}
                                className="absolute top-3 left-3 h-8 w-8 rounded-full bg-[#FFFDF9]/90 border border-[#EDE5D5] flex items-center justify-center shadow-sm"
                              >
                                <Heart
                                  className={`h-4 w-4 ${
                                    isSaved
                                      ? "fill-[#C9A45C] text-[#C9A45C]"
                                      : "text-[#0f3d26]"
                                  }`}
                                />
                              </button>
                            </div>
                            <div className="sm:col-span-3 p-6 flex flex-col justify-between">
                              <div>
                                <div className="flex flex-wrap items-center gap-1.5">
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#e6efea] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#0f3d26]">
                                    <BadgeCheck className="h-3 w-3 text-[#0f3d26]" />
                                    <span>Verified by Admin</span>
                                  </span>
                                  <span className="rounded-full bg-[#FAF5E8] border border-[#C9A45C]/40 px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#8b6534]">
                                    {itemTradeType}
                                  </span>
                                </div>

                                <h3 className="mt-2.5 font-serif text-xl text-[#0f3d26]">
                                  {item.title}
                                </h3>
                                <p className="mt-1 text-[11px] font-semibold text-[#8b6534] flex flex-wrap items-center gap-x-3 gap-y-1">
                                  <span>By {item.sellerName}</span>
                                  {item.originLocation && (
                                    <span className="inline-flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {item.originLocation}
                                    </span>
                                  )}
                                </p>
                                <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                                  {item.description}
                                </p>

                                <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                                  <div className="rounded-lg bg-[#FBF8F1] border border-[#EDE5D5] px-2.5 py-1.5">
                                    <span className="text-[#8b6534] font-bold block text-[10px] uppercase">
                                      Quantity
                                    </span>
                                    <span className="font-semibold text-[#0f3d26]">
                                      {item.quantityLabel || "1 Batch"}
                                    </span>
                                  </div>
                                  <div className="rounded-lg bg-[#FBF8F1] border border-[#EDE5D5] px-2.5 py-1.5">
                                    <span className="text-[#8b6534] font-bold block text-[10px] uppercase">
                                      Purity / Grade
                                    </span>
                                    <span className="font-semibold text-[#0f3d26]">
                                      {item.purityStandard ||
                                        "Organic Verified"}
                                    </span>
                                  </div>
                                </div>

                                {item.wantsInReturn && (
                                  <div className="mt-2.5 rounded-xl bg-[#f0f6f2] px-3 py-2 text-xs text-[#0f3d26]">
                                    <span className="font-bold">
                                      Wants in Return:
                                    </span>{" "}
                                    {item.wantsInReturn}
                                  </div>
                                )}
                              </div>

                              <div className="mt-5 pt-4 border-t border-[#EDE5D5] space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-serif text-lg font-bold text-[#0f3d26]">
                                    Value ₹
                                    {Number(item.price || 0).toLocaleString(
                                      "en-IN",
                                    )}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setInspectBarterItem(item)}
                                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8b6534] hover:text-[#0f3d26]"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View Spec</span>
                                  </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {canBuy && (
                                    <CommonButton
                                      onClick={() => addToCart(item)}
                                      label="Buy Now"
                                      className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-[#FAF5E8] !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
                                    />
                                  )}
                                  {canBarter &&
                                    (isOwnItem ? (
                                      <span className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#e6efea] px-6 py-2.5 text-xs font-bold text-[#0f3d26]">
                                        <PackageCheck className="h-3.5 w-3.5" />
                                        <span>Your Live Listing</span>
                                      </span>
                                    ) : (
                                      <CommonButton
                                        onClick={() =>
                                          handleOpenBarterOffer(item)
                                        }
                                        label="Propose Exchange"
                                        className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
                                      />
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </SpotlightBentoCard>
                      );
                    })}
                  </div>
                </div>

                {currentUser &&
                  (myIncomingBarterOffers.length > 0 ||
                    mySentBarterOffers.length > 0) && (
                    <div className="rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] p-6 space-y-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8b6534]">
                          Live Exchange Desk
                        </p>
                        <h3 className="font-serif text-xl text-[#0f3d26]">
                          Incoming & Proposed Barter Exchanges
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {myIncomingBarterOffers.map((offer) => (
                          <div
                            key={offer.id}
                            className="rounded-2xl border border-[#C9A45C]/45 bg-[#FAF5E8]/60 p-5 space-y-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded-full bg-[#0f3d26] px-3 py-1 text-[10px] font-bold uppercase text-[#FAF5E8]">
                                Incoming Offer · {offer.status}
                              </span>
                              <span className="text-xs font-bold text-[#8b6534]">
                                From {offer.proposerName}
                              </span>
                            </div>
                            <h4 className="font-serif text-lg text-[#0f3d26]">
                              For: {offer.listingTitle}
                            </h4>
                            <p className="text-xs text-[#0f3d26]">
                              <strong>Offered in Return:</strong>{" "}
                              {offer.offeredItem} (
                              {offer.offeredQuantity || "Standard"} · Est. ₹
                              {offer.estimatedValue || "Fair Swap"})
                            </p>
                            <p className="text-xs text-[#0f3d26]/75 leading-relaxed">
                              {offer.message}
                            </p>
                            <p className="text-[11px] text-[#8b6534] font-semibold">
                              Fulfillment:{" "}
                              {offer.fulfillmentMode || "Direct Pickup"} · Date:{" "}
                              {offer.proposedDate || "Flexible"} ·{" "}
                              {offer.contactPhone}
                            </p>
                            {offer.status === "pending" && (
                              <div className="flex flex-wrap gap-2 pt-2 border-t border-[#EDE5D5]">
                                <button
                                  type="button"
                                  onClick={() =>
                                    decideBarterOffer(offer.id, "accepted")
                                  }
                                  className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                                >
                                  Accept Exchange
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    decideBarterOffer(offer.id, "declined")
                                  }
                                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#8b6534]/40 px-6 py-2.5 text-xs font-bold text-[#8b6534] hover:bg-[#FAF5E8] transition-colors"
                                >
                                  Decline
                                </button>
                              </div>
                            )}
                          </div>
                        ))}

                        {mySentBarterOffers.map((offer) => (
                          <div
                            key={offer.id}
                            className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-5 space-y-2.5"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase text-[#0f3d26]">
                                Sent Proposal · {offer.status}
                              </span>
                              <span className="text-xs font-semibold text-[#8b6534]">
                                {offer.proposedDate || "Scheduled"}
                              </span>
                            </div>
                            <h4 className="font-serif text-lg text-[#0f3d26]">
                              Target: {offer.listingTitle}
                            </h4>
                            <p className="text-xs text-[#0f3d26]">
                              <strong>Your Offer:</strong> {offer.offeredItem} (
                              {offer.offeredQuantity || "Batch"})
                            </p>
                            <p className="text-xs text-[#0f3d26]/75">
                              {offer.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
        </motion.div>
      </section>

      <V2ModalShell
        open={Boolean(bookingService)}
        onClose={() => setBookingService(null)}
        badge={bookingService?.category || "Clinical Intake & Booking"}
        title={`Book ${bookingService?.title || "Service"}`}
        subtitle={`${bookingService?.provider || "JYA Vaidya Network"} · Member discount ${discountPercent}% applied automatically.`}
        maxWidthClass="3xl"
      >
        {bookingService && (
          <form
            onSubmit={bookingForm.handleSubmit(onSubmitBooking)}
            className="space-y-5"
          >
            <V2FormSection
              step="01"
              title="Patient Demographics & Contact"
              hint="E-Prescription Identity"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="name"
                    label="Patient Full Name *"
                    control={bookingForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={bookingForm.formState.errors.name}
                  />
                  <FieldError error={bookingForm.formState.errors.name} />
                </div>
                <div>
                  <InputField
                    name="age"
                    label="Patient Age *"
                    type="number"
                    control={bookingForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={bookingForm.formState.errors.age}
                  />
                  <FieldError error={bookingForm.formState.errors.age} />
                </div>
                <div>
                  <DropdownField
                    name="gender"
                    control={bookingForm.control}
                    dataArray={GENDER_OPTIONS}
                    placeholder="Patient Gender *"
                    error={bookingForm.formState.errors.gender}
                  />
                  <FieldError error={bookingForm.formState.errors.gender} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <InputField
                    name="phone"
                    label="Mobile / WhatsApp *"
                    control={bookingForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={bookingForm.formState.errors.phone}
                  />
                  <FieldError error={bookingForm.formState.errors.phone} />
                </div>
                <div>
                  <InputField
                    name="email"
                    label="Email for E-Prescription *"
                    control={bookingForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={bookingForm.formState.errors.email}
                  />
                  <FieldError error={bookingForm.formState.errors.email} />
                </div>
                <div>
                  <InputField
                    name="city"
                    label="Patient City *"
                    control={bookingForm.control}
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={bookingForm.formState.errors.city}
                  />
                  <FieldError error={bookingForm.formState.errors.city} />
                </div>
              </div>
            </V2FormSection>

            <V2FormSection
              step="02"
              title="Choose Date & Open Appointment Slot"
              hint="Live Vaidya Roster"
            >
              <div>
                <RadioField
                  name="consultationMode"
                  label="Consultation Format *"
                  control={bookingForm.control}
                  dataArray={CONSULTATION_MODES}
                  error={bookingForm.formState.errors.consultationMode}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <DatePickerField
                    name="preferredDate"
                    label="Preferred Date *"
                    control={bookingForm.control}
                    disablePast
                    error={bookingForm.formState.errors.preferredDate}
                  />
                  <FieldError
                    error={bookingForm.formState.errors.preferredDate}
                  />
                </div>
                <div>
                  <DropdownField
                    name="doshaCategory"
                    control={bookingForm.control}
                    dataArray={DOSHA_CONCERN_CATEGORIES}
                    placeholder="Dosha / Clinical Focus *"
                    error={bookingForm.formState.errors.doshaCategory}
                  />
                  <FieldError
                    error={bookingForm.formState.errors.doshaCategory}
                  />
                </div>
              </div>

              <V2SlotSelector
                label="Available Vaidya Slots *"
                value={watchedBookingSlot}
                onChange={(val) =>
                  bookingForm.setValue("slot", val, { shouldValidate: true })
                }
                slots={CONSULTATION_SLOT_CARDS}
                error={bookingForm.formState.errors.slot}
              />
            </V2FormSection>

            <V2FormSection
              step="03"
              title="Symptoms, Ongoing Medicine & Consent"
              hint="Confidential Vaidya Review"
            >
              <div>
                <InputField
                  name="medications"
                  label="Current Medications, Chronic Conditions or Allergies (Optional)"
                  control={bookingForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                />
              </div>

              <div>
                <InputArea
                  name="concern"
                  label="Detailed Symptoms, Duration & Treatment Goal *"
                  placeholder="Describe symptoms, how long they have lasted, digestion/sleep issues..."
                  control={bookingForm.control}
                  minRows={3}
                />
                <FieldError error={bookingForm.formState.errors.concern} />
              </div>

              <div>
                <CheckBoxField
                  name="clinicalConsent"
                  control={bookingForm.control}
                  label="I authorize JYA verified Vaidyas to review my intake details confidentially."
                  className="text-[#0f3d26] text-xs"
                />
                <FieldError
                  error={bookingForm.formState.errors.clinicalConsent}
                />
              </div>
            </V2FormSection>

            <div className="rounded-2xl border border-[#C9A45C]/35 bg-[#FBF8F1] p-4 flex items-center justify-between text-xs">
              <span className="font-semibold text-[#0f3d26]">
                Payable Fee ({discountPercent}% Discount Applied)
              </span>
              <span className="font-serif text-lg font-bold text-[#0f3d26]">
                ₹
                {Math.round(
                  bookingService.price * (1 - discountPercent / 100),
                ).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <CommonButton
                type="button"
                onClick={() => setBookingService(null)}
                label="Cancel"
                className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
              />
              <CommonButton
                type="submit"
                label="Confirm Clinical Booking"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </form>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={digitalEnquiryOpen}
        onClose={() => setDigitalEnquiryOpen(false)}
        badge="Global AyurX Digital"
        title="Clinic Solutions, Ayurmitra & HRMS Demo Request"
        subtitle="Provide clinic details so our clinical engineering team configures a live tailored demonstration."
        maxWidthClass="2xl"
      >
        <form
          onSubmit={digitalForm.handleSubmit(onSubmitDigitalEnquiry)}
          className="space-y-4"
        >
          <V2FormSection
            step="01"
            title="Clinic & Practitioner Identity"
            hint="Onboarding Profile"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="name"
                  label="Doctor / Director Name *"
                  control={digitalForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={digitalForm.formState.errors.name}
                />
                <FieldError error={digitalForm.formState.errors.name} />
              </div>
              <div>
                <InputField
                  name="clinicName"
                  label="Clinic / Hospital Name *"
                  control={digitalForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={digitalForm.formState.errors.clinicName}
                />
                <FieldError error={digitalForm.formState.errors.clinicName} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <DropdownField
                  name="role"
                  control={digitalForm.control}
                  dataArray={CLINIC_ROLES}
                  placeholder="Role *"
                  error={digitalForm.formState.errors.role}
                />
                <FieldError error={digitalForm.formState.errors.role} />
              </div>
              <div>
                <InputField
                  name="phone"
                  label="Phone Number *"
                  control={digitalForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={digitalForm.formState.errors.phone}
                />
                <FieldError error={digitalForm.formState.errors.phone} />
              </div>
              <div>
                <InputField
                  name="city"
                  label="City & State *"
                  control={digitalForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={digitalForm.formState.errors.city}
                />
                <FieldError error={digitalForm.formState.errors.city} />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Software Scope & Clinic Requirements"
            hint="Tailored Demo"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <InputField
                  name="email"
                  label="Official Email *"
                  control={digitalForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={digitalForm.formState.errors.email}
                />
                <FieldError error={digitalForm.formState.errors.email} />
              </div>
              <div>
                <DropdownField
                  name="teamSize"
                  control={digitalForm.control}
                  dataArray={CLINIC_TEAM_SIZES}
                  placeholder="Staff Size *"
                  error={digitalForm.formState.errors.teamSize}
                />
                <FieldError error={digitalForm.formState.errors.teamSize} />
              </div>
              <div>
                <DropdownField
                  name="interest"
                  control={digitalForm.control}
                  dataArray={DIGITAL_SOL_INTERESTS}
                  placeholder="Software Module *"
                  error={digitalForm.formState.errors.interest}
                />
                <FieldError error={digitalForm.formState.errors.interest} />
              </div>
            </div>

            <div>
              <InputArea
                name="message"
                label="Clinic Workflow Requirements *"
                placeholder="Tell us about patient volume, Panchakarma scheduling, or HRMS workflows..."
                control={digitalForm.control}
                minRows={3}
              />
              <FieldError error={digitalForm.formState.errors.message} />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setDigitalEnquiryOpen(false)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Request Tailored Demo"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(barterOfferItem)}
        onClose={() => setBarterOfferItem(null)}
        badge="Barter Exchange Proposal"
        title={`Propose Exchange for ${barterOfferItem?.title || "Item"}`}
        subtitle={`Owner (${barterOfferItem?.sellerName || "Member"}) prefers: ${barterOfferItem?.wantsInReturn || "Comparable organic harvest"}`}
        maxWidthClass="3xl"
      >
        <form
          onSubmit={barterOfferForm.handleSubmit(onSubmitBarterOffer)}
          className="space-y-4"
        >
          <V2FormSection
            step="01"
            title="Your Offered Goods, Condition & Fair Valuation"
            hint="Mutual Exchange"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <InputField
                  name="offeredItem"
                  label="What Item / Harvest Are You Offering? *"
                  control={barterOfferForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={barterOfferForm.formState.errors.offeredItem}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.offeredItem}
                />
              </div>
              <div>
                <InputField
                  name="estimatedValue"
                  label="Est. Value (₹) *"
                  type="number"
                  control={barterOfferForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={barterOfferForm.formState.errors.estimatedValue}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.estimatedValue}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <DropdownField
                  name="offeredCondition"
                  control={barterOfferForm.control}
                  dataArray={CONDITION_GRADES}
                  placeholder="Condition Grade *"
                  error={barterOfferForm.formState.errors.offeredCondition}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.offeredCondition}
                />
              </div>
              <div>
                <InputField
                  name="offeredQuantity"
                  label="Offered Quantity & Packaging *"
                  control={barterOfferForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={barterOfferForm.formState.errors.offeredQuantity}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.offeredQuantity}
                />
              </div>
              <div>
                <InputField
                  name="pickupCity"
                  label="Your Pickup / Dispatch City *"
                  control={barterOfferForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={barterOfferForm.formState.errors.pickupCity}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.pickupCity}
                />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Handover Method, Slot, Phone & Purity Notes"
            hint="Direct Coordination"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <DropdownField
                  name="fulfillmentMode"
                  control={barterOfferForm.control}
                  dataArray={FULFILLMENT_MODES}
                  placeholder="Exchange Fulfillment *"
                  error={barterOfferForm.formState.errors.fulfillmentMode}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.fulfillmentMode}
                />
              </div>
              <div>
                <DatePickerField
                  name="proposedDate"
                  label="Proposed Exchange Date *"
                  control={barterOfferForm.control}
                  disablePast
                  error={barterOfferForm.formState.errors.proposedDate}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.proposedDate}
                />
              </div>
              <div>
                <InputField
                  name="contactPhone"
                  label="Coordinator Mobile / WhatsApp *"
                  control={barterOfferForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={barterOfferForm.formState.errors.contactPhone}
                />
                <FieldError
                  error={barterOfferForm.formState.errors.contactPhone}
                />
              </div>
            </div>

            <div>
              <InputArea
                name="message"
                label="Purity Notes & Pickup Details *"
                placeholder="Describe harvest freshness, storage, and pickup coordination..."
                control={barterOfferForm.control}
                minRows={3}
              />
              <FieldError error={barterOfferForm.formState.errors.message} />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setBarterOfferItem(null)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Send Barter Exchange Proposal"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>

      <V2ModalShell
        open={listBarterOpen}
        onClose={() => {
          setListBarterOpen(false);
          setEditingBarterItem(null);
        }}
        badge={
          editingBarterItem
            ? "Edit & Resubmit Listing"
            : "Seller Submission -> Admin Verification"
        }
        title={
          editingBarterItem
            ? `Update & Resubmit: ${editingBarterItem.title}`
            : "Add Item to Sell or Barter on JYA"
        }
        subtitle="Submitted items go directly to Admin Verification first and remain private until approved, after which all community members can buy or exchange."
        maxWidthClass="3xl"
      >
        <form
          onSubmit={listBarterForm.handleSubmit(onSubmitListBarter)}
          className="space-y-4"
        >
          {editingBarterItem?.rejectionReason && (
            <div className="rounded-2xl border border-[#C9A45C] bg-[#FAF5E8] p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-[#8b6534] shrink-0 mt-0.5" />
              <div className="text-xs text-[#071E14]">
                <p className="font-bold uppercase tracking-wider text-[#8b6534]">
                  Admin Feedback to Address
                </p>
                <p className="mt-1">{editingBarterItem.rejectionReason}</p>
              </div>
            </div>
          )}

          <V2FormSection
            step="01"
            title="Item Identity, Listing Intent & Authenticity Grade"
            hint="Required Spec"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="title"
                  label="Item / Goods Title *"
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.title}
                />
                <FieldError error={listBarterForm.formState.errors.title} />
              </div>
              <div>
                <DropdownField
                  name="category"
                  control={listBarterForm.control}
                  dataArray={BARTER_CATEGORIES}
                  placeholder="Goods Category *"
                  error={listBarterForm.formState.errors.category}
                />
                <FieldError error={listBarterForm.formState.errors.category} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
              <div className="sm:col-span-3">
                <RadioField
                  name="tradeType"
                  label="How Can Other Users Acquire This Item? *"
                  control={listBarterForm.control}
                  dataArray={TRADE_TYPES}
                  error={listBarterForm.formState.errors.tradeType}
                />
              </div>
              <div className="sm:col-span-2">
                <DropdownField
                  name="conditionGrade"
                  control={listBarterForm.control}
                  dataArray={CONDITION_GRADES}
                  placeholder="Condition / Authenticity Grade *"
                  error={listBarterForm.formState.errors.conditionGrade}
                />
                <FieldError
                  error={listBarterForm.formState.errors.conditionGrade}
                />
              </div>
              <div>
                <DropdownField
                  name="purityStandard"
                  control={listBarterForm.control}
                  dataArray={PURITY_STANDARDS}
                  placeholder="Purity Standard *"
                  error={listBarterForm.formState.errors.purityStandard}
                />
                <FieldError
                  error={listBarterForm.formState.errors.purityStandard}
                />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Batch Quantity, Provenance, PIN Code & Contact"
            hint="Admin Logistics Audit"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <InputField
                  name="quantityLabel"
                  label="Available Qty & Unit *"
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.quantityLabel}
                />
                <FieldError
                  error={listBarterForm.formState.errors.quantityLabel}
                />
              </div>
              <div>
                <InputField
                  name="shelfLife"
                  label="Shelf Life / Durability *"
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.shelfLife}
                />
                <FieldError error={listBarterForm.formState.errors.shelfLife} />
              </div>
              <div>
                <DatePickerField
                  name="harvestDate"
                  label="Prep / Harvest Date *"
                  control={listBarterForm.control}
                  disableFuture
                  error={listBarterForm.formState.errors.harvestDate}
                />
                <FieldError
                  error={listBarterForm.formState.errors.harvestDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <InputField
                  name="originLocation"
                  label="Origin Farm / City *"
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.originLocation}
                />
                <FieldError
                  error={listBarterForm.formState.errors.originLocation}
                />
              </div>
              <div>
                <InputField
                  name="pinCode"
                  label="6-Digit Origin PIN Code *"
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.pinCode}
                />
                <FieldError error={listBarterForm.formState.errors.pinCode} />
              </div>
              <div>
                <InputField
                  name="sellerPhone"
                  label="Seller Mobile / WhatsApp *"
                  control={listBarterForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.sellerPhone}
                />
                <FieldError
                  error={listBarterForm.formState.errors.sellerPhone}
                />
              </div>
            </div>

            <div>
              <InputField
                name="packagingDetails"
                label="Packaging Material & Sealing Details *"
                control={listBarterForm.control}
                shrink
                InputLabelProps={{ shrink: true }}
                error={listBarterForm.formState.errors.packagingDetails}
              />
              <FieldError
                error={listBarterForm.formState.errors.packagingDetails}
              />
            </div>
          </V2FormSection>

          <V2FormSection
            step="03"
            title="Pricing, Exchange Preference, Logistics & Product Image Upload"
            hint="Goes Live Post-Approval"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="valueLabel"
                  label={
                    watchedListingTradeType === "Direct Sale"
                      ? "Selling Price (₹) *"
                      : "Selling / Estimated Barter Value (₹) *"
                  }
                  type="number"
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.valueLabel}
                />
                <FieldError
                  error={listBarterForm.formState.errors.valueLabel}
                />
              </div>
              <div>
                <InputField
                  name="want"
                  label={
                    watchedListingTradeType === "Direct Sale"
                      ? "Return Note (Optional for Direct Sale)"
                      : "Preferred Exchange Goods *"
                  }
                  control={listBarterForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={listBarterForm.formState.errors.want}
                />
                <FieldError error={listBarterForm.formState.errors.want} />
              </div>
            </div>

            <RadioField
              name="exchangeMode"
              label="Exchange / Fulfillment Logistics Mode *"
              control={listBarterForm.control}
              dataArray={EXCHANGE_MODES}
              error={listBarterForm.formState.errors.exchangeMode}
            />

            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0f3d26]">
                  Upload Product / Harvest Photo *
                </p>
                {uploadedImageName && (
                  <span className="rounded-full bg-[#e6efea] px-3 py-0.5 text-[11px] font-semibold text-[#0f3d26]">
                    {uploadedImageName}
                  </span>
                )}
              </div>

              {watchedListingImageUrl ? (
                <div className="rounded-2xl border border-[#C9A45C]/50 bg-[#FFFDF9] p-3 flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={watchedListingImageUrl}
                    alt="Uploaded item preview"
                    className="h-32 w-full sm:w-44 rounded-xl object-cover border border-[#EDE5D5]"
                  />
                  <div className="flex-1 space-y-2 text-xs text-[#0f3d26]/80">
                    <p className="font-serif text-base font-bold text-[#0f3d26]">
                      Product Photo Attached
                    </p>
                    <p>
                      This photo will be inspected by JYA Admin before going
                      live to other community users.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <label className="cursor-pointer inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors">
                        <Upload className="h-3.5 w-3.5 text-[#C9A45C]" />
                        <span>Replace Photo</span>
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/webp,image/jpg"
                          onChange={handleBarterImageUpload}
                          className="hidden"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          listBarterForm.setValue("imageUrl", "", {
                            shouldValidate: true,
                          });
                          setUploadedImageName("");
                        }}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#8b6534]/40 bg-[#FAF5E8] px-6 py-2.5 text-xs font-bold text-[#8b6534] hover:bg-[#EDE5D5] transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#C9A45C]/70 bg-[#FAF5E8]/60 p-6 text-center hover:border-[#0f3d26] hover:bg-[#e6efea]/50 transition-all">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0f3d26] text-[#C9A45C] shadow-sm">
                    <ImagePlus className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#0f3d26]">
                    Click to Upload Clear Product Image
                  </p>
                  <p className="mt-1 text-xs text-[#0f3d26]/70">
                    Supports JPG, PNG or WEBP · Automatically optimized for
                    quick review
                  </p>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/jpg"
                    onChange={handleBarterImageUpload}
                    className="hidden"
                  />
                </label>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                  Or Quick Sample Photo:
                </span>
                {BARTER_PHOTO_PRESETS.map((preset) => (
                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => {
                      listBarterForm.setValue("imageUrl", preset.image, {
                        shouldValidate: true,
                      });
                      setUploadedImageName(preset.label);
                    }}
                    className="rounded-full border border-[#EDE5D5] bg-[#FFFDF9] px-3 py-1 text-[10px] font-semibold text-[#0f3d26] hover:border-[#C9A45C]"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <FieldError error={listBarterForm.formState.errors.imageUrl} />
            </div>

            <div>
              <InputArea
                name="description"
                label="Purity, Ingredients, Processing & Storage Notes *"
                placeholder="Share preparation method, zero-chemical sourcing, and storage guidance for Admin inspection..."
                control={listBarterForm.control}
                minRows={3}
              />
              <FieldError error={listBarterForm.formState.errors.description} />
            </div>

            <div>
              <CheckBoxField
                name="acceptPolicy"
                control={listBarterForm.control}
                label="I confirm these goods are chemical-free and understand my item stays pending until verified by a JYA Admin before appearing to other users."
                className="text-[#0f3d26] text-xs"
              />
              <FieldError
                error={listBarterForm.formState.errors.acceptPolicy}
              />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => {
                setListBarterOpen(false);
                setEditingBarterItem(null);
              }}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label={
                editingBarterItem
                  ? "Resubmit to Admin Queue"
                  : "Submit for Admin Verification"
              }
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(inspectBarterItem)}
        onClose={() => setInspectBarterItem(null)}
        badge={
          inspectBarterItem?.status === "approved"
            ? "Admin Verified Listing Spec"
            : "Pending Admin Verification Spec"
        }
        title={inspectBarterItem?.title || "Item Specification"}
        subtitle={`${inspectBarterItem?.category || "Barter Goods"} · Submitted by ${inspectBarterItem?.sellerName || "Member"}`}
        maxWidthClass="2xl"
      >
        {inspectBarterItem && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4">
              <img
                src={inspectBarterItem.image}
                alt={inspectBarterItem.title}
                className="h-32 w-full rounded-xl object-cover border border-[#EDE5D5]"
              />
              <div className="sm:col-span-2 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#0f3d26] px-3 py-1 text-[10px] font-bold uppercase text-[#FAF5E8]">
                    Status: {inspectBarterItem.status}
                  </span>
                  <span className="rounded-full bg-[#FAF5E8] border border-[#C9A45C] px-3 py-1 text-[10px] font-bold uppercase text-[#8b6534]">
                    {inspectBarterItem.tradeType || "Sell or Barter"}
                  </span>
                </div>
                <p className="font-serif text-xl font-bold text-[#0f3d26]">
                  Listed Value: ₹
                  {Number(inspectBarterItem.price || 0).toLocaleString("en-IN")}
                </p>
                <p className="text-xs text-[#0f3d26]/80 leading-relaxed">
                  {inspectBarterItem.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                [
                  "Seller Contact",
                  inspectBarterItem.sellerPhone || "Verified Member",
                ],
                [
                  "Origin & PIN",
                  `${inspectBarterItem.originLocation || "Pune"} ${inspectBarterItem.pinCode ? `(${inspectBarterItem.pinCode})` : ""}`,
                ],
                [
                  "Condition Grade",
                  inspectBarterItem.conditionGrade || "Fresh Batch",
                ],
                [
                  "Purity Standard",
                  inspectBarterItem.purityStandard || "Organic Verified",
                ],
                ["Quantity", inspectBarterItem.quantityLabel || "1 Batch"],
                ["Shelf Life", inspectBarterItem.shelfLife || "Standard"],
                [
                  "Harvest / Prep Date",
                  inspectBarterItem.harvestDate || "Current Season",
                ],
                [
                  "Packaging",
                  inspectBarterItem.packagingDetails || "Food-grade packaging",
                ],
                ["Logistics Mode", inspectBarterItem.exchangeMode || "Either"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="rounded-xl border border-[#EDE5D5] bg-[#FFFDF9] px-3.5 py-2.5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                    {k}
                  </p>
                  <p className="mt-0.5 font-semibold text-[#0f3d26]">{v}</p>
                </div>
              ))}
            </div>

            {inspectBarterItem.wantsInReturn && (
              <div className="rounded-2xl bg-[#f0f6f2] border border-[#0f3d26]/15 p-4 text-xs text-[#0f3d26]">
                <strong className="uppercase tracking-wider text-[10px] block text-[#8b6534]">
                  Seeking in Barter Return
                </strong>
                <p className="mt-1 font-semibold">
                  {inspectBarterItem.wantsInReturn}
                </p>
              </div>
            )}

            {inspectBarterItem.verifiedBy && (
              <div className="rounded-2xl bg-[#e6efea] p-3.5 text-xs text-[#0f3d26] flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[#0f3d26]" />
                <span>
                  Verified by <strong>{inspectBarterItem.verifiedBy}</strong> on{" "}
                  {inspectBarterItem.verifiedAt || "Review Complete"}
                </span>
              </div>
            )}

            {inspectBarterItem.rejectionReason && (
              <div className="rounded-2xl bg-[#FAF5E8] border border-[#8b6534]/40 p-3.5 text-xs text-[#071E14]">
                <strong className="text-[#8b6534]">Returned Reason:</strong>{" "}
                {inspectBarterItem.rejectionReason}
              </div>
            )}

            <div className="pt-2 flex flex-wrap justify-between items-center gap-3">
              <div className="flex flex-wrap gap-2">
                {inspectBarterItem.sellerPhone && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FBF8F1] border border-[#EDE5D5] px-3 py-1.5 text-xs font-semibold text-[#0f3d26]">
                    <Phone className="h-3.5 w-3.5 text-[#8b6534]" />
                    <span>{inspectBarterItem.sellerPhone}</span>
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {isVerifierAdmin && inspectBarterItem.status === "pending" && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleOpenRejectModal(inspectBarterItem)}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#8b6534]/40 bg-[#FAF5E8] px-6 py-2.5 text-xs font-bold text-[#8b6534] hover:bg-[#EDE5D5] transition-colors"
                    >
                      Reject with Reason
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        decideListingBySuperAdmin(
                          inspectBarterItem.id,
                          "approved",
                        );
                        setInspectBarterItem(null);
                      }}
                      className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                    >
                      Verify & Approve Live
                    </button>
                  </>
                )}
                <CommonButton
                  type="button"
                  onClick={() => setInspectBarterItem(null)}
                  label="Cancel / Close"
                  className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
                />
              </div>
            </div>
          </div>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(rejectTargetItem)}
        onClose={() => setRejectTargetItem(null)}
        badge="Admin Verification Feedback"
        title={`Return "${rejectTargetItem?.title || "Item"}" to Seller`}
        subtitle="Provide clear corrective instructions so the seller can edit and resubmit this item for verification."
        maxWidthClass="lg"
      >
        <form
          onSubmit={rejectReasonForm.handleSubmit(onSubmitRejectListing)}
          className="space-y-4"
        >
          <div>
            <InputArea
              name="reason"
              label="Verification Feedback / Rejection Reason *"
              placeholder="e.g., Clarify packaging seal type or specify exact batch harvest weight and shelf life."
              control={rejectReasonForm.control}
              minRows={3}
            />
            <FieldError error={rejectReasonForm.formState.errors.reason} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <CommonButton
              type="button"
              onClick={() => setRejectTargetItem(null)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Return to Seller"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#8b6534] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>
    </div>
  );
}
