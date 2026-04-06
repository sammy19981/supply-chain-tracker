"use client";

import {
  UserPlus,
  FileCheck,
  ShieldCheck,
  Search,
  BarChart3,
  Sparkles,
  Bell,
  FileText,
  CalendarClock,
  ArrowRight,
  Database,
  Globe,
  Cpu,
  Cloud,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stages = [
  {
    number: 1,
    title: "Vendor Registration",
    subtitle: "Onboarding",
    color: "bg-blue-600",
    borderColor: "border-blue-600",
    lightBg: "bg-blue-50",
    focus: "Data Capture & Document Baseline",
    complianceFocus: "Document Collection (9 standard types)",
    items: [
      { icon: UserPlus, label: "Profile Creation", desc: "Name, Location, Commodity, Criticality" },
      { icon: FileCheck, label: "Document Upload", desc: "9 Types: ISO, Insurance, Sanctions Declaration, etc." },
    ],
    internal: ["Supabase Auth / Google OAuth", "PostgreSQL Database (Initial Entry)"],
    external: ["Supplier Data Portal (External)"],
  },
  {
    number: 2,
    title: "Vendor Verification",
    subtitle: "Diligence",
    color: "bg-emerald-600",
    borderColor: "border-emerald-600",
    lightBg: "bg-emerald-50",
    focus: "Risk Analysis & Sanctions Matching",
    complianceFocus: "Sanctions Exposure Check (OFAC, EU, UN) | Initial Risk Score",
    items: [
      { icon: BarChart3, label: "8-Factor Risk Scoring", desc: "Country, Criticality, Documents, Commodity, Audit, Contract, Sanctions, Single Source" },
      { icon: ShieldCheck, label: "Sanctions Screening", desc: "Matches vs 30+ global sanctions lists" },
      { icon: Sparkles, label: "AI Deep-Dive Assessment", desc: "GPT-4o-mini generates risk summary, concerns, and recommendations" },
    ],
    internal: ["Risk Scoring Engine"],
    external: ["OpenAI API (GPT-4o-mini)", "Global Sanctions Lists"],
  },
  {
    number: 3,
    title: "Continuous Audit",
    subtitle: "Monitoring",
    color: "bg-purple-600",
    borderColor: "border-purple-600",
    lightBg: "bg-purple-50",
    focus: "Proactive Monitoring & Actionable Intel",
    complianceFocus: "Live Compliance Status | Preventing Reactive Decision-Making",
    items: [
      { icon: Bell, label: "Real-Time Alerts", desc: "Toast notifications on risk score changes, sanctions flags, supplier updates" },
      { icon: FileText, label: "Document Lifecycle Tracking", desc: "Monitor expiry across all 9 document types" },
      { icon: Sparkles, label: "Portfolio Insights", desc: "AI executive briefing with priorities and strategic recommendations" },
      { icon: CalendarClock, label: "Periodic Audit Scheduling", desc: "Track overdue and upcoming audit schedules" },
    ],
    internal: ["Supabase Realtime Subscriptions", "Recharts Dashboard"],
    external: ["OpenAI API (Portfolio Analysis)", "Sanctions Databases"],
  },
];

export default function LifecyclePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Supplier Compliance Lifecycle
        </h1>
        <p className="text-sm text-gray-500">
          How SupplyGuard manages suppliers from onboarding through continuous
          monitoring
        </p>
      </div>

      {/* 3-Stage Flow */}
      <div className="grid gap-6 lg:grid-cols-3">
        {stages.map((stage, idx) => (
          <div key={stage.number} className="relative">
            {/* Arrow between cards */}
            {idx < 2 && (
              <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                <ArrowRight className="h-6 w-6 text-gray-300" />
              </div>
            )}
            <Card className={`h-full border-t-4 ${stage.borderColor}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white ${stage.color}`}
                  >
                    {stage.number}
                  </span>
                  <div>
                    <CardTitle className="text-base">{stage.title}</CardTitle>
                    <Badge variant="outline" className="mt-0.5 text-xs">
                      {stage.subtitle}
                    </Badge>
                  </div>
                </div>
                <p className="mt-2 text-xs font-medium text-gray-500">
                  Focus: {stage.focus}
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {stage.items.map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-lg p-3 ${stage.lightBg}`}
                  >
                    <div className="flex items-start gap-2">
                      <item.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-600" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {item.label}
                        </p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 rounded-md bg-gray-50 p-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                    Compliance Focus
                  </p>
                  <p className="text-xs text-gray-600">
                    {stage.complianceFocus}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* System Integration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            System Integration: Internal vs External
          </CardTitle>
          <p className="text-xs text-gray-500">
            How SupplyGuard coordinates between internal data layer and external
            intelligence layer
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {stages.map((stage) => (
              <div key={stage.number} className="space-y-3">
                <p className={`text-sm font-semibold ${stage.borderColor.replace("border", "text")}`}>
                  Stage {stage.number}: {stage.title}
                </p>
                <div className="rounded-lg border border-blue-200 bg-blue-50/50 p-3">
                  <div className="mb-1 flex items-center gap-1">
                    <Database className="h-3 w-3 text-blue-600" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                      Internal System
                    </p>
                  </div>
                  {stage.internal.map((s) => (
                    <p key={s} className="text-xs text-gray-600">
                      {s}
                    </p>
                  ))}
                </div>
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
                  <div className="mb-1 flex items-center gap-1">
                    <Cloud className="h-3 w-3 text-emerald-600" />
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">
                      External
                    </p>
                  </div>
                  {stage.external.map((s) => (
                    <p key={s} className="text-xs text-gray-600">
                      {s}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-gray-900 p-3 text-center">
            <p className="text-xs text-gray-400">
              <span className="font-semibold text-white">
                APPLICATION LAYER
              </span>{" "}
              (Next.js/TS, Vercel) coordinates between{" "}
              <span className="font-semibold text-blue-400">
                INTERNAL DATA LAYER
              </span>{" "}
              (Supabase, PostgreSQL) and{" "}
              <span className="font-semibold text-emerald-400">
                EXTERNAL INTELLIGENCE LAYER
              </span>{" "}
              (OpenAI, Sanctions APIs)
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Emerging Technologies */}
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50/50 to-orange-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4 text-amber-600" />
            Emerging Technologies in Supply Chain Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <Cpu className="h-4 w-4 text-purple-600" />
                <p className="text-sm font-semibold">Generative AI</p>
                <Badge className="bg-green-100 text-green-700 text-[10px]">
                  Active
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                SupplyGuard uses GPT-4o-mini for risk assessments and portfolio
                insights. AI interprets data and provides actionable
                intelligence in natural language.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">&#9939;</span>
                <p className="text-sm font-semibold">Blockchain</p>
                <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                  Experimental
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Blockchain is in the experimental stage for compliance —
                enabling immutable audit trails where customers, banks,
                suppliers, and agencies can collaborate on shared compliance
                records.
              </p>
            </div>
            <div className="rounded-lg border bg-white p-4">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-lg">&#128225;</span>
                <p className="text-sm font-semibold">IoT Traceability</p>
                <Badge className="bg-gray-100 text-gray-600 text-[10px]">
                  Future
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Real-time tracking of materials from source to destination using
                IoT sensors — monitoring disruptions from natural calamities,
                trade barriers, and geopolitical events.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
