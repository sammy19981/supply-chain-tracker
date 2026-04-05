/**
 * Data layer — fetches from Supabase when configured, falls back to demo data.
 *
 * Every page calls these functions. When Supabase is set up, they fetch real
 * data. When it isn't (or the query fails), they return demo data so the app
 * always renders.
 */

import { supabase, isSupabaseConfigured } from "./supabase";
import {
  demoSuppliers,
  demoDocuments,
  getDashboardStats as getDemoStats,
} from "./demo-data";
import type {
  Supplier,
  SupplierDocument,
  SanctionsMatch,
  Audit,
  Contract,
} from "@/types/database";

// ─── Suppliers ──────────────────────────────────────────────

export async function getSuppliers(): Promise<Supplier[]> {
  if (!isSupabaseConfigured) return demoSuppliers;
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .order("risk_score", { ascending: false });
  if (error || !data) {
    console.error("getSuppliers error:", error);
    return demoSuppliers;
  }
  return data as Supplier[];
}

export async function getSupplierById(
  id: string
): Promise<Supplier | null> {
  if (!isSupabaseConfigured) {
    return demoSuppliers.find((s) => s.id === id) || null;
  }
  const { data, error } = await supabase
    .from("suppliers")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return data as Supplier;
}

// ─── Documents ──────────────────────────────────────────────

export async function getAllDocuments(): Promise<SupplierDocument[]> {
  if (!isSupabaseConfigured) return demoDocuments;
  const { data, error } = await supabase
    .from("supplier_documents")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error || !data) return demoDocuments;
  return data as SupplierDocument[];
}

export async function getDocumentsForSupplier(
  supplierId: string
): Promise<SupplierDocument[]> {
  if (!isSupabaseConfigured) {
    return demoDocuments.filter((d) => d.supplier_id === supplierId);
  }
  const { data, error } = await supabase
    .from("supplier_documents")
    .select("*")
    .eq("supplier_id", supplierId)
    .order("document_type");
  if (error || !data) {
    return demoDocuments.filter((d) => d.supplier_id === supplierId);
  }
  return data as SupplierDocument[];
}

// ─── Sanctions ──────────────────────────────────────────────

export async function getSanctionsMatches(): Promise<
  (SanctionsMatch & { supplier_name?: string; entity_name?: string })[]
> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("sanctions_matches")
    .select(
      "*, suppliers(supplier_name), sanctions_entities(entity_name)"
    )
    .order("match_score", { ascending: false });
  if (error || !data) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...(row as SanctionsMatch),
    supplier_name: (row.suppliers as { supplier_name: string } | null)
      ?.supplier_name,
    entity_name: (
      row.sanctions_entities as { entity_name: string } | null
    )?.entity_name,
  }));
}

export async function updateSanctionsMatchStatus(
  matchId: string,
  status: string,
  notes?: string
): Promise<boolean> {
  if (!isSupabaseConfigured) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from("sanctions_matches")
    .update({
      review_status: status,
      reviewed_by: "current_user",
      reviewed_at: new Date().toISOString(),
      notes: notes || null,
    })
    .eq("id", matchId);
  return !error;
}

// ─── Audits ─────────────────────────────────────────────────

export async function getAudits(): Promise<
  (Audit & { supplier_name?: string })[]
> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("audits")
    .select("*, suppliers(supplier_name)")
    .order("due_date", { ascending: true });
  if (error || !data) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...(row as Audit),
    supplier_name: (row.suppliers as { supplier_name: string } | null)
      ?.supplier_name,
  }));
}

// ─── Contracts ──────────────────────────────────────────────

export async function getContracts(): Promise<
  (Contract & { supplier_name?: string })[]
> {
  if (!isSupabaseConfigured) return [];
  const { data, error } = await supabase
    .from("contracts")
    .select("*, suppliers(supplier_name)")
    .order("end_date", { ascending: true });
  if (error || !data) return [];
  return data.map((row: Record<string, unknown>) => ({
    ...(row as Contract),
    supplier_name: (row.suppliers as { supplier_name: string } | null)
      ?.supplier_name,
  }));
}

// ─── Dashboard stats ────────────────────────────────────────

export type DashboardStats = {
  totalSuppliers: number;
  criticalRisk: number;
  highRisk: number;
  pendingSanctions: number;
  overdueAudits: number;
  missingDocs: number;
  expiringContracts: number;
  riskDistribution: { name: string; value: number; color: string }[];
  regionBreakdown: { name: string; value: number }[];
  spendByRegion: { name: string; value: number }[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured) return getDemoStats();

  // Fetch suppliers + docs in parallel
  const [suppliersRes, docsRes] = await Promise.all([
    supabase.from("suppliers").select("*"),
    supabase
      .from("supplier_documents")
      .select("status")
      .eq("status", "missing"),
  ]);

  if (suppliersRes.error || !suppliersRes.data) return getDemoStats();

  const suppliers = suppliersRes.data as Supplier[];
  const now = new Date();

  const totalSuppliers = suppliers.length;
  const criticalRisk = suppliers.filter((s) => s.risk_band === "critical").length;
  const highRisk = suppliers.filter((s) => s.risk_band === "high").length;
  const pendingSanctions = suppliers.filter(
    (s) =>
      s.sanctions_status === "pending_review" ||
      s.sanctions_status === "flagged"
  ).length;
  const overdueAudits = suppliers.filter(
    (s) => s.audit_status === "overdue"
  ).length;
  const missingDocs = docsRes.data?.length || 0;
  const expiringContracts = suppliers.filter((s) => {
    const end = new Date(s.contract_end_date);
    const days =
      (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 90;
  }).length;

  const riskDistribution = [
    {
      name: "Low",
      value: suppliers.filter((s) => s.risk_band === "low").length,
      color: "#16a34a",
    },
    {
      name: "Medium",
      value: suppliers.filter((s) => s.risk_band === "medium").length,
      color: "#eab308",
    },
    {
      name: "High",
      value: suppliers.filter((s) => s.risk_band === "high").length,
      color: "#f97316",
    },
    {
      name: "Critical",
      value: suppliers.filter((s) => s.risk_band === "critical").length,
      color: "#dc2626",
    },
  ];

  const regionBreakdown = Object.entries(
    suppliers.reduce<Record<string, number>>((acc, s) => {
      acc[s.region] = (acc[s.region] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const spendByRegion = Object.entries(
    suppliers.reduce<Record<string, number>>((acc, s) => {
      acc[s.region] = (acc[s.region] || 0) + s.annual_spend;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value: Math.round(value / 1_000_000) }));

  return {
    totalSuppliers,
    criticalRisk,
    highRisk,
    pendingSanctions,
    overdueAudits,
    missingDocs,
    expiringContracts,
    riskDistribution,
    regionBreakdown,
    spendByRegion,
  };
}
