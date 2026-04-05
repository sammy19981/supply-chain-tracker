"use client";

import { useEffect, useState, useCallback } from "react";
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSuppliers, getSanctionsMatches, updateSanctionsMatchStatus } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { Supplier, SanctionsMatch } from "@/types/database";
import Link from "next/link";

type MatchWithNames = SanctionsMatch & { supplier_name?: string; entity_name?: string };

export default function SanctionsReviewPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [matches, setMatches] = useState<MatchWithNames[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const [sups, m] = await Promise.all([getSuppliers(), getSanctionsMatches()]);
    setSuppliers(sups);
    setMatches(m);
    setLoading(false);
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  // Fallback: if no Supabase, show suppliers with sanctions flags
  const flaggedSuppliers = suppliers.filter(
    (s) => s.sanctions_status === "pending_review" || s.sanctions_status === "flagged" || s.sanctions_status === "confirmed_match"
  );

  const pendingCount = isSupabaseConfigured
    ? matches.filter((m) => m.review_status === "pending").length
    : flaggedSuppliers.filter((s) => s.sanctions_status === "pending_review").length;
  const flaggedCount = isSupabaseConfigured
    ? matches.filter((m) => m.review_status === "escalated").length
    : flaggedSuppliers.filter((s) => s.sanctions_status === "flagged").length;
  const confirmedCount = isSupabaseConfigured
    ? matches.filter((m) => m.review_status === "confirmed_concern").length
    : flaggedSuppliers.filter((s) => s.sanctions_status === "confirmed_match").length;

  async function handleAction(matchId: string, action: string) {
    const ok = await updateSanctionsMatchStatus(matchId, action);
    if (ok) loadData();
  }

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Sanctions Review</h1>
        <p className="text-sm text-gray-500">Review and manage potential sanctions matches</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardContent className="flex items-center gap-3 pt-4">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold text-yellow-700">{pendingCount}</p>
              <p className="text-xs text-gray-500">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="flex items-center gap-3 pt-4">
            <ShieldAlert className="h-5 w-5 text-red-600" />
            <div>
              <p className="text-2xl font-bold text-red-700">{flaggedCount}</p>
              <p className="text-xs text-gray-500">Escalated</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-red-300 bg-red-100/50">
          <CardContent className="flex items-center gap-3 pt-4">
            <XCircle className="h-5 w-5 text-red-700" />
            <div>
              <p className="text-2xl font-bold text-red-800">{confirmedCount}</p>
              <p className="text-xs text-gray-500">Confirmed Concern</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sanctions matches from Supabase */}
      {isSupabaseConfigured && matches.length > 0 && (
        <Card>
          <CardHeader><CardTitle className="text-base">Sanctions Matches</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {matches.map((m) => (
                <div key={m.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <p className="font-medium">{m.supplier_name || "Unknown Supplier"}</p>
                    <p className="text-sm text-gray-500">
                      Matched to: <span className="font-medium text-gray-700">{m.entity_name || "Unknown Entity"}</span>
                      {" "}— {m.match_type} match ({m.match_score}% confidence)
                    </p>
                    {m.notes && <p className="mt-1 text-xs text-gray-400">{m.notes}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <MatchStatusBadge status={m.review_status} />
                    {m.review_status === "pending" && (
                      <div className="flex gap-1">
                        <Button size="sm" variant="outline" onClick={() => handleAction(m.id, "cleared")}>Clear</Button>
                        <Button size="sm" variant="outline" onClick={() => handleAction(m.id, "escalated")}>Escalate</Button>
                        <Button size="sm" variant="destructive" onClick={() => handleAction(m.id, "confirmed_concern")}>Confirm</Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fallback: supplier-level flags */}
      <Card>
        <CardHeader><CardTitle className="text-base">Flagged Suppliers</CardTitle></CardHeader>
        <CardContent>
          {flaggedSuppliers.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-gray-400">
              <CheckCircle className="mb-2 h-10 w-10" />
              <p>No sanctions cases to review</p>
            </div>
          ) : (
            <div className="space-y-3">
              {flaggedSuppliers.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <Link href={`/suppliers/${s.id}`} className="font-medium text-blue-600 hover:underline">{s.supplier_name}</Link>
                    <p className="text-sm text-gray-500">{s.country} — {s.commodity}</p>
                  </div>
                  <SanctionsBadge status={s.sanctions_status} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <p className="text-xs text-gray-400">
        This is a workflow prototype for demonstration purposes. It is not a production-grade sanctions screening engine and should not be used as legal or compliance advice.
      </p>
    </div>
  );
}

function MatchStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800", cleared: "bg-green-100 text-green-800",
    escalated: "bg-orange-100 text-orange-800", confirmed_concern: "bg-red-600 text-white",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}

function SanctionsBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    pending_review: "bg-yellow-100 text-yellow-800", flagged: "bg-red-100 text-red-800",
    confirmed_match: "bg-red-600 text-white",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}
