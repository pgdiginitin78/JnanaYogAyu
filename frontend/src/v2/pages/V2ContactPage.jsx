import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowRight, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import { FieldError } from "../components/V2ModalShell";
import { V2FormSection, V2SlotSelector } from "../components/V2FormControls";
import {
  KineticHeroHighlight,
  SpotlightBentoCard,
} from "../components/V2InteractiveComponents";
import { TwentyFirstHero } from "../components/TwentyFirstComponents";
import { CONTACT_DETAILS, V2_IMAGES } from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import { getDropdownValue, v2EnquirySchema } from "../validation/v2Schemas";

const CONTACT_TOPICS = [
  { label: "General Ecosystem Enquiry", value: "General" },
  { label: "SwaGrama Village Visit / Residence", value: "SwaGrama Visit" },
  { label: "Global AyurX Clinical Care", value: "Healthcare" },
  { label: "Seasonal / Ecosphere Academy Admission", value: "Academy" },
  { label: "Membership Benefits Support", value: "Membership" },
];

const CALLBACK_MODES = [
  { label: "WhatsApp Message (8AM - 6PM)", value: "WhatsApp" },
  { label: "Direct Phone Call", value: "Phone Call" },
  { label: "Detailed Email Response", value: "Email" },
];

const CONTACT_CALLBACK_SLOTS = [
  {
    value: "Morning (09:00 AM - 12:00 PM)",
    title: "Morning Callback",
    time: "09:00 AM – 12:00 PM",
    availability: "Open Window",
    note: "Desk Available",
  },
  {
    value: "Afternoon (12:30 PM - 04:00 PM)",
    title: "Afternoon Callback",
    time: "12:30 PM – 04:00 PM",
    availability: "Available",
    note: "Advisor Line",
  },
  {
    value: "Evening (04:30 PM - 07:00 PM)",
    title: "Evening Callback",
    time: "04:30 PM – 07:00 PM",
    availability: "Open Window",
    note: "Support Desk",
  },
];

export default function V2ContactPage() {
  const { currentUser, createEnquiry } = useV2Store();

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
      callbackSlot: CONTACT_CALLBACK_SLOTS[0].value,
      interest: CONTACT_TOPICS[0],
      message: "",
    },
  });

  const watchedCallbackSlot = useWatch({ control, name: "callbackSlot" });

  const onSubmit = (values) => {
    createEnquiry({
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      callbackMode: getDropdownValue(values.callbackMode),
      callbackSlot: values.callbackSlot,
      interest: getDropdownValue(values.interest),
      message: values.message,
      sourcePage: "Contact Page V2",
    });
    reset({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      callbackMode: CALLBACK_MODES[0],
      callbackSlot: CONTACT_CALLBACK_SLOTS[0].value,
      interest: CONTACT_TOPICS[0],
      message: "",
    });
  };

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-clip">
      <TwentyFirstHero
        images={[
          V2_IMAGES.contactSwagramaHeroImg,
          V2_IMAGES.ecosphereCampusImg,
          V2_IMAGES.homeSanctuaryImg,
        ]}
        badgeLabel="Direct Contact · Lavale Sanctuary, Pune"
        onBadgeClick={() =>
          document
            .getElementById("v2-contact-grid")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        title={
          <>
            Connect With JnanaYogAyu &{" "}
            <KineticHeroHighlight>SwaGrama.</KineticHeroHighlight>
          </>
        }
        subtitle="Reach our dedicated care coordinators for Vaidya OPD consultations, residential Gurukul cohorts, Membership privileges, or planned SwaGrama sanctuary visits in Lavale, Pune."
        actions={
          <>
            <button
              type="button"
              onClick={() =>
                document
                  .getElementById("v2-contact-grid")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] shadow-lg hover:bg-[#E7D7B5] transition-colors"
            >
              <span>Send Callback Enquiry</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href={`mailto:${CONTACT_DETAILS.email}`}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#FAF5E8]/45 bg-[#071E14]/55 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] backdrop-blur-md hover:border-[#C9A45C] hover:bg-[#071E14]/75 transition-colors"
            >
              <Mail className="h-4 w-4 text-[#C9A45C]" />
              <span>Email Desk</span>
            </a>
          </>
        }
        bottomStats={[
          { value: "8 AM–6 PM", label: "WhatsApp Helpline" },
          { value: "Lavale", label: "Pune Eco-Sanctuary" },
          { value: "OPD & Stay", label: "Direct Bookings" },
          { value: "Visits", label: "SwaGrama Business Model" },
        ]}
      />

      <section
        id="v2-contact-grid"
        className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 grid grid-cols-1 lg:grid-cols-12 gap-8"
      >
        <div className="lg:col-span-5 space-y-5">
          <SpotlightBentoCard className="p-6 space-y-5">
            <h2 className="font-serif text-2xl text-[#0f3d26]">
              Direct Helplines & Locations
            </h2>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6efea] text-[#0f3d26]">
                <Phone className="h-4 w-4 text-[#8b6534]" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8b6534]">
                  WhatsApp ({CONTACT_DETAILS.whatsappHours})
                </p>
                <p className="text-sm font-semibold text-[#0f3d26]">
                  {CONTACT_DETAILS.whatsappNumbers}
                </p>
                <p className="text-xs text-[#0f3d26]/65 mt-0.5">
                  {CONTACT_DETAILS.helplineText}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6efea] text-[#0f3d26]">
                <Mail className="h-4 w-4 text-[#8b6534]" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#8b6534]">
                  Official Email
                </p>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="text-sm font-semibold text-[#0f3d26] hover:text-[#8b6534]"
                >
                  {CONTACT_DETAILS.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e6efea] text-[#0f3d26]">
                <MapPin className="h-4 w-4 text-[#8b6534]" />
              </div>
              <div className="space-y-2 text-xs text-[#0f3d26]/80 leading-relaxed">
                <p>
                  <span className="font-bold text-[#0f3d26]">
                    SwaGrama Community:
                  </span>{" "}
                  {CONTACT_DETAILS.communityAddress}
                </p>
                <p>
                  <span className="font-bold text-[#0f3d26]">
                    Pune Office:
                  </span>{" "}
                  {CONTACT_DETAILS.officeAddress}
                </p>
                <a
                  href={CONTACT_DETAILS.mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-[#8b6534] hover:text-[#0f3d26]"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </SpotlightBentoCard>

          <div className="overflow-hidden rounded-3xl border border-[#EDE5D5] shadow-md aspect-[16/10] bg-[#e6efea]">
            <iframe
              title="SwaGrama Location Map"
              src={CONTACT_DETAILS.mapEmbedUrl}
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <SpotlightBentoCard className="p-7 sm:p-10 h-full">
            <span className="rounded-full bg-[#e6efea] px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0f3d26]">
              Send Enquiry
            </span>
            <h2 className="mt-3 font-serif text-3xl text-[#0f3d26]">
              Write Directly to Our Team
            </h2>
            <p className="mt-2 text-sm text-[#0f3d26]/70">
              All signed-in submissions also synchronize inside your User Dashboard so you never lose track of a query.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
              <V2FormSection
                step="01"
                title="Personal Contact Information"
                hint="Required"
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
                      label="City / Origin Town *"
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
                title="Enquiry Topic, Callback Slot & Message"
                hint="Direct Assistance"
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
                      dataArray={CONTACT_TOPICS}
                      placeholder="Area of Interest *"
                      error={errors.interest}
                    />
                    <FieldError error={errors.interest} />
                  </div>
                </div>

                <V2SlotSelector
                  label="Preferred Callback Time Slot *"
                  value={watchedCallbackSlot}
                  onChange={(val) =>
                    setValue("callbackSlot", val, { shouldValidate: true })
                  }
                  slots={CONTACT_CALLBACK_SLOTS}
                  error={errors.callbackSlot}
                />

                <div>
                  <InputArea
                    name="message"
                    label="Detailed Enquiry Message *"
                    placeholder="Write your questions, preferred dates, group size, or health goals..."
                    control={control}
                    minRows={4}
                    maxRows={7}
                  />
                  <FieldError error={errors.message} />
                </div>
              </V2FormSection>

              <div className="pt-2 flex justify-end">
                <CommonButton
                  type="submit"
                  label="Send Direct Enquiry"
                  className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
                />
              </div>
            </form>
          </SpotlightBentoCard>
        </div>
      </section>
    </div>
  );
}
