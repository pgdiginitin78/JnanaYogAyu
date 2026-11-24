# JnanaYogAyu Backend (Service Scaffold)

This directory is segregated from `../frontend` to host the server-side API, database migrations, Razorpay order/signature/webhook handlers, RBAC auth, WhatsApp integration, and multi-partner clinic aggregator modules.

## Folder Structure
```text
backend/
├── .env                  # Server-only secrets (RAZORPAY_KEY_SECRET, DB, JWT)
├── .env.example          # Environment variable template
├── package.json
└── src/
    ├── config/           # Env loader, Razorpay client, DB, S3/R2 storage config
    ├── db/
    │   ├── migrations/   # Database schema migrations
    │   └── seeds/        # Initial seed scripts (SuperAdmin bootstrap, plans, zones)
    ├── middleware/       # authenticateJWT, requireRole, requireVerifiedTenant, scopeToTenant, rateLimiter
    ├── modules/          # Domain modules:
    │   ├── auth/         # Unified login, OTP, 2FA, JWT refresh, workspace switching, invites
    │   ├── users/        # Patient profiles, family members, cart, wishlist
    │   ├── partners/     # Clinic/Center onboarding, KYC docs, branches, slot/bed calendars
    │   ├── vaidyas/      # Doctor credentials, consultation slots, clinical notes
    │   ├── vendors/      # Herbal/organic product sellers & community barter
    │   ├── catalog/      # MakeMyTrip-style search, filters, clinic comparison
    │   ├── bookings/     # Slot/bed locks, quotes with membership discounts, cancellations
    │   ├── payments/     # Razorpay order creation, HMAC verification, webhooks, Route payouts
    │   ├── memberships/  # Open, Shatayus, GlobalAyurX, Ecosphere plans & entrance exams
    │   ├── shatayush/    # 21-Day Challenge, enquiries, gated PDF downloads
    │   ├── muktikhela/   # 7-level scoring engine, Zone A-D reports & clinic recommendations
    │   ├── content/      # Blogs, Whitepapers, Podcasts CMS
    │   ├── admin/        # KYC review queue, refunds, cohort management
    │   └── superadmin/   # Admin invites, commission slabs, payout releases, audit logs
    ├── routes/           # API route registry (/api/v1/...)
    ├── services/         # WhatsApp Business API, Email/SMTP, S3/R2 signed URLs
    └── utils/            # Crypto helpers, validators, logger
```

See [JYA_WEBSITE_AND_BACKEND_ARCHITECTURE.md](../docs/JYA_WEBSITE_AND_BACKEND_ARCHITECTURE.md) for the full schema, role RBAC matrix, flowcharts, and endpoint contracts.

