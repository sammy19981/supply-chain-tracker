import type { Supplier, RiskBreakdown } from "@/types/database";

// Country risk tiers (simplified - a real system would use a full dataset)
const HIGH_RISK_COUNTRIES = [
  "Iran", "North Korea", "Syria", "Russia", "Myanmar", "Venezuela",
  "Cuba", "Libya", "Yemen", "Somalia", "South Sudan", "Afghanistan",
];
const MEDIUM_RISK_COUNTRIES = [
  "China", "India", "Brazil", "Nigeria", "Pakistan", "Bangladesh",
  "Vietnam", "Indonesia", "Turkey", "Egypt", "Mexico", "Thailand",
];

// Commodity risk tiers
const HIGH_RISK_COMMODITIES = [
  "Rare Earth Minerals", "Conflict Minerals", "Electronics Components",
  "Chemicals", "Pharmaceuticals",
];
const MEDIUM_RISK_COMMODITIES = [
  "Raw Materials", "Metals", "Textiles", "Energy", "Agriculture",
];

type ScoringInput = {
  supplier: Supplier;
  missingDocCount: number;
  totalDocCount: number;
};

export function calculateRiskScore(input: ScoringInput): RiskBreakdown {
  const { supplier, missingDocCount, totalDocCount } = input;
  const factors: RiskBreakdown["factors"] = [];

  // 1. Country risk (0-20 points)
  let countryScore = 0;
  if (HIGH_RISK_COUNTRIES.includes(supplier.country)) {
    countryScore = 20;
  } else if (MEDIUM_RISK_COUNTRIES.includes(supplier.country)) {
    countryScore = 10;
  }
  factors.push({
    name: "Country Risk",
    score: countryScore,
    max_score: 20,
    explanation: `${supplier.country} is ${countryScore === 20 ? "high" : countryScore === 10 ? "medium" : "low"} risk`,
  });

  // 2. Commodity risk (0-15 points)
  let commodityScore = 0;
  if (HIGH_RISK_COMMODITIES.includes(supplier.commodity)) {
    commodityScore = 15;
  } else if (MEDIUM_RISK_COMMODITIES.includes(supplier.commodity)) {
    commodityScore = 8;
  }
  factors.push({
    name: "Commodity Risk",
    score: commodityScore,
    max_score: 15,
    explanation: `${supplier.commodity} is ${commodityScore === 15 ? "high" : commodityScore === 8 ? "medium" : "low"} risk`,
  });

  // 3. Missing documents (0-15 points)
  const docScore = totalDocCount > 0
    ? Math.round((missingDocCount / totalDocCount) * 15)
    : 0;
  factors.push({
    name: "Missing Documents",
    score: docScore,
    max_score: 15,
    explanation: `${missingDocCount} of ${totalDocCount} documents missing`,
  });

  // 4. Overdue audit (0-10 points)
  const auditScore = supplier.audit_status === "overdue" ? 10 : 0;
  factors.push({
    name: "Overdue Audit",
    score: auditScore,
    max_score: 10,
    explanation: supplier.audit_status === "overdue"
      ? "Audit is overdue"
      : "Audit is current",
  });

  // 5. Contract expiry (0-10 points)
  let contractScore = 0;
  if (supplier.contract_end_date) {
    const daysUntilExpiry = Math.floor(
      (new Date(supplier.contract_end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );
    if (daysUntilExpiry < 0) {
      contractScore = 10;
    } else if (daysUntilExpiry < 30) {
      contractScore = 8;
    } else if (daysUntilExpiry < 90) {
      contractScore = 5;
    }
  }
  factors.push({
    name: "Contract Expiry",
    score: contractScore,
    max_score: 10,
    explanation: contractScore === 10
      ? "Contract expired"
      : contractScore > 0
        ? "Contract expiring soon"
        : "Contract is current",
  });

  // 6. Business criticality (0-15 points)
  const criticalityMap = { low: 0, medium: 5, high: 10, critical: 15 };
  const criticalityScore = criticalityMap[supplier.business_criticality];
  factors.push({
    name: "Business Criticality",
    score: criticalityScore,
    max_score: 15,
    explanation: `${supplier.business_criticality} criticality supplier`,
  });

  // 7. Single-source dependency (0-5 points)
  const singleSourceScore = supplier.single_source_flag ? 5 : 0;
  factors.push({
    name: "Single Source",
    score: singleSourceScore,
    max_score: 5,
    explanation: supplier.single_source_flag
      ? "No alternative suppliers identified"
      : "Alternative suppliers available",
  });

  // 8. Sanctions status (0-10 points)
  const sanctionsMap = {
    clear: 0,
    pending_review: 5,
    flagged: 8,
    confirmed_match: 10,
  };
  const sanctionsScore = sanctionsMap[supplier.sanctions_status];
  factors.push({
    name: "Sanctions Status",
    score: sanctionsScore,
    max_score: 10,
    explanation: supplier.sanctions_status === "clear"
      ? "No sanctions concerns"
      : `Sanctions status: ${supplier.sanctions_status.replace("_", " ")}`,
  });

  // Calculate total
  const totalScore = factors.reduce((sum, f) => sum + f.score, 0);

  // Determine risk band
  let riskBand: RiskBreakdown["risk_band"];
  if (totalScore >= 70) riskBand = "critical";
  else if (totalScore >= 45) riskBand = "high";
  else if (totalScore >= 25) riskBand = "medium";
  else riskBand = "low";

  return { total_score: totalScore, risk_band: riskBand, factors };
}

export function getRiskBandColor(band: string): string {
  switch (band) {
    case "critical": return "bg-red-600 text-white";
    case "high": return "bg-orange-500 text-white";
    case "medium": return "bg-yellow-500 text-black";
    case "low": return "bg-green-600 text-white";
    default: return "bg-gray-400 text-white";
  }
}
