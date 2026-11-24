import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  Activity,
  ArrowDownToLine,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  Calendar,
  ChevronRight,
  Eye,
  Filter,
  HeartPulse,
  LayoutDashboard,
  Moon,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
  TrendingUp,
  UserCheck,
  X,
  Zap,
} from "lucide-react";

const DASHBOARD_VIEWS = [
  {
    id: "command",
    label: "Home Overview",
    short: "Overview",
    hint: "Savings, visits & activity",
    icon: LayoutDashboard,
    description: "Your membership savings, upcoming visits, health summary, and recent activity.",
    prompt: "Search appointments, herbal orders & health reports...",
  },
  {
    id: "trends",
    label: "Health Progress",
    short: "Health",
    hint: "Daily habits & wellness score",
    icon: TrendingUp,
    description: "Track your daily routine, energy, digestion, and Muktikhela checkup reports.",
    prompt: "Search your health reports & daily progress...",
  },
  {
    id: "metrics",
    label: "Visits & Orders",
    short: "Visits",
    hint: "Appointments & E-Shop bills",
    icon: BarChart3,
    description: "View all booked clinic visits, village stays, herbal orders, and total money saved.",
    prompt: "Search booked visits & herbal orders...",
  },
  {
    id: "events",
    label: "Events & Passes",
    short: "Events",
    hint: "Classes, tickets & requests",
    icon: BriefcaseBusiness,
    description: "View your confirmed event tickets, Academy classes, and submitted requests.",
    prompt: "Search event tickets, classes & requests...",
  },
];

const PERIOD_OPTIONS = [
  { id: "monthly", label: "6 Months" },
  { id: "weekly", label: "7 Days" },
  { id: "quarterly", label: "90 Days" },
];

function formatCompactInr(val) {
  const num = Number(val) || 0;
  return `₹${num.toLocaleString("en-IN")}`;
}

function saveCsvReport(filename, rows) {
  const csv = rows
    .map((row) =>
      row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(",")
    )
    .join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

function GlassChartTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-2xl border border-[#C9A45C]/60 bg-[#071E14] px-3.5 py-2.5 text-xs text-[#FAF5E8] shadow-xl">
      {label && <p className="font-serif font-bold text-[#E7D7B5] mb-1">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center justify-between gap-4">
          <span className="text-[#FAF5E8]/85">{entry.name}:</span>
          <span className="font-bold text-[#C9A45C]">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

function GlassStatusPill({ status, dark = false }) {
  const normalized = String(status || "").toLowerCase();
  const isEmerald =
    normalized.includes("complete") ||
    normalized.includes("confirmed") ||
    normalized.includes("admitted") ||
    normalized.includes("delivered") ||
    normalized.includes("recorded");
  const isAmber =
    normalized.includes("scheduled") ||
    normalized.includes("upcoming");
  const isCoral =
    normalized.includes("cancelled");

  const pillClasses = isEmerald
    ? dark
      ? "bg-[#09644F]/40 text-[#9CF2DA] border-[#75DAC0]/45"
      : "bg-[#E7F5EE] text-[#09644F] border-[#09644F]/30"
    : isCoral
      ? dark
        ? "bg-[#A43C27]/40 text-[#FFB5A3] border-[#FF9177]/45"
        : "bg-[#FDECE8] text-[#A43C27] border-[#A43C27]/30"
      : isAmber
        ? dark
          ? "bg-[#8b6534]/40 text-[#F5DEB0] border-[#C9A45C]/50"
          : "bg-[#FDF5E2] text-[#7A5524] border-[#C9A45C]/50"
        : dark
          ? "bg-white/15 text-[#FAF5E8] border-white/25"
          : "bg-[#0f3d26]/10 text-[#0f3d26] border-[#0f3d26]/20";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide whitespace-nowrap ${pillClasses}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      <span>{status}</span>
    </span>
  );
}

function GlassModalOverlay({ title, children, onClose, dark }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-[#071E14]/70 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`w-full sm:w-[560px] rounded-3xl border p-6 shadow-2xl ${
          dark
            ? "border-[#C9A45C]/45 bg-[#0E2419] text-[#FAF5E8]"
            : "border-[#0f3d26]/15 bg-[#FFFDF9] text-[#0f3d26]"
        }`}
      >
        <div
          className={`flex items-center justify-between gap-3 pb-4 border-b ${
            dark ? "border-[#FAF5E8]/15" : "border-[#0f3d26]/15"
          }`}
        >
          <h2 className="font-serif text-2xl font-bold tracking-tight">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              dark
                ? "border-[#FAF5E8]/25 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                : "border-[#0f3d26]/20 bg-[#FAF5E8] text-[#0f3d26] hover:bg-[#0f3d26]/10"
            }`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="pt-4">{children}</div>
      </div>
    </div>
  );
}

export function GlassyDashboard({
  workspaceName = "MY JYA ACCOUNT",
  workspaceTagline = "Personal Health & Membership",
  panelFrost = 12,
  initialTheme = "light",
  userName = "Member",
  tierName = "JYA Open",
  discountPercent = 0,
  totalSavedAmount = 0,
  totalSpentAmount = 0,
  bookings = [],
  orders = [],
  reports = [],
  communityPasses = [],
  monthlyTrendData = [],
  weeklyDinacharyaData = [],
  radarMetrics = [],
  savingsBreakdownData = [],
  activityMixData = [],
  activityFeed = [],
  enquiriesCount = 0,
  onInspectBooking,
  onInspectReport,
  onInspectPass,
  renderAppointmentsLedger,
  renderOrdersLedger,
  renderReportsLedger,
  renderEnquiriesLedger,
}) {
  const [view, setView] = useState("command");
  const [period, setPeriod] = useState("monthly");
  const [theme, setTheme] = useState(initialTheme);
  const [modal, setModal] = useState(null);
  const [readNotices, setReadNotices] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activityFilter, setActivityFilter] = useState("All activity");
  const [commandSearch, setCommandSearch] = useState("");
  const [selectedSliceIndex, setSelectedSliceIndex] = useState(null);

  const isDark = theme === "dark";
  const currentView =
    DASHBOARD_VIEWS.find((v) => v.id === view) || DASHBOARD_VIEWS[0];

  const frostClass =
    panelFrost >= 20
      ? "backdrop-blur-2xl"
      : panelFrost >= 10
        ? "backdrop-blur-xl"
        : panelFrost > 0
          ? "backdrop-blur-md"
          : "";

  const stageSurface = isDark
    ? "border-[#C9A45C]/35 bg-[#091E14]/75 text-[#FAF5E8]"
    : "border-white ring-1 ring-[#0f3d26]/10 bg-white/65 text-[#0f3d26]";

  const panelSurface = isDark
    ? "border-[#C9A45C]/25 bg-[#112E20]/80 text-[#FAF5E8]"
    : "border-white ring-1 ring-[#0f3d26]/10 bg-white/85 text-[#0f3d26]";

  const railSurface = isDark
    ? "border-[#C9A45C]/35 bg-[#0A2216]/80 text-[#FAF5E8]"
    : "border-white ring-1 ring-[#0f3d26]/10 bg-white/75 text-[#0f3d26]";

  const subtleBox = isDark
    ? "border-[#FAF5E8]/15 bg-[#0A2016]/80"
    : "border-[#0f3d26]/15 bg-[#FAF5E8]/85";

  const mutedText = isDark ? "text-[#D4CCB8]" : "text-[#3B5244]";
  const borderLine = isDark ? "border-[#FAF5E8]/15" : "border-[#0f3d26]/15";
  const goldText = isDark ? "text-[#C9A45C]" : "text-[#8b6534]";
  const emeraldText = isDark ? "text-[#9CF2DA]" : "text-[#09644F]";
  const coralText = isDark ? "text-[#FFB5A3]" : "text-[#A43C27]";

  const latestReport = reports[0] || null;
  const nextBooking = bookings[0] || null;

  const viewBadgeCounts = {
    command: activityFeed.length,
    trends: reports.length,
    metrics: bookings.length + orders.length,
    events: enquiriesCount,
  };

  const dinacharyaAvg =
    weeklyDinacharyaData.length > 0
      ? Math.round(
          weeklyDinacharyaData.reduce((acc, d) => acc + (d.RoutineScore || 0), 0) /
            weeklyDinacharyaData.length
        )
      : 89;

  const hydrationAvg =
    weeklyDinacharyaData.length > 0
      ? Math.round(
          weeklyDinacharyaData.reduce((acc, d) => acc + (d.Hydration || 0), 0) /
            weeklyDinacharyaData.length
        )
      : 86;

  const vitalityLatest =
    monthlyTrendData[monthlyTrendData.length - 1]?.Vitality || 92;
  const agniLatest =
    monthlyTrendData[monthlyTrendData.length - 1]?.Agni || 89;

  const filteredActivity = activityFeed.filter((item) => {
    const matchesSearch = [item.title, item.category, item.status, item.meta]
      .join(" ")
      .toLowerCase()
      .includes(searchQuery.trim().toLowerCase());
    const matchesCategory =
      activityFilter === "All activity" || item.category === activityFilter;
    return matchesSearch && matchesCategory;
  });

  const exportWellnessCsv = () => {
    saveCsvReport(`jya-health-progress-${period}.csv`, [
      ["Time Point", "Energy Score", "Digestion Score", "Daily Routine Score"],
      ...(period === "weekly"
        ? weeklyDinacharyaData.map((d) => [d.day, d.RoutineScore, d.Hydration, d.RoutineScore])
        : monthlyTrendData.map((m) => [m.month, m.Vitality, m.Agni, dinacharyaAvg])),
    ]);
  };

  const exportEventsCsv = () => {
    saveCsvReport("jya-events-passes.csv", [
      ["ID", "Title", "Type", "City", "Status", "Details"],
      ...communityPasses.map((item) => [
        item.id,
        item.title,
        item.category,
        item.location,
        item.status,
        item.summary,
      ]),
    ]);
  };

  const totalActivityCount = activityMixData.reduce(
    (sum, item) => sum + (Number(item.value) || 0),
    0
  );

  const commandSearchTerms = commandSearch
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const matchedViews = DASHBOARD_VIEWS.filter((v) =>
    commandSearchTerms.every((t) =>
      `${v.label} ${v.description} ${v.prompt}`.toLowerCase().includes(t)
    )
  );
  const matchedFeedRecords = commandSearchTerms.length
    ? activityFeed
        .filter((r) =>
          commandSearchTerms.every((t) =>
            `${r.title} ${r.category} ${r.status}`.toLowerCase().includes(t)
          )
        )
        .slice(0, 5)
    : [];

  return (
    <div
      className={`relative isolate w-full overflow-x-clip py-6 lg:py-8 px-4 sm:px-6 lg:px-8 2xl:px-14 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-[#061A10] via-[#0B2A1B] to-[#082216] text-[#FAF5E8]"
          : "bg-gradient-to-br from-[#EAE1CE] via-[#F7F3E8] to-[#D4E3D9] text-[#0f3d26]"
      }`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className={`absolute -top-28 -left-24 h-96 w-96 rounded-full blur-3xl ${
            isDark ? "bg-[#1A6B4A]/40" : "bg-[#0f3d26]/20"
          }`}
        />
        <div
          className={`absolute top-1/3 -right-16 h-96 w-96 rounded-full blur-3xl ${
            isDark ? "bg-[#C9A45C]/25" : "bg-[#C9A45C]/30"
          }`}
        />
        <div
          className={`absolute -bottom-24 left-1/3 h-80 w-80 rounded-full blur-3xl ${
            isDark ? "bg-[#09644F]/35" : "bg-[#4F8A6E]/25"
          }`}
        />
      </div>

      <div className="w-full space-y-4">
        <header
          className={`w-full rounded-3xl border px-4 sm:px-6 py-3 shadow-lg ${frostClass} ${railSurface}`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0f3d26] text-[#C9A45C] shadow-md border border-[#C9A45C]/50">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="font-serif text-xs sm:text-sm font-extrabold tracking-[0.14em] uppercase truncate">
                    {workspaceName} · {userName}
                  </p>
                  <p className={`text-[11px] font-medium truncate ${mutedText}`}>
                    {workspaceTagline} · {tierName} ({discountPercent}% Active)
                  </p>
                </div>
              </div>

              <div className="flex lg:hidden items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTheme(isDark ? "light" : "dark")}
                  aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                    isDark
                      ? "border-[#FAF5E8]/25 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                      : "border-[#0f3d26]/20 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                  }`}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReadNotices(true);
                    setModal("notifications");
                  }}
                  aria-label="Workspace notifications"
                  className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                    isDark
                      ? "border-[#FAF5E8]/25 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                      : "border-[#0f3d26]/20 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                  }`}
                >
                  <Bell className="h-4 w-4" />
                  {!readNotices && communityPasses.length > 0 && (
                    <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C9A45C] ring-2 ring-white" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModal("search")}
              aria-label={`Search ${workspaceName}`}
              className={`flex items-center gap-3 w-full lg:w-96 min-h-[44px] rounded-full border px-4 py-2 text-left transition-colors ${
                isDark
                  ? "border-[#FAF5E8]/20 bg-[#122B1F] text-[#FAF5E8] hover:bg-[#193A2A]"
                  : "border-[#0f3d26]/20 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
              }`}
            >
              <span className="h-5 w-5 shrink-0 rounded-full bg-gradient-to-tr from-[#0f3d26] via-[#C9A45C] to-[#72ECF1] shadow-sm ring-2 ring-[#C9A45C]/40" />
              <span className="text-xs font-semibold truncate flex-1">
                {currentView.prompt}
              </span>
              <Search className={`h-4 w-4 shrink-0 ${mutedText}`} />
            </button>

            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isDark
                    ? "border-[#FAF5E8]/25 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                    : "border-[#0f3d26]/20 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                }`}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setReadNotices(true);
                  setModal("notifications");
                }}
                aria-label="Workspace notifications"
                className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                  isDark
                    ? "border-[#FAF5E8]/25 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                    : "border-[#0f3d26]/20 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                }`}
              >
                <Bell className="h-4 w-4" />
                {!readNotices && communityPasses.length > 0 && (
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#C9A45C] ring-2 ring-white" />
                )}
              </button>
              <Link
                to="/v2/profile"
                className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-xs font-bold transition-colors whitespace-nowrap ${
                  isDark
                    ? "border-[#FAF5E8]/25 bg-[#122B1F] text-[#FAF5E8] hover:bg-[#193A2A]"
                    : "border-[#0f3d26]/25 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                }`}
              >
                <UserCheck className={`h-3.5 w-3.5 ${goldText}`} />
                <span>My Profile</span>
              </Link>
              <Link
                to="/v2/global-ayurx"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] border border-[#C9A45C]/40 px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors shadow-md whitespace-nowrap"
              >
                <span>+ Book Visit</span>
              </Link>
            </div>
          </div>
        </header>

        <nav
          aria-label="Mobile workspace sections"
          className={`grid grid-cols-2 sm:grid-cols-4 gap-2 lg:hidden rounded-2xl border p-2 shadow-md ${frostClass} ${railSurface}`}
        >
          {DASHBOARD_VIEWS.map((item) => {
            const Icon = item.icon;
            const isSelected = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setView(item.id)}
                aria-current={isSelected ? "page" : undefined}
                className={`flex items-center justify-center gap-2 min-h-[44px] rounded-xl px-3 py-2 text-xs font-bold border transition-all ${
                  isSelected
                    ? "border-[#C9A45C] bg-[#0f3d26] text-[#FAF5E8] shadow-sm"
                    : isDark
                      ? "border-[#FAF5E8]/15 bg-[#122B1F] text-[#FAF5E8] hover:border-[#C9A45C]/60 hover:bg-[#193A2A]"
                      : "border-[#0f3d26]/15 bg-white text-[#0f3d26] hover:border-[#0f3d26]/40 hover:bg-[#FAF5E8]"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isSelected ? "text-[#C9A45C]" : ""}`} />
                <span className="truncate">{item.short}</span>
              </button>
            );
          })}
        </nav>

        <div className="flex flex-col lg:flex-row items-start gap-5">
          <aside
            aria-label="Dashboard sections menu"
            className={`hidden lg:flex flex-col gap-4 sticky top-24 w-72 shrink-0 rounded-3xl border p-4 shadow-xl ${frostClass} ${railSurface}`}
          >
            <div className={`px-2 pb-3 border-b ${borderLine}`}>
              <p className={`text-[10px] font-extrabold uppercase tracking-[0.18em] ${goldText}`}>
                Dashboard Menu
              </p>
              <p className="mt-1 font-serif text-base font-bold">
                {userName}
              </p>
              <p className={`text-[11px] font-medium ${mutedText}`}>
                {tierName} · {discountPercent}% Member Discount
              </p>
            </div>

            <nav className="flex flex-col gap-2" aria-label="Primary dashboard navigation">
              {DASHBOARD_VIEWS.map((item) => {
                const Icon = item.icon;
                const isSelected = view === item.id;
                const count = viewBadgeCounts[item.id] ?? 0;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setView(item.id)}
                    aria-current={isSelected ? "page" : undefined}
                    className={`group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-all ${
                      isSelected
                        ? "border-[#C9A45C] bg-[#0f3d26] text-[#FAF5E8] shadow-md"
                        : isDark
                          ? "border-[#FAF5E8]/15 bg-[#122B1F] text-[#FAF5E8] hover:border-[#C9A45C]/65 hover:bg-[#193B2B]"
                          : "border-[#0f3d26]/15 bg-white text-[#0f3d26] hover:border-[#0f3d26]/45 hover:bg-[#F5EFE2]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                        isSelected
                          ? "bg-[#C9A45C] text-[#071E14]"
                          : isDark
                            ? "bg-white/10 text-[#C9A45C] group-hover:bg-[#C9A45C] group-hover:text-[#071E14]"
                            : "bg-[#0f3d26]/10 text-[#0f3d26] group-hover:bg-[#0f3d26] group-hover:text-[#FAF5E8]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-extrabold leading-tight truncate">
                        {item.label}
                      </p>
                      <p
                        className={`mt-0.5 text-[11px] truncate ${
                          isSelected ? "text-[#FAF5E8]/80" : mutedText
                        }`}
                      >
                        {item.hint}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-extrabold shrink-0 ${
                        isSelected
                          ? "bg-white/15 text-[#FAF5E8]"
                          : isDark
                            ? "bg-white/10 text-[#D4CCB8]"
                            : "bg-[#0f3d26]/10 text-[#0f3d26]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            <div className={`rounded-2xl border p-3.5 space-y-2.5 ${subtleBox}`}>
              <p className={`text-[10px] font-extrabold uppercase tracking-[0.16em] ${goldText}`}>
                Quick Links
              </p>
              <Link
                to="/v2/global-ayurx"
                className="flex w-full min-h-[44px] items-center justify-between rounded-full bg-[#0f3d26] px-5 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors shadow-sm"
              >
                <span>Book Clinic / Visit</span>
                <ChevronRight className="h-4 w-4 text-[#C9A45C]" />
              </Link>
              <Link
                to="/v2/muktikhela"
                className={`flex w-full min-h-[44px] items-center justify-between rounded-full border px-5 py-2.5 text-xs font-bold transition-colors ${
                  isDark
                    ? "border-[#FAF5E8]/20 bg-[#122B1F] text-[#FAF5E8] hover:bg-[#193A2A]"
                    : "border-[#0f3d26]/20 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                }`}
              >
                <span>Take Health Check</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </aside>

          <main
            className={`w-full flex-1 min-w-0 rounded-3xl border p-5 sm:p-7 lg:p-8 shadow-xl ${frostClass} ${stageSurface}`}
          >
            <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 mb-6 border-b ${borderLine}`}>
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
                  {currentView.label}
                </h1>
                <p className={`mt-1.5 text-xs sm:text-sm font-medium ${mutedText}`}>
                  {currentView.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {view !== "events" && (
                  <div
                    role="group"
                    aria-label="Reporting window"
                    className={`inline-flex items-center rounded-full border p-1 shadow-sm ${
                      isDark
                        ? "border-[#C9A45C]/30 bg-[#081911]"
                        : "border-[#0f3d26]/20 bg-white"
                    }`}
                  >
                    {PERIOD_OPTIONS.map((opt) => {
                      const activeOpt = period === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => setPeriod(opt.id)}
                          aria-pressed={activeOpt}
                          className={`min-h-[38px] rounded-full px-4 py-1.5 text-xs font-bold transition-colors whitespace-nowrap ${
                            activeOpt
                              ? "bg-[#0f3d26] text-[#FAF5E8] shadow-sm"
                              : isDark
                                ? "text-[#D4CCB8] hover:bg-white/10"
                                : "text-[#0f3d26] hover:bg-[#0f3d26]/10"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {view === "trends" && (
                  <button
                    type="button"
                    onClick={exportWellnessCsv}
                    className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors shadow-md"
                  >
                    <ArrowDownToLine className="h-4 w-4 text-[#C9A45C]" />
                    <span>Download CSV</span>
                  </button>
                )}

                {view === "events" && (
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Link
                      to="/v2/insight"
                      className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-6 py-2.5 text-xs font-bold transition-colors ${
                        isDark
                          ? "border-[#FAF5E8]/25 bg-[#122B1F] text-[#FAF5E8] hover:bg-[#193A2A]"
                          : "border-[#0f3d26]/25 bg-white text-[#0f3d26] hover:bg-[#FAF5E8]"
                      }`}
                    >
                      <span>Browse Events</span>
                    </Link>
                    <button
                      type="button"
                      onClick={exportEventsCsv}
                      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors shadow-md"
                    >
                      <ArrowDownToLine className="h-4 w-4 text-[#C9A45C]" />
                      <span>Download CSV</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {view === "command" && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                  <section
                    className={`xl:col-span-4 rounded-2xl border p-5 shadow-sm flex flex-col justify-between gap-4 ${panelSurface}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <h2 className="text-sm font-extrabold">
                          Money Saved So Far
                        </h2>
                        <p className={`text-xs font-medium ${mutedText}`}>
                          {tierName} · {discountPercent}% Member Discount
                        </p>
                      </div>
                      <span
                        className={`rounded-md px-2.5 py-1 text-[10px] font-bold uppercase ${
                          isDark
                            ? "bg-[#C9A45C]/25 text-[#F5DEB0]"
                            : "bg-[#FDF5E2] text-[#7A5524] border border-[#C9A45C]/40"
                        }`}
                      >
                        INR ₹
                      </span>
                    </div>

                    <div>
                      <p className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                        {formatCompactInr(totalSavedAmount)}
                      </p>
                      <p
                        className={`mt-2 flex flex-wrap items-center gap-1.5 text-xs font-bold ${
                          isDark ? "text-[#9CF2DA]" : "text-[#09644F]"
                        }`}
                      >
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 ${
                            isDark ? "bg-[#09644F]/40" : "bg-[#E7F5EE]"
                          }`}
                        >
                          <ArrowUpRight className="h-3.5 w-3.5" />
                          {discountPercent || 5}% off
                        </span>
                        <span className={`font-medium ${mutedText}`}>
                          saved on visits, herbal orders &amp; stays
                        </span>
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setView("trends")}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#0f3d26] px-5 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                      >
                        <span>Health Progress</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-[#C9A45C]" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setView("metrics")}
                        className={`inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-colors ${
                          isDark
                            ? "border-[#FAF5E8]/25 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                            : "border-[#0f3d26]/25 bg-[#FAF5E8] text-[#0f3d26] hover:bg-[#0f3d26]/10"
                        }`}
                      >
                        <span>Visits &amp; Orders</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div
                      className={`grid grid-cols-3 divide-x rounded-xl border p-3 ${subtleBox} ${
                        isDark ? "divide-[#FAF5E8]/15" : "divide-[#0f3d26]/15"
                      }`}
                    >
                      <div className="pr-2">
                        <p className={`text-[10px] font-bold ${mutedText}`}>Total Spent</p>
                        <p className="mt-0.5 text-xs font-extrabold truncate">
                          {formatCompactInr(totalSpentAmount)}
                        </p>
                      </div>
                      <div className="px-2">
                        <p className={`text-[10px] font-bold ${mutedText}`}>Booked Visits</p>
                        <p className="mt-0.5 text-xs font-extrabold">
                          {bookings.length} Booked
                        </p>
                      </div>
                      <div className="pl-2">
                        <p className={`text-[10px] font-bold ${mutedText}`}>Events &amp; Classes</p>
                        <p className="mt-0.5 text-xs font-extrabold">
                          {enquiriesCount} Saved
                        </p>
                      </div>
                    </div>
                  </section>

                  <div className="xl:col-span-4 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setView("metrics")}
                      className="text-left rounded-2xl border border-[#C9A45C]/50 bg-gradient-to-br from-[#0f3d26] to-[#082B1B] p-4 text-[#FAF5E8] shadow-md flex flex-col justify-between min-h-[140px] hover:brightness-110 transition-all"
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-xs font-bold">Appointments</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                          <Calendar className="h-4 w-4 text-[#C9A45C]" />
                        </span>
                      </div>
                      <p className="font-serif text-3xl font-bold">{bookings.length}</p>
                      <p className="text-[11px] text-[#E7D7B5] truncate">
                        {nextBooking
                          ? `Next: ${nextBooking.preferredDate}`
                          : "Book a visit"}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setView("metrics")}
                      className={`text-left rounded-2xl border p-4 shadow-sm flex flex-col justify-between min-h-[140px] hover:border-[#C9A45C] transition-all ${panelSurface}`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-xs font-bold">Herbal Orders</span>
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            isDark ? "bg-white/10" : "bg-[#FAF5E8]"
                          }`}
                        >
                          <Package className={`h-4 w-4 ${goldText}`} />
                        </span>
                      </div>
                      <p className="font-serif text-3xl font-bold">{orders.length}</p>
                      <p className={`text-[11px] font-medium truncate ${mutedText}`}>
                        {formatCompactInr(totalSavedAmount)} discount saved
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setView("trends")}
                      className={`text-left rounded-2xl border p-4 shadow-sm flex flex-col justify-between min-h-[140px] hover:border-[#C9A45C] transition-all ${panelSurface}`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-xs font-bold">Health Check &amp; BMI</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A43C27]/15">
                          <HeartPulse className={`h-4 w-4 ${coralText}`} />
                        </span>
                      </div>
                      <p className="font-serif text-3xl font-bold">
                        {latestReport ? Number(latestReport.bmi) : 23} BMI
                      </p>
                      <p className={`text-[11px] font-medium truncate ${mutedText}`}>
                        {latestReport
                          ? `Zone ${latestReport.dominantZone?.code} · ${latestReport.dominantZone?.name}`
                          : "Take Health Check"}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setView("events")}
                      className={`text-left rounded-2xl border p-4 shadow-sm flex flex-col justify-between min-h-[140px] hover:border-[#C9A45C] transition-all ${panelSurface}`}
                    >
                      <div className="flex items-center justify-between gap-2 w-full">
                        <span className="text-xs font-bold">Events &amp; Classes</span>
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                            isDark ? "bg-white/10" : "bg-[#FAF5E8]"
                          }`}
                        >
                          <Sparkles className={`h-4 w-4 ${isDark ? "text-[#C9A45C]" : "text-[#0f3d26]"}`} />
                        </span>
                      </div>
                      <p className="font-serif text-3xl font-bold">
                        {enquiriesCount}
                      </p>
                      <p className={`text-[11px] font-medium truncate ${mutedText}`}>
                        Tickets, classes &amp; requests
                      </p>
                    </button>
                  </div>

                  <section
                    className={`xl:col-span-4 rounded-2xl border p-5 shadow-sm flex flex-col justify-between ${panelSurface}`}
                  >
                    <div className="mb-2">
                      <h2 className="text-sm font-extrabold">
                        Energy &amp; Digestion Score
                      </h2>
                      <p className={`text-xs font-medium ${mutedText}`}>
                        Monthly energy and digestion trend
                      </p>
                    </div>
                    <div className="h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={monthlyTrendData}
                          margin={{ top: 8, right: 6, left: -24, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDark ? "#C9A45C" : "#0f3d26"}
                            strokeOpacity={0.15}
                          />
                          <XAxis
                            dataKey="month"
                            tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                          />
                          <YAxis
                            domain={[50, 100]}
                            tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                          />
                          <Tooltip content={<GlassChartTooltip />} />
                          <Bar dataKey="Vitality" name="Energy" fill="#09644F" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="Agni" name="Digestion" fill="#C9A45C" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-start">
                  <div className="xl:col-span-4 space-y-4">
                    <section className={`rounded-2xl border p-5 shadow-sm space-y-3 ${panelSurface}`}>
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="text-sm font-extrabold">Daily Routine Habit</h2>
                        <span
                          className={`text-xs font-extrabold ${
                            isDark ? "text-[#9CF2DA]" : "text-[#09644F]"
                          }`}
                        >
                          {dinacharyaAvg}%
                        </span>
                      </div>
                      <svg
                        viewBox="0 0 100 6"
                        preserveAspectRatio="none"
                        className={`h-2.5 w-full rounded-full overflow-hidden ${
                          isDark
                            ? "bg-white/15 text-[#9CF2DA]"
                            : "bg-[#0f3d26]/15 text-[#09644F]"
                        }`}
                        role="meter"
                        aria-label="Weekly daily routine score"
                        aria-valuenow={dinacharyaAvg}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <rect
                          x="0"
                          y="0"
                          width={Math.min(100, Math.max(8, dinacharyaAvg))}
                          height="6"
                          rx="3"
                          fill="currentColor"
                        />
                      </svg>
                      <div className={`flex items-center justify-between text-xs font-medium ${mutedText}`}>
                        <span>7-day routine score</span>
                        <span>Water intake: {hydrationAvg}%</span>
                      </div>
                    </section>

                    <section className={`rounded-2xl border p-5 shadow-sm space-y-3 ${panelSurface}`}>
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <h2 className="text-sm font-extrabold">Quick Access</h2>
                          <p className={`text-xs font-medium ${mutedText}`}>
                            Open your next visit or latest health report
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setView("events")}
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
                            isDark
                              ? "border-[#FAF5E8]/20 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                              : "border-[#0f3d26]/20 bg-[#FAF5E8] text-[#0f3d26] hover:bg-[#0f3d26]/10"
                          }`}
                          aria-label="Open Events and Passes"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        <div className={`rounded-xl border p-3 flex items-center justify-between gap-2 ${subtleBox}`}>
                          <div className="min-w-0">
                            <p className={`text-[10px] font-bold uppercase ${goldText}`}>
                              Upcoming Visit
                            </p>
                            <p className="text-xs font-bold truncate">
                              {nextBooking?.title || "No upcoming visit booked"}
                            </p>
                          </div>
                          {nextBooking && onInspectBooking && (
                            <button
                              type="button"
                              onClick={() => onInspectBooking(nextBooking)}
                              className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full bg-[#0f3d26] px-4 py-1.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5 text-[#C9A45C]" />
                              <span>View</span>
                            </button>
                          )}
                        </div>

                        <div className={`rounded-xl border p-3 flex items-center justify-between gap-2 ${subtleBox}`}>
                          <div className="min-w-0">
                            <p className={`text-[10px] font-bold uppercase ${goldText}`}>
                              Latest Health Report
                            </p>
                            <p className="text-xs font-bold truncate">
                              {latestReport
                                ? `Zone ${latestReport.dominantZone?.code} · BMI ${latestReport.bmi}`
                                : "No checkup report yet"}
                            </p>
                          </div>
                          {latestReport && onInspectReport && (
                            <button
                              type="button"
                              onClick={() => onInspectReport(latestReport)}
                              className="inline-flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full bg-[#0f3d26] px-4 py-1.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5 text-[#C9A45C]" />
                              <span>View</span>
                            </button>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>

                  <section className={`xl:col-span-8 rounded-2xl border p-5 shadow-sm space-y-4 ${panelSurface}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-extrabold">Recent Activity</h2>
                        <p className={`text-xs font-medium ${mutedText}`}>
                          Click View on any row to see full receipts, visit details, or reports.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <label
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 min-h-[40px] ${subtleBox}`}
                        >
                          <Search className={`h-3.5 w-3.5 ${mutedText}`} />
                          <input
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search history..."
                            aria-label="Search recent activity"
                            className="w-36 bg-transparent text-xs font-medium focus:outline-none"
                          />
                        </label>
                        <label
                          className={`inline-flex items-center gap-1.5 rounded-xl border px-3 min-h-[40px] ${subtleBox}`}
                        >
                          <Filter className={`h-3.5 w-3.5 ${mutedText}`} />
                          <select
                            aria-label="Filter recent activity type"
                            value={activityFilter}
                            onChange={(e) => setActivityFilter(e.target.value)}
                            className="bg-transparent text-xs font-bold focus:outline-none"
                          >
                            {[
                              "All activity",
                              "Appointment",
                              "Herbal Order",
                              "Health Report",
                              "Class & Event",
                            ].map((opt) => (
                              <option key={opt} className="text-[#0f3d26] bg-[#FAF5E8]">
                                {opt}
                              </option>
                            ))}
                          </select>
                        </label>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className={`border-b text-[11px] uppercase tracking-wider ${borderLine} ${mutedText}`}>
                            <th className="py-2.5 px-3 font-extrabold">Activity</th>
                            <th className="py-2.5 px-3 font-extrabold">Category</th>
                            <th className="py-2.5 px-3 font-extrabold">Status</th>
                            <th className="py-2.5 px-3 font-extrabold">Detail</th>
                            <th className="py-2.5 px-3 text-right font-extrabold">Action</th>
                          </tr>
                        </thead>
                        <tbody
                          className={`divide-y text-xs ${
                            isDark ? "divide-[#FAF5E8]/15" : "divide-[#0f3d26]/10"
                          }`}
                        >
                          {filteredActivity.map((item) => (
                            <tr
                              key={item.id}
                              className={
                                isDark
                                  ? "hover:bg-white/5 transition-colors"
                                  : "hover:bg-[#FAF5E8]/80 transition-colors"
                              }
                            >
                              <td className="py-3 px-3 font-bold">{item.title}</td>
                              <td className={`py-3 px-3 font-medium ${mutedText}`}>
                                {item.category}
                              </td>
                              <td className="py-3 px-3">
                                <GlassStatusPill status={item.status} dark={isDark} />
                              </td>
                              <td className={`py-3 px-3 font-medium ${mutedText}`}>
                                {item.meta}
                              </td>
                              <td className="py-3 px-3 text-right">
                                {item.onInspect && (
                                  <button
                                    type="button"
                                    onClick={item.onInspect}
                                    className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#0f3d26] px-4 py-1.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                                  >
                                    <Eye className="h-3.5 w-3.5 text-[#C9A45C]" />
                                    <span>View</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredActivity.length === 0 && (
                        <p className={`py-8 text-center text-xs font-medium ${mutedText}`}>
                          No matching records for your filter.
                        </p>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            )}

            {view === "trends" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <article className="rounded-2xl border border-[#C9A45C]/50 bg-gradient-to-br from-[#0f3d26] to-[#082B1B] p-4 text-[#FAF5E8] shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Energy Score</span>
                      <TrendingUp className="h-4 w-4 text-[#C9A45C]" />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{vitalityLatest}%</p>
                    <p className="mt-1 text-[11px] text-[#E7D7B5]">Healthy range</p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Digestion Score</span>
                      <Zap className={`h-4 w-4 ${goldText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{agniLatest}%</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Daily gut &amp; appetite health
                    </p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Weekly Routine</span>
                      <Activity className={`h-4 w-4 ${emeraldText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{dinacharyaAvg}%</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Sleep &amp; wake regularity
                    </p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Water Intake</span>
                      <HeartPulse className={`h-4 w-4 ${coralText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{hydrationAvg}%</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Daily hydration score
                    </p>
                  </article>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <section className={`lg:col-span-8 rounded-2xl border p-5 shadow-sm ${panelSurface}`}>
                    <div className="mb-4">
                      <h2 className="text-sm font-extrabold">
                        {period === "weekly"
                          ? "Last 7 Days: Routine & Water Intake"
                          : "6-Month Energy & Digestion Progress"}
                      </h2>
                      <p className={`text-xs font-medium ${mutedText}`}>
                        {period === "weekly"
                          ? "Daily sleep-wake timing and hydration habit over the past 7 days"
                          : "Monthly progress based on your lifestyle and checkup scores"}
                      </p>
                    </div>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {period === "weekly" ? (
                          <LineChart
                            data={weeklyDinacharyaData}
                            margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke={isDark ? "#C9A45C" : "#0f3d26"}
                              strokeOpacity={0.15}
                            />
                            <XAxis
                              dataKey="day"
                              tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                            />
                            <YAxis
                              domain={[60, 100]}
                              tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                            />
                            <Tooltip content={<GlassChartTooltip />} />
                            <Legend />
                            <Line
                              type="monotone"
                              dataKey="RoutineScore"
                              name="Daily Routine (%)"
                              stroke="#09644F"
                              strokeWidth={3}
                              dot={{ r: 4, fill: "#09644F" }}
                            />
                            <Line
                              type="monotone"
                              dataKey="Hydration"
                              name="Water Intake (%)"
                              stroke="#C9A45C"
                              strokeWidth={3}
                              dot={{ r: 4, fill: "#C9A45C" }}
                            />
                          </LineChart>
                        ) : (
                          <AreaChart
                            data={monthlyTrendData}
                            margin={{ top: 10, right: 12, left: -12, bottom: 0 }}
                          >
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke={isDark ? "#C9A45C" : "#0f3d26"}
                              strokeOpacity={0.15}
                            />
                            <XAxis
                              dataKey="month"
                              tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                            />
                            <YAxis
                              domain={[50, 100]}
                              tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                            />
                            <Tooltip content={<GlassChartTooltip />} />
                            <Legend />
                            <Area
                              type="monotone"
                              dataKey="Vitality"
                              name="Energy Score"
                              stroke="#09644F"
                              strokeWidth={2.5}
                              fill="#09644F"
                              fillOpacity={0.28}
                            />
                            <Area
                              type="monotone"
                              dataKey="Agni"
                              name="Digestion Score"
                              stroke="#C9A45C"
                              strokeWidth={2.5}
                              fill="#C9A45C"
                              fillOpacity={0.25}
                            />
                          </AreaChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </section>

                  <section className={`lg:col-span-4 rounded-2xl border p-5 shadow-sm flex flex-col justify-between ${panelSurface}`}>
                    <div>
                      <h2 className="text-sm font-extrabold">Overall Health Balance</h2>
                      <p className={`text-xs font-medium ${mutedText}`}>
                        Body, mind, sleep &amp; digestion overview
                      </p>
                    </div>
                    <div className="h-72 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarMetrics}>
                          <PolarGrid
                            stroke={isDark ? "#C9A45C" : "#0f3d26"}
                            strokeOpacity={0.2}
                          />
                          <PolarAngleAxis
                            dataKey="axis"
                            tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 700 }}
                          />
                          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                          <Tooltip content={<GlassChartTooltip />} />
                          <Radar
                            name="Current Score"
                            dataKey="score"
                            stroke="#09644F"
                            fill="#09644F"
                            fillOpacity={0.35}
                          />
                          <Radar
                            name="Target"
                            dataKey="target"
                            stroke="#C9A45C"
                            fill="#C9A45C"
                            fillOpacity={0.18}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>
                </div>

                {renderReportsLedger && renderReportsLedger()}
              </div>
            )}

            {view === "metrics" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <article className="rounded-2xl border border-[#C9A45C]/50 bg-gradient-to-br from-[#0f3d26] to-[#082B1B] p-4 text-[#FAF5E8] shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Total Money Saved</span>
                      <ShieldCheck className="h-4 w-4 text-[#C9A45C]" />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">
                      {formatCompactInr(totalSavedAmount)}
                    </p>
                    <p className="mt-1 text-[11px] text-[#E7D7B5]">{discountPercent}% member discount</p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Booked Visits</span>
                      <Calendar className={`h-4 w-4 ${goldText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{bookings.length}</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Clinic &amp; SwaGrama visits
                    </p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Herbal Orders</span>
                      <ShoppingBag className={`h-4 w-4 ${emeraldText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{orders.length}</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      {formatCompactInr(totalSpentAmount)} total spent
                    </p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Health Reports</span>
                      <HeartPulse className={`h-4 w-4 ${coralText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{reports.length}</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Doctor-ready checkup reports
                    </p>
                  </article>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                  <section className={`lg:col-span-7 rounded-2xl border p-5 shadow-sm ${panelSurface}`}>
                    <div className="mb-4">
                      <h2 className="text-sm font-extrabold">
                        Money Saved with {tierName} (₹)
                      </h2>
                      <p className={`text-xs font-medium ${mutedText}`}>
                        Regular fees compared against your member discount savings
                      </p>
                    </div>
                    <div className="h-64 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={savingsBreakdownData}
                          margin={{ top: 10, right: 12, left: -8, bottom: 0 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={isDark ? "#C9A45C" : "#0f3d26"}
                            strokeOpacity={0.15}
                          />
                          <XAxis
                            dataKey="category"
                            tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                          />
                          <YAxis
                            tick={{ fill: isDark ? "#FAF5E8" : "#0f3d26", fontSize: 11, fontWeight: 600 }}
                          />
                          <Tooltip content={<GlassChartTooltip />} />
                          <Legend />
                          <Bar dataKey="RegularCost" name="Standard Fee (₹)" fill="#0f3d26" radius={[6, 6, 0, 0]} />
                          <Bar dataKey="MemberSavings" name="You Saved (₹)" fill="#C9A45C" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </section>

                  <section className={`lg:col-span-5 rounded-2xl border p-5 shadow-sm flex flex-col justify-between ${panelSurface}`}>
                    <div>
                      <h2 className="text-sm font-extrabold">Your Activity Summary</h2>
                      <p className={`text-xs font-medium ${mutedText}`}>
                        Click a category to see how often you use each service
                      </p>
                    </div>

                    <div className="relative h-48 w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={activityMixData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={52}
                            outerRadius={76}
                            paddingAngle={3}
                          >
                            {activityMixData.map((entry, idx) => (
                              <Cell
                                key={entry.name}
                                fill={entry.fill}
                                opacity={
                                  selectedSliceIndex !== null && selectedSliceIndex !== idx
                                    ? 0.3
                                    : 1
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip content={<GlassChartTooltip />} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                        <strong className="font-serif text-2xl font-bold">
                          {selectedSliceIndex !== null
                            ? activityMixData[selectedSliceIndex]?.value
                            : totalActivityCount}
                        </strong>
                        <span className={`text-[10px] font-bold ${mutedText}`}>
                          {selectedSliceIndex !== null
                            ? activityMixData[selectedSliceIndex]?.name
                            : "Total Records"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {activityMixData.map((entry, idx) => {
                        const pct = totalActivityCount
                          ? Math.round((entry.value / totalActivityCount) * 100)
                          : 25;
                        const activeSlice = selectedSliceIndex === idx;
                        return (
                          <button
                            key={entry.name}
                            type="button"
                            onClick={() =>
                              setSelectedSliceIndex(activeSlice ? null : idx)
                            }
                            className={`w-full grid grid-cols-12 items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-xs transition-colors ${
                              activeSlice
                                ? "bg-[#0f3d26]/15 font-bold"
                                : isDark
                                  ? "hover:bg-white/10"
                                  : "hover:bg-[#FAF5E8]"
                            }`}
                          >
                            <span className="col-span-5 truncate">{entry.name}</span>
                            <span className="col-span-5">
                              <svg
                                viewBox="0 0 100 5"
                                preserveAspectRatio="none"
                                className={`h-1.5 w-full rounded-full ${
                                  isDark ? "bg-white/15" : "bg-[#0f3d26]/15"
                                }`}
                              >
                                <rect
                                  x="0"
                                  y="0"
                                  width={Math.max(8, pct)}
                                  height="5"
                                  rx="2.5"
                                  fill={entry.fill}
                                />
                              </svg>
                            </span>
                            <span className="col-span-2 text-right font-bold">{pct}%</span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>

                {renderAppointmentsLedger && renderAppointmentsLedger()}
                {renderOrdersLedger && renderOrdersLedger()}
              </div>
            )}

            {view === "events" && (
              <div className="space-y-5">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  <article className="rounded-2xl border border-[#C9A45C]/50 bg-gradient-to-br from-[#0f3d26] to-[#082B1B] p-4 text-[#FAF5E8] shadow-md">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Booked Visits</span>
                      <Calendar className="h-4 w-4 text-[#C9A45C]" />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">
                      {bookings.length}
                    </p>
                    <p className="mt-1 text-[11px] text-[#E7D7B5]">Clinic &amp; SwaGrama stays</p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Herbal Orders</span>
                      <Package className={`h-4 w-4 ${goldText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{orders.length}</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Placed &amp; delivered orders
                    </p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Health Reports</span>
                      <HeartPulse className={`h-4 w-4 ${coralText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{reports.length}</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Personal checkup reports
                    </p>
                  </article>

                  <article className={`rounded-2xl border p-4 shadow-sm ${panelSurface}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">Events &amp; Classes</span>
                      <ShieldCheck className={`h-4 w-4 ${emeraldText}`} />
                    </div>
                    <p className="mt-2 font-serif text-3xl font-bold">{enquiriesCount}</p>
                    <p className={`mt-1 text-[11px] font-medium ${mutedText}`}>
                      Tickets, classes &amp; requests
                    </p>
                  </article>
                </div>

                <section className={`rounded-2xl border p-5 shadow-sm space-y-4 ${panelSurface}`}>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-sm font-extrabold">My Event Tickets, Classes &amp; Requests</h2>
                      <p className={`text-xs font-medium ${mutedText}`}>
                        Click View Pass on any card to see full details, timings, or ticket info.
                      </p>
                    </div>
                    <Link
                      to="/v2/ecosphere"
                      className={`inline-flex min-h-[40px] items-center justify-center rounded-full border px-5 py-2 text-xs font-bold transition-colors ${
                        isDark
                          ? "border-[#FAF5E8]/20 bg-white/10 text-[#FAF5E8] hover:bg-white/20"
                          : "border-[#0f3d26]/20 bg-[#FAF5E8] text-[#0f3d26] hover:bg-[#0f3d26]/10"
                      }`}
                    >
                      Browse Classes
                    </Link>
                  </div>

                  {communityPasses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {communityPasses.map((item) => (
                        <div
                          key={item.id}
                          className={`rounded-2xl border p-4 shadow-sm flex flex-col justify-between gap-3 ${subtleBox}`}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className={`text-[10px] font-extrabold uppercase tracking-wider ${goldText}`}>
                                {item.category}
                              </span>
                              <GlassStatusPill status={item.status} dark={isDark} />
                            </div>
                            <h3 className="font-serif text-base font-bold leading-snug">
                              {item.title}
                            </h3>
                            <p className={`text-xs leading-relaxed ${mutedText}`}>
                              {item.summary}
                            </p>
                          </div>

                          <div className={`flex items-center justify-between gap-2 pt-3 border-t ${borderLine}`}>
                            <span className={`text-[11px] font-semibold ${mutedText}`}>
                              {item.location}
                            </span>
                            <button
                              type="button"
                              onClick={() => onInspectPass && onInspectPass(item)}
                              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-[#0f3d26] px-4 py-1.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
                            >
                              <Eye className="h-3.5 w-3.5 text-[#C9A45C]" />
                              <span>View Pass</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={`py-8 text-center text-xs font-medium ${mutedText}`}>
                      No cohort admissions, event passes, or enquiries recorded yet.
                    </p>
                  )}
                </section>

                {renderEnquiriesLedger && renderEnquiriesLedger()}
              </div>
            )}
          </main>
        </div>
      </div>

      {modal === "search" && (
        <GlassModalOverlay
          title={`Search ${workspaceName}`}
          dark={isDark}
          onClose={() => setModal(null)}
        >
          <div className="space-y-4">
            <label className={`flex items-center gap-2 rounded-2xl border px-4 min-h-[44px] ${subtleBox}`}>
              <Search className={`h-4 w-4 ${mutedText}`} />
              <input
                type="search"
                autoFocus
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                placeholder="Search tabs, visits, herbal orders, or health reports..."
                className="w-full bg-transparent text-sm focus:outline-none"
              />
            </label>

            <div className="space-y-2">
              {matchedViews.map((v) => {
                const VIcon = v.icon;
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => {
                      setView(v.id);
                      setModal(null);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors ${subtleBox} hover:border-[#C9A45C]`}
                  >
                    <VIcon className={`h-4 w-4 ${goldText} shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-extrabold">{v.label}</p>
                      <p className={`text-[11px] truncate ${mutedText}`}>{v.description}</p>
                    </div>
                    <ChevronRight className={`h-4 w-4 shrink-0 ${mutedText}`} />
                  </button>
                );
              })}

              {matchedFeedRecords.map((rec) => (
                <button
                  key={rec.id}
                  type="button"
                  onClick={() => {
                    setModal(null);
                    if (rec.onInspect) rec.onInspect();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl border border-[#C9A45C]/40 bg-[#C9A45C]/15 px-3.5 py-2.5 text-left hover:bg-[#C9A45C]/25 transition-colors"
                >
                  <Eye className={`h-4 w-4 ${goldText} shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold truncate">{rec.title}</p>
                    <p className={`text-[11px] truncate ${mutedText}`}>
                      {rec.category} · {rec.status}
                    </p>
                  </div>
                  <ChevronRight className={`h-4 w-4 shrink-0 ${mutedText}`} />
                </button>
              ))}

              {matchedViews.length === 0 && matchedFeedRecords.length === 0 && (
                <p className={`py-6 text-center text-xs font-medium ${mutedText}`}>
                  No matching views or records found.
                </p>
              )}
            </div>
          </div>
        </GlassModalOverlay>
      )}

      {modal === "notifications" && (
        <GlassModalOverlay
          title="Updates & Upcoming Passes"
          dark={isDark}
          onClose={() => setModal(null)}
        >
          <div className="space-y-2.5">
            {communityPasses.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setView("events");
                  setModal(null);
                  if (onInspectPass) onInspectPass(item);
                }}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${subtleBox} hover:border-[#C9A45C]`}
              >
                <Bell className="h-4 w-4 text-[#C9A45C] shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-extrabold truncate">{item.title}</p>
                  <p className={`text-[11px] truncate ${mutedText}`}>{item.summary}</p>
                </div>
                <ArrowRight className={`h-4 w-4 shrink-0 ${mutedText}`} />
              </button>
            ))}
            {communityPasses.length === 0 && (
              <p className={`py-6 text-center text-xs font-medium ${mutedText}`}>
                You are all caught up.
              </p>
            )}
          </div>
        </GlassModalOverlay>
      )}
    </div>
  );
}

export default GlassyDashboard;
