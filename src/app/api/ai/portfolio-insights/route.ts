import OpenAI from "openai";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENAI_API_KEY not configured" },
      { status: 500 }
    );
  }

  const openai = new OpenAI({ apiKey });

  try {
    const body = await request.json();
    const { stats, topRiskSuppliers, sanctionsCases } = body;

    const prompt = `You are a senior supply chain risk advisor. Analyze this supplier portfolio and provide executive-level insights.

PORTFOLIO OVERVIEW:
- Total Suppliers: ${stats.totalSuppliers}
- Critical Risk: ${stats.criticalRisk} suppliers
- High Risk: ${stats.highRisk} suppliers
- Pending Sanctions Reviews: ${stats.pendingSanctions}
- Overdue Audits: ${stats.overdueAudits}
- Missing Documents: ${stats.missingDocs}
- Contracts Expiring (90 days): ${stats.expiringContracts}

RISK DISTRIBUTION:
${stats.riskDistribution.map((r: { name: string; value: number }) => `- ${r.name}: ${r.value} suppliers`).join("\n")}

SPEND BY REGION ($M):
${stats.spendByRegion.map((r: { name: string; value: number }) => `- ${r.name}: $${r.value}M`).join("\n")}

TOP RISK SUPPLIERS:
${topRiskSuppliers.map((s: { supplier_name: string; country: string; commodity: string; risk_score: number; risk_band: string; sanctions_status: string }) => `- ${s.supplier_name} (${s.country}, ${s.commodity}) — Score: ${s.risk_score}, Sanctions: ${s.sanctions_status}`).join("\n")}

${sanctionsCases > 0 ? `ACTIVE SANCTIONS CASES: ${sanctionsCases} suppliers flagged for review` : ""}

Provide your analysis in this exact format:

**Executive Summary**
[2-3 sentences summarizing the overall risk posture of the supplier portfolio]

**Top 3 Priorities This Week**
[Numbered list of the 3 most urgent actions, with specific supplier names where relevant]

**Risk Trends**
[2-3 bullet points identifying patterns — geographic concentration, commodity exposure, compliance gaps]

**Strategic Recommendation**
[1-2 sentences on the most impactful process or policy improvement to reduce overall portfolio risk]

Be specific and reference actual numbers from the data. Keep it actionable and concise. Use professional procurement/compliance language.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0]?.message?.content || "";

    return Response.json({ insights: text });
  } catch (error) {
    console.error("AI insights error:", error);
    return Response.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
