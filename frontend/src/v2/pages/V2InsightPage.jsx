import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  FileText,
  Headphones,
  Lock,
  Play,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection } from "../components/V2FormControls";
import {
  AnimatedTabDock,
  KineticHeroHighlight,
  SpotlightBentoCard,
  SectionHeader,
} from "../components/V2InteractiveComponents";
import { TwentyFirstHero } from "../components/TwentyFirstComponents";
import { V2_IMAGES } from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import { getDropdownValue, v2EventRegisterSchema } from "../validation/v2Schemas";

const ATTENDEE_ROLE_OPTIONS = [
  { label: "Wellness Seeker / Individual", value: "Wellness Seeker" },
  { label: "Family Group Attendance", value: "Family Group" },
  { label: "Ayurveda Student / Scholar", value: "Student" },
  { label: "Registered Vaidya / Practitioner", value: "Ayurveda Practitioner" },
];

export default function V2InsightPage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    registerForEvent,
    setPendingAuthIntent,
    notify,
  } = useV2Store();

  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "events";
  const setActiveTab = (tabId) =>
    setSearchParams({ tab: tabId }, { replace: true, preventScrollReset: true });
  const [readerBlog, setReaderBlog] = useState(null);
  const [activePodcast, setActivePodcast] = useState(null);
  const [eventModal, setEventModal] = useState(null);
  const [unlockedWhitepaper, setUnlockedWhitepaper] = useState(null);

  const eventForm = useForm({
    resolver: yupResolver(v2EventRegisterSchema),
    defaultValues: {
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      attendeeType: ATTENDEE_ROLE_OPTIONS[0],
      seats: 1,
      speakerQuestion: "",
    },
  });

  const handleOpenEventRegister = (evt) => {
    eventForm.reset({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      attendeeType: ATTENDEE_ROLE_OPTIONS[0],
      seats: 1,
      speakerQuestion: "",
    });
    setEventModal(evt);
  };

  const onSubmitEventRegister = (values) => {
    if (!eventModal) return;
    registerForEvent({
      eventId: eventModal.id,
      eventTitle: eventModal.title,
      name: values.name,
      phone: values.phone,
      email: values.email,
      city: values.city,
      attendeeType: getDropdownValue(values.attendeeType),
      seats: Number(values.seats) || 1,
      speakerQuestion: values.speakerQuestion,
    });
    setEventModal(null);
  };

  const handleWhitepaperDownload = (wp) => {
    if (!wp.isPublic && !currentUser) {
      setPendingAuthIntent({
        type: "navigate",
        returnTo: "/v2/insight?tab=whitepapers",
      });
      navigate("/v2/login");
      return;
    }
    setUnlockedWhitepaper(wp);
    notify(`Whitepaper ready: ${wp.title}`);
  };

  const insightTabs = [
    {
      id: "events",
      label: "Upcoming Events & Lectures",
      icon: <Calendar className="h-3.5 w-3.5" />,
      count: state.events.length,
    },
    {
      id: "blogs",
      label: "Blogs & Reflections",
      icon: <BookOpen className="h-3.5 w-3.5" />,
      count: state.blogs.length,
    },
    {
      id: "whitepapers",
      label: "Whitepapers & Reports",
      icon: <FileText className="h-3.5 w-3.5" />,
      count: state.whitepapers.length,
    },
    {
      id: "podcasts",
      label: "Podcasts",
      icon: <Headphones className="h-3.5 w-3.5" />,
      count: state.podcasts.length,
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-clip">
      <TwentyFirstHero
        images={[
          V2_IMAGES.insightEventHeroImg,
          V2_IMAGES.communityGatheringImg,
          V2_IMAGES.resourceWhitepaperImg,
        ]}
        badgeLabel="Insight · Events, Lectures & Wisdom Library"
        onBadgeClick={() => {
          setActiveTab("events");
          document
            .getElementById("v2-insight-library")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
        title={
          <>
            Upcoming Events, <br/>Lectures &{" "}
            <KineticHeroHighlight>Wisdom Library.</KineticHeroHighlight>
          </>
        }
        subtitle="Reserve seats for upcoming community lectures & Swagurukul symposiums, read reflective essays and podcasts, and unlock Ayurvedic field research reports."
        actions={
          <>
            <button
              type="button"
              onClick={() => {
                setActiveTab("events");
                document
                  .getElementById("v2-insight-library")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#071E14] shadow-lg hover:bg-[#E7D7B5] transition-colors"
            >
              <span>Reserve Event Seats</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("whitepapers");
                document
                  .getElementById("v2-insight-library")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#FAF5E8]/45 bg-[#071E14]/55 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#FAF5E8] backdrop-blur-md hover:border-[#C9A45C] hover:bg-[#071E14]/75 transition-colors"
            >
              <span>Read Whitepapers & Blogs</span>
            </button>
          </>
        }

      />

      <section
        id="v2-insight-library"
        className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 lg:py-20"
      >
        <div className="flex justify-center mb-12">
          <AnimatedTabDock
            tabs={insightTabs}
            activeTab={activeTab}
            onChange={setActiveTab}
            layoutId="insightDock"
          />
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[420px]"
        >
            {activeTab === "events" && (
          <div className="space-y-8">
            <SectionHeader
              eyebrow="Live Calendar"
              title="Upcoming Events & Community Lectures"
              subtitle="Open interactive lectures and seasonal gatherings at SwaGrama Village, Lavale."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {state.events.map((evt) => (
                <SpotlightBentoCard key={evt.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={evt.image || V2_IMAGES.insightEventHeroImg}
                      alt={evt.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f3d26]">
                        {evt.date}
                      </span>
                      <h3 className="mt-3 font-serif text-2xl text-[#0f3d26]">
                        {evt.title}
                      </h3>
                      <p className="mt-1 text-xs font-semibold text-[#8b6534]">
                        {evt.location}
                      </p>
                      <p className="mt-3 text-sm text-[#0f3d26]/75 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#EDE5D5] flex items-center justify-between">
                      <span className="text-xs font-bold text-[#0f3d26]">
                        {evt.seatsLeft} Seats Remaining
                      </span>
                      <CommonButton
                        onClick={() => handleOpenEventRegister(evt)}
                        label="Register Now"
                        className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
                      />
                    </div>
                  </div>
                </SpotlightBentoCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="space-y-8">
            <SectionHeader
              eyebrow="Editorial Reflections"
              title="Ayurvedic Nutrition, Circadian Rhythms & Longevity"
              subtitle="Freely readable articles bridging classical samhitas with modern preventive health."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {state.blogs.map((blog) => (
                <SpotlightBentoCard key={blog.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                        <span>{blog.tag}</span>
                        <span>{blog.meta}</span>
                      </div>
                      <h3 className="mt-3 font-serif text-xl text-[#0f3d26]">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed line-clamp-3">
                        {blog.body}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setReaderBlog(blog)}
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-[#0f3d26] hover:text-[#8b6534]"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                    </button>
                  </div>
                </SpotlightBentoCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === "whitepapers" && (
          <div className="space-y-8">
            <SectionHeader
              eyebrow="Research & Policy"
              title="Whitepapers & Field Reports"
              subtitle="Public reports download immediately for guests; deep ecological village reports unlock seamlessly upon sign in."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {state.whitepapers.map((wp) => (
                <SpotlightBentoCard key={wp.id} className="overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={wp.image}
                      alt={wp.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#071E14]/85 border border-[#C9A45C]/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#E7D7B5]">
                      {wp.isPublic || currentUser ? (
                        <CheckCircle2 className="h-3 w-3 text-[#C9A45C]" />
                      ) : (
                        <Lock className="h-3 w-3 text-[#C9A45C]" />
                      )}
                      {wp.isPublic
                        ? "Public Report"
                        : currentUser
                          ? "Unlocked"
                          : "Login Required"}
                    </span>
                  </div>
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8b6534]">
                        {wp.tag} · {wp.meta}
                      </p>
                      <h3 className="mt-2 font-serif text-xl text-[#0f3d26]">
                        {wp.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#0f3d26]/75 leading-relaxed">
                        {wp.summary}
                      </p>
                    </div>
                    <CommonButton
                      onClick={() => handleWhitepaperDownload(wp)}
                      label={
                        wp.isPublic || currentUser
                          ? "Download PDF Summary"
                          : "Sign In to Download"
                      }
                      className="mt-5 w-full !rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
                    />
                  </div>
                </SpotlightBentoCard>
              ))}
            </div>
          </div>
        )}

        {activeTab === "podcasts" && (
          <div className="space-y-8">
            <SectionHeader
              eyebrow="Audio Dialogues"
              title="Conversations With Vaidyas & Village Builders"
              subtitle="Listen directly to episodes recorded across SwaGrama Village and Global AyurX research tables."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {state.podcasts.map((pod) => (
                <SpotlightBentoCard key={pod.id} dark className="overflow-hidden flex flex-col">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <img
                      src={pod.image}
                      alt={pod.title}
                      className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => setActivePodcast(pod)}
                      className="absolute inset-0 flex items-center justify-center bg-[#071E14]/35 hover:bg-[#071E14]/20 transition-colors"
                      aria-label="Play episode"
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C9A45C] text-[#071E14] shadow-xl">
                        <Play className="h-6 w-6 fill-current" />
                      </span>
                    </button>
                  </div>
                  <div className="p-6 flex flex-1 flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#C9A45C]">
                        {pod.tag} · {pod.meta}
                      </span>
                      <h3 className="mt-2 font-serif text-xl text-[#FAF5E8]">
                        {pod.title}
                      </h3>
                      <p className="mt-2 text-xs text-[#FAF5E8]/75 leading-relaxed">
                        {pod.summary}
                      </p>
                    </div>
                    <CommonButton
                      onClick={() => setActivePodcast(pod)}
                      label="Play Dialogue"
                      className="mt-5 w-full !rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] !px-6 !py-2.5 !text-xs !font-bold"
                    />
                  </div>
                </SpotlightBentoCard>
              ))}
            </div>
          </div>
        )}
        </motion.div>
      </section>

      <V2ModalShell
        open={Boolean(eventModal)}
        onClose={() => setEventModal(null)}
        badge="Event Registration"
        title={eventModal?.title}
        subtitle={`${eventModal?.date || ""} · ${eventModal?.location || ""}`}
        maxWidthClass="xl"
      >
        <form
          onSubmit={eventForm.handleSubmit(onSubmitEventRegister)}
          className="space-y-4"
        >
          <V2FormSection
            step="01"
            title="Attendee Identity & City"
            hint="Pass Dispatch"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="name"
                  label="Attendee Full Name *"
                  control={eventForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={eventForm.formState.errors.name}
                />
                <FieldError error={eventForm.formState.errors.name} />
              </div>
              <div>
                <InputField
                  name="phone"
                  label="Phone / WhatsApp *"
                  control={eventForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={eventForm.formState.errors.phone}
                />
                <FieldError error={eventForm.formState.errors.phone} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <InputField
                  name="email"
                  label="Email Address *"
                  control={eventForm.control}
                  dontCapitalize
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={eventForm.formState.errors.email}
                />
                <FieldError error={eventForm.formState.errors.email} />
              </div>
              <div>
                <InputField
                  name="city"
                  label="City *"
                  control={eventForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={eventForm.formState.errors.city}
                />
                <FieldError error={eventForm.formState.errors.city} />
              </div>
            </div>
          </V2FormSection>

          <V2FormSection
            step="02"
            title="Seating Allocation & Speaker Question"
            hint="Complimentary Open Entry"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <DropdownField
                  name="attendeeType"
                  control={eventForm.control}
                  dataArray={ATTENDEE_ROLE_OPTIONS}
                  placeholder="Attending As *"
                  error={eventForm.formState.errors.attendeeType}
                />
                <FieldError error={eventForm.formState.errors.attendeeType} />
              </div>
              <div>
                <InputField
                  name="seats"
                  label="Seats Required *"
                  type="number"
                  control={eventForm.control}
                  shrink
                  InputLabelProps={{ shrink: true }}
                  error={eventForm.formState.errors.seats}
                />
                <FieldError error={eventForm.formState.errors.seats} />
              </div>
            </div>

            <div>
              <InputArea
                name="speakerQuestion"
                label="Topic Question or Note for Speaker (Optional)"
                placeholder="Any topic question you would like addressed during Q&A..."
                control={eventForm.control}
                minRows={2}
              />
            </div>
          </V2FormSection>

          <div className="pt-2 flex justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setEventModal(null)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Confirm Seat Reservation"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(readerBlog)}
        onClose={() => setReaderBlog(null)}
        badge={readerBlog?.tag}
        title={readerBlog?.title}
        subtitle={readerBlog?.meta}
      >
        {readerBlog && (
          <div className="space-y-4">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <img
                src={readerBlog.image}
                alt={readerBlog.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm sm:text-base text-[#0f3d26]/85 leading-relaxed">
              {readerBlog.body}
            </p>
            <p className="text-sm text-[#0f3d26]/75 leading-relaxed">
              Integrating mindful nourishment, early sleep alignment, and seasonal self-observation forms the cornerstone of preventive Shatayush care inside the JnanaYogAyu ecosystem.
            </p>
          </div>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(activePodcast)}
        onClose={() => setActivePodcast(null)}
        badge={activePodcast?.tag}
        title={activePodcast?.title}
        subtitle={`Duration ${activePodcast?.meta || ""}`}
        maxWidthClass="lg"
      >
        {activePodcast && (
          <div className="space-y-4">
            <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl">
              <img
                src={activePodcast.image}
                alt={activePodcast.title}
                className="h-full w-full object-cover"
              />
            </div>
            <p className="text-sm text-[#0f3d26]/80 leading-relaxed">
              {activePodcast.summary}
            </p>
            <div className="rounded-2xl border border-[#C9A45C]/35 bg-[#FBF8F1] p-4 flex items-center justify-between">
              <span className="text-xs font-bold text-[#0f3d26]">
                Now Streaming Episode Audio Preview
              </span>
              <span className="rounded-full bg-[#0f3d26] px-3 py-1 text-[10px] font-bold text-[#FAF5E8]">
                Playing
              </span>
            </div>
          </div>
        )}
      </V2ModalShell>

      <V2ModalShell
        open={Boolean(unlockedWhitepaper)}
        onClose={() => setUnlockedWhitepaper(null)}
        badge={unlockedWhitepaper?.tag}
        title={unlockedWhitepaper?.title}
        subtitle={unlockedWhitepaper?.meta}
        maxWidthClass="lg"
      >
        {unlockedWhitepaper && (
          <div className="space-y-4">
            <p className="text-sm text-[#0f3d26]/85 leading-relaxed">
              {unlockedWhitepaper.summary}
            </p>
            <div className="rounded-2xl border border-[#C9A45C]/35 bg-[#FBF8F1] p-4 text-xs text-[#0f3d26]">
              Document Verified & Ready for Offline Reference.
            </div>
          </div>
        )}
      </V2ModalShell>
    </div>
  );
}
