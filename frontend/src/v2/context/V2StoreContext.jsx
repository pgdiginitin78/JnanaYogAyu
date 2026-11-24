import { useEffect, useState, useCallback } from "react";
import { V2StoreContext } from "./v2Context";
import {
  INITIAL_BARTER_LISTINGS,
  INITIAL_BLOGS,
  INITIAL_ESHOP_PRODUCTS,
  INITIAL_EVENTS,
  INITIAL_PODCASTS,
  INITIAL_WHITEPAPERS,
  MEMBERSHIP_TIERS,
  MUKTIKHELA_ZONES,
  WELLNESS_SERVICES,
} from "../data/v2Data";

const STORAGE_KEY = "jya_v2_flow_state_v6";

const DEFAULT_USERS = [
  {
    id: "user-1",
    name: "Aarav Kulkarni",
    phone: "+91 98220 11223",
    email: "aarav@jnanayogayu.example",
    city: "Pune",
    password: "password123",
    role: "user",
    membershipTier: "shatayush",
    enrollmentProfile: {
      fullName: "Aarav Kulkarni",
      city: "Pune",
      state: "Maharashtra",
      pinCode: "411038",
      householdSize: "Couple (2 Members)",
      primaryFocus: "Preventive Longevity",
      modeOfParticipation: "Both",
      preferredSeason: "Rainy Academy",
      paymentMethod: "UPI Instant",
      goal: "Seasonal preventive health routine & family diet guidance.",
    },
  },
  {
    id: "admin-1",
    name: "Dr. Meera Deshmukh",
    phone: "+91 98220 44556",
    email: "meera.vaidya@jnanayogayu.example",
    city: "Pune",
    password: "password123",
    role: "admin",
    membershipTier: "globalayurx",
  },
  {
    id: "super-1",
    name: "Swami Ananda (Super Admin)",
    phone: "+91 98220 99000",
    email: "superadmin@jnanayogayu.example",
    city: "Lavale, Pune",
    password: "password123",
    role: "super_admin",
    membershipTier: "ecosphere",
  },
];

function createInitialState() {
  return {
    currentUserId: null,
    users: DEFAULT_USERS,
    wishlist: ["prod-herbal", "srv-opd"].map((itemId) => ({
      userId: "user-1",
      itemId,
    })),
    cart: [],
    bookings: [
      {
        id: "bk-101",
        userId: "user-1",
        userRole: "user",
        kind: "Healthcare OPD",
        title: "OPD Clinic Consultation",
        provider: "JYA Verified Vaidyas",
        patientName: "Aarav Kulkarni",
        age: 32,
        gender: "Male",
        phone: "+91 98220 11223",
        email: "aarav@jnanayogayu.example",
        city: "Pune",
        consultationMode: "In-Clinic at SwaGrama",
        doshaCategory: "Digestive / Agni",
        medications: "Triphala Churna at bedtime",
        basePrice: 800,
        discountPercent: 5,
        finalPrice: 760,
        preferredDate: "2026-12-10",
        slot: "Morning (09:00 AM - 12:00 PM)",
        concern: "Seasonal fatigue & digestive strength review",
        status: "Confirmed",
        createdAt: "2026-11-18T09:15:00.000Z",
      },
      {
        id: "bk-102",
        userId: "user-1",
        userRole: "user",
        kind: "Swagram Visit",
        title: "Day Immersion Visit — SwaGrama",
        provider: "SwaGrama EcoSphere",
        patientName: "Aarav Kulkarni",
        phone: "+91 98220 11223",
        email: "aarav@jnanayogayu.example",
        city: "Pune",
        organisation: "Kulkarni Family",
        visitPurpose: "Business Model & Community Tour",
        guests: 2,
        dietaryNotes: "Pure Sattvik vegetarian lunch",
        basePrice: 1200,
        discountPercent: 5,
        finalPrice: 1140,
        preferredDate: "2026-12-21",
        slot: "Morning Arrival (08:30 AM - Herbal Welcome)",
        concern: "Community living orientation & herbal garden tour",
        status: "Scheduled",
        createdAt: "2026-11-20T11:30:00.000Z",
      },
    ],
    orders: [
      {
        id: "ord-201",
        userId: "user-1",
        userRole: "user",
        customerName: "Aarav Kulkarni",
        customerPhone: "+91 98220 11223",
        email: "aarav@jnanayogayu.example",
        addressLine1: "Flat 402, Vanaz Corner, Paud Road, Kothrud",
        landmark: "Near Kothrud Depot",
        city: "Pune",
        state: "Maharashtra",
        pinCode: "411038",
        deliveryWindow: "Morning Slot (09:00 AM - 01:00 PM)",
        orderNotes: "Call upon arrival at gate",
        address: "Flat 402, Vanaz Corner, Kothrud, Pune - 411038",
        paymentMethod: "UPI / Digital",
        items: [
          {
            id: "prod-herbal",
            title: "Triphala & Chyawanprash Herbal Pack",
            qty: 1,
            price: 1200,
          },
          {
            id: "prod-food",
            title: "Organic Cold-Pressed & Millet Basket",
            qty: 1,
            price: 950,
          },
        ],
        subtotal: 2150,
        discountPercent: 5,
        discountAmount: 108,
        total: 2042,
        status: "Delivered",
        createdAt: "2026-11-15T14:20:00.000Z",
      },
    ],
    enquiries: [
      {
        id: "enq-301",
        userId: "user-1",
        name: "Aarav Kulkarni",
        phone: "+91 98220 11223",
        email: "aarav@jnanayogayu.example",
        city: "Pune",
        callbackMode: "WhatsApp",
        callbackSlot: "Morning (09:00 AM - 12:00 PM)",
        interest: "Seasonal Academy",
        message: "Interested in 2027 Summer Academy curriculum details.",
        sourcePage: "Shatayush World",
        status: "Responded",
        createdAt: "2026-11-12T10:00:00.000Z",
      },
    ],
    eventRegistrations: [
      {
        id: "reg-401",
        userId: "user-1",
        eventId: "evt-1",
        eventTitle: "Shatayush Wellness Dialogue & Lecture",
        name: "Aarav Kulkarni",
        phone: "+91 98220 11223",
        email: "aarav@jnanayogayu.example",
        city: "Pune",
        attendeeType: "Family Group",
        seats: 2,
        speakerQuestion: "How do seasonal Dinacharya changes help joint wellness?",
        createdAt: "2026-11-19T16:40:00.000Z",
      },
    ],
    academyApplications: [],
    muktikhelaProfiles: [
      {
        id: "mp-default",
        userId: "user-1",
        name: "Aarav Kulkarni (Self)",
        relation: "Self",
        age: "32",
        gender: "Male",
        heightCm: "174",
        weightKg: "70",
        profession: "Educator",
      },
    ],
    muktikhelaReports: [
      {
        id: "mr-501",
        userId: "user-1",
        profileId: "mp-default",
        playerName: "Aarav Kulkarni (Self)",
        relation: "Self",
        age: "32",
        gender: "Male",
        heightCm: "174",
        weightKg: "70",
        profession: "Educator",
        bmi: "23.1",
        sleepHours: "7-8 hrs",
        dietType: "Fresh Vegetarian",
        existingCondition: "None reported",
        dominantZone: {
          code: "A",
          name: "Wellness Zone",
          sanskrit: "Sama-Dosha EQ State",
          summary:
            "Balanced Tridosha harmony with steady digestion, sleep, and mental clarity.",
        },
        zoneCounts: { A: 4, B: 1, C: 1, D: 0 },
        summaryNote:
          "Vaidya Observation: Balanced Agni & restful sleep. Continue morning Dinacharya and warm seasonal hydration.",
        createdAt: "2026-11-17T08:00:00.000Z",
      },
    ],
    listings: [...INITIAL_ESHOP_PRODUCTS, ...INITIAL_BARTER_LISTINGS],
    sellerServices: WELLNESS_SERVICES.map((s) => ({
      ...s,
      status: "approved",
      ownerId: "super-1",
    })),
    barterOffers: [
      {
        id: "bo-601",
        listingId: "barter-1",
        listingTitle: "Homegrown Organic Turmeric & Ginger Harvest",
        targetOwnerId: "user-1",
        proposerUserId: "admin-1",
        proposerName: "Dr. Meera Deshmukh",
        offeredItem: "2 kg Wild Multiflora Forest Honey",
        offeredCondition: "Freshly Harvested / First Press",
        offeredQuantity: "2 Glass Jars (1 kg each)",
        estimatedValue: 950,
        fulfillmentMode: "Swap at SwaGrama",
        proposedDate: "2026-11-26",
        pickupCity: "Pune",
        contactPhone: "+91 98220 44556",
        message: "Harvested cleanly from Sahyadri foothills; ready for barter exchange at SwaGrama pavilion.",
        status: "pending",
        createdAt: "2026-11-21T10:15:00.000Z",
      },
    ],
    practitionerApplications: [],
    blogs: INITIAL_BLOGS,
    whitepapers: INITIAL_WHITEPAPERS,
    podcasts: INITIAL_PODCASTS,
    events: INITIAL_EVENTS,
    pendingAuthIntent: null,
  };
}

function loadInitialState() {
  if (typeof window === "undefined") return createInitialState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialState();
    const parsed = JSON.parse(raw);
    return { ...createInitialState(), ...parsed };
  } catch {
    return createInitialState();
  }
}

export function V2StoreProvider({ children }) {
  const [state, setState] = useState(loadInitialState);
  const [toastMessage, setToastMessage] = useState(null);
  const [passwordResetChallenge, setPasswordResetChallenge] = useState(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      return;
    }
  }, [state]);

  const notify = useCallback((message) => {
    setToastMessage(message);
  }, []);

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(null), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const currentUser =
    state.users.find((u) => u.id === state.currentUserId) || null;
  const currentRole = currentUser ? currentUser.role : "guest";

  const getTierInfo = useCallback((tierId) => {
    return MEMBERSHIP_TIERS.find((t) => t.id === tierId) || MEMBERSHIP_TIERS[0];
  }, []);

  const getDiscountPercent = useCallback(() => {
    if (!currentUser) return 0;
    if (currentUser.role === "super_admin") return 0;
    const tier = MEMBERSHIP_TIERS.find(
      (t) => t.id === currentUser.membershipTier
    );
    return tier ? tier.discountPercent : 0;
  }, [currentUser]);

  const switchRoleQuick = useCallback(
    (roleId) => {
      if (roleId === "guest") {
        setState((prev) => ({
          ...prev,
          currentUserId: null,
          pendingAuthIntent: null,
        }));
        notify("Switched to Guest (non-registered user)");
        return;
      }
      setState((prev) => {
        const match = prev.users.find((u) => u.role === roleId);
        return {
          ...prev,
          currentUserId: match ? match.id : prev.users[0].id,
          pendingAuthIntent: null,
        };
      });
      const labels = {
        user: "Registered user",
        admin: "Admin (verified seller / practitioner)",
        super_admin: "Super Admin",
      };
      notify(`Switched role to ${labels[roleId] || roleId}`);
    },
    [notify]
  );

  const setPendingAuthIntent = useCallback((intent) => {
    setState((prev) => ({ ...prev, pendingAuthIntent: intent }));
  }, []);

  const clearPendingAuthIntent = useCallback(() => {
    setState((prev) => ({ ...prev, pendingAuthIntent: null }));
  }, []);

  const applyPendingAction = useCallback((prev, userId) => {
    const intent = prev.pendingAuthIntent;
    if (!intent) return prev;
    if (intent.type === "wishlist" && intent.itemId) {
      const exists = prev.wishlist.some(
        (w) => w.userId === userId && w.itemId === intent.itemId
      );
      if (!exists) {
        return {
          ...prev,
          wishlist: [...prev.wishlist, { userId, itemId: intent.itemId }],
        };
      }
    }
    return prev;
  }, []);

  const loginUser = useCallback(
    ({ identifier, password }) => {
      const normalized = identifier.trim().toLowerCase();
      const matched = state.users.find(
        (u) =>
          (u.email.toLowerCase() === normalized ||
            u.phone.toLowerCase() === normalized) &&
          (!password || u.password === password)
      );
      if (!matched) {
        return { ok: false, error: "Invalid email/phone or password." };
      }
      const pending = state.pendingAuthIntent;
      setState((prev) => {
        const next = applyPendingAction(prev, matched.id);
        return {
          ...next,
          currentUserId: matched.id,
          pendingAuthIntent: null,
        };
      });
      notify(`Welcome back, ${matched.name}`);
      return { ok: true, user: matched, pendingIntent: pending };
    },
    [state.users, state.pendingAuthIntent, applyPendingAction, notify]
  );

  const loginDemoUser = useCallback(() => {
    const demoUser =
      state.users.find((u) => u.id === "user-1") || state.users[0];
    const pending = state.pendingAuthIntent;
    setState((prev) => {
      const next = applyPendingAction(prev, demoUser.id);
      return {
        ...next,
        currentUserId: demoUser.id,
        pendingAuthIntent: null,
      };
    });
    notify(`Signed in as ${demoUser.name}`);
    return { ok: true, user: demoUser, pendingIntent: pending };
  }, [state.users, state.pendingAuthIntent, applyPendingAction, notify]);

  const signUpUser = useCallback(
    ({ name, phone, email, city, primaryInterest, password }) => {
      const cleanEmail = email.trim().toLowerCase();
      const existing = state.users.find(
        (u) => u.email.toLowerCase() === cleanEmail || u.phone === phone.trim()
      );
      if (existing) {
        return {
          ok: false,
          error: "An account with this email or phone already exists.",
        };
      }
      const newUser = {
        id: `user-${Date.now()}`,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city?.trim() || "Pune",
        primaryInterest: primaryInterest || "Wellness",
        password,
        role: "user",
        membershipTier: "open",
      };
      const pending = state.pendingAuthIntent;
      setState((prev) => {
        const withUser = {
          ...prev,
          users: [...prev.users, newUser],
          currentUserId: newUser.id,
        };
        const next = applyPendingAction(withUser, newUser.id);
        return {
          ...next,
          pendingAuthIntent: null,
        };
      });
      notify("Account created with free JYA Open access");
      return { ok: true, user: newUser, pendingIntent: pending };
    },
    [state.users, state.pendingAuthIntent, applyPendingAction, notify]
  );

  const logoutUser = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentUserId: null,
      pendingAuthIntent: null,
    }));
    notify("Signed out");
  }, [notify]);

  const updateUserProfile = useCallback(
    (profileData) => {
      if (!currentUser) return false;
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.id === currentUser.id
            ? {
                ...u,
                name: profileData.name?.trim() || u.name,
                phone: profileData.phone?.trim() || u.phone,
                email: profileData.email?.trim() || u.email,
                city: profileData.city?.trim() || u.city,
                primaryInterest:
                  profileData.primaryFocus || u.primaryInterest,
                enrollmentProfile: {
                  ...(u.enrollmentProfile || {}),
                  fullName: profileData.name?.trim() || u.name,
                  mobile: profileData.phone?.trim() || u.phone,
                  email: profileData.email?.trim() || u.email,
                  city: profileData.city?.trim() || u.city,
                  state: profileData.state?.trim() ?? u.enrollmentProfile?.state,
                  addressLine:
                    profileData.addressLine?.trim() ??
                    u.enrollmentProfile?.addressLine,
                  pinCode:
                    profileData.pinCode?.trim() ?? u.enrollmentProfile?.pinCode,
                  householdSize:
                    profileData.householdSize ||
                    u.enrollmentProfile?.householdSize,
                  primaryFocus:
                    profileData.primaryFocus ||
                    u.enrollmentProfile?.primaryFocus,
                  emergencyName:
                    profileData.emergencyName?.trim() ??
                    u.enrollmentProfile?.emergencyName,
                  emergencyPhone:
                    profileData.emergencyPhone?.trim() ??
                    u.enrollmentProfile?.emergencyPhone,
                  goal:
                    profileData.goal?.trim() ?? u.enrollmentProfile?.goal,
                },
              }
            : u
        ),
      }));
      notify("Profile details saved cleanly");
      return true;
    },
    [currentUser, notify]
  );

  const requestPasswordResetOtp = useCallback(
    (email) => {
      const normalized = (email || "").trim().toLowerCase();
      const matched = state.users.find(
        (u) => u.email.toLowerCase() === normalized
      );
      if (!matched) {
        return {
          ok: false,
          error: "No registered account matches this email address.",
        };
      }
      const otp = String(Math.floor(100000 + Math.random() * 900000));
      setPasswordResetChallenge({
        email: matched.email.toLowerCase(),
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000,
      });
      notify(`6-digit OTP sent to ${matched.email}`);
      return {
        ok: true,
        email: matched.email,
        name: matched.name,
        demoOtp: otp,
      };
    },
    [state.users, notify]
  );

  const resetUserPassword = useCallback(
    ({ email, otp, newPassword }) => {
      const normalized = (email || "").trim().toLowerCase();
      if (
        !passwordResetChallenge ||
        passwordResetChallenge.email !== normalized
      ) {
        return {
          ok: false,
          error: "Please request a verification OTP for this email first.",
        };
      }
      if (Date.now() > passwordResetChallenge.expiresAt) {
        return {
          ok: false,
          error: "Verification OTP expired. Click Resend OTP to get a fresh code.",
        };
      }
      if (passwordResetChallenge.otp !== String(otp).trim()) {
        return {
          ok: false,
          error: "Incorrect 6-digit OTP. Please verify and try again.",
        };
      }
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.email.toLowerCase() === normalized
            ? { ...u, password: newPassword }
            : u
        ),
      }));
      setPasswordResetChallenge(null);
      notify("Password updated successfully. You may now sign in.");
      return { ok: true };
    },
    [passwordResetChallenge, notify]
  );

  const toggleWishlist = useCallback(
    (itemId) => {
      if (!currentUser) return false;
      setState((prev) => {
        const exists = prev.wishlist.some(
          (w) => w.userId === currentUser.id && w.itemId === itemId
        );
        const wishlist = exists
          ? prev.wishlist.filter(
              (w) => !(w.userId === currentUser.id && w.itemId === itemId)
            )
          : [...prev.wishlist, { userId: currentUser.id, itemId }];
        return { ...prev, wishlist };
      });
      notify("Wishlist updated");
      return true;
    },
    [currentUser, notify]
  );

  const addToCart = useCallback(
    (item) => {
      setState((prev) => {
        const existing = prev.cart.find((c) => c.id === item.id);
        const cart = existing
          ? prev.cart.map((c) =>
              c.id === item.id ? { ...c, qty: c.qty + 1 } : c
            )
          : [...prev.cart, { ...item, qty: 1 }];
        return { ...prev, cart };
      });
      notify(`${item.title} added to cart`);
    },
    [notify]
  );

  const updateCartQty = useCallback((itemId, nextQty) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart
        .map((c) => (c.id === itemId ? { ...c, qty: Math.max(0, nextQty) } : c))
        .filter((c) => c.qty > 0),
    }));
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setState((prev) => ({
      ...prev,
      cart: prev.cart.filter((c) => c.id !== itemId),
    }));
  }, []);

  const placeOrder = useCallback(
    (payload) => {
      const subtotal = state.cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
      const discountPercent = getDiscountPercent();
      const discountAmount = Math.round((subtotal * discountPercent) / 100);
      const total = subtotal - discountAmount;
      const order = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        userId: currentUser ? currentUser.id : null,
        customerName:
          payload.customerName || (currentUser ? currentUser.name : "Guest"),
        customerPhone: payload.customerPhone || payload.phone || "",
        alternatePhone: payload.alternatePhone || "",
        email: payload.email || currentUser?.email || "",
        addressLine1: payload.addressLine1 || payload.address || "",
        landmark: payload.landmark || "",
        city: payload.city || "",
        state: payload.state || "",
        pinCode: payload.pinCode || "",
        deliveryWindow: payload.deliveryWindow || "Standard Courier",
        orderNotes: payload.orderNotes || "",
        address: payload.address,
        paymentMethod: payload.paymentMethod,
        items: state.cart,
        subtotal,
        discountPercent,
        discountAmount,
        total,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        orders: [order, ...prev.orders],
        cart: [],
      }));
      notify(`Order ${order.id} confirmed`);
      return order;
    },
    [state.cart, currentUser, getDiscountPercent, notify]
  );

  const createBooking = useCallback(
    (payload) => {
      const discountPercent = payload.discountPercent ?? getDiscountPercent();
      const basePrice = Number(payload.basePrice ?? payload.baseAmount ?? 0);
      const finalPrice = Math.max(
        0,
        basePrice - Math.round((basePrice * discountPercent) / 100)
      );
      const booking = {
        id: `BK-${Date.now().toString().slice(-6)}`,
        userId: currentUser ? currentUser.id : null,
        userRole: currentUser ? currentUser.role : "guest",
        ...payload,
        patientName:
          payload.patientName || payload.name || currentUser?.name || "Guest",
        basePrice,
        discountPercent,
        finalPrice,
        status: payload.status || "Confirmed",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        bookings: [booking, ...prev.bookings],
      }));
      notify(`Booking ${booking.id} confirmed`);
      return booking;
    },
    [currentUser, getDiscountPercent, notify]
  );

  const createEnquiry = useCallback(
    (payload) => {
      const enquiry = {
        id: `ENQ-${Date.now().toString().slice(-6)}`,
        userId: currentUser ? currentUser.id : null,
        ...payload,
        status: payload.status || "Submitted",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        enquiries: [enquiry, ...prev.enquiries],
      }));
      notify(`Enquiry ${enquiry.id} received`);
      return enquiry;
    },
    [currentUser, notify]
  );

  const registerForEvent = useCallback(
    (payloadOrId, extra) => {
      const payload =
        typeof payloadOrId === "object"
          ? payloadOrId
          : { eventId: payloadOrId, ...extra };
      const reg = {
        id: `EVT-${Date.now().toString().slice(-6)}`,
        userId: currentUser ? currentUser.id : null,
        ...payload,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        eventRegistrations: [reg, ...prev.eventRegistrations],
        events: prev.events.map((ev) =>
          ev.id === payload.eventId
            ? {
                ...ev,
                seatsLeft: Math.max(
                  0,
                  ev.seatsLeft - (Number(payload.seats) || 1)
                ),
              }
            : ev
        ),
      }));
      notify("Event seat registration confirmed");
      return reg;
    },
    [currentUser, notify]
  );

  const activateMembership = useCallback(
    (tierId, enrollmentData = null) => {
      if (!currentUser) return;
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.id === currentUser.id
            ? {
                ...u,
                membershipTier: tierId,
                enrollmentProfile: enrollmentData || u.enrollmentProfile,
              }
            : u
        ),
      }));
      const tier = getTierInfo(tierId);
      notify(`${tier.name} is now active on your profile`);
    },
    [currentUser, getTierInfo, notify]
  );

  const submitAcademyApplication = useCallback(
    (payload) => {
      if (!currentUser) return null;
      const app = {
        id: `ACA-${Date.now().toString().slice(-6)}`,
        userId: currentUser.id,
        ...payload,
        createdAt: new Date().toLocaleDateString(),
      };
      setState((prev) => ({
        ...prev,
        academyApplications: [app, ...prev.academyApplications],
      }));
      notify("Academy admission confirmed");
      return app;
    },
    [currentUser, notify]
  );

  const createMuktikhelaProfile = useCallback(
    (payload) => {
      if (!currentUser) return null;
      const profile = {
        id: `MP-${Date.now().toString().slice(-6)}`,
        userId: currentUser.id,
        ...payload,
      };
      setState((prev) => ({
        ...prev,
        muktikhelaProfiles: [profile, ...prev.muktikhelaProfiles],
      }));
      notify("Player profile created");
      return profile;
    },
    [currentUser, notify]
  );

  const saveMuktikhelaReport = useCallback(
    ({ profile, answers }) => {
      if (!currentUser) return null;
      const heightM = (Number(profile?.heightCm) || 170) / 100;
      const weightKg = Number(profile?.weightKg) || 68;
      const bmi = (weightKg / Math.max(0.5, heightM * heightM)).toFixed(1);

      const zoneCounts = { A: 0, B: 0, C: 0, D: 0 };
      Object.values(answers || {}).forEach((zoneCode) => {
        if (zoneCounts[zoneCode] !== undefined) {
          zoneCounts[zoneCode] += 1;
        }
      });

      const entries = Object.entries(zoneCounts);
      entries.sort((a, b) => b[1] - a[1]);
      const dominantCode = entries[0][1] > 0 ? entries[0][0] : "A";
      const dominantZone =
        MUKTIKHELA_ZONES.find((z) => z.code === dominantCode) ||
        MUKTIKHELA_ZONES[0];

      const record = {
        id: `MKR-${Date.now().toString().slice(-6)}`,
        userId: currentUser.id,
        profileId: profile?.id || "mp-default",
        playerName: profile?.name || currentUser.name,
        relation: profile?.relation || "Self",
        age: profile?.age || "32",
        gender: profile?.gender || "Unspecified",
        heightCm: profile?.heightCm || "170",
        weightKg: profile?.weightKg || "68",
        profession: profile?.profession || "Member",
        bmi,
        sleepHours: profile?.sleepHours || "7-8 hrs",
        dietType: profile?.dietType || "Fresh Home-Cooked",
        existingCondition: profile?.existingCondition || "None reported",
        dominantZone,
        zoneCounts,
        summaryNote: `Vaidya Assessment (${profile?.profession || "Member"}): BMI ${bmi} · Dominant ${dominantZone.name} (${dominantZone.sanskrit}). Diet focus: ${dominantZone.summary}`,
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        muktikhelaReports: [record, ...prev.muktikhelaReports],
      }));
      notify("Vaidya-readable scorecard auto-saved to User Dashboard");
      return record;
    },
    [currentUser, notify]
  );

  const submitListing = useCallback(
    (payload) => {
      if (!currentUser) return null;
      const itemType = payload.type || "barter";
      const isDirectInternalProduct =
        itemType === "product" && currentUser.role === "super_admin";
      const status = isDirectInternalProduct ? "approved" : "pending";
      const item = {
        id: `LST-${Date.now().toString().slice(-6)}`,
        type: itemType,
        tradeType: payload.tradeType || "Sell or Barter",
        title: payload.title,
        category: payload.category || (itemType === "product" ? "E-Shop" : "Barter Goods"),
        sellerName: currentUser.name,
        sellerPhone: payload.sellerPhone || currentUser.phone || "",
        originLocation: payload.originLocation || currentUser.city || "Lavale, Pune",
        pinCode: payload.pinCode || "",
        harvestDate: payload.harvestDate || "",
        quantityLabel: payload.quantityLabel || "1 Batch",
        conditionGrade: payload.conditionGrade || "Freshly Harvested / First Press",
        shelfLife: payload.shelfLife || "12 Months",
        purityStandard: payload.purityStandard || "Homegrown Organic",
        exchangeMode: payload.exchangeMode || "Either",
        packagingDetails: payload.packagingDetails || "",
        price: Number(payload.price) || 0,
        description: payload.description,
        wantsInReturn: payload.wantsInReturn || "",
        image: payload.image,
        imageName: payload.imageName || "",
        status,
        verifiedBy: "",
        verifiedAt: "",
        rejectionReason: "",
        createdAt: new Date().toISOString().slice(0, 10),
        ownerId: currentUser.id,
      };
      setState((prev) => ({
        ...prev,
        listings: [item, ...prev.listings],
      }));
      notify(
        status === "pending"
          ? "Item submitted! Pending Admin verification before other users can view it"
          : "Product listing published"
      );
      return item;
    },
    [currentUser, notify]
  );

  const resubmitListing = useCallback(
    (listingId, updates) => {
      setState((prev) => ({
        ...prev,
        listings: prev.listings.map((item) =>
          item.id === listingId
            ? {
                ...item,
                ...updates,
                status: "pending",
                rejectionReason: "",
                verifiedBy: "",
                verifiedAt: "",
                resubmittedAt: new Date().toISOString().slice(0, 10),
              }
            : item
        ),
        sellerServices: prev.sellerServices.map((srv) =>
          srv.id === listingId
            ? { ...srv, ...updates, status: "pending", rejectionReason: "" }
            : srv
        ),
      }));
      notify("Updated listing resubmitted to Admin verification queue");
    },
    [notify]
  );

  const sendBarterOffer = useCallback(
    (itemOrPayload, offerData) => {
      if (!currentUser) return null;
      const item = itemOrPayload?.title ? itemOrPayload : null;
      const data = item ? offerData || {} : itemOrPayload || {};
      const targetOwnerId = item?.ownerId || data.listingOwnerId;
      if (targetOwnerId && targetOwnerId === currentUser.id) {
        notify("You cannot send an exchange offer to your own listing");
        return null;
      }
      const offer = {
        id: `BOF-${Date.now().toString().slice(-6)}`,
        listingId: item?.id || data.listingId,
        listingTitle: item?.title || data.listingTitle,
        targetOwnerId,
        proposerUserId: currentUser.id,
        proposerName: currentUser.name,
        offeredItem: data.offeredItem,
        offeredCondition: data.offeredCondition || "",
        offeredQuantity: data.offeredQuantity || "",
        estimatedValue: data.estimatedValue || "",
        fulfillmentMode: data.fulfillmentMode || "",
        proposedDate: data.proposedDate || "",
        pickupCity: data.pickupCity || currentUser.city || "",
        contactPhone: data.contactPhone || currentUser.phone,
        message: data.message || data.note || "",
        status: "pending",
        createdAt: new Date().toISOString(),
      };
      setState((prev) => ({
        ...prev,
        barterOffers: [offer, ...prev.barterOffers],
      }));
      notify("Exchange offer sent to verified seller");
      return offer;
    },
    [currentUser, notify]
  );

  const decideBarterOffer = useCallback(
    (offerId, decision) => {
      setState((prev) => ({
        ...prev,
        barterOffers: prev.barterOffers.map((o) =>
          o.id === offerId ? { ...o, status: decision } : o
        ),
      }));
      notify(`Barter offer ${decision}`);
    },
    [notify]
  );

  const submitPractitionerApplication = useCallback(
    (payload) => {
      if (!currentUser) return null;
      const existing = state.practitionerApplications.find(
        (a) => a.userId === currentUser.id
      );
      if (existing) {
        setState((prev) => ({
          ...prev,
          practitionerApplications: prev.practitionerApplications.map((a) =>
            a.userId === currentUser.id
              ? {
                  ...a,
                  ...payload,
                  status: "pending",
                  rejectionReason: "",
                }
              : a
          ),
        }));
        notify("Credentials resubmitted for Super Admin verification");
        return existing;
      }
      const app = {
        id: `PR-${Date.now().toString().slice(-6)}`,
        userId: currentUser.id,
        applicantName: currentUser.name,
        applicantEmail: currentUser.email,
        ...payload,
        status: "pending",
        paid: false,
        rejectionReason: "",
        createdAt: new Date().toLocaleDateString(),
      };
      setState((prev) => ({
        ...prev,
        practitionerApplications: [app, ...prev.practitionerApplications],
      }));
      notify("Credentials uploaded for Super Admin verification");
      return app;
    },
    [currentUser, state.practitionerApplications, notify]
  );

  const completePractitionerPayment = useCallback(
    (appId) => {
      if (!currentUser) return;
      setState((prev) => ({
        ...prev,
        practitionerApplications: prev.practitionerApplications.map((a) =>
          a.id === appId ? { ...a, paid: true } : a
        ),
        users: prev.users.map((u) =>
          u.id === currentUser.id
            ? { ...u, role: "admin", membershipTier: "globalayurx" }
            : u
        ),
      }));
      notify("Registration paid. Role is now Admin: seller");
    },
    [currentUser, notify]
  );

  const decideListingBySuperAdmin = useCallback(
    (itemId, decision, reason = "") => {
      const verifierName = currentUser?.name || "JYA Admin Verifier";
      const verifiedDate = new Date().toISOString().slice(0, 10);
      setState((prev) => ({
        ...prev,
        listings: prev.listings.map((item) =>
          item.id === itemId
            ? {
                ...item,
                status: decision,
                rejectionReason: decision === "rejected" ? reason : "",
                verifiedBy: decision === "approved" ? verifierName : "",
                verifiedAt: decision === "approved" ? verifiedDate : "",
              }
            : item
        ),
        sellerServices: prev.sellerServices.map((srv) =>
          srv.id === itemId
            ? { ...srv, status: decision, rejectionReason: reason }
            : srv
        ),
      }));
      notify(
        decision === "approved"
          ? "Item verified by Admin and is now visible to all users"
          : "Item returned to seller with verification feedback"
      );
    },
    [currentUser, notify]
  );

  const decidePractitionerBySuperAdmin = useCallback(
    (appId, decision, reason = "") => {
      setState((prev) => ({
        ...prev,
        practitionerApplications: prev.practitionerApplications.map((a) =>
          a.id === appId
            ? { ...a, status: decision, rejectionReason: reason }
            : a
        ),
      }));
      notify(
        decision === "verified"
          ? "Practitioner verified"
          : "Returned to applicant with reason"
      );
    },
    [notify]
  );

  const updateUserRoleBySuperAdmin = useCallback(
    (userId, role) => {
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) => (u.id === userId ? { ...u, role } : u)),
      }));
      notify("User role updated");
    },
    [notify]
  );

  const updateUserMembershipBySuperAdmin = useCallback(
    (userId, membershipTier) => {
      setState((prev) => ({
        ...prev,
        users: prev.users.map((u) =>
          u.id === userId ? { ...u, membershipTier } : u
        ),
      }));
      notify("User membership updated");
    },
    [notify]
  );

  const publishEventBySuperAdmin = useCallback(
    (eventData) => {
      const evt = {
        id: `evt-${Date.now().toString().slice(-6)}`,
        ...eventData,
        seatsLeft: Number(eventData.seatsLeft) || 25,
      };
      setState((prev) => ({
        ...prev,
        events: [evt, ...prev.events],
      }));
      notify("Event published directly");
    },
    [notify]
  );

  const publishBlogBySuperAdmin = useCallback(
    (blogData) => {
      const blog = {
        id: `blog-${Date.now().toString().slice(-6)}`,
        ...blogData,
      };
      setState((prev) => ({
        ...prev,
        blogs: [blog, ...prev.blogs],
      }));
      notify("Blog published directly");
    },
    [notify]
  );

  const value = {
    state,
    currentUser,
    currentRole,
    toastMessage,
    notify,
    getTierInfo,
    getDiscountPercent,
    switchRoleQuick,
    setPendingAuthIntent,
    clearPendingAuthIntent,
    loginUser,
    loginDemoUser,
    signUpUser,
    logoutUser,
    updateUserProfile,
    requestPasswordResetOtp,
    resetUserPassword,
    toggleWishlist,
    addToCart,
    updateCartQty,
    removeFromCart,
    placeOrder,
    createBooking,
    createEnquiry,
    registerForEvent,
    activateMembership,
    submitAcademyApplication,
    createMuktikhelaProfile,
    saveMuktikhelaReport,
    submitListing,
    resubmitListing,
    sendBarterOffer,
    decideBarterOffer,
    submitPractitionerApplication,
    completePractitionerPayment,
    decideListingBySuperAdmin,
    decidePractitionerBySuperAdmin,
    updateUserRoleBySuperAdmin,
    updateUserMembershipBySuperAdmin,
    publishEventBySuperAdmin,
    publishBlogBySuperAdmin,
  };

  return (
    <V2StoreContext.Provider value={value}>{children}</V2StoreContext.Provider>
  );
}
