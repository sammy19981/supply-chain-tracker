"use client";

import { useEffect, useState } from "react";
import {
  Building2,
  AlertTriangle,
  ShieldAlert,
  FileWarning,
  CalendarClock,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getRiskBandColor } from "@/lib/risk-scoring";
import {
  getDashboardStats,
  getSuppliers,
  type DashboardStats,
} from "@/lib/data";
import { AIPortfolioInsights } from "@/components/ai/ai-portfolio-insights";
import type { Supplier } from "@/types/database";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Link from "next/link";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topRisk, setTopRisk] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [s, suppliers] = await Promise.all([
        getDashboardStats(),
        getSuppliers(),
      ]);
      setStats(s);
      setTopRisk(
        [...suppliers].sort((a, b) => b.risk_score - a.risk_score).slice(0, 8)
      );
      setLoading(false);
    }
    load();
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Supplier risk overview and action items
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Total Suppliers"
          value={stats.totalSuppliers}
          icon={<Building2 className="h-5 w-5 text-blue-600" />}
        />
        <StatCard
          label="Critical Risk"
          value={stats.criticalRisk}
          icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
          alert={stats.criticalRisk > 0}
        />
        <StatCard
          label="High Risk"
          value={stats.highRisk}
          icon={<TrendingUp className="h-5 w-5 text-orange-500" />}
        />
        <StatCard
          label="Sanctions Review"
          value={stats.pendingSanctions}
          icon={<ShieldAlert className="h-5 w-5 text-purple-600" />}
          alert={stats.pendingSanctions > 0}
        />
        <StatCard
          label="Overdue Audits"
          value={stats.overdueAudits}
          icon={<CalendarClock className="h-5 w-5 text-amber-600" />}
        />
        <StatCard
          label="Missing Docs"
          value={stats.missingDocs}
          icon={<FileWarning className="h-5 w-5 text-gray-600" />}
        />
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={stats.riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {stats.riskDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Annual Spend by Region ($M)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={stats.spendByRegion}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip formatter={(v) => `$${v}M`} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* AI Portfolio Insights */}
      <AIPortfolioInsights stats={stats} topRiskSuppliers={topRisk} />

      {/* Action queue */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Action Queue — Highest Risk Suppliers
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-2 pr-4 font-medium">Supplier</th>
                  <th className="pb-2 pr-4 font-medium">Country</th>
                  <th className="pb-2 pr-4 font-medium">Commodity</th>
                  <th className="pb-2 pr-4 font-medium">Risk Score</th>
                  <th className="pb-2 pr-4 font-medium">Risk Band</th>
                  <th className="pb-2 pr-4 font-medium">Sanctions</th>
                  <th className="pb-2 font-medium">Audit</th>
                </tr>
              </thead>
              <tbody>
                {topRisk.map((s) => (
                  <tr key={s.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <Link
                        href={`/suppliers/${s.id}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {s.supplier_name}
                      </Link>
                    </td>
                    <td className="py-3 pr-4 text-gray-600">{s.country}</td>
                    <td className="py-3 pr-4 text-gray-600">{s.commodity}</td>
                    <td className="py-3 pr-4 font-mono font-semibold">
                      {s.risk_score}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge className={getRiskBandColor(s.risk_band)}>
                        {s.risk_band}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4">
                      <SanctionsBadge status={s.sanctions_status} />
                    </td>
                    <td className="py-3">
                      <AuditBadge status={s.audit_status} />
                    </td>
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

function StatCard({
  label,
  value,
  icon,
  alert,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  alert?: boolean;
}) {
  return (
    <Card className={alert ? "border-red-200 bg-red-50/50" : ""}>
      <CardContent className="flex items-center gap-3 pt-4">
        <div className="rounded-lg bg-gray-100 p-2">{icon}</div>
        <div>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function SanctionsBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    clear: "bg-green-100 text-green-800",
    pending_review: "bg-yellow-100 text-yellow-800",
    flagged: "bg-red-100 text-red-800",
    confirmed_match: "bg-red-600 text-white",
  };
  return (
    <Badge className={map[status] || "bg-gray-100"}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}

function AuditBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    completed: "bg-green-100 text-green-800",
    scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    overdue: "bg-red-100 text-red-800",
    not_scheduled: "bg-gray-100 text-gray-600",
  };
  return (
    <Badge className={map[status] || "bg-gray-100"}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
