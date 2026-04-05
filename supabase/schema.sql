-- ============================================
-- SupplyGuard Database Schema
-- Supplier Risk & Due Diligence Tracker
-- ============================================

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ============================================
-- SUPPLIERS
-- ============================================
create table public.suppliers (
  id uuid primary key default gen_random_uuid(),
  supplier_name text not null,
  parent_company text,
  country text not null,
  region text not null,
  commodity text not null,
  annual_spend numeric(15, 2) not null default 0,
  business_criticality text not null check (business_criticality in ('low', 'medium', 'high', 'critical')),
  onboarding_status text not null default 'pending' check (onboarding_status in ('pending', 'in_progress', 'approved', 'rejected')),
  audit_status text not null default 'not_scheduled' check (audit_status in ('not_scheduled', 'scheduled', 'in_progress', 'completed', 'overdue')),
  contract_start_date date,
  contract_end_date date,
  audit_due_date date,
  single_source_flag boolean not null default false,
  risk_score integer not null default 0 check (risk_score >= 0 and risk_score <= 100),
  risk_band text not null default 'low' check (risk_band in ('low', 'medium', 'high', 'critical')),
  sanctions_status text not null default 'clear' check (sanctions_status in ('clear', 'pending_review', 'flagged', 'confirmed_match')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- SUPPLIER DOCUMENTS
-- ============================================
create table public.supplier_documents (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  document_type text not null,
  status text not null default 'missing' check (status in ('missing', 'submitted', 'under_review', 'approved', 'expired')),
  file_name text,
  file_url text,
  submitted_at timestamptz,
  expires_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- SANCTIONS ENTITIES
-- ============================================
create table public.sanctions_entities (
  id uuid primary key default gen_random_uuid(),
  entity_name text not null,
  normalized_name text not null,
  entity_type text not null check (entity_type in ('individual', 'organization')),
  source_list text not null,
  country text,
  aliases text[],
  created_at timestamptz not null default now()
);

-- ============================================
-- SANCTIONS MATCHES
-- ============================================
create table public.sanctions_matches (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  entity_id uuid not null references public.sanctions_entities(id) on delete cascade,
  match_type text not null check (match_type in ('exact', 'fuzzy')),
  match_score numeric(5, 2) not null default 0,
  review_status text not null default 'pending' check (review_status in ('pending', 'cleared', 'escalated', 'confirmed_concern')),
  reviewed_by text,
  reviewed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- AUDITS
-- ============================================
create table public.audits (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  audit_type text not null,
  status text not null default 'scheduled' check (status in ('scheduled', 'in_progress', 'completed', 'overdue')),
  due_date date not null,
  completed_date date,
  findings text,
  created_at timestamptz not null default now()
);

-- ============================================
-- CONTRACTS
-- ============================================
create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  contract_number text not null,
  start_date date not null,
  end_date date not null,
  value numeric(15, 2) not null default 0,
  status text not null default 'active' check (status in ('active', 'expiring_soon', 'expired', 'renewed')),
  auto_renew boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================
-- RISK EVENTS
-- ============================================
create table public.risk_events (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.suppliers(id) on delete cascade,
  event_type text not null,
  severity text not null check (severity in ('low', 'medium', 'high', 'critical')),
  description text not null,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================
-- INDEXES
-- ============================================
create index idx_suppliers_risk_band on public.suppliers(risk_band);
create index idx_suppliers_country on public.suppliers(country);
create index idx_suppliers_commodity on public.suppliers(commodity);
create index idx_suppliers_sanctions_status on public.suppliers(sanctions_status);
create index idx_supplier_documents_supplier_id on public.supplier_documents(supplier_id);
create index idx_supplier_documents_status on public.supplier_documents(status);
create index idx_sanctions_matches_supplier_id on public.sanctions_matches(supplier_id);
create index idx_sanctions_matches_review_status on public.sanctions_matches(review_status);
create index idx_sanctions_entities_normalized_name on public.sanctions_entities(normalized_name);
create index idx_audits_supplier_id on public.audits(supplier_id);
create index idx_audits_status on public.audits(status);
create index idx_contracts_supplier_id on public.contracts(supplier_id);
create index idx_contracts_end_date on public.contracts(end_date);
create index idx_risk_events_supplier_id on public.risk_events(supplier_id);

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger suppliers_updated_at
  before update on public.suppliers
  for each row execute function public.update_updated_at();

create trigger supplier_documents_updated_at
  before update on public.supplier_documents
  for each row execute function public.update_updated_at();

create trigger sanctions_matches_updated_at
  before update on public.sanctions_matches
  for each row execute function public.update_updated_at();

-- ============================================
-- ROW LEVEL SECURITY (basic — enable later with auth)
-- ============================================
alter table public.suppliers enable row level security;
alter table public.supplier_documents enable row level security;
alter table public.sanctions_entities enable row level security;
alter table public.sanctions_matches enable row level security;
alter table public.audits enable row level security;
alter table public.contracts enable row level security;
alter table public.risk_events enable row level security;

-- Allow all access for now (tighten with auth later)
create policy "Allow all access to suppliers" on public.suppliers for all using (true) with check (true);
create policy "Allow all access to supplier_documents" on public.supplier_documents for all using (true) with check (true);
create policy "Allow all access to sanctions_entities" on public.sanctions_entities for all using (true) with check (true);
create policy "Allow all access to sanctions_matches" on public.sanctions_matches for all using (true) with check (true);
create policy "Allow all access to audits" on public.audits for all using (true) with check (true);
create policy "Allow all access to contracts" on public.contracts for all using (true) with check (true);
create policy "Allow all access to risk_events" on public.risk_events for all using (true) with check (true);
