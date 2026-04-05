// Demo data for local development before Supabase is connected.
// This lets the app render a realistic UI immediately.

import type { Supplier, SupplierDocument, RiskBreakdown } from "@/types/database";
import { calculateRiskScore } from "./risk-scoring";

const countries = [
  { name: "USA", region: "North America" },
  { name: "UK", region: "Europe" },
  { name: "Germany", region: "Europe" },
  { name: "China", region: "Asia Pacific" },
  { name: "India", region: "Asia Pacific" },
  { name: "Brazil", region: "Latin America" },
  { name: "Japan", region: "Asia Pacific" },
  { name: "South Korea", region: "Asia Pacific" },
  { name: "Mexico", region: "Latin America" },
  { name: "Canada", region: "North America" },
  { name: "France", region: "Europe" },
  { name: "Turkey", region: "Middle East" },
  { name: "Vietnam", region: "Asia Pacific" },
  { name: "Russia", region: "Europe" },
  { name: "Nigeria", region: "Africa" },
  { name: "UAE", region: "Middle East" },
  { name: "Taiwan", region: "Asia Pacific" },
  { name: "Poland", region: "Europe" },
  { name: "Iran", region: "Middle East" },
  { name: "South Africa", region: "Africa" },
];

const commodities = [
  "Electronics Components", "Raw Materials", "Metals", "Chemicals",
  "Textiles", "Packaging", "Logistics Services", "IT Services",
  "Pharmaceuticals", "Agriculture", "Energy", "MRO Supplies",
  "Professional Services", "Rare Earth Minerals", "Conflict Minerals",
];

const companyPrefixes = [
  "Apex", "Vertex", "Pinnacle", "Quantum", "Atlas", "Nexus", "Vanguard",
  "Titan", "Summit", "Prime", "Global", "Pacific", "Nordic", "Sterling",
  "Eagle", "Phoenix", "Orion", "Sigma", "Delta", "Horizon", "Zenith",
  "Cascade", "Meridian", "Spectrum", "Compass", "Keystone", "Beacon",
  "Landmark", "Granite", "Evergreen", "Sapphire", "Cobalt",
];

const companySuffixes = [
  "Industries", "Corp", "Manufacturing", "Solutions", "Group", "Holdings",
  "Technologies", "Systems", "Materials", "Supply Co", "Enterprises",
  "Trading", "Partners", "International", "Ltd", "GmbH",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(42);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}

function pickCriticality(): Supplier["business_criticality"] {
  const r = rand();
  if (r < 0.2) return "critical";
  if (r < 0.45) return "high";
  if (r < 0.75) return "medium";
  return "low";
}

function pickOnboarding(): Supplier["onboarding_status"] {
  const r = rand();
  if (r < 0.6) return "approved";
  if (r < 0.8) return "in_progress";
  if (r < 0.95) return "pending";
  return "rejected";
}

function pickAudit(): Supplier["audit_status"] {
  const r = rand();
  if (r < 0.35) return "completed";
  if (r < 0.55) return "scheduled";
  if (r < 0.7) return "in_progress";
  if (r < 0.85) return "overdue";
  return "not_scheduled";
}

function pickSanctions(): Supplier["sanctions_status"] {
  const r = rand();
  if (r < 0.8) return "clear";
  if (r < 0.9) return "pending_review";
  if (r < 0.97) return "flagged";
  return "confirmed_match";
}

function generateSuppliers(count: number): Supplier[] {
  const suppliers: Supplier[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name: string;
    do {
      name = `${pick(companyPrefixes)} ${pick(companySuffixes)}`;
    } while (usedNames.has(name));
    usedNames.add(name);

    const country = pick(countries);
    const hasParent = rand() < 0.3;
    const contractStart = new Date(2024, Math.floor(rand() * 12), Math.floor(rand() * 28) + 1);
    const contractEnd = new Date(contractStart);
    contractEnd.setMonth(contractEnd.getMonth() + Math.floor(rand() * 24) + 6);

    const auditDue = new Date(2026, Math.floor(rand() * 12), Math.floor(rand() * 28) + 1);

    const supplier: Supplier = {
      id: `sup-${String(i + 1).padStart(3, "0")}`,
      supplier_name: name,
      parent_company: hasParent ? `${pick(companyPrefixes)} ${pick(companySuffixes)}` : null,
      country: country.name,
      region: country.region,
      commodity: pick(commodities),
      annual_spend: Math.round((rand() * 49950000 + 50000) * 100) / 100,
      business_criticality: pickCriticality(),
      onboarding_status: pickOnboarding(),
      audit_status: pickAudit(),
      contract_start_date: contractStart.toISOString().split("T")[0],
      contract_end_date: contractEnd.toISOString().split("T")[0],
      audit_due_date: auditDue.toISOString().split("T")[0],
      single_source_flag: rand() < 0.15,
      risk_score: 0, // calculated below
      risk_band: "low", // calculated below
      sanctions_status: pickSanctions(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    suppliers.push(supplier);
  }

  return suppliers;
}

const DOCUMENT_TYPES = [
  "Business Registration", "Tax Certificate", "Insurance Certificate",
  "Code of Conduct", "Sanctions Declaration", "ESG Questionnaire",
  "Conflict Minerals Declaration", "Audit Report", "Contract",
];

function pickDocStatus(): SupplierDocument["status"] {
  const r = rand();
  if (r < 0.6) return "approved";
  if (r < 0.75) return "submitted";
  if (r < 0.85) return "missing";
  if (r < 0.95) return "expired";
  return "under_review";
}

function generateDocuments(suppliers: Supplier[]): SupplierDocument[] {
  const docs: SupplierDocument[] = [];
  let docId = 1;

  for (const supplier of suppliers) {
    for (const docType of DOCUMENT_TYPES) {
      const status = pickDocStatus();
      docs.push({
        id: `doc-${String(docId++).padStart(4, "0")}`,
        supplier_id: supplier.id,
        document_type: docType,
        status,
        file_name: status !== "missing" ? `${docType.toLowerCase().replace(/ /g, "_")}_${supplier.id}.pdf` : null,
        file_url: null,
        submitted_at: status !== "missing" ? new Date(2025, Math.floor(rand() * 12), Math.floor(rand() * 28) + 1).toISOString() : null,
        expires_at: status === "expired" || status === "approved"
          ? new Date(2026, Math.floor(rand() * 12), Math.floor(rand() * 28) + 1).toISOString()
          : null,
        notes: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }
  }

  return docs;
}

// Generate data
export const demoSuppliers = generateSuppliers(150);
export const demoDocuments = generateDocuments(demoSuppliers);

// Calculate risk scores using the documents
for (const supplier of demoSuppliers) {
  const supplierDocs = demoDocuments.filter((d) => d.supplier_id === supplier.id);
  const missingCount = supplierDocs.filter((d) => d.status === "missing" || d.status === "expired").length;
  const breakdown = calculateRiskScore({
    supplier,
    missingDocCount: missingCount,
    totalDocCount: supplierDocs.length,
  });
  supplier.risk_score = breakdown.total_score;
  supplier.risk_band = breakdown.risk_band;
}

// Precomputed stats for the dashboard
export function getDashboardStats() {
  const totalSuppliers = demoSuppliers.length;
  const criticalRisk = demoSuppliers.filter((s) => s.risk_band === "critical").length;
  const highRisk = demoSuppliers.filter((s) => s.risk_band === "high").length;
  const pendingSanctions = demoSuppliers.filter(
    (s) => s.sanctions_status === "pending_review" || s.sanctions_status === "flagged"
  ).length;
  const overdueAudits = demoSuppliers.filter((s) => s.audit_status === "overdue").length;
  const missingDocs = demoDocuments.filter((d) => d.status === "missing").length;
  const expiringContracts = demoSuppliers.filter((s) => {
    const end = new Date(s.contract_end_date);
    const now = new Date("2026-04-03");
    const days = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 90;
  }).length;

  const riskDistribution = [
    { name: "Low", value: demoSuppliers.filter((s) => s.risk_band === "low").length, color: "#16a34a" },
    { name: "Medium", value: demoSuppliers.filter((s) => s.risk_band === "medium").length, color: "#eab308" },
    { name: "High", value: demoSuppliers.filter((s) => s.risk_band === "high").length, color: "#f97316" },
    { name: "Critical", value: demoSuppliers.filter((s) => s.risk_band === "critical").length, color: "#dc2626" },
  ];

  const regionBreakdown = Object.entries(
    demoSuppliers.reduce<Record<string, number>>((acc, s) => {
      acc[s.region] = (acc[s.region] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  const spendByRegion = Object.entries(
    demoSuppliers.reduce<Record<string, number>>((acc, s) => {
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
