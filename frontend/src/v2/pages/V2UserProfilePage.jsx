import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  CreditCard,
  Edit3,
  Heart,
  LayoutDashboard,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import { Counter, ease } from "../../components/membership/MotionKit";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection } from "../components/V2FormControls";
import { SpotlightBentoCard } from "../components/V2InteractiveComponents";
import { useV2Store } from "../context/v2Context";
import { v2ProfileUpdateSchema } from "../validation/v2Schemas";

export default function V2UserProfilePage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    getTierInfo,
    getDiscountPercent,
    loginDemoUser,
    updateUserProfile,
    setPendingAuthIntent,
  } = useV2Store();

  const [editOpen, setEditOpen] = useState(false);

  const profileForm = useForm({
    resolver: yupResolver(v2ProfileUpdateSchema),
    defaultValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || currentUser?.enrollmentProfile?.city || "Pune",
      state: currentUser?.enrollmentProfile?.state || "Maharashtra",
      addressLine: currentUser?.enrollmentProfile?.addressLine || "",
      pinCode: currentUser?.enrollmentProfile?.pinCode || "",
      householdSize: currentUser?.enrollmentProfile?.householdSize || "Couple (2 Members)",
      primaryFocus:
        currentUser?.enrollmentProfile?.primaryFocus ||
        currentUser?.primaryInterest ||
        "Preventive Longevity",
      emergencyName: currentUser?.enrollmentProfile?.emergencyName || "",
      emergencyPhone: currentUser?.enrollmentProfile?.emergencyPhone || "",
      goal: currentUser?.enrollmentProfile?.goal || "",
    },
  });

  if (!currentUser) {
    return (
      <div className="min-h-[82vh] bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-8 2xl:px-14 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="w-full rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-8 sm:p-10 text-center text-[#FAF5E8] shadow-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A45C]" />
            <span>User Profile Access</span>
          </span>
          <h1 className="mt-4 font-serif text-3xl sm:text-4xl text-[#FAF5E8]">
            Sign In to View Full User Profile
          </h1>
          <p className="mt-3 text-sm text-[#FAF5E8]/85 leading-relaxed">
            Access your personal KYC details, dispatch address, membership tier privilege, constitutional health score, and activity history.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <CommonButton
              onClick={() => loginDemoUser()}
              label="Instant Demo Profile (Aarav)"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
            />
            <CommonButton
              onClick={() => {
                setPendingAuthIntent({
                  type: "navigate",
                  returnTo: "/v2/profile",
                });
                navigate("/v2/login");
              }}
              label="Open Sign In Portal"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#E7D7B5]/45 !bg-white/10 !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
            />
          </div>
        </motion.div>
      </div>
    );
  }

  const activeTier = getTierInfo(currentUser.membershipTier);
  const discountPercent = getDiscountPercent();
  const profile = currentUser.enrollmentProfile || {};

  const myBookings = state.bookings.filter((b) => b.userId === currentUser.id);
  const myOrders = state.orders.filter((o) => o.userId === currentUser.id);
  const myReports = state.muktikhelaReports.filter(
    (r) => r.userId === currentUser.id
  );
  const myAcademy = state.academyApplications.filter(
    (a) => a.userId === currentUser.id
  );
  const myEnquiries = state.enquiries.filter(
    (e) => e.userId === currentUser.id || e.name === currentUser.name
  );
  const myEvents = state.eventRegistrations.filter(
    (r) => r.userId === currentUser.id
  );
  const myWishlist = state.wishlist.filter((w) => w.userId === currentUser.id);

  const latestReport = myReports[0] || null;
  const totalSaved =
    myOrders.reduce((acc, o) => acc + (Number(o.discountAmount) || 0), 0) +
    myBookings.reduce(
      (acc, b) =>
        acc + Math.max(0, (Number(b.basePrice) || 0) - (Number(b.finalPrice) || 0)),
      0
    );

  const initials = currentUser.name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleOpenEdit = () => {
    profileForm.reset({
      name: currentUser.name || "",
      phone: currentUser.phone || "",
      email: currentUser.email || "",
      city: currentUser.city || profile.city || "Pune",
      state: profile.state || "Maharashtra",
      addressLine: profile.addressLine || "",
      pinCode: profile.pinCode || "",
      householdSize: profile.householdSize || "Couple (2 Members)",
      primaryFocus:
        profile.primaryFocus ||
        currentUser.primaryInterest ||
        "Preventive Longevity",
      emergencyName: profile.emergencyName || "",
      emergencyPhone: profile.emergencyPhone || "",
      goal: profile.goal || "",
    });
    setEditOpen(true);
  };

  const onSaveProfile = (values) => {
    updateUserProfile(values);
    setEditOpen(false);
  };

  const statCards = [
    {
      label: "Total Savings",
      value: totalSaved,
      prefix: "₹",
      note: `${discountPercent}% Tier Privilege`,
      icon: <Award className="h-4 w-4 text-[#C9A45C]" />,
    },
    {
      label: "Appointments & Visits",
      value: myBookings.length,
      note: `${myBookings[0]?.preferredDate || "None Scheduled"}`,
      icon: <Calendar className="h-4 w-4 text-[#C9A45C]" />,
    },
    {
      label: "Herbal E-Shop Orders",
      value: myOrders.length,
      note: `${myWishlist.length} Saved in Wishlist`,
      icon: <Package className="h-4 w-4 text-[#C9A45C]" />,
    },
    {
      label: "Health Zone & BMI",
      value: latestReport ? Number(latestReport.bmi) : 23,
      suffix: " BMI",
      note: latestReport
        ? `Zone ${latestReport.dominantZone?.code} · ${latestReport.dominantZone?.name}`
        : "Pending Assessment",
      icon: <Activity className="h-4 w-4 text-[#C9A45C]" />,
    },
  ];

  const identityDetails = [
    { label: "Full Name", value: currentUser.name },
    { label: "Account ID", value: currentUser.id.toUpperCase() },
    { label: "Registered Email", value: currentUser.email },
    { label: "Mobile / WhatsApp", value: currentUser.phone || "Not set" },
    { label: "Account Tier", value: `${activeTier?.name} (${discountPercent}% Off)` },
    { label: "Portal Role", value: currentUser.role.replace("_", " ").toUpperCase() },
  ];

  const addressDetails = [
    {
      label: "Street / Dispatch Address",
      value: profile.addressLine || "Standard Digital Member Pass",
    },
    { label: "City & State", value: `${currentUser.city || profile.city || "Pune"}, ${profile.state || "Maharashtra"}` },
    { label: "6-Digit PIN Code", value: profile.pinCode || "411038" },
    { label: "Household Coverage", value: profile.householdSize || "Individual Member" },
    { label: "Emergency Contact", value: profile.emergencyName || "Not added yet" },
    { label: "Emergency Phone", value: profile.emergencyPhone || "Not added yet" },
  ];

  const wellnessDetails = [
    {
      label: "Primary Focus",
      value:
        profile.primaryFocus ||
        currentUser.primaryInterest ||
        "Preventive Longevity",
    },
    { label: "Preferred Cohort", value: profile.preferredSeason || "Rainy Academy" },
    { label: "Participation Mode", value: profile.modeOfParticipation || "Online & Residential" },
    {
      label: "Muktikhela Health Zone",
      value: latestReport
        ? `Zone ${latestReport.dominantZone?.code} · ${latestReport.dominantZone?.sanskrit}`
        : "Take 6-Point Check",
    },
    { label: "Sleep Quality", value: latestReport?.sleepHours || "7-8 hrs balanced" },
    { label: "Dietary Pattern", value: latestReport?.dietType || "Fresh Home-Cooked" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F3EB] text-[#0f3d26] py-8 lg:py-12 px-4 sm:px-6 lg:px-8 2xl:px-14">
      <div className="w-full space-y-7">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="relative overflow-hidden rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-7 sm:p-10 text-[#FAF5E8] shadow-2xl"
        >
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-[#C9A45C] bg-[#071E14] font-serif text-3xl font-bold text-[#E7D7B5] shadow-xl">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#E7D7B5]">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>{activeTier?.name}</span>
                  </span>
                  {discountPercent > 0 && (
                    <span className="rounded-full bg-[#C9A45C] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#071E14]">
                      {discountPercent}% Privilege Active
                    </span>
                  )}
                </div>

                <h1 className="mt-2 font-serif text-3xl sm:text-4xl text-[#FAF5E8]">
                  {currentUser.name}
                </h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm text-[#FAF5E8]/85">
                  <span className="inline-flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>{currentUser.email}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>{currentUser.phone || "Add phone"}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#C9A45C]" />
                    <span>
                      {currentUser.city || profile.city || "Pune"}
                      {profile.pinCode ? ` - ${profile.pinCode}` : ""}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={handleOpenEdit}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold text-[#071E14] hover:bg-[#E7D7B5] transition-colors shadow-md"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>Edit Profile Brief</span>
              </button>
              <Link
                to="/v2/dashboard"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E7D7B5]/45 bg-white/10 px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-white/20 transition-colors"
              >
                <LayoutDashboard className="h-3.5 w-3.5 text-[#C9A45C]" />
                <span>User Dashboard</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card, idx) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05, ease }}
              whileHover={{ y: -3 }}
              className="rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] p-5 shadow-sm hover:border-[#C9A45C] transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                  {card.label}
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#0f3d26]">
                  {card.icon}
                </div>
              </div>
              <p className="mt-3 font-serif text-3xl text-[#0f3d26]">
                {card.prefix || ""}
                <Counter value={card.value} suffix={card.suffix || ""} />
              </p>
              <p className="mt-1.5 text-xs font-medium text-[#0f3d26]/80">
                {card.note}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpotlightBentoCard className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#EDE5D5] pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6efea] text-[#0f3d26]">
                <UserCheck className="h-4 w-4 text-[#0f3d26]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                  Section 01
                </p>
                <h2 className="font-serif text-xl text-[#0f3d26]">
                  Identity & Credentials
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              {identityDetails.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#EDE5D5] bg-[#FBF8F1] px-3.5 py-2.5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#0f3d26] break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </SpotlightBentoCard>

          <SpotlightBentoCard className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#EDE5D5] pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6efea] text-[#0f3d26]">
                <Users className="h-4 w-4 text-[#0f3d26]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                  Section 02
                </p>
                <h2 className="font-serif text-xl text-[#0f3d26]">
                  Address & Family Safety
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              {addressDetails.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#EDE5D5] bg-[#FBF8F1] px-3.5 py-2.5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#0f3d26] break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </SpotlightBentoCard>

          <SpotlightBentoCard className="p-6 space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#EDE5D5] pb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e6efea] text-[#0f3d26]">
                <Activity className="h-4 w-4 text-[#0f3d26]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                  Section 03
                </p>
                <h2 className="font-serif text-xl text-[#0f3d26]">
                  Wellness & Constitutional Brief
                </h2>
              </div>
            </div>
            <div className="space-y-3">
              {wellnessDetails.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-[#EDE5D5] bg-[#FBF8F1] px-3.5 py-2.5"
                >
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-[#0f3d26] break-words">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </SpotlightBentoCard>
        </div>

        <SpotlightBentoCard className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D5] pb-4">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="h-5 w-5 text-[#8b6534]" />
              <div>
                <h3 className="font-serif text-2xl text-[#0f3d26]">
                  Personal Wellness Intention & Quick Shortcuts
                </h3>
                <p className="text-xs text-[#0f3d26]/80">
                  {profile.goal ||
                    "Living aligned preventive routines across SwaGrama seasonal cycles, Ayurvedic care, and pure herbal nutrition."}
                </p>
              </div>
            </div>
            <Link
              to="/v2/membership"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
            >
              <CreditCard className="h-3.5 w-3.5 text-[#C9A45C]" />
              <span>Upgrade Membership Tier</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/v2/dashboard"
              className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 hover:border-[#C9A45C] transition-colors flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">
                  Analytics & Records
                </p>
                <p className="mt-0.5 font-serif text-base font-bold text-[#0f3d26]">
                  {myBookings.length} Bookings · {myOrders.length} Orders
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </Link>

            <Link
              to="/v2/muktikhela"
              className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 hover:border-[#C9A45C] transition-colors flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">
                  Health Scorecards
                </p>
                <p className="mt-0.5 font-serif text-base font-bold text-[#0f3d26]">
                  {myReports.length} Vaidya Report(s)
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </Link>

            <Link
              to="/v2/ecosphere"
              className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 hover:border-[#C9A45C] transition-colors flex items-center justify-between"
            >
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">
                  Academy & Events
                </p>
                <p className="mt-0.5 font-serif text-base font-bold text-[#0f3d26]">
                  {myAcademy.length} Admit · {myEvents.length + myEnquiries.length} Queries
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </Link>

            <Link
              to="/v2/wishlist"
              className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 hover:border-[#C9A45C] transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-[#8b6534]" />
                <div>
                  <p className="text-[10px] font-bold uppercase text-[#8b6534]">
                    Saved Wishlist
                  </p>
                  <p className="mt-0.5 font-serif text-base font-bold text-[#0f3d26]">
                    {myWishlist.length} Saved Item(s)
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
            </Link>
          </div>
        </SpotlightBentoCard>
      </div>

      <V2ModalShell
        open={editOpen}
        onClose={() => setEditOpen(false)}
        badge="Update Member Profile"
        title="Edit Personal & Dispatch Details"
        subtitle="Changes sync instantly across your Profile, Executive Dashboard, and pre-filled booking forms."
        maxWidthClass="2xl"
      >
        <form
          onSubmit={profileForm.handleSubmit(onSaveProfile)}
          className="space-y-4"
        >
          <V2FormSection
            step="01"
            title="Identity & Contact"
            hint="Synced Account"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="name"
                  label="Full Name *"
                  control={profileForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={profileForm.formState.errors.name}
                />
                <FieldError error={profileForm.formState.errors.name} />
              </div>
              <div>
                <InputField
                  name="phone"
                  label="Mobile / WhatsApp *"
                  control={profileForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={profileForm.formState.errors.phone}
                />
                <FieldError error={profileForm.formState.errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="email"
                  label="Email Address *"
                  control={profileForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={profileForm.formState.errors.email}
                />
                <FieldError error={profileForm.formState.errors.email} />
              </div>
              <div>
                <InputField
                  name="primaryFocus"
                  label="Primary Wellness Focus"
                  control={profileForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Address, Family Coverage & Emergency Safety"
            hint="Pass Delivery Info"
          >
            <div>
              <InputField
                name="addressLine"
                label="Street / House Address"
                control={profileForm.control}
                shrink
                InputLabelProps={{ shrink: true }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <InputField
                  name="city"
                  label="City *"
                  control={profileForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={profileForm.formState.errors.city}
                />
                <FieldError error={profileForm.formState.errors.city} />
              </div>
              <div>
                <InputField
                  name="state"
                  label="State"
                  control={profileForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <InputField
                  name="pinCode"
                  label="6-Digit PIN Code"
                  control={profileForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={profileForm.formState.errors.pinCode}
                />
                <FieldError error={profileForm.formState.errors.pinCode} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <InputField
                  name="householdSize"
                  label="Household Covered"
                  control={profileForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <InputField
                  name="emergencyName"
                  label="Emergency Contact Name"
                  control={profileForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                />
              </div>
              <div>
                <InputField
                  name="emergencyPhone"
                  label="Emergency Phone"
                  control={profileForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={profileForm.formState.errors.emergencyPhone}
                />
                <FieldError error={profileForm.formState.errors.emergencyPhone} />
              </div>
            </div>

            <div>
              <InputArea
                name="goal"
                label="Personal Health & Learning Intention"
                placeholder="Describe your seasonal wellness or Swagrama learning goal..."
                control={profileForm.control}
                minRows={2}
              />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setEditOpen(false)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Save Profile Changes"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>
    </div>
  );
}
