# JnanaYogAyu (JYA)

**JnanaYogAyu** is a MakeMyTrip-style multi-partner Ayurvedic clinics, Panchakarma centres, holistic wellness, learning (`Swagurukul`), and natural marketplace aggregator platform.

## Repository Structure

```text
JnanaYogAyu/
├── frontend/          # React 19 + Vite + Tailwind CSS client web app
│   ├── public/        # Static public assets (favicon, icons)
│   ├── src/
│   │   ├── assets/    # Organized domain images (brand, community, gurukul, home, marketplace, membership, muktikhela, shatayush)
│   │   ├── components/
│   │   │   ├── common/      # Reusable buttons, forms, icons, loader, modals, table, ErrorBoundary, SmoothScroll
│   │   │   ├── layout/      # Navbar, Footer, ScrollToTop
│   │   │   ├── membership/  # MembershipModal, MotionKit
│   │   │   └── sections/    # Hero & Home page feature sections
│   │   ├── context/   # Global React Context providers (LoaderContext)
│   │   ├── hooks/     # Custom React hooks
│   │   ├── pages/     # Route-level pages (HomePage, MembershipPage, ShatayushWorldPage)
│   │   ├── services/  # External integrations & API clients (razorpay.js)
│   │   ├── utils/     # Shared utilities & helpers
│   │   └── validation/# Yup validation schemas (membershipSchema, shatayushSchema)
│   ├── .env           # Public VITE_* environment variables only
│   └── package.json
├── backend/           # Segregated server-side API & worker scaffold
│   ├── src/
│   │   ├── config/    # Environment, DB, Razorpay & storage configuration
│   │   ├── db/        # Migrations & seeds
│   │   ├── middleware/# Auth JWT, RBAC & tenant isolation middleware
│   │   ├── modules/   # Domain modules (auth, users, partners, vaidyas, vendors, catalog, bookings, payments, memberships, shatayush, muktikhela, content, admin, superadmin)
│   │   ├── routes/    # API routes (/api/v1/...)
│   │   ├── services/  # WhatsApp Business API, Email, S3/R2 signed URLs
│   │   └── utils/     # Shared server helpers
│   ├── .env           # Server-only secrets (RAZORPAY_KEY_SECRET, DB, JWT)
│   └── package.json
└── docs/              # Architecture documentation, flowcharts, UI mockups & PDF spec
```

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

Production build:
```bash
cd frontend
npm run build
```

## Architecture & Documentation
- Full spec (Markdown): [docs/JYA_WEBSITE_AND_BACKEND_ARCHITECTURE.md](docs/JYA_WEBSITE_AND_BACKEND_ARCHITECTURE.md)
- Full spec with flowcharts & UI mockups (PDF): [docs/JYA_WEBSITE_AND_BACKEND_ARCHITECTURE.pdf](docs/JYA_WEBSITE_AND_BACKEND_ARCHITECTURE.pdf)
