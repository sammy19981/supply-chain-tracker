export type Database = {
  public: {
    Tables: {
      suppliers: {
        Row: Supplier;
        Insert: Omit<Supplier, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Supplier, "id">>;
      };
      supplier_documents: {
        Row: SupplierDocument;
        Insert: Omit<SupplierDocument, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SupplierDocument, "id">>;
      };
      sanctions_entities: {
        Row: SanctionsEntity;
        Insert: Omit<SanctionsEntity, "id" | "created_at">;
        Update: Partial<Omit<SanctionsEntity, "id">>;
      };
      sanctions_matches: {
        Row: SanctionsMatch;
        Insert: Omit<SanctionsMatch, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<SanctionsMatch, "id">>;
      };
      audits: {
        Row: Audit;
        Insert: Omit<Audit, "id" | "created_at">;
        Update: Partial<Omit<Audit, "id">>;
      };
      contracts: {
        Row: Contract;
        Insert: Omit<Contract, "id" | "created_at">;
        Update: Partial<Omit<Contract, "id">>;
      };
      risk_events: {
        Row: RiskEvent;
        Insert: Omit<RiskEvent, "id" | "created_at">;
        Update: Partial<Omit<RiskEvent, "id">>;
      };
    };
  };
};

export type Supplier = {
  id: string;
  supplier_name: string;
  parent_company: string | null;
  country: string;
  region: string;
  commodity: string;
  annual_spend: number;
  business_criticality: "low" | "medium" | "high" | "critical";
  onboarding_status: "pending" | "in_progress" | "approved" | "rejected";
  audit_status: "not_scheduled" | "scheduled" | "in_progress" | "completed" | "overdue";
  contract_start_date: string;
  contract_end_date: string;
  audit_due_date: string | null;
  single_source_flag: boolean;
  risk_score: number;
  risk_band: "low" | "medium" | "high" | "critical";
  sanctions_status: "clear" | "pending_review" | "flagged" | "confirmed_match";
  created_at: string;
  updated_at: string;
};

export type SupplierDocument = {
  id: string;
  supplier_id: string;
  document_type: string;
  status: "missing" | "submitted" | "under_review" | "approved" | "expired";
  file_name: string | null;
  file_url: string | null;
  submitted_at: string | null;
  expires_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type SanctionsEntity = {
  id: string;
  entity_name: string;
  normalized_name: string;
  entity_type: string;
  source_list: string;
  country: string | null;
  aliases: string[] | null;
  created_at: string;
};

export type SanctionsMatch = {
  id: string;
  supplier_id: string;
  entity_id: string;
  match_type: "exact" | "fuzzy";
  match_score: number;
  review_status: "pending" | "cleared" | "escalated" | "confirmed_concern";
  reviewed_by: string | null;
  reviewed_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type Audit = {
  id: string;
  supplier_id: string;
  audit_type: string;
  status: "scheduled" | "in_progress" | "completed" | "overdue";
  due_date: string;
  completed_date: string | null;
  findings: string | null;
  created_at: string;
};

export type Contract = {
  id: string;
  supplier_id: string;
  contract_number: string;
  start_date: string;
  end_date: string;
  value: number;
  status: "active" | "expiring_soon" | "expired" | "renewed";
  auto_renew: boolean;
  created_at: string;
};

export type RiskEvent = {
  id: string;
  supplier_id: string;
  event_type: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  resolved: boolean;
  created_at: string;
};

// Risk score breakdown for display
export type RiskBreakdown = {
  total_score: number;
  risk_band: "low" | "medium" | "high" | "critical";
  factors: {
    name: string;
    score: number;
    max_score: number;
    explanation: string;
  }[];
};

export const DOCUMENT_TYPES = [
  "Business Registration",
  "Tax Certificate",
  "Insurance Certificate",
  "Code of Conduct",
  "Sanctions Declaration",
  "ESG Questionnaire",
  "Conflict Minerals Declaration",
  "Audit Report",
  "Contract",
] as const;
