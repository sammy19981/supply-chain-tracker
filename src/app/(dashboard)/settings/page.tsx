"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CheckCircle2,
  XCircle,
  Sparkles,
  Database,
  Shield,
  Download,
  User,
  Loader2,
} from "lucide-react";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getSuppliers } from "@/lib/data";
import type { Supplier } from "@/types/database";

export default function SettingsPage() {
  const [aiStatus, setAiStatus] = useState<"checking" | "connected" | "error">(
    "checking"
  );
  const [saved, setSaved] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [exporting, setExporting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/ai/health")
      .then((r) => r.json())
      .then((d) => setAiStatus(d.ok ? "connected" : "error"))
      .catch(() => setAiStatus("error"));
    getSuppliers().then(setSuppliers);
  }, []);

  function downloadCSV(filename: string, csvContent: string) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportAllSuppliers() {
    setExporting("all");
    const headers = "Name,Country,Region,Commodity,Annual Spend,Risk Score,Risk Band,Criticality,Onboarding Status,Audit Status,Sanctions Status,Single Source,Contract End Date";
    const rows = suppliers.map((s) =>
      [
        `"${s.supplier_name}"`, s.country, s.region, `"${s.commodity}"`,
        s.annual_spend, s.risk_score, s.risk_band, s.business_criticality,
        s.onboarding_status, s.audit_status, s.sanctions_status,
        s.single_source_flag ? "Yes" : "No", s.contract_end_date,
      ].join(",")
    );
    downloadCSV("suppliers_export.csv", [headers, ...rows].join("\n"));
    setExporting(null);
  }

  function exportRiskReport() {
    setExporting("risk");
    const headers = "Name,Country,Commodity,Risk Score,Risk Band,Sanctions Status,Single Source,Criticality";
    const rows = suppliers
      .sort((a, b) => b.risk_score - a.risk_score)
      .map((s) =>
        [
          `"${s.supplier_name}"`, s.country, `"${s.commodity}"`,
          s.risk_score, s.risk_band, s.sanctions_status,
          s.single_source_flag ? "Yes" : "No", s.business_criticality,
        ].join(",")
      );
    downloadCSV("risk_report.csv", [headers, ...rows].join("\n"));
    setExporting(null);
  }

  function exportAuditStatus() {
    setExporting("audit");
    const headers = "Name,Country,Audit Status,Audit Due Date,Risk Score,Risk Band";
    const rows = suppliers.map((s) =>
      [
        `"${s.supplier_name}"`, s.country, s.audit_status,
        s.audit_due_date || "N/A", s.risk_score, s.risk_band,
      ].join(",")
    );
    downloadCSV("audit_status.csv", [headers, ...rows].join("\n"));
    setExporting(null);
  }

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">
          Application configuration and preferences
        </p>
      </div>

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <User className="h-4 w-4" /> Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <Input defaultValue="Sameer Saxena" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <Input defaultValue="sameer.saxena@company.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Role
              </label>
              <Input defaultValue="Compliance Manager" disabled />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Department
              </label>
              <Input defaultValue="Procurement & Compliance" disabled />
            </div>
          </div>
          <Button onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      {/* Integration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Shield className="h-4 w-4" /> Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Supabase Database</p>
                  <p className="text-xs text-gray-500">PostgreSQL backend</p>
                </div>
              </div>
              {isSupabaseConfigured ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Connected
                </Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-800">
                  <XCircle className="mr-1 h-3 w-3" /> Using Demo Data
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">OpenAI</p>
                  <p className="text-xs text-gray-500">
                    Risk analysis & insights
                  </p>
                </div>
              </div>
              {aiStatus === "checking" ? (
                <Badge className="bg-gray-100 text-gray-600">
                  Checking...
                </Badge>
              ) : aiStatus === "connected" ? (
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="mr-1 h-3 w-3" /> Connected
                </Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">
                  <XCircle className="mr-1 h-3 w-3" /> Not Configured
                </Badge>
              )}
            </div>
          </div>
          {(!isSupabaseConfigured || aiStatus === "error") && (
            <div className="rounded-md bg-blue-50 p-3">
              <p className="text-sm text-blue-800">
                Set your environment variables in{" "}
                <code className="rounded bg-blue-100 px-1 py-0.5 text-xs">
                  .env.local
                </code>{" "}
                and restart the dev server to connect integrations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Notification Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Notification Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            {
              label: "Critical risk alerts",
              desc: "Notify when a supplier enters critical risk band",
              defaultOn: true,
            },
            {
              label: "Sanctions review",
              desc: "Alert on new sanctions matches requiring review",
              defaultOn: true,
            },
            {
              label: "Overdue audits",
              desc: "Remind when supplier audits are past due",
              defaultOn: true,
            },
            {
              label: "Expiring contracts",
              desc: "Alert 30/60/90 days before contract expiry",
              defaultOn: true,
            },
            {
              label: "Missing documents",
              desc: "Alert when required due diligence docs are missing",
              defaultOn: false,
            },
          ].map((pref) => (
            <div
              key={pref.label}
              className="flex items-center justify-between rounded-lg border px-4 py-3"
            >
              <div>
                <p className="text-sm font-medium">{pref.label}</p>
                <p className="text-xs text-gray-500">{pref.desc}</p>
              </div>
              <ToggleSwitch defaultOn={pref.defaultOn} />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Risk Scoring Weights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Risk Scoring Weights</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Risk scoring weights are configured in{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">
              src/lib/risk-scoring.ts
            </code>
            . Current weights:
          </p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm md:grid-cols-4">
            {[
              { label: "Country Risk", max: 20 },
              { label: "Commodity Risk", max: 15 },
              { label: "Missing Docs", max: 15 },
              { label: "Overdue Audit", max: 10 },
              { label: "Contract Expiry", max: 10 },
              { label: "Business Criticality", max: 15 },
              { label: "Single Source", max: 5 },
              { label: "Sanctions Status", max: 10 },
            ].map((w) => (
              <div key={w.label} className="rounded-md border px-3 py-2">
                <p className="text-xs text-gray-500">{w.label}</p>
                <p className="font-semibold">{w.max} pts</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Export */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Download className="h-4 w-4" /> Data Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-500">
            Export supplier data for reporting and compliance documentation.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={exportAllSuppliers} disabled={!!exporting}>
              {exporting === "all" ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Download className="mr-1 h-3 w-3" />}
              Export All Suppliers (CSV)
            </Button>
            <Button variant="outline" size="sm" onClick={exportRiskReport} disabled={!!exporting}>
              {exporting === "risk" ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Download className="mr-1 h-3 w-3" />}
              Export Risk Report (CSV)
            </Button>
            <Button variant="outline" size="sm" onClick={exportAuditStatus} disabled={!!exporting}>
              {exporting === "audit" ? <Loader2 className="mr-1 h-3 w-3 animate-spin" /> : <Download className="mr-1 h-3 w-3" />}
              Export Audit Status (CSV)
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ToggleSwitch({ defaultOn }: { defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        on ? "bg-blue-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          on ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}
