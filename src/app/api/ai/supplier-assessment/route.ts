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
    const { supplier, documents, riskBreakdown } = body;

    const prompt = `You are a senior supply chain risk analyst. Analyze this supplier and provide a concise risk assessment with actionable recommendations.

SUPPLIER PROFILE:
- Name: ${supplier.supplier_name}
- Country: ${supplier.country} (${supplier.region})
- Commodity: ${supplier.commodity}
- Annual Spend: $${(supplier.annual_spend / 1_000_000).toFixed(1)}M
- Business Criticality: ${supplier.business_criticality}
- Onboarding Status: ${supplier.onboarding_status}
- Audit Status: ${supplier.audit_status}
- Sanctions Status: ${supplier.sanctions_status}
- Single Source: ${supplier.single_source_flag ? "Yes" : "No"}
- Contract End Date: ${supplier.contract_end_date}
- Risk Score: ${supplier.risk_score}/100 (${supplier.risk_band} risk)

RISK SCORE BREAKDOWN:
${riskBreakdown.factors.map((f: { name: string; score: number; max_score: number; explanation: string }) => `- ${f.name}: ${f.score}/${f.max_score} — ${f.explanation}`).join("\n")}

DOCUMENT STATUS:
${documents.map((d: { document_type: string; status: string }) => `- ${d.document_type}: ${d.status}`).join("\n")}

Provide your analysis in this exact format:

**Risk Summary**
[2-3 sentences summarizing the overall risk posture of this supplier]

**Key Concerns**
[Bullet list of 2-4 specific risk factors that need attention, based on the data above]

**Recommendations**
[Bullet list of 3-5 specific, actionable steps the procurement/compliance team should take]

**Risk Outlook**
[1-2 sentences on the expected trajectory — is this supplier's risk likely to increase or decrease, and why]

Keep the language professional but clear. Be specific — reference actual data points. Do not use generic advice.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
    });

    const text = completion.choices[0]?.message?.content || "";

    return Response.json({ assessment: text });
  } catch (error) {
    console.error("AI assessment error:", error);
    return Response.json(
      { error: "Failed to generate assessment" },
      { status: 500 }
    );
  }
}
