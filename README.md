# SupplyGuard — Supplier Risk & Due Diligence Tracker

A portfolio-ready, enterprise-style web application for procurement and compliance teams to manage supplier risk, track due-diligence documents, screen against sanctions data, and surface actions through dashboards and workflow views.

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (Postgres, Auth, Storage)
- **Recharts** for data visualization
- **Fuse.js** for fuzzy sanctions matching
- Deployable to **Vercel**

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase project credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Set up the database

1. Go to your Supabase project dashboard
2. Open the **SQL Editor**
3. Paste and run `supabase/schema.sql` — this creates all tables
4. Paste and run `supabase/seed.sql` — this inserts demo data

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> The app includes built-in demo data so it renders a complete UI even without Supabase connected.

## Pages

| Route | Description |
|---|---|
| `/login` | Demo login page |
| `/dashboard` | KPI cards, risk distribution chart, spend chart, action queue |
| `/suppliers` | Searchable/filterable/sortable supplier table |
| `/suppliers/[id]` | Supplier profile, risk breakdown, document tracker |
| `/documents` | Due diligence document status across all suppliers |
| `/sanctions-review` | Sanctions screening review workflow |
| `/audits-renewals` | Overdue audits and expiring contracts tracker |
| `/settings` | Profile and configuration |

## Risk Scoring

Transparent rule-based scoring engine (0–100) with weighted factors:

| Factor | Max Points |
|---|---|
| Country Risk | 20 |
| Commodity Risk | 15 |
| Missing Documents | 15 |
| Business Criticality | 15 |
| Overdue Audit | 10 |
| Contract Expiry | 10 |
| Sanctions Status | 10 |
| Single Source Dependency | 5 |

Risk bands: **Low** (0–24), **Medium** (25–44), **High** (45–69), **Critical** (70–100)

## Database Schema

- `suppliers` — supplier profiles with risk scores and status fields
- `supplier_documents` — due diligence document tracking
- `sanctions_entities` — sanctions list entities for screening
- `sanctions_matches` — potential matches for review
- `audits` — audit tracking
- `contracts` — contract management
- `risk_events` — risk event log

## Project Structure

```
src/
├── app/
│   ├── (auth)/login/          # Login page
│   ├── (dashboard)/           # Dashboard layout with sidebar
│   │   ├── dashboard/         # Main dashboard
│   │   ├── suppliers/         # Supplier list + detail
│   │   ├── documents/         # Document tracker
│   │   ├── sanctions-review/  # Sanctions workflow
│   │   ├── audits-renewals/   # Audit + contract views
│   │   └── settings/          # Settings
│   └── layout.tsx             # Root layout
├── components/
│   ├── layout/                # Sidebar, Header
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── supabase.ts            # Supabase client
│   ├── risk-scoring.ts        # Risk scoring engine
│   └── demo-data.ts           # Demo data generator
├── types/
│   └── database.ts            # TypeScript types
supabase/
├── schema.sql                 # Database schema
└── seed.sql                   # Synthetic seed data
```

## Disclaimer

This is a workflow prototype for portfolio and demonstration purposes. It is not a production-grade sanctions screening engine and should not be used as legal or compliance advice.
