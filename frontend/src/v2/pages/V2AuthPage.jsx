import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LogIn,
  MailCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  UserPlus,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import DropdownField from "../../components/common/forms/DropdownField";
import CheckBoxField from "../../components/common/forms/CheckBoxField";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection, V2PasswordInput } from "../components/V2FormControls";
import { AnimatedTabDock } from "../components/V2InteractiveComponents";
import { V2_IMAGES } from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import {
  getDropdownValue,
  v2ForgotPasswordEmailSchema,
  v2ForgotPasswordResetSchema,
  v2LoginSchema,
  v2SignUpSchema,
} from "../validation/v2Schemas";

const SIGNUP_INTEREST_OPTIONS = [
  { label: "Preventive Shatayush Wellness & Daily Living", value: "Shatayush Wellness" },
  { label: "Clinical Healthcare Bookings (OPD / IPD / Panchakarma)", value: "Healthcare Bookings" },
  { label: "Seasonal & EcoSphere Gurukul Academy", value: "Academy Admission" },
  { label: "E-Shop Herbal Remedies & Barter Exchange", value: "Marketplace & Barter" },
  { label: "SwaGrama Community Visit & Business Model", value: "SwaGrama Visit" },
];

export default function V2AuthPage() {
  const navigate = useNavigate();
  const {
    state,
    loginUser,
    loginDemoUser,
    signUpUser,
    requestPasswordResetOtp,
    resetUserPassword,
  } = useV2Store();

  const [mode, setMode] = useState("login");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotStep, setForgotStep] = useState("email");
  const [forgotError, setForgotError] = useState("");
  const [otpChallengeInfo, setOtpChallengeInfo] = useState(null);
  const [resendSeconds, setResendSeconds] = useState(0);

  const loginForm = useForm({
    resolver: yupResolver(v2LoginSchema),
    defaultValues: {
      email: "aarav@jnanayogayu.example",
      password: "password123",
    },
  });

  const signUpForm = useForm({
    resolver: yupResolver(v2SignUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      city: "Pune",
      primaryInterest: SIGNUP_INTEREST_OPTIONS[0],
      password: "",
      confirmPassword: "",
      agreeTerms: true,
    },
  });

  const forgotEmailForm = useForm({
    resolver: yupResolver(v2ForgotPasswordEmailSchema),
    defaultValues: {
      email: "aarav@jnanayogayu.example",
    },
  });

  const forgotResetForm = useForm({
    resolver: yupResolver(v2ForgotPasswordResetSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  useEffect(() => {
    if (!forgotOpen || resendSeconds <= 0) return undefined;
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [forgotOpen, resendSeconds]);

  const redirectAfterAuth = (pendingIntent) => {
    const target = pendingIntent?.returnTo || "/v2/dashboard";
    navigate(target);
  };

  const onLoginSubmit = (values) => {
    setAuthError("");
    setAuthSuccess("");
    const result = loginUser({
      identifier: values.email,
      password: values.password,
    });
    if (!result.ok) {
      setAuthError(result.error);
      return;
    }
    redirectAfterAuth(result.pendingIntent);
  };

  const onSignUpSubmit = (values) => {
    setAuthError("");
    setAuthSuccess("");
    const result = signUpUser({
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      primaryInterest: getDropdownValue(values.primaryInterest),
      password: values.password,
    });
    if (!result.ok) {
      setAuthError(result.error);
      return;
    }
    redirectAfterAuth(result.pendingIntent);
  };

  const handleOpenForgotPassword = () => {
    const typedEmail = loginForm.getValues("email") || "aarav@jnanayogayu.example";
    forgotEmailForm.reset({ email: typedEmail });
    forgotResetForm.reset({ otp: "", newPassword: "", confirmNewPassword: "" });
    setForgotError("");
    setOtpChallengeInfo(null);
    setForgotStep("email");
    setResendSeconds(0);
    setForgotOpen(true);
  };

  const onSendResetOtp = (values) => {
    setForgotError("");
    const res = requestPasswordResetOtp(values.email);
    if (!res.ok) {
      setForgotError(res.error);
      return;
    }
    setOtpChallengeInfo(res);
    setForgotStep("verify");
    setResendSeconds(45);
  };

  const handleResendOtp = () => {
    if (!otpChallengeInfo?.email || resendSeconds > 0) return;
    setForgotError("");
    const res = requestPasswordResetOtp(otpChallengeInfo.email);
    if (res.ok) {
      setOtpChallengeInfo(res);
      setResendSeconds(45);
    }
  };

  const onConfirmPasswordReset = (values) => {
    if (!otpChallengeInfo?.email) return;
    setForgotError("");
    const res = resetUserPassword({
      email: otpChallengeInfo.email,
      otp: values.otp,
      newPassword: values.newPassword,
    });
    if (!res.ok) {
      setForgotError(res.error);
      return;
    }
    loginForm.setValue("email", otpChallengeInfo.email);
    loginForm.setValue("password", "");
    setAuthSuccess(
      `Password reset completed for ${otpChallengeInfo.email}. Sign in with your new password.`
    );
    setForgotOpen(false);
  };

  const handleOneClickDemo = () => {
    const result = loginDemoUser();
    redirectAfterAuth(result.pendingIntent);
  };

  const tabs = [
    { id: "login", label: "Sign In", icon: <LogIn className="h-3.5 w-3.5" /> },
    {
      id: "signup",
      label: "Create Free Account",
      icon: <UserPlus className="h-3.5 w-3.5" />,
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-[#071E14] py-12 lg:py-16 px-4 sm:px-6 lg:px-8 2xl:px-14 flex items-center justify-center overflow-hidden">
      <img
        src={V2_IMAGES.dashboardWellnessImg}
        alt="JnanaYogAyu Sanctuary Portal"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-br from-[#071E14]/92 via-[#0D3323]/88 to-[#071E14]/95"
      />

      <div className="relative z-10 w-full rounded-[2rem] border border-[#C9A45C]/35 bg-[#FFFDF9] shadow-[0_32px_90px_rgba(0,0,0,0.45)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-5 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-8 sm:p-10 text-[#FAF5E8] flex flex-col justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E7D7B5]">
              <Sparkles className="h-3.5 w-3.5 text-[#C9A45C]" />
              <span>JYA Member Portal</span>
            </span>

            <h1 className="mt-5 font-serif text-3xl sm:text-4xl leading-[1.12] text-[#FAF5E8]">
              Your Living Wellness & Member Sanctuary
            </h1>

            <p className="mt-3 text-xs sm:text-sm text-[#FAF5E8]/75 leading-relaxed">
              Manage OPD clinic & SwaGrama reservations, access Muktikhela Vaidya scorecards, barter natural goods, and track tier privileges up to 20%.
            </p>

            {state.pendingAuthIntent?.returnTo && (
              <div className="mt-5 rounded-xl border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-3.5 py-2.5 text-xs text-[#E7D7B5]">
                Returning to{" "}
                <span className="font-bold">
                  {state.pendingAuthIntent.returnTo}
                </span>{" "}
                after sign in
              </div>
            )}

            <div className="mt-6 space-y-3 text-xs text-[#FAF5E8]/85">
              {[
                "Live Executive User Dashboard & Brief Inspection Modals",
                "Saved Wishlist & Automatic Tier Discounts",
                "Confidential Muktikhela Health Reports",
                "Registered Email OTP Password Recovery",
              ].map((line) => (
                <div key={line} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#C9A45C]/25 space-y-3">
            <div className="rounded-2xl border border-[#C9A45C]/30 bg-white/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A45C]">
                Client Walkthrough Shortcut
              </p>
              <p className="mt-1 text-xs text-[#FAF5E8]/80">
                Preview populated User Dashboard with Aarav Kulkarni (Shatayush World 5% Member)
              </p>
              <button
                type="button"
                onClick={handleOneClickDemo}
                className="mt-3 w-full inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
              >
                <span>Instant Client Demo Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-[#FFFDF9]">
          <div>
            <div className="flex justify-center mb-7">
              <AnimatedTabDock
                tabs={tabs}
                activeTab={mode}
                onChange={(id) => {
                  setAuthError("");
                  setAuthSuccess("");
                  setMode(id);
                }}
                layoutId="v2AuthDock"
              />
            </div>

            {authSuccess && (
              <div className="mb-5 rounded-xl border border-[#0f3d26]/30 bg-[#e6efea] px-4 py-3 text-xs font-semibold text-[#0f3d26] flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0f3d26]" />
                <span>{authSuccess}</span>
              </div>
            )}

            {authError && (
              <div className="mb-5 rounded-xl border border-[#C9A45C] bg-[#FAF5E8] px-4 py-2.5 text-xs font-semibold text-[#8b6534]">
                {authError}
              </div>
            )}

            {mode === "login" ? (
              <form
                onSubmit={loginForm.handleSubmit(onLoginSubmit)}
                className="space-y-5"
              >
                <div className="mb-4">
                  <h2 className="font-serif text-3xl text-[#0f3d26]">
                    Welcome Back
                  </h2>
                  <p className="mt-1 text-xs text-[#0f3d26]/70">
                    Sign in to unlock your User Dashboard, saved bookings, and tier discounts.
                  </p>
                </div>

                <V2FormSection
                  step="Sign In"
                  title="Member Credentials"
                  hint="Protected with Email OTP Reset"
                >
                  <div>
                    <InputField
                      name="email"
                      label="Registered Email Address *"
                      control={loginForm.control}
                      dontCapitalize
                      shrink
                      InputLabelProps={{ shrink: true }}
                      error={loginForm.formState.errors.email}
                    />
                    <FieldError error={loginForm.formState.errors.email} />
                  </div>

                  <div>
                    <V2PasswordInput
                      name="password"
                      label="Account Password *"
                      control={loginForm.control}
                      error={loginForm.formState.errors.password}
                    />
                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <div className="flex-1">
                        <FieldError error={loginForm.formState.errors.password} />
                      </div>
                      <button
                        type="button"
                        onClick={handleOpenForgotPassword}
                        className="ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#8b6534] hover:text-[#0f3d26] transition-colors"
                      >
                        <KeyRound className="h-3.5 w-3.5" />
                        <span>Forgot Password? Reset via Email OTP</span>
                      </button>
                    </div>
                  </div>
                </V2FormSection>

                <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 flex items-center justify-between text-xs">
                  <span className="text-[#0f3d26]/80">
                    Demo user:{" "}
                    <strong className="text-[#0f3d26]">
                      aarav@jnanayogayu.example
                    </strong>{" "}
                    · Password: <strong className="text-[#0f3d26]">password123</strong>
                  </span>
                  <ShieldCheck className="h-4 w-4 text-[#C9A45C] shrink-0" />
                </div>

                <CommonButton
                  type="submit"
                  label="Sign In & Enter Dashboard"
                  className="w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider shadow-md"
                />
              </form>
            ) : (
              <form
                onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}
                className="space-y-4"
              >
                <div className="mb-3">
                  <h2 className="font-serif text-3xl text-[#0f3d26]">
                    Create Free JYA Account
                  </h2>
                  <p className="mt-1 text-xs text-[#0f3d26]/70">
                    Starts on JYA Open (Free); personalizes your Dashboard and upgrade pathways.
                  </p>
                </div>

                <V2FormSection
                  step="01"
                  title="Personal & Contact Details"
                  hint="Required"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        name="name"
                        label="Full Name *"
                        control={signUpForm.control}
                        shrink
                        InputLabelProps={{ shrink: true }}
                        error={signUpForm.formState.errors.name}
                      />
                      <FieldError error={signUpForm.formState.errors.name} />
                    </div>
                    <div>
                      <InputField
                        name="phone"
                        label="Mobile / WhatsApp Number *"
                        control={signUpForm.control}
                        dontCapitalize
                        shrink
                        InputLabelProps={{ shrink: true }}
                        error={signUpForm.formState.errors.phone}
                      />
                      <FieldError error={signUpForm.formState.errors.phone} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <InputField
                        name="email"
                        label="Email Address *"
                        control={signUpForm.control}
                        dontCapitalize
                        shrink
                        InputLabelProps={{ shrink: true }}
                        error={signUpForm.formState.errors.email}
                      />
                      <FieldError error={signUpForm.formState.errors.email} />
                    </div>
                    <div>
                      <InputField
                        name="city"
                        label="Current City *"
                        control={signUpForm.control}
                        shrink
                        InputLabelProps={{ shrink: true }}
                        error={signUpForm.formState.errors.city}
                      />
                      <FieldError error={signUpForm.formState.errors.city} />
                    </div>
                  </div>
                </V2FormSection>

                <V2FormSection
                  step="02"
                  title="Wellness Track & Account Password"
                  hint="Min 6 characters"
                >
                  <div>
                    <DropdownField
                      name="primaryInterest"
                      control={signUpForm.control}
                      dataArray={SIGNUP_INTEREST_OPTIONS}
                      placeholder="Primary Wellness Interest *"
                      error={signUpForm.formState.errors.primaryInterest}
                    />
                    <FieldError error={signUpForm.formState.errors.primaryInterest} />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <V2PasswordInput
                        name="password"
                        label="Create Password *"
                        control={signUpForm.control}
                        error={signUpForm.formState.errors.password}
                      />
                      <FieldError error={signUpForm.formState.errors.password} />
                    </div>
                    <div>
                      <V2PasswordInput
                        name="confirmPassword"
                        label="Confirm Password *"
                        control={signUpForm.control}
                        error={signUpForm.formState.errors.confirmPassword}
                      />
                      <FieldError error={signUpForm.formState.errors.confirmPassword} />
                    </div>
                  </div>

                  <div>
                    <CheckBoxField
                      name="agreeTerms"
                      control={signUpForm.control}
                      label="I accept JYA Terms & Confidential Community Health Policy."
                      className="text-[#0f3d26] text-xs"
                    />
                    <FieldError error={signUpForm.formState.errors.agreeTerms} />
                  </div>
                </V2FormSection>

                <CommonButton
                  type="submit"
                  label="Create Account & Enter JYA"
                  className="w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider shadow-md"
                />
              </form>
            )}
          </div>

          <div className="mt-8 pt-5 border-t border-[#EDE5D5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#0f3d26]/70">
            <span>Prefer continuing without an account?</span>
            <Link
              to="/v2"
              className="font-bold text-[#0f3d26] hover:text-[#8b6534] inline-flex items-center gap-1"
            >
              <span>Browse as Guest</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
            </Link>
          </div>
        </div>
      </div>

      <V2ModalShell
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        badge="Account Security Recovery"
        title={
          forgotStep === "email"
            ? "Reset Password via Registered Email"
            : "Verify Email OTP & Set New Password"
        }
        subtitle={
          forgotStep === "email"
            ? "Enter your registered email address to receive a 6-digit verification OTP."
            : `Enter the 6-digit verification OTP sent to ${otpChallengeInfo?.email || "your registered email"} and choose a new password.`
        }
        maxWidthClass="lg"
      >
        <div className="space-y-4">
          {forgotError && (
            <div className="rounded-xl border border-[#C9A45C] bg-[#FAF5E8] px-4 py-2.5 text-xs font-semibold text-[#8b6534]">
              {forgotError}
            </div>
          )}

          {forgotStep === "email" ? (
            <form
              onSubmit={forgotEmailForm.handleSubmit(onSendResetOtp)}
              className="space-y-4"
            >
              <V2FormSection
                title="Locate Registered JYA Account"
                hint="Email Verification"
              >
                <div>
                  <InputField
                    name="email"
                    label="Registered Email Address *"
                    control={forgotEmailForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={forgotEmailForm.formState.errors.email}
                  />
                  <FieldError error={forgotEmailForm.formState.errors.email} />
                </div>
                <p className="text-[11px] text-[#0f3d26]/70 leading-relaxed">
                  Registered demo accounts include{" "}
                  <strong className="text-[#0f3d26]">
                    aarav@jnanayogayu.example
                  </strong>{" "}
                  or any email registered via Sign Up.
                </p>
              </V2FormSection>

              <div className="pt-2 flex justify-end gap-3">
                <CommonButton
                  type="button"
                  onClick={() => setForgotOpen(false)}
                  label="Cancel"
                  className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/25 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
                />
                <CommonButton
                  type="submit"
                  label="Send 6-Digit Email OTP"
                  className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                />
              </div>
            </form>
          ) : (
            <form
              onSubmit={forgotResetForm.handleSubmit(onConfirmPasswordReset)}
              className="space-y-4"
            >
              {otpChallengeInfo && (
                <div className="rounded-2xl border border-[#C9A45C]/50 bg-[#FBF8F1] p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    <MailCheck className="h-5 w-5 text-[#8b6534] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-[#0f3d26]">
                        OTP Dispatched to {otpChallengeInfo.email}
                      </p>
                      <p className="text-[11px] text-[#8b6534] mt-0.5">
                        Verification Email OTP:{" "}
                        <strong className="font-mono text-xs text-[#0f3d26]">
                          {otpChallengeInfo.demoOtp}
                        </strong>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      forgotResetForm.setValue("otp", otpChallengeInfo.demoOtp, {
                        shouldValidate: true,
                      })
                    }
                    className="rounded-full bg-[#0f3d26] px-3 py-1.5 text-[11px] font-bold text-[#FAF5E8] hover:bg-[#1a5c3a]"
                  >
                    Auto-Fill OTP
                  </button>
                </div>
              )}

              <V2FormSection
                title="Verify OTP & Create New Password"
                hint="Min 6 characters"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-[#0f3d26]">
                      6-Digit Email OTP
                    </span>
                    <div className="flex items-center gap-3 text-[11px]">
                      <button
                        type="button"
                        onClick={() => {
                          setForgotError("");
                          setForgotStep("email");
                        }}
                        className="font-semibold text-[#8b6534] hover:text-[#0f3d26]"
                      >
                        Change Email
                      </button>
                      <button
                        type="button"
                        disabled={resendSeconds > 0}
                        onClick={handleResendOtp}
                        className={`inline-flex items-center gap-1 font-bold ${
                          resendSeconds > 0
                            ? "text-[#0f3d26]/45 cursor-not-allowed"
                            : "text-[#0f3d26] hover:text-[#8b6534]"
                        }`}
                      >
                        <RefreshCw className="h-3 w-3" />
                        <span>
                          {resendSeconds > 0
                            ? `Resend (${resendSeconds}s)`
                            : "Resend OTP"}
                        </span>
                      </button>
                    </div>
                  </div>
                  <InputField
                    name="otp"
                    label="Enter 6-Digit Email OTP *"
                    control={forgotResetForm.control}
                    dontCapitalize
                    shrink
                    InputLabelProps={{ shrink: true }}
                    error={forgotResetForm.formState.errors.otp}
                  />
                  <FieldError error={forgotResetForm.formState.errors.otp} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <V2PasswordInput
                      name="newPassword"
                      label="New Password *"
                      control={forgotResetForm.control}
                      error={forgotResetForm.formState.errors.newPassword}
                    />
                    <FieldError
                      error={forgotResetForm.formState.errors.newPassword}
                    />
                  </div>
                  <div>
                    <V2PasswordInput
                      name="confirmNewPassword"
                      label="Confirm New Password *"
                      control={forgotResetForm.control}
                      error={forgotResetForm.formState.errors.confirmNewPassword}
                    />
                    <FieldError
                      error={forgotResetForm.formState.errors.confirmNewPassword}
                    />
                  </div>
                </div>
              </V2FormSection>

              <div className="pt-2 flex justify-end gap-3">
                <CommonButton
                  type="button"
                  onClick={() => setForgotOpen(false)}
                  label="Cancel"
                  className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/25 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
                />
                <CommonButton
                  type="submit"
                  label="Update Password"
                  className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                />
              </div>
            </form>
          )}
        </div>
      </V2ModalShell>
    </div>
  );
}
