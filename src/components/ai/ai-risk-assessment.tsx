"use client";

import { useState } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Supplier, SupplierDocument, RiskBreakdown } from "@/types/database";
import { renderAIContent } from "./ai-renderer";

export function AIRiskAssessment({
  supplier,
  documents,
  riskBreakdown,
}: {
  supplier: Supplier;
  documents: SupplierDocument[];
  riskBreakdown: RiskBreakdown;
}) {
  const [assessment, setAssessment] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateAssessment() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/supplier-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ supplier, documents, riskBreakdown }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAssessment(data.assessment);
      }
    } catch {
      setError("Failed to connect to AI service");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50/50 to-blue-50/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-purple-600" />
          AI Risk Assessment
          <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-normal text-purple-700">
            Powered by OpenAI
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!assessment && !loading && !error && (
          <div className="flex flex-col items-center gap-3 py-6">
            <p className="text-center text-sm text-gray-500">
              Generate an AI-powered risk analysis with actionable
              recommendations for this supplier.
            </p>
            <Button
              onClick={generateAssessment}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Assessment
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <p className="text-sm text-gray-500">
              Analyzing supplier risk profile...
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <p className="text-sm text-red-700">{error}</p>
            <p className="mt-1 text-xs text-red-500">
              Make sure OPENAI_API_KEY is set in your .env.local file.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={generateAssessment}
            >
              Try Again
            </Button>
          </div>
        )}

        {assessment && (
          <div className="space-y-3">
            {renderAIContent(assessment)}
            <div className="flex items-center justify-between border-t pt-3">
              <p className="text-xs text-gray-400">
                AI-generated analysis — review before acting
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={generateAssessment}
                disabled={loading}
              >
                <RefreshCw className="mr-1 h-3 w-3" />
                Regenerate
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
