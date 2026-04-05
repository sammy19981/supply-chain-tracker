"use client";

import { useState } from "react";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Supplier } from "@/types/database";
import type { DashboardStats } from "@/lib/data";
import { renderAIContent } from "./ai-renderer";

export function AIPortfolioInsights({
  stats,
  topRiskSuppliers,
}: {
  stats: DashboardStats;
  topRiskSuppliers: Supplier[];
}) {
  const [insights, setInsights] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generateInsights() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/portfolio-insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stats,
          topRiskSuppliers: topRiskSuppliers.slice(0, 10),
          sanctionsCases: stats.pendingSanctions,
        }),
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setInsights(data.insights);
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
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-purple-600" />
            AI Portfolio Insights
            <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-normal text-purple-700">
              Powered by OpenAI
            </span>
          </CardTitle>
          {insights && (
            <Button
              variant="ghost"
              size="sm"
              onClick={generateInsights}
              disabled={loading}
            >
              <RefreshCw className="mr-1 h-3 w-3" />
              Refresh
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {!insights && !loading && !error && (
          <div className="flex flex-col items-center gap-3 py-6">
            <p className="text-center text-sm text-gray-500">
              Get AI-powered analysis of your entire supplier portfolio with
              prioritized recommendations.
            </p>
            <Button
              onClick={generateInsights}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Portfolio Insights
            </Button>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
            <p className="text-sm text-gray-500">
              Analyzing supplier portfolio...
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
              onClick={generateInsights}
            >
              Try Again
            </Button>
          </div>
        )}

        {insights && (
          <div className="space-y-3">
            {renderAIContent(insights)}
            <p className="border-t pt-3 text-xs text-gray-400">
              AI-generated insights — review before acting
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
