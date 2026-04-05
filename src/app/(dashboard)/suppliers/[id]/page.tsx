"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { getSupplierById, getDocumentsForSupplier } from "@/lib/data";
import { calculateRiskScore, getRiskBandColor } from "@/lib/risk-scoring";
import { AIRiskAssessment } from "@/components/ai/ai-risk-assessment";
import type { Supplier, SupplierDocument } from "@/types/database";

export default function SupplierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [documents, setDocuments] = useState<SupplierDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, docs] = await Promise.all([
        getSupplierById(id),
        getDocumentsForSupplier(id),
      ]);
      setSupplier(s);
      setDocuments(docs);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!supplier) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2">
        <p className="text-gray-500">Supplier not found</p>
        <Link href="/suppliers">
          <Button variant="outline" size="sm">Back to Suppliers</Button>
        </Link>
      </div>
    );
  }

  const missingDocs = documents.filter(
    (d) => d.status === "missing" || d.status === "expired"
  );
  const breakdown = calculateRiskScore({
    supplier,
    missingDocCount: missingDocs.length,
    totalDocCount: documents.length,
  });

  function formatSpend(val: number) {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
    return `$${val}`;
  }

  function formatDate(d: string | null) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/suppliers">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{supplier.supplier_name}</h1>
            <Badge className={getRiskBandColor(supplier.risk_band)}>{supplier.risk_band} risk</Badge>
          </div>
          {supplier.parent_company && (
            <p className="text-sm text-gray-500">Parent: {supplier.parent_company}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold">{supplier.risk_score}</p>
          <p className="text-xs text-gray-500">Risk Score</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <InfoCard icon={<MapPin className="h-4 w-4 text-blue-600" />} label="Location" value={`${supplier.country} (${supplier.region})`} />
        <InfoCard icon={<Building2 className="h-4 w-4 text-blue-600" />} label="Commodity" value={supplier.commodity} />
        <InfoCard icon={<DollarSign className="h-4 w-4 text-green-600" />} label="Annual Spend" value={formatSpend(supplier.annual_spend)} />
        <InfoCard icon={<Calendar className="h-4 w-4 text-purple-600" />} label="Contract Ends" value={formatDate(supplier.contract_end_date)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Risk Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <AlertTriangle className="h-4 w-4" /> Risk Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {breakdown.factors.map((factor) => (
              <div key={factor.name}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium">{factor.name}</span>
                  <span className="text-gray-500">{factor.score} / {factor.max_score}</span>
                </div>
                <Progress value={factor.max_score > 0 ? (factor.score / factor.max_score) * 100 : 0} className="h-2" />
                <p className="mt-0.5 text-xs text-gray-400">{factor.explanation}</p>
              </div>
            ))}
            <Separator />
            <div className="flex items-center justify-between font-semibold">
              <span>Total Risk Score</span>
              <span className="text-lg">{breakdown.total_score} / 100</span>
            </div>
          </CardContent>
        </Card>

        {/* Supplier Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Building2 className="h-4 w-4" /> Supplier Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 text-sm">
              <DetailRow label="Onboarding Status">
                <Badge variant="outline">{supplier.onboarding_status.replace(/_/g, " ")}</Badge>
              </DetailRow>
              <DetailRow label="Audit Status"><AuditBadge status={supplier.audit_status} /></DetailRow>
              <DetailRow label="Audit Due Date">{formatDate(supplier.audit_due_date)}</DetailRow>
              <DetailRow label="Contract Period">
                {formatDate(supplier.contract_start_date)} – {formatDate(supplier.contract_end_date)}
              </DetailRow>
              <DetailRow label="Business Criticality">
                <Badge className={
                  supplier.business_criticality === "critical" ? "bg-red-100 text-red-800"
                    : supplier.business_criticality === "high" ? "bg-orange-100 text-orange-800"
                      : supplier.business_criticality === "medium" ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-600"
                }>{supplier.business_criticality}</Badge>
              </DetailRow>
              <DetailRow label="Single Source">
                {supplier.single_source_flag
                  ? <Badge className="bg-red-100 text-red-800">Yes</Badge>
                  : <span className="text-gray-600">No</span>}
              </DetailRow>
              <DetailRow label="Sanctions Status"><SanctionsBadge status={supplier.sanctions_status} /></DetailRow>
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* AI Risk Assessment */}
      <AIRiskAssessment
        supplier={supplier}
        documents={documents}
        riskBreakdown={breakdown}
      />

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4" /> Due Diligence Documents
            <Badge variant="outline" className="ml-2">
              {documents.filter((d) => d.status === "approved").length}/{documents.length} complete
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">Document</th>
                  <th className="pb-2 pr-4 font-medium">Status</th>
                  <th className="pb-2 pr-4 font-medium">Submitted</th>
                  <th className="pb-2 font-medium">Expires</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc) => (
                  <tr key={doc.id} className="border-b last:border-0">
                    <td className="py-2.5 pr-4 font-medium">{doc.document_type}</td>
                    <td className="py-2.5 pr-4"><DocStatusBadge status={doc.status} /></td>
                    <td className="py-2.5 pr-4 text-gray-600">{doc.submitted_at ? formatDate(doc.submitted_at) : "—"}</td>
                    <td className="py-2.5 text-gray-600">{doc.expires_at ? formatDate(doc.expires_at) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 pt-4">
        {icon}
        <div>
          <p className="text-xs text-gray-500">{label}</p>
          <p className="font-medium">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-gray-500">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function DocStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-green-100 text-green-800", submitted: "bg-blue-100 text-blue-800",
    under_review: "bg-yellow-100 text-yellow-800", missing: "bg-red-100 text-red-800",
    expired: "bg-orange-100 text-orange-800",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}

function SanctionsBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    clear: "bg-green-100 text-green-800", pending_review: "bg-yellow-100 text-yellow-800",
    flagged: "bg-red-100 text-red-800", confirmed_match: "bg-red-600 text-white",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}

function AuditBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: "bg-green-100 text-green-800", scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800", overdue: "bg-red-100 text-red-800",
    not_scheduled: "bg-gray-100 text-gray-600",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}
