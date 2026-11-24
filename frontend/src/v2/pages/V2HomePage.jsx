import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  ArrowRight,
  Brain,
  Calendar,
  CheckCircle2,
  Cpu,
  Globe,
  GraduationCap,
  Heart,
  HeartPulse,
  Layers,
  Leaf,
  ShoppingCart,
  Smartphone,
  Sprout,
  Stethoscope,
  TreePine,
  Unplug,
  Users,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import InputField from "../../components/common/forms/InputField";
import InputArea from "../../components/common/forms/InputArea";
import DropdownField from "../../components/common/forms/DropdownField";
import { useLenis } from "../../components/common/SmoothScroll";
import V2ModalShell, { FieldError } from "../components/V2ModalShell";
import { V2FormSection, V2SlotSelector } from "../components/V2FormControls";
import { KineticHeroHighlight } from "../components/V2InteractiveComponents";
import {
  AceternityFeaturesSection,
  BentoCard,
  BentoGrid,
  CardHoverEffect,
  FeatureShowcase108,
  FocusCards,
  GalleryCarousel21st,
  Timeline,
  TwentyFirstHero,
} from "../components/TwentyFirstComponents";
import {
  HOME_ECOSYSTEM_SERVICES,
  HOME_SWAGRAMA_HIGHLIGHTS,
  HOME_SWAGURUKUL_PILLARS,
  HOME_WHY_JYA,
  INITIAL_BLOGS,
  INITIAL_EVENTS,
  INITIAL_PODCASTS,
  INITIAL_WHITEPAPERS,
  MUKTIKHELA_PREVIEW_STEPS,
  MUKTIKHELA_ZONES,
  V2_IMAGES,
  WELLNESS_SERVICES,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";
import { getDropdownValue, v2EnquirySchema } from "../validation/v2Schemas";

const ENQUIRY_INTEREST_OPTIONS = [
  { label: "Shatayush World & Seasonal Academy", value: "Shatayush World" },
  { label: "Global AyurX Healthcare (OPD / IPD)", value: "Global AyurX" },
  { label: "EcoSphere Residential Gurukul", value: "EcoSphere Academy" },
  { label: "SwaGrama Village Visit & Business Model", value: "SwaGrama Visit" },
  { label: "Membership & Tier Benefits", value: "Membership" },
];

const CALLBACK_MODES = [
  { label: "WhatsApp Message (8AM - 6PM)", value: "WhatsApp" },
  { label: "Direct Phone Call", value: "Phone Call" },
  { label: "Detailed Email Response", value: "Email" },
];

const HOME_CALLBACK_SLOTS = [
  {
    value: "Morning (09:00 AM - 12:00 PM)",
    title: "Morning Desk",
    time: "09:00 AM – 12:00 PM",
    availability: "Open Window",
    note: "Fastest Reply",
  },
  {
    value: "Afternoon (12:30 PM - 04:00 PM)",
    title: "Afternoon Desk",
    time: "12:30 PM – 04:00 PM",
    availability: "Available",
    note: "Advisor Call",
  },
  {
    value: "Evening (04:30 PM - 07:00 PM)",
    title: "Evening Desk",
    time: "04:30 PM – 07:00 PM",
    availability: "Open Window",
    note: "Family Guidance",
  },
];

const ECOSYSTEM_PILLARS = [
  {
    num: "01",
    title: "Shatayus World Movement",
    tag: "Longevity Movement",
    desc: "Join a people-first movement dedicated to creating a healthier, happier, and more sustainable world where living beyond 100 years becomes a way of life.",
    path: "/v2/shatayush-world",
    image: V2_IMAGES.shatayushSunriseImg,
  },
  {
    num: "02",
    title: "Global AyurX",
    tag: "Digital Wellness",
    desc: "A unified digital wellness ecosystem integrating AI, Ayurveda, OPD/IPD care, Herbal E-Shop, and Barter Exchange for personalized preventive well-being.",
    path: "/v2/global-ayurx",
    image: V2_IMAGES.ayurxHeroImg,
  },
  {
    num: "03",
    title: "Ecosphere",
    tag: "Global Advisory",
    desc: "A global advisory ecosystem driving visionary leadership, 120+ day Gurukul cohorts (10 students/batch), and strategic SwaGrama partnerships worldwide.",
    path: "/v2/ecosphere",
    image: V2_IMAGES.ecosphereCampusImg,
  },
];

const HOME_INTEGRATED_CARDS = [
  {
    tag: "Clinics & Automation",
    title: "Empowering Ayurvedic Practice & Individual Tracking",
    image: V2_IMAGES.card1ClinicTechImg,
    body: "From clinic management and automation solutions that help Ayurvedic practitioners streamline their practice, to a unified platform that enables individuals to access services and track their wellness journey, JYA bridges traditional healthcare wisdom with modern technology.",
    to: "/v2/global-ayurx",
    cta: "Explore Clinical Tools",
  },
  {
    tag: "Commerce, Barter & Academy",
    title: "Organic Formulations, Barter Network & Curated Study",
    image: V2_IMAGES.card2OrganicMarketImg,
    body: "The ecosystem also supports clinics, hospitals and Ayurvedic centres with digital marketing and growth services, enables access to organic and high-quality products through its commerce and barter network, creates opportunities to source and sell organic produce, and makes knowledge accessible through curated learning programmes and courses.",
    to: "/v2/global-ayurx?tab=barter",
    cta: "Visit Barter & E-Shop",
  },
  {
    tag: "Unified Community Platform",
    title: "Built for Practitioners, Seekers & Institutions Together",
    image: V2_IMAGES.card3CommunityEcoImg,
    body: "Whether you are a healthcare practitioner looking to modernise your practice, an individual seeking a more informed approach to wellness, a healthcare institution looking to strengthen its digital presence, or someone interested in learning, sourcing and sharing quality products, JYA brings these opportunities together.",
    to: "/v2/ecosphere",
    cta: "Explore Community Hub",
  },
];

const HOME_TIMELINE_STEPS = [
  {
    tag: "OPD · IPD · Ayurmitra",
    title: "Services & Clinical Care",
    description:
      "Reserve verified Ayurvedic OPD consultations, supervised IPD care, Panchakarma detoxification, or clinic digital solutions directly.",
    image: V2_IMAGES.ayurxHeroImg,
    bullets: [
      "Direct guest & member booking without signup friction",
      "Vaidya-led OPD, supervised IPD & Panchakarma detox",
      "Automatic 5%–20% discount applied for active pass holders",
    ],
    to: "/v2/global-ayurx",
    cta: "Book Clinical Services",
  },
  {
    tag: "Admin-Verified Exchange",
    title: "E-Shop & Barter Goods",
    description:
      "Shop pure herbal formulations or list items to sell and barter—verified by Admin quality check before going live to other community users.",
    image: V2_IMAGES.barterHeroImg,
    bullets: [
      "Classical Ayurvedic formulations & seasonal remedies",
      "Dedicated Sell & Barter listing workflow with image upload",
      "Mandatory Admin verification before live community visibility",
    ],
    to: "/v2/global-ayurx?tab=barter",
    cta: "Enter Barter & E-Shop",
  },
  {
    tag: "10 Students / Batch · 20% Off",
    title: "Academy & Ecosphere Grant",
    description:
      "Apply for 120+ day Summer (स्वग्रीष्मजाविहार), Rainy (स्ववर्ष्यजाविहार), or Winter (स्वहैमन्तजाविहार) residential cohorts across 5 departments & 21 expertise courses with 20% fee scholarship (₹1,12,000).",
    image: V2_IMAGES.gurukulLessonImg,
    bullets: [
      "Only 10 residential students per batch across 5 departments",
      "21 expertise courses under experienced senior Vaidyas",
      "Complimentary entrance exam with 20% EcoSphere grant",
    ],
    to: "/v2/ecosphere",
    cta: "Explore Academy Tracks",
  },
  {
    tag: "Lavale Village Sanctuary",
    title: "Community & SwaGrama Visits",
    description:
      "Experience regenerative village rhythms in Lavale through curated Day Immersions or Overnight Business Model stays.",
    image: V2_IMAGES.ecosphereCampusImg,
    bullets: [
      "Regenerative zero-waste campus near Lavale, Pune",
      "Day Immersion & Overnight Business Model experience",
      "Soil-to-kitchen Ayurvedic residential demonstrations",
    ],
    to: "/v2/ecosphere?tab=swagram",
    cta: "Plan SwaGrama Visit",
  },
  {
    tag: "5% · 10% · 20% Tiers",
    title: "Membership & Live Events",
    description:
      "Activate JYA Open, Shatayush World (₹500 · 5%), GlobalAyurX (₹5,000 · 10%), or Ecosphere (20%) passes and reserve lecture seats directly.",
    image: V2_IMAGES.membershipSanctuaryHeroImg,
    bullets: [
      "Continuous 5%–20% savings across clinics, shops & stays",
      "Direct reservations for Shatayush lectures & symposia",
      "Unified 6-tab User Dashboard with full analytics",
    ],
    to: "/v2/membership",
    cta: "Compare Membership Passes",
  },
];

const HOME_PILLAR_FOCUS_CARDS = ECOSYSTEM_PILLARS.map((item) => ({
  title: item.title,
  tag: item.tag,
  desc: item.desc,
  src: item.image,
  to: item.path,
}));

export default function V2HomePage() {
  const navigate = useNavigate();
  const lenis = useLenis();
  const {
    state,
    currentUser,
    getDiscountPercent,
    createEnquiry,
    toggleWishlist,
    addToCart,
    setPendingAuthIntent,
  } = useV2Store();

  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const discountPercent = getDiscountPercent();

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
      callbackSlot: HOME_CALLBACK_SLOTS[0].value,
      interest: ENQUIRY_INTEREST_OPTIONS[0],
      message: "",
    },
  });

  const watchedCallbackSlot = useWatch({ control, name: "callbackSlot" });

  const handleOpenEnquiry = () => {
    reset({
      name: currentUser?.name || "",
      phone: currentUser?.phone || "",
      email: currentUser?.email || "",
      city: currentUser?.city || "Pune",
      callbackMode: CALLBACK_MODES[0],
      callbackSlot: HOME_CALLBACK_SLOTS[0].value,
      interest: ENQUIRY_INTEREST_OPTIONS[0],
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
      sourcePage: "Home V2",
    });
    setEnquiryOpen(false);
  };

  const scrollToSection = (id) => {
    if (lenis) {
      lenis.scrollTo(`#${id}`, { offset: -72 });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWishlistItem = (itemId) => {
    if (!currentUser) {
      setPendingAuthIntent({
        type: "wishlist",
        itemId,
        returnTo: "/v2",
      });
      navigate("/v2/login");
      return;
    }
    toggleWishlist(itemId);
  };

  const featuredProducts = state.listings.filter(
    (item) => item.status === "approved" && item.type === "product",
  );

  const insightHoverItems = [
    ...INITIAL_EVENTS.slice(0, 2).map((evt, idx) => ({
      category: "Upcoming Event",
      badge: evt.date,
      title: evt.title,
      description: `${evt.location} — ${evt.description}`,
      image:
        idx === 0
          ? V2_IMAGES.insightEventHeroImg
          : V2_IMAGES.communityGatheringImg,
      link: "/v2/insight",
      cta: "Book Event Seat",
    })),
    {
      category: "Knowledge Archive",
      badge: "Research PDFs",
      title: "Preventive Ayurveda & Village Policy Whitepapers",
      description:
        "Download classical monographs on circadian Dosha living, Nadi clinical insights, and regenerative village infrastructure.",
      image: V2_IMAGES.resourceWhitepaperImg,
      link: "/v2/insight?tab=whitepapers",
      cta: "Explore Whitepapers",
    },
    {
      category: "Audio Dialogues",
      badge: "Vaidya Episodes",
      title: "Conversations on Shatayushi Longevity & Ethics",
      description:
        "Tune into recorded discussions with SwaGrama Vaidyas, scholars, and holistic eco-village mentors.",
      image: V2_IMAGES.resourcePodcastImg,
      link: "/v2/insight?tab=podcasts",
      cta: "Listen Podcasts",
    },
  ];

  return (
    <div className="bg-[#FDFBF7] text-[#0f3d26] overflow-x-hidden">
      <TwentyFirstHero
        images={[
          V2_IMAGES.homeSanctuaryImg,
          V2_IMAGES.shatayushSunriseImg,
          V2_IMAGES.ayurxHeroImg,
          V2_IMAGES.ecosphereCampusImg,
        ]}
        badgeLabel="One Universe. One Community. One Life."
        badgeTo="/v2/global-ayurx?tab=barter"
        title={
          <>
            The Digital <KineticHeroHighlight>Intelligence</KineticHeroHighlight>{" "}
            of Natural Living.
          </>
        }
        subtitle="Your gateway to Ayurveda, Wellness, Learning, Community and a Sustainable Life — uniting preventive OPD & Panchakarma care, Admin-verified barter exchange, 120+ day residential Gurukul cohorts, and self-reliant SwaGrama village living."
        actions={
          <>
            <button
              type="button"
              onClick={() => scrollToSection("v2-bento-ecosystem")}
              className="group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#071E14] shadow-lg transition-colors hover:bg-[#E7D7B5]"
            >
              <span>Explore JYA</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <Link
              to="/v2/membership"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#FAF5E8]/45 bg-[#071E14]/55 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#FAF5E8] backdrop-blur-md transition-colors hover:border-[#C9A45C] hover:bg-[#071E14]/75"
            >
              Join The Movement
            </Link>
            <Link
              to={currentUser ? "/v2/dashboard" : "/v2/login"}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#C9A45C]/50 bg-[#071E14]/50 px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-wider text-[#E7D7B5] backdrop-blur-md hover:bg-[#C9A45C]/20 transition-colors"
            >
              <span>{currentUser ? "Dashboard" : "Member Sign In"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </>
        }
  
      />

      <section
        id="v2-bento-ecosystem"
        className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 lg:py-20 space-y-12"
      >
        <div className="grid  items-end">
          <div className="lg:col-span-7">
 
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f3d26] leading-tight">
              Ancient Wisdom. Modern Intelligence.{" "}<br/>
              <span className="italic text-[#8b6534]">A Better Way of Living.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-2 text-sm text-[#0f3d26]/80 leading-relaxed mt-2" >
            <p className="font-serif font-semibold text-[#0f3d26]">
              JnanaYogAyu (JYA) is an integrated ecosystem bringing together health, wellness, Ayurveda, technology, learning and conscious living on a single platform.
            </p>
            <p className="text-xs text-[#0f3d26]/70">
              Rooted in the timeless principles of Jnana (Knowledge), Yoga and Ayurveda (Ayu), JYA connects individuals, healthcare practitioners, clinics, hospitals, wellness centres and businesses through services and digital solutions.
            </p>
          </div>
        </div>

        <BentoGrid>
          <BentoCard
            className="md:col-span-2"
            name="OPD Clinics, IPD Stays & Digital Care"
            badge="Global AyurX Clinical Hub"
            Icon={Stethoscope}
            image={V2_IMAGES.ayurxHeroImg}
            description="Direct booking for Vaidya consultations, supervised Panchakarma detox rituals, Ayurmitra digital tools, and patient camps."
            href="/v2/global-ayurx"
            cta="Book Clinical Care"
          />
          <BentoCard
            className="md:col-span-1"
            name="Herbal E-Shop & Barter"
            badge="Verified Exchange"
            Icon={ShoppingCart}
            image={V2_IMAGES.barterHeroImg}
            description="Shop classical formulations or add produce to sell and barter under mandatory Admin verification."
            href="/v2/global-ayurx?tab=barter"
            cta="Open Marketplace"
          />
          <BentoCard
            className="md:col-span-1"
            name="120+ Day Gurukul"
            badge="SwaGrama · EcoSphere"
            Icon={GraduationCap}
            image={V2_IMAGES.ecosphereCampusImg}
            description="Seasonal residential cohorts (10 students/batch · 5 depts · 21 courses) with 20% fee grant via complimentary entrance assessment."
            href="/v2/ecosphere"
            cta="Apply Entrance Grant"
          />
          <BentoCard
            className="md:col-span-2"
            name="Direct Concierge Guidance & Campus Visits"
            badge="SwaGrama Sanctuary · Lavale"
            Icon={Calendar}
            image={V2_IMAGES.contactSwagramaHeroImg}
            description="Speak directly with our Vaidya and SwaGrama admissions coordinators on consultations, cohorts, or village business visits."
            onClick={handleOpenEnquiry}
            cta="Enquire With Coordinators"
          />
        </BentoGrid>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOME_INTEGRATED_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0f3d26]">
                    {card.tag}
                  </span>
                  <h3 className="mt-3 font-serif text-xl text-[#0f3d26] leading-snug">
                    {card.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#0f3d26]/75 leading-relaxed">
                    {card.body}
                  </p>
                </div>
              </div>
              <div className="px-6 pb-6 pt-3 border-t border-[#EDE5D5]">
                <Link
                  to={card.to}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f3d26] hover:text-[#8b6534]"
                >
                  <span>{card.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-[#C9A45C]/40 bg-gradient-to-r from-[#071E14] via-[#0D3323] to-[#12432D] px-6 py-8 sm:px-10 text-center text-[#FAF5E8] shadow-xl">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF5E8]">
            One ecosystem. Multiple possibilities.
          </h3>
          <p className="mt-2 font-serif text-base sm:text-lg italic text-[#E7D7B5]">
            A more connected approach to health, wellness and living.
          </p>
        </div>
      </section>

      <section className="bg-[#F9F6EE] border-y border-[#EDE5D5]">
        <Timeline
          data={HOME_TIMELINE_STEPS}
          title="Integrated Experience Across Every JYA Pillar"
          subtitle="Explore clinical care, Admin-verified barter exchange, Gurukul admission, SwaGrama visits, and lifetime passes across one connected ecosystem."
        />
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 lg:py-20 space-y-14">
        <div>
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6534]">
              The Core Architecture
            </span>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f3d26]">
              Three Pillars of the <span className="italic text-[#8b6534]">JYA</span> Ecosystem
            </h2>
          </div>

          <FocusCards cards={HOME_PILLAR_FOCUS_CARDS} />
        </div>

        <AceternityFeaturesSection
          eyebrow="Why Humanity Needs JYA"
          title="From Modern Fragmentation to Conscious Balance"
          subtitle="Five modern challenges met with five foundational Ayurvedic and community-living solutions."
          items={[
            ...HOME_WHY_JYA[0].items.map((prob, idx) => ({
              group: "Problem",
              title: prob.text,
              description: prob.desc,
              Icon: [Brain, HeartPulse, Smartphone, Unplug, Globe][idx % 5],
            })),
            ...HOME_WHY_JYA[1].items.map((sol, idx) => ({
              group: "Solution",
              title: sol.text,
              description: sol.desc,
              Icon: [Leaf, Users, Cpu, Sprout, TreePine][idx % 5],
            })),
          ]}
        />
      </section>

      <FeatureShowcase108
        items={MUKTIKHELA_PREVIEW_STEPS.map((st) => ({
          shortLabel: st.title,
          title: st.title,
          designation: "Confidential Flow · Encrypted Mobile Self-Discovery",
          quote: st.desc,
          src: st.image,
        }))}
        eyebrow="Muktikhela Assessment"
        title="Interactive Self-Discovery Guided for Daily Clarity"
        subtitle="Encrypted family profile setup, automatic BMI tracking, dosha Q&A, Zones A–D, and structured Vaidya scorecards synced straight to your Dashboard."
        actionTo="/v2/muktikhela"
        actionLabel="Explore Full Muktikhela & Health Zones"
        containImage
      />

      <section className="bg-[#071E14] text-[#FAF5E8] border-b border-[#C9A45C]/25 py-8 px-4 sm:px-6 lg:px-8 2xl:px-14">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MUKTIKHELA_ZONES.map((z) => (
            <Link
              key={z.code}
              to="/v2/muktikhela"
              className="rounded-2xl border border-[#C9A45C]/30 bg-[#0A261A] p-4 hover:border-[#C9A45C] transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9A45C]">
                  Zone {z.code} · {z.sanskrit}
                </span>
                <h4 className="mt-1 font-serif text-lg text-[#FAF5E8]">
                  {z.name}
                </h4>
                <p className="mt-1 text-xs text-[#FAF5E8]/75 leading-relaxed">
                  {z.summary}
                </p>
              </div>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#E7D7B5]">
                Inspect Zone {z.code} <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 2xl:px-14 py-14 lg:py-20 space-y-14">
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6534]">
                Clinical Bookings &amp; Herbal E-Shop
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#0f3d26]">
                A Healthier Life, Rooted in Nature &amp; Community
              </h2>
            </div>
            <Link
              to="/v2/global-ayurx"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0f3d26] hover:text-[#8b6534]"
            >
              <span>Browse Full Global AyurX</span>
            <ArrowRight className="h-4 w-4 text-[#C9A45C]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WELLNESS_SERVICES.slice(0, 2).map((srv) => {
            const finalPrice = Math.round(
              srv.price * (1 - discountPercent / 100),
            );
            const isSaved =
              currentUser &&
              state.wishlist.some(
                (w) => w.userId === currentUser.id && w.itemId === srv.id,
              );
            return (
              <div
                key={srv.id}
                className="group rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#e6efea] px-3 py-1 text-[10px] font-bold uppercase text-[#0f3d26]">
                        {srv.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleWishlistItem(srv.id)}
                        className={`rounded-full p-2 border ${
                          isSaved
                            ? "border-[#C9A45C] bg-[#C9A45C]/20 text-[#8b6534]"
                            : "border-[#0f3d26]/15 text-[#0f3d26]/60"
                        }`}
                        aria-label="Save service"
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="mt-3 font-serif text-xl text-[#0f3d26]">
                      {srv.title}
                    </h3>
                    <p className="mt-2 text-xs text-[#0f3d26]/70 leading-relaxed">
                      {srv.summary}
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-[#EDE5D5] flex items-center justify-between">
                    <span className="font-serif text-lg font-bold text-[#0f3d26]">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </span>
                    <Link
                      to="/v2/global-ayurx"
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                    >
                      Book Slot
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {featuredProducts.slice(0, 1).map((item) => (
            <div
              key={item.id}
              className="group rounded-3xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col"
            >
              <div className="aspect-[16/10] w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#FAF5E8] border border-[#C9A45C]/40 px-3 py-1 text-[10px] font-bold uppercase text-[#8b6534]">
                      Herbal E-Shop
                    </span>
                    <button
                      type="button"
                      onClick={() => handleWishlistItem(item.id)}
                      className="rounded-full p-2 border border-[#0f3d26]/15 text-[#0f3d26]/60"
                      aria-label="Save item"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-3 font-serif text-xl text-[#0f3d26]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-[#0f3d26]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#EDE5D5] flex items-center justify-between">
                  <span className="font-serif text-lg font-bold text-[#0f3d26]">
                    ₹{item.price.toLocaleString("en-IN")}
                  </span>
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6534]">
                <Layers className="h-3.5 w-3.5" />
                <span>Six JYA Services</span>
              </span>
              <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[#0f3d26]">
                Value Exchange, Gurukul Learning, Media &amp; Advisory
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#0f3d26]/70">
              Every service listed in JYA links directly to verified clinical, commerce, or community workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {HOME_ECOSYSTEM_SERVICES.map((srv) => (
              <Link
                key={srv.name}
                to={srv.to}
                className="group rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden shadow-sm hover:border-[#C9A45C] hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="aspect-[16/10] w-full overflow-hidden bg-[#FBF8F1]">
                  <img
                    src={srv.image}
                    alt={srv.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#0f3d26] group-hover:text-[#8b6534] transition-colors">
                      {srv.name}
                    </h4>
                    <p className="mt-1.5 text-xs text-[#0f3d26]/75 leading-relaxed">
                      {srv.blurb}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0f3d26]">
                    Explore <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-[#C9A45C]/35 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-7 sm:p-9 text-[#FAF5E8] flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
         
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF5E8]">
                Learn Traditionally. Practice Consciously. Live Naturally.
              </h3>
              <p className="text-xs sm:text-sm text-[#FAF5E8]/80 leading-relaxed">
                Swagurukul is a space where ancient Ayurvedic wisdom meets practical learning. Knowledge becomes meaningful when it becomes part of everyday life.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {HOME_SWAGURUKUL_PILLARS.map((item) => (
                  <div
                    key={item.num}
                    className="rounded-2xl border border-white/15 bg-white/5 p-4"
                  >
                    <Leaf className="h-4 w-4 text-[#C9A45C]" />
                    <h4 className="mt-2 font-serif text-sm font-bold text-[#FAF5E8]">
                      {item.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-[#FAF5E8]/75 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap gap-3">
              <Link
                to="/v2/ecosphere"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#C9A45C] px-6 py-2.5 text-xs font-bold text-[#071E14] hover:bg-[#E7D7B5] transition-colors"
              >
                Explore Swagurukul <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/v2/membership?tier=ecosphere"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#E7D7B5]/40 px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-white/10 transition-colors"
              >
                120+ Day Gurukul Admission
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-[#EDE5D5] bg-[#FBF8F1] p-7 sm:p-9 text-[#0f3d26] flex flex-col justify-between shadow-sm">
            <div className="space-y-4">
        
              <h3 className="font-serif text-2xl sm:text-3xl text-[#0f3d26]">
                Grow Together. Live Consciously. Create a Better Tomorrow.
              </h3>
              <p className="text-xs sm:text-sm text-[#0f3d26]/75 leading-relaxed">
                A community living ecosystem fostering wellness, self-reliance, and meaningful human connections through conscious and sustainable living.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {HOME_SWAGRAMA_HIGHLIGHTS.map((item) => (
                  <div
                    key={item.num}
                    className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-4 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#C9A45C] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-serif text-sm font-bold text-[#0f3d26]">
                        {item.title}
                      </h4>
                      <p className="mt-1 text-[11px] text-[#0f3d26]/70 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-5 border-t border-[#EDE5D5] flex flex-wrap gap-3">
              <Link
                to="/v2/ecosphere?tab=community"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                Join Our Community <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
              </Link>
              <Link
                to="/v2/contact"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-[#0f3d26]/20 px-6 py-2.5 text-xs font-bold text-[#0f3d26] hover:bg-[#e6efea] transition-colors"
              >
                Book Lavale Campus Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F9F6EE] border-t border-[#EDE5D5] py-16 lg:py-24 px-4 sm:px-6 lg:px-8 2xl:px-14">
        <div className="w-full space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8b6534]">
                <Calendar className="h-3.5 w-3.5" />
                <span>Events · Blogs · Whitepapers · Podcasts</span>
              </span>
              <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#0f3d26]">
                Lectures, Publications &amp; Vaidya Dialogues
              </h2>
            </div>
            <Link
              to="/v2/insight"
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
            >
              <span>Visit Insight Hub</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#C9A45C]" />
            </Link>
          </div>

          <CardHoverEffect items={insightHoverItems} />

          <GalleryCarousel21st
            eyebrow="Curated Library Carousel · Blogs, Whitepapers & Podcasts"
            title="Read Reflections, Research Papers & Vaidya Episodes"
            subtitle="Slide across our complete publication library with full photography — filter by Essays, PDF Whitepapers, or Audio Dialogues."
            filters={[
              { id: "all", label: "All Library (9)" },
              { id: "blog", label: "Blogs" },
              { id: "whitepaper", label: "Whitepapers" },
              { id: "podcast", label: "Podcasts" },
            ]}
            items={[
              ...INITIAL_BLOGS.map((post, idx) => ({
                id: post.id,
                kind: "blog",
                category: "JYA Journal · Blog",
                tag: post.tag,
                meta: post.meta,
                title: post.title,
                description: post.body,
                image:
                  [
                    V2_IMAGES.resourceBlogImg,
                    V2_IMAGES.shatayushSelfAwarenessImg,
                    V2_IMAGES.shatayushConsciousLongevityImg,
                  ][idx % 3],
                to: "/v2/insight?tab=blogs",
                cta: "Read Article",
              })),
              ...INITIAL_WHITEPAPERS.map((paper, idx) => ({
                id: paper.id,
                kind: "whitepaper",
                category: "Research Whitepaper",
                tag: paper.tag,
                meta: paper.meta,
                title: paper.title,
                description: paper.summary,
                image:
                  [
                    V2_IMAGES.resourceWhitepaperImg,
                    V2_IMAGES.serviceConsultancyImg,
                    V2_IMAGES.ecosphereCampusImg,
                  ][idx % 3],
                to: "/v2/insight?tab=whitepapers",
                cta: "Download PDF",
              })),
              ...INITIAL_PODCASTS.map((ep, idx) => ({
                id: ep.id,
                kind: "podcast",
                category: "Shatayushi Podcast",
                tag: ep.tag,
                meta: ep.meta,
                title: ep.title,
                description: ep.summary,
                image:
                  [
                    V2_IMAGES.resourcePodcastImg,
                    V2_IMAGES.swagramMainImg,
                    V2_IMAGES.ayurxHeroImg,
                  ][idx % 3],
                to: "/v2/insight?tab=podcasts",
                cta: "Watch & Listen",
              })),
            ]}
          />
        </div>
      </section>

      <V2ModalShell
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        badge="Direct User Enquiry"
        title="Connect With the JYA Guidance Team"
        subtitle="Non-registered guests and members receive full response on programmes, clinics, and village visits."
      >
        <form onSubmit={handleSubmit(onSubmitEnquiry)} className="space-y-4">
          <V2FormSection
            step="01"
            title="Your Contact Details"
            hint="Direct Callback"
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
            title="Interest, Callback Slot & Message"
            hint="Coordinator Availability"
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
                  dataArray={ENQUIRY_INTEREST_OPTIONS}
                  placeholder="Select Area of Interest *"
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
              slots={HOME_CALLBACK_SLOTS}
              error={errors.callbackSlot}
            />

            <div>
              <InputArea
                name="message"
                label="Your Question or Requirement *"
                placeholder="Tell us about your preferred season, clinic consultation, or visit..."
                control={control}
                minRows={3}
                maxRows={5}
              />
              <FieldError error={errors.message} />
            </div>
          </V2FormSection>

          <div className="pt-2 flex items-center justify-end gap-3">
            <CommonButton
              type="button"
              onClick={() => setEnquiryOpen(false)}
              label="Cancel"
              className="!rounded-full !h-auto !min-h-[44px] !border !border-[#0f3d26]/20 !bg-transparent !text-[#0f3d26] !px-6 !py-2.5 !text-xs !font-bold"
            />
            <CommonButton
              type="submit"
              label="Send Enquiry"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] hover:!bg-[#1a5c3a] !px-6 !py-2.5 !text-xs !font-bold"
            />
          </div>
        </form>
      </V2ModalShell>
    </div>
  );
}
