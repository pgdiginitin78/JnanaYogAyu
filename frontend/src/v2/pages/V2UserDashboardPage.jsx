import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  CheckCircle2,
  Eye,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import CommonButton from "../../components/common/buttons/CommonButton";
import CommonTable from "../../components/common/table/CommonTable";
import GlassyDashboard from "../../components/ui/GlassyDashboard";
import { ease } from "../../components/membership/MotionKit";
import V2ModalShell from "../components/V2ModalShell";
import {
  USER_SAVINGS_BY_CATEGORY,
  USER_TRIDOSHA_RADIAL,
  USER_WELLNESS_MONTHLY_TREND,
} from "../data/v2Data";
import { useV2Store } from "../context/v2Context";

const WEEKLY_DINACHARYA_DATA = [
  { day: "Mon", RoutineScore: 84, Hydration: 80 },
  { day: "Tue", RoutineScore: 88, Hydration: 85 },
  { day: "Wed", RoutineScore: 82, Hydration: 78 },
  { day: "Thu", RoutineScore: 90, Hydration: 88 },
  { day: "Fri", RoutineScore: 93, Hydration: 91 },
  { day: "Sat", RoutineScore: 89, Hydration: 86 },
  { day: "Sun", RoutineScore: 95, Hydration: 92 },
];

const CONSTITUTION_RADAR_METRICS = [
  ...USER_TRIDOSHA_RADIAL.map((item) => ({
    axis: item.name.split(" ")[0],
    score: item.value,
    target: 95,
  })),
  { axis: "Sleep", score: 88, target: 95 },
  { axis: "Clarity", score: 92, target: 95 },
];

function WellnessTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="rounded-2xl border border-[#C9A45C]/50 bg-[#071E14] px-3.5 py-2.5 text-xs text-[#FAF5E8] shadow-xl">
      {label && <p className="font-serif font-bold text-[#E7D7B5] mb-1">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center justify-between gap-4">
          <span className="text-[#FAF5E8]/80">{entry.name}:</span>
          <span className="font-bold text-[#C9A45C]">{entry.value}</span>
        </p>
      ))}
    </div>
  );
}

function truncateText(text, maxLen = 36) {
  if (!text) return "-";
  const clean = String(text).trim();
  return clean.length > maxLen ? `${clean.slice(0, maxLen)}...` : clean;
}

function TableInspectButton({ label = "View", onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="View Complete Details"
      aria-label={`Inspect ${label}`}
      className="my-1 inline-flex items-center gap-1.5 rounded-full border border-[#C9A45C]/65 bg-[#0f3d26] px-3 py-1 text-[11px] font-bold text-[#FAF5E8] shadow-sm hover:bg-[#1a5c3a] hover:scale-105 active:scale-95 transition-all"
    >
      <Eye className="h-3.5 w-3.5 text-[#C9A45C]" />
      <span>{label}</span>
    </button>
  );
}

function StatusSteps({ steps, activeIndex }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {steps.map((step, idx) => {
        const done = idx <= activeIndex;
        return (
          <div
            key={step}
            className={`rounded-xl border px-3 py-2 text-center text-[11px] font-bold transition-colors ${
              done
                ? "border-[#0f3d26] bg-[#0f3d26] text-[#FAF5E8]"
                : "border-[#EDE5D5] bg-[#FBF8F1] text-[#0f3d26]/55"
            }`}
          >
            <span>
              {done ? "✓ " : ""}
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function V2UserDashboardPage() {
  const navigate = useNavigate();
  const {
    state,
    currentUser,
    getTierInfo,
    getDiscountPercent,
    loginDemoUser,
    setPendingAuthIntent,
  } = useV2Store();

  const [inspectRecord, setInspectRecord] = useState(null);

  if (!currentUser) {
    return (
      <div className="min-h-[82vh] bg-[#FDFBF7] py-16 px-4 sm:px-6 lg:px-12 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease }}
          className="w-full rounded-[2rem] border border-[#C9A45C]/35 bg-gradient-to-br from-[#071E14] via-[#0D3323] to-[#12432D] p-8 sm:p-12 text-center text-[#FAF5E8] shadow-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A45C]/45 bg-[#C9A45C]/15 px-4 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E7D7B5]">
            <Sparkles className="h-3.5 w-3.5 text-[#C9A45C]" />
            <span>Personal Member Workspace</span>
          </span>
          <h1 className="mt-5 font-serif text-3xl sm:text-4xl text-[#FAF5E8]">
            Sign In to Open Your Wellness Dashboard
          </h1>
          <p className="mt-3 text-sm text-[#FAF5E8]/85 lg:w-3/4 mx-auto leading-relaxed">
            Explore interactive wellness analytics charts, inspect complete OPD & SwaGrama passes, review itemized E-Shop order invoices, and download Muktikhela Vaidya scorecards.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <CommonButton
              onClick={() => loginDemoUser()}
              label="Launch Demo Dashboard (Aarav)"
              className="!rounded-full !h-auto !min-h-[44px] !bg-[#C9A45C] !text-[#071E14] hover:!bg-[#E7D7B5] !px-6 !py-2.5 !text-xs !font-bold uppercase tracking-wider"
            />
            <CommonButton
              onClick={() => {
                setPendingAuthIntent({
                  type: "navigate",
                  returnTo: "/v2/dashboard",
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

  const myBookings = state.bookings.filter((b) => b.userId === currentUser.id);
  const myAcademyApps = state.academyApplications.filter(
    (a) => a.userId === currentUser.id
  );
  const myOrders = state.orders.filter((o) => o.userId === currentUser.id);
  const myReports = state.muktikhelaReports.filter(
    (r) => r.userId === currentUser.id
  );
  const myEnquiries = state.enquiries.filter(
    (e) => e.userId === currentUser.id || e.name === currentUser.name
  );
  const myEventRegs = state.eventRegistrations.filter(
    (er) => er.userId === currentUser.id
  );

  const totalSavedAmount =
    myOrders.reduce((acc, o) => acc + (Number(o.discountAmount) || 0), 0) +
    myBookings.reduce(
      (acc, b) =>
        acc + Math.max(0, (Number(b.basePrice) || 0) - (Number(b.finalPrice) || 0)),
      0
    );

  const dynamicSavingsData = USER_SAVINGS_BY_CATEGORY.map((row) => {
    const rate = discountPercent > 0 ? discountPercent : 5;
    return {
      category: row.category.replace("Healthcare OPD", "OPD Care").replace("Herbal E-Shop", "E-Shop"),
      RegularCost: row.RegularCost,
      MemberSavings: Math.round((row.RegularCost * rate) / 100),
    };
  });

  const activityPieData = [
    { name: "Appointments", value: Math.max(1, myBookings.length), fill: "#0f3d26" },
    { name: "Herbal Orders", value: Math.max(1, myOrders.length), fill: "#C9A45C" },
    { name: "Health Reports", value: Math.max(1, myReports.length), fill: "#1a5c3a" },
    {
      name: "Events & Classes",
      value: Math.max(1, myEnquiries.length + myEventRegs.length + myAcademyApps.length),
      fill: "#8b6534",
    },
  ];

  const bookingRows = myBookings.map((b) => ({
    id: b.id,
    "Ref ID": b.id,
    Category: b.kind,
    Service: truncateText(b.title, 26),
    Patient: b.patientName || b.name || currentUser.name,
    "Date & Slot": `${b.preferredDate} · ${truncateText(b.slot, 20)}`,
    Fee: `₹${Number(b.finalPrice || 0).toLocaleString("en-IN")}`,
    Status: b.status,
  }));

  const orderRows = myOrders.map((o) => {
    const firstItem = o.items?.[0]?.title || "Herbal Order";
    const extraCount = (o.items || []).length > 1 ? ` +${o.items.length - 1}` : "";
    return {
      id: o.id,
      "Order ID": o.id,
      Items: `${truncateText(firstItem, 24)}${extraCount}`,
      Delivery: `${o.city || "Pune"}${o.pinCode ? ` - ${o.pinCode}` : ""}`,
      Window: truncateText(o.deliveryWindow || "Courier", 18),
      Total: `₹${Number(o.total || 0).toLocaleString("en-IN")}`,
      Status: o.status,
    };
  });

  const reportRows = myReports.map((r) => ({
    id: r.id,
    Report: r.id,
    Participant: truncateText(r.playerName, 24),
    BMI: r.bmi,
    Zone: `Zone ${r.dominantZone?.code} · ${r.dominantZone?.name}`,
    Sleep: r.sleepHours || "7-8 hrs",
    Date: new Date(r.createdAt).toLocaleDateString("en-IN"),
  }));

  const enquiryRows = [
    ...myAcademyApps.map((a) => ({
      id: a.id,
      Kind: "Academy Class",
      Topic: truncateText(a.batchTitle, 28),
      Contact: `${a.city || "Pune"} · 20% Discount`,
      Slot: truncateText(a.evaluationSlot || "Assigned", 22),
      Status: "Confirmed",
    })),
    ...myEnquiries.map((e) => ({
      id: e.id,
      Kind: "Request",
      Topic: truncateText(e.interest, 28),
      Contact: `${e.callbackMode || "Direct"} · ${e.city || "Pune"}`,
      Slot: truncateText(e.callbackSlot || "Morning", 22),
      Status: e.status,
    })),
    ...myEventRegs.map((r) => ({
      id: r.id,
      Kind: "Event Ticket",
      Topic: truncateText(r.eventTitle, 28),
      Contact: `${r.seats} Seat(s) · ${r.city || "Pune"}`,
      Slot: r.attendeeType || "Attendee",
      Status: "Confirmed",
    })),
  ];

  const openInspectBooking = (rowOrRecord) => {
    const record = myBookings.find((b) => b.id === rowOrRecord.id) || rowOrRecord;
    setInspectRecord({ kind: "booking", data: record });
  };

  const openInspectOrder = (rowOrRecord) => {
    const record = myOrders.find((o) => o.id === rowOrRecord.id) || rowOrRecord;
    setInspectRecord({ kind: "order", data: record });
  };

  const openInspectReport = (rowOrRecord) => {
    const record = myReports.find((r) => r.id === rowOrRecord.id) || rowOrRecord;
    setInspectRecord({ kind: "report", data: record });
  };

  const openInspectEnquiry = (row) => {
    const aca = myAcademyApps.find((a) => a.id === row.id);
    if (aca) {
      setInspectRecord({ kind: "academy", data: aca });
      return;
    }
    const enq = myEnquiries.find((e) => e.id === row.id);
    if (enq) {
      setInspectRecord({ kind: "enquiry", data: enq });
      return;
    }
    const evt = myEventRegs.find((r) => r.id === row.id);
    if (evt) {
      setInspectRecord({ kind: "event", data: evt });
    }
  };

  const totalSpentAmount =
    myOrders.reduce((acc, o) => acc + (Number(o.total) || 0), 0) +
    myBookings.reduce((acc, b) => acc + (Number(b.finalPrice) || 0), 0);

  const activityFeed = [
    ...myBookings.map((b) => ({
      id: `act-bk-${b.id}`,
      title: b.title,
      category: "Appointment",
      status: b.status || "Confirmed",
      meta: `${b.preferredDate} · ₹${Number(b.finalPrice || 0).toLocaleString("en-IN")}`,
      onInspect: () => setInspectRecord({ kind: "booking", data: b }),
    })),
    ...myOrders.map((o) => ({
      id: `act-ord-${o.id}`,
      title: o.items?.[0]?.title || `Order ${o.id}`,
      category: "Herbal Order",
      status: o.status || "Confirmed",
      meta: `${o.city || "Pune"} · ₹${Number(o.total || 0).toLocaleString("en-IN")}`,
      onInspect: () => setInspectRecord({ kind: "order", data: o }),
    })),
    ...myReports.map((r) => ({
      id: `act-rep-${r.id}`,
      title: `${r.playerName} · Zone ${r.dominantZone?.code}`,
      category: "Health Report",
      status: "Complete",
      meta: `BMI ${r.bmi} · ${r.dominantZone?.name || "Report"}`,
      onInspect: () => setInspectRecord({ kind: "report", data: r }),
    })),
    ...myAcademyApps.map((a) => ({
      id: `act-aca-${a.id}`,
      title: a.batchTitle,
      category: "Class & Event",
      status: "Confirmed",
      meta: `${a.city || "Pune"} · 20% Discount`,
      onInspect: () => setInspectRecord({ kind: "academy", data: a }),
    })),
    ...myEventRegs.map((e) => ({
      id: `act-evt-${e.id}`,
      title: e.eventTitle,
      category: "Class & Event",
      status: "Confirmed",
      meta: `${e.seats} Seat(s) · ${e.city || "Pune"}`,
      onInspect: () => setInspectRecord({ kind: "event", data: e }),
    })),
  ];

  const communityPasses = [
    ...myAcademyApps.map((a) => ({
      id: `pass-aca-${a.id}`,
      title: a.batchTitle,
      category: "Academy Class",
      summary: `${a.city || "Pune"} · ${a.evaluationSlot || "Assigned Class"} · 20% Discount`,
      location: a.city || "Pune",
      status: "Confirmed",
      onInspect: () => setInspectRecord({ kind: "academy", data: a }),
    })),
    ...myEventRegs.map((e) => ({
      id: `pass-evt-${e.id}`,
      title: e.eventTitle,
      category: "Event Ticket",
      summary: `${e.seats} Seat(s) · ${e.attendeeType || "Visitor"}`,
      location: e.city || "Pune",
      status: "Confirmed",
      onInspect: () => setInspectRecord({ kind: "event", data: e }),
    })),
    ...myEnquiries.map((q) => ({
      id: `pass-enq-${q.id}`,
      title: q.interest || "Visit & Support Request",
      category: "Request & Callback",
      summary: `${q.callbackMode || "Direct"} · ${q.callbackSlot || "Morning"}`,
      location: q.city || "Pune",
      status: q.status || "Confirmed",
      onInspect: () => setInspectRecord({ kind: "enquiry", data: q }),
    })),
  ];

  const reportZoneChartData = inspectRecord?.kind === "report"
    ? [
        { zone: "Zone A (Sama)", signals: inspectRecord.data.zoneCounts?.A ?? 2, fill: "#0f3d26" },
        { zone: "Zone B (Kapha)", signals: inspectRecord.data.zoneCounts?.B ?? 1, fill: "#1a5c3a" },
        { zone: "Zone C (Pitta)", signals: inspectRecord.data.zoneCounts?.C ?? 0, fill: "#C9A45C" },
        { zone: "Zone D (Vata)", signals: inspectRecord.data.zoneCounts?.D ?? 0, fill: "#8b6534" },
      ]
    : [];

  return (
    <>
      <GlassyDashboard
        workspaceName="MY JYA ACCOUNT"
        workspaceTagline="Personal Health & Membership"
        panelFrost={12}
        initialTheme="light"
        userName={currentUser.name}
        tierName={activeTier?.name || "JYA Open"}
        discountPercent={discountPercent}
        totalSavedAmount={totalSavedAmount}
        totalSpentAmount={totalSpentAmount}
        bookings={myBookings}
        orders={myOrders}
        reports={myReports}
        communityPasses={communityPasses}
        monthlyTrendData={USER_WELLNESS_MONTHLY_TREND}
        weeklyDinacharyaData={WEEKLY_DINACHARYA_DATA}
        radarMetrics={CONSTITUTION_RADAR_METRICS}
        savingsBreakdownData={dynamicSavingsData}
        activityMixData={activityPieData}
        activityFeed={activityFeed}
        enquiriesCount={enquiryRows.length}
        onInspectBooking={(b) => setInspectRecord({ kind: "booking", data: b })}
        onInspectReport={(r) => setInspectRecord({ kind: "report", data: r })}
        onInspectPass={(item) => item?.onInspect && item.onInspect()}
        renderAppointmentsLedger={() => (
          <div className="rounded-2xl border border-[#0f3d26]/15 bg-white p-5 sm:p-7 text-[#0f3d26] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D5] pb-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#0f3d26]">
                  Booked Clinic &amp; Village Visits
                </h2>
                <p className="text-xs text-[#0f3d26]/75 mt-0.5">
                  Click <strong className="text-[#0f3d26]">View</strong> on any row to see your appointment slip and slot.
                </p>
              </div>
              <Link
                to="/v2/global-ayurx"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                + Book New Visit
              </Link>
            </div>
            {bookingRows.length > 0 ? (
              <CommonTable
                dataResult={bookingRows}
                removeHeaders={["id"]}
                highlightRow={false}
                renderActions={(row) => (
                  <TableInspectButton
                    label="View"
                    onClick={() => openInspectBooking(row)}
                  />
                )}
              />
            ) : (
              <p className="py-8 text-center text-sm text-[#0f3d26]/70">
                No appointments or SwaGrama visits booked yet.
              </p>
            )}
          </div>
        )}
        renderOrdersLedger={() => (
          <div className="rounded-2xl border border-[#0f3d26]/15 bg-white p-5 sm:p-7 text-[#0f3d26] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D5] pb-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#0f3d26]">
                  Herbal E-Shop Orders
                </h2>
                <p className="text-xs text-[#0f3d26]/75 mt-0.5">
                  Click <strong className="text-[#0f3d26]">View</strong> to see full items, delivery address, and discount receipt.
                </p>
              </div>
              <Link
                to="/v2/global-ayurx?tab=eshop"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                + Shop Products
              </Link>
            </div>
            {orderRows.length > 0 ? (
              <CommonTable
                dataResult={orderRows}
                removeHeaders={["id"]}
                highlightRow={false}
                renderActions={(row) => (
                  <TableInspectButton
                    label="View"
                    onClick={() => openInspectOrder(row)}
                  />
                )}
              />
            ) : (
              <p className="py-8 text-center text-sm text-[#0f3d26]/70">
                No herbal orders placed yet.
              </p>
            )}
          </div>
        )}
        renderReportsLedger={() => (
          <div className="rounded-2xl border border-[#0f3d26]/15 bg-white p-5 sm:p-7 text-[#0f3d26] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D5] pb-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#0f3d26]">
                  Health Check Reports
                </h2>
                <p className="text-xs text-[#0f3d26]/75 mt-0.5">
                  Click <strong className="text-[#0f3d26]">View</strong> to check your BMI, health zone, and doctor notes.
                </p>
              </div>
              <Link
                to="/v2/muktikhela"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                + New Health Check
              </Link>
            </div>
            {reportRows.length > 0 ? (
              <CommonTable
                dataResult={reportRows}
                removeHeaders={["id"]}
                highlightRow={false}
                renderActions={(row) => (
                  <TableInspectButton
                    label="View"
                    onClick={() => openInspectReport(row)}
                  />
                )}
              />
            ) : (
              <p className="py-8 text-center text-sm text-[#0f3d26]/70">
                No Muktikhela health reports generated yet.
              </p>
            )}
          </div>
        )}
        renderEnquiriesLedger={() => (
          <div className="rounded-2xl border border-[#0f3d26]/15 bg-white p-5 sm:p-7 text-[#0f3d26] shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EDE5D5] pb-4">
              <div>
                <h2 className="font-serif text-xl sm:text-2xl text-[#0f3d26]">
                  Classes, Event Passes &amp; Requests
                </h2>
                <p className="text-xs text-[#0f3d26]/75 mt-0.5">
                  Click <strong className="text-[#0f3d26]">View</strong> on any row to see your class seat, event ticket, or callback request.
                </p>
              </div>
              <Link
                to="/v2/insight"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-[#0f3d26] px-6 py-2.5 text-xs font-bold text-[#FAF5E8] hover:bg-[#1a5c3a] transition-colors"
              >
                Browse Events
              </Link>
            </div>
            {enquiryRows.length > 0 ? (
              <CommonTable
                dataResult={enquiryRows}
                removeHeaders={["id"]}
                highlightRow={false}
                renderActions={(row) => (
                  <TableInspectButton
                    label="View"
                    onClick={() => openInspectEnquiry(row)}
                  />
                )}
              />
            ) : (
              <p className="py-8 text-center text-sm text-[#0f3d26]/70">
                No enquiries, academy admissions or event registrations recorded yet.
              </p>
            )}
          </div>
        )}
      />

      <V2ModalShell
        open={Boolean(inspectRecord)}
        onClose={() => setInspectRecord(null)}
        badge={
          inspectRecord?.kind === "booking"
            ? `${inspectRecord.data.kind || "Visit"} Pass`
            : inspectRecord?.kind === "order"
              ? "Order Receipt"
              : inspectRecord?.kind === "report"
                ? "Health Check Report"
                : inspectRecord?.kind === "academy"
                  ? "Class Admission Pass"
                  : inspectRecord?.kind === "event"
                    ? "Event Ticket"
                    : "Support & Visit Request"
        }
        title={
          inspectRecord?.kind === "booking"
            ? inspectRecord.data.title
            : inspectRecord?.kind === "order"
              ? `Order Receipt · ${inspectRecord.data.id}`
              : inspectRecord?.kind === "report"
                ? `${inspectRecord.data.playerName} — Zone ${inspectRecord.data.dominantZone?.code || "A"}`
                : inspectRecord?.kind === "academy"
                  ? inspectRecord.data.batchTitle
                  : inspectRecord?.kind === "event"
                    ? inspectRecord.data.eventTitle
                    : inspectRecord?.data?.interest || "Record Overview"
        }
        subtitle={
          inspectRecord?.kind === "booking"
            ? `Ref: ${inspectRecord.data.id} · ${inspectRecord.data.provider || "JnanaYogAyu Sanctuary"}`
            : inspectRecord?.kind === "order"
              ? `Placed on ${new Date(inspectRecord.data.createdAt).toLocaleDateString("en-IN")} · ${inspectRecord.data.paymentMethod}`
              : inspectRecord?.kind === "report"
                ? `${inspectRecord.data.dominantZone?.name} · ${inspectRecord.data.dominantZone?.sanskrit}`
                : inspectRecord?.data?.id || ""
        }
        maxWidthClass="2xl"
      >
        {inspectRecord?.kind === "booking" && (
          <div className="space-y-5">
            <StatusSteps
              steps={["Submitted", "Confirmed", "Session Slot", "Follow-Up"]}
              activeIndex={1}
            />

            <div className="rounded-2xl border border-[#C9A45C]/45 bg-[#FBF8F1] p-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">Date</p>
                <p className="mt-0.5 text-sm font-bold text-[#0f3d26]">
                  {inspectRecord.data.preferredDate}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">Assigned Slot</p>
                <p className="mt-0.5 text-sm font-bold text-[#0f3d26]">
                  {inspectRecord.data.slot}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">Paid Fee</p>
                <p className="mt-0.5 font-serif text-lg font-bold text-[#0f3d26]">
                  ₹{Number(inspectRecord.data.finalPrice || 0).toLocaleString("en-IN")}
                </p>
                {inspectRecord.data.discountPercent > 0 && (
                  <p className="text-[10px] font-semibold text-[#8b6534]">
                    {inspectRecord.data.discountPercent}% Tier Off
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-4 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8b6534] flex items-center gap-1.5 border-b border-[#EDE5D5] pb-2">
                  <UserCheck className="h-3.5 w-3.5" />
                  <span>Patient / Visitor Identity</span>
                </p>
                <p className="text-xs text-[#0f3d26]">
                  <strong>Name:</strong> {inspectRecord.data.patientName || inspectRecord.data.name || currentUser.name}
                  {inspectRecord.data.age ? ` (${inspectRecord.data.age} yrs · ${inspectRecord.data.gender || ""})` : ""}
                </p>
                <p className="text-xs text-[#0f3d26] flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-[#C9A45C]" />
                  <span>{inspectRecord.data.phone || currentUser.phone}</span>
                </p>
                <p className="text-xs text-[#0f3d26] flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-[#C9A45C]" />
                  <span>{inspectRecord.data.email || currentUser.email}</span>
                </p>
                <p className="text-xs text-[#0f3d26] flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-[#C9A45C]" />
                  <span>{inspectRecord.data.city || currentUser.city || "Pune"}</span>
                </p>
              </div>

              <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-4 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#8b6534] flex items-center gap-1.5 border-b border-[#EDE5D5] pb-2">
                  <Stethoscope className="h-3.5 w-3.5" />
                  <span>Session & Clinical Context</span>
                </p>
                <p className="text-xs text-[#0f3d26]">
                  <strong>Format / Purpose:</strong>{" "}
                  {inspectRecord.data.consultationMode || inspectRecord.data.visitPurpose || inspectRecord.data.kind}
                </p>
                {inspectRecord.data.doshaCategory && (
                  <p className="text-xs text-[#0f3d26]">
                    <strong>Clinical Focus:</strong> {inspectRecord.data.doshaCategory}
                  </p>
                )}
                {inspectRecord.data.guests && (
                  <p className="text-xs text-[#0f3d26]">
                    <strong>Visitors:</strong> {inspectRecord.data.guests} Guest(s) ({inspectRecord.data.organisation || "Private Group"})
                  </p>
                )}
                {(inspectRecord.data.medications || inspectRecord.data.dietaryNotes) && (
                  <p className="text-xs text-[#0f3d26]">
                    <strong>Medications / Dietary:</strong>{" "}
                    {inspectRecord.data.medications || inspectRecord.data.dietaryNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                Symptoms / Visit Intention Note
              </p>
              <p className="text-sm text-[#0f3d26] leading-relaxed">
                {inspectRecord.data.concern || "Confirmed session reservation."}
              </p>
            </div>

            <div className="flex justify-end">
              <CommonButton
                type="button"
                onClick={() => setInspectRecord(null)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </div>
        )}

        {inspectRecord?.kind === "order" && (
          <div className="space-y-5">
            <StatusSteps
              steps={["Order Confirmed", "Herbs Packed", "Dispatched", inspectRecord.data.status || "Delivered"]}
              activeIndex={inspectRecord.data.status === "Delivered" ? 3 : 1}
            />

            <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] overflow-hidden">
              <div className="bg-[#FBF8F1] px-4 py-2.5 border-b border-[#EDE5D5] flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#8b6534]">
                <span>Itemized Herbal Provisions</span>
                <span>Amount</span>
              </div>
              <div className="divide-y divide-[#EDE5D5]">
                {(inspectRecord.data.items || []).map((item) => (
                  <div
                    key={item.id || item.title}
                    className="px-4 py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#0f3d26]">{item.title}</p>
                      <p className="text-[#0f3d26]/70">
                        Qty: {item.qty} × ₹{Number(item.price || 0).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span className="font-serif font-bold text-sm text-[#0f3d26]">
                      ₹{(Number(item.price || 0) * Number(item.qty || 1)).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>
              <div className="bg-[#FBF8F1] px-4 py-3 border-t border-[#EDE5D5] space-y-1 text-xs">
                <div className="flex justify-between text-[#0f3d26]/75">
                  <span>Basket Subtotal</span>
                  <span>₹{Number(inspectRecord.data.subtotal || inspectRecord.data.total).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-semibold text-[#8b6534]">
                  <span>Tier Privilege Saved ({inspectRecord.data.discountPercent || 0}%)</span>
                  <span>- ₹{Number(inspectRecord.data.discountAmount || 0).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-serif text-base font-bold text-[#0f3d26] pt-1.5 border-t border-[#EDE5D5]">
                  <span>Total Paid ({inspectRecord.data.paymentMethod})</span>
                  <span>₹{Number(inspectRecord.data.total || 0).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                  Recipient & Tracking
                </p>
                <p><strong>Name:</strong> {inspectRecord.data.customerName}</p>
                <p><strong>Phone:</strong> {inspectRecord.data.customerPhone}</p>
                <p><strong>Email:</strong> {inspectRecord.data.email || currentUser.email}</p>
                <p><strong>Delivery Slot:</strong> {inspectRecord.data.deliveryWindow}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                  Courier Destination
                </p>
                <p>{inspectRecord.data.addressLine1 || inspectRecord.data.address}</p>
                {inspectRecord.data.landmark && (
                  <p><strong>Landmark:</strong> {inspectRecord.data.landmark}</p>
                )}
                {inspectRecord.data.city && (
                  <p>
                    {inspectRecord.data.city}, {inspectRecord.data.state || ""} - {inspectRecord.data.pinCode || ""}
                  </p>
                )}
                {inspectRecord.data.orderNotes && (
                  <p className="text-[#8b6534]">
                    <strong>Courier Note:</strong> {inspectRecord.data.orderNotes}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <CommonButton
                type="button"
                onClick={() => setInspectRecord(null)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </div>
        )}

        {inspectRecord?.kind === "report" && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-2xl border border-[#C9A45C]/45 bg-[#071E14] text-[#FAF5E8] p-3 text-center">
                <p className="text-[9px] font-bold uppercase text-[#C9A45C]">Health Zone</p>
                <p className="mt-1 font-serif text-lg">Zone {inspectRecord.data.dominantZone?.code}</p>
              </div>
              <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-3 text-center">
                <p className="text-[9px] font-bold uppercase text-[#8b6534]">BMI Score</p>
                <p className="mt-1 font-serif text-lg font-bold text-[#0f3d26]">{inspectRecord.data.bmi}</p>
              </div>
              <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-3 text-center">
                <p className="text-[9px] font-bold uppercase text-[#8b6534]">Sleep Pattern</p>
                <p className="mt-1 text-xs font-bold text-[#0f3d26]">{inspectRecord.data.sleepHours || "7-8 hrs"}</p>
              </div>
              <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-3 text-center">
                <p className="text-[9px] font-bold uppercase text-[#8b6534]">Diet Rhythm</p>
                <p className="mt-1 text-xs font-bold text-[#0f3d26] truncate">{inspectRecord.data.dietType || "Fresh Home"}</p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8b6534] mb-2">
                Constitutional Zone Signal Chart
              </p>
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportZoneChartData} margin={{ top: 6, right: 8, left: -18, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EDE5D5" />
                    <XAxis dataKey="zone" tick={{ fill: "#0f3d26", fontSize: 10 }} />
                    <YAxis allowDecimals={false} tick={{ fill: "#0f3d26", fontSize: 10 }} />
                    <Tooltip content={<WellnessTooltip />} />
                    <Bar dataKey="signals" name="Assessment Signals" radius={[6, 6, 0, 0]}>
                      {reportZoneChartData.map((entry) => (
                        <Cell key={entry.zone} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-[#EDE5D5] bg-[#FFFDF9] p-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">Age / Gender</p>
                <p className="font-semibold text-[#0f3d26]">
                  {inspectRecord.data.age || "32"} yrs · {inspectRecord.data.gender || "Unspecified"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">Height / Weight</p>
                <p className="font-semibold text-[#0f3d26]">
                  {inspectRecord.data.heightCm || "174"} cm · {inspectRecord.data.weightKg || "70"} kg
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-[#8b6534]">Profession</p>
                <p className="font-semibold text-[#0f3d26]">
                  {inspectRecord.data.profession || "Member"}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#C9A45C]/40 bg-[#FBF8F1] p-4 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                Vaidya Clinical Observation & Recommendation
              </p>
              <p className="text-sm text-[#0f3d26] leading-relaxed">
                {inspectRecord.data.summaryNote || inspectRecord.data.dominantZone?.summary}
              </p>
            </div>

            <div className="flex justify-end">
              <CommonButton
                type="button"
                onClick={() => setInspectRecord(null)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </div>
        )}

        {(inspectRecord?.kind === "enquiry" ||
          inspectRecord?.kind === "event" ||
          inspectRecord?.kind === "academy") && (
          <div className="space-y-5">
            <div className="rounded-2xl border border-[#EDE5D5] bg-[#FBF8F1] p-4 flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-[#C9A45C] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                  Submission Summary
                </p>
                <p className="text-sm text-[#0f3d26] leading-relaxed">
                  {inspectRecord.data.message ||
                    inspectRecord.data.statement ||
                    inspectRecord.data.description ||
                    inspectRecord.data.speakerQuestion ||
                    "Confirmed submission recorded on your account."}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries({
                Applicant: inspectRecord.data.name,
                Phone: inspectRecord.data.phone,
                Email: inspectRecord.data.email,
                City: inspectRecord.data.city,
                "Callback / Mode": inspectRecord.data.callbackMode || inspectRecord.data.residentialMode,
                "Time Slot": inspectRecord.data.callbackSlot || inspectRecord.data.evaluationSlot,
                "Track / Category": inspectRecord.data.background || inspectRecord.data.attendeeType,
                Quantity: inspectRecord.data.seats ? `${inspectRecord.data.seats} Seat(s)` : undefined,
              })
                .filter(([, val]) => Boolean(val))
                .map(([key, val]) => (
                  <div
                    key={key}
                    className="rounded-xl border border-[#EDE5D5] bg-[#FFFDF9] px-3.5 py-2.5"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#8b6534]">
                      {key}
                    </p>
                    <p className="mt-0.5 font-semibold text-[#0f3d26]">{val}</p>
                  </div>
                ))}
            </div>

            <div className="flex flex-wrap justify-end gap-3">
              <CommonButton
                type="button"
                onClick={() => setInspectRecord(null)}
                label="Close"
                className="!rounded-full !h-auto !min-h-[44px] !bg-[#0f3d26] !text-[#FAF5E8] !px-6 !py-2.5 !text-xs !font-bold"
              />
            </div>
          </div>
        )}
      </V2ModalShell>
    </>
  );
}
