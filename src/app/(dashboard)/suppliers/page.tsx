"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Filter, ChevronDown, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getSuppliers } from "@/lib/data";
import { getRiskBandColor } from "@/lib/risk-scoring";
import type { Supplier } from "@/types/database";

type SortField = "supplier_name" | "risk_score" | "annual_spend" | "country";
type SortDir = "asc" | "desc";

export default function SuppliersPage() {
  return (
    <Suspense fallback={<div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>}>
      <SuppliersContent />
    </Suspense>
  );
}

function SuppliersContent() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [riskFilter, setRiskFilter] = useState<string>("all");
  const [sortField, setSortField] = useState<SortField>("risk_score");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [page, setPage] = useState(1);
  const perPage = 20;

  useEffect(() => {
    getSuppliers().then((data) => {
      setSuppliers(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    let list = [...suppliers];
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.supplier_name.toLowerCase().includes(q) ||
          s.country.toLowerCase().includes(q) ||
          s.commodity.toLowerCase().includes(q)
      );
    }
    if (riskFilter !== "all") {
      list = list.filter((s) => s.risk_band === riskFilter);
    }
    list.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    return list;
  }, [suppliers, search, riskFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);

  function toggleSort(field: SortField) {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  }

  function formatSpend(val: number) {
    if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(1)}M`;
    if (val >= 1_000) return `$${(val / 1_000).toFixed(0)}K`;
    return `$${val}`;
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
        <p className="text-sm text-gray-500">{filtered.length} suppliers found</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search name, country, commodity..."
            className="w-72 pl-9"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-gray-400" />
          {["all", "critical", "high", "medium", "low"].map((band) => (
            <Button
              key={band}
              variant={riskFilter === band ? "default" : "outline"}
              size="sm"
              onClick={() => { setRiskFilter(band); setPage(1); }}
            >
              {band === "all" ? "All" : band.charAt(0).toUpperCase() + band.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50 text-left text-gray-500">
                  <SortableHeader label="Supplier" field="supplier_name" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <SortableHeader label="Country" field="country" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <th className="px-4 py-3 font-medium">Commodity</th>
                  <SortableHeader label="Annual Spend" field="annual_spend" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <th className="px-4 py-3 font-medium">Criticality</th>
                  <SortableHeader label="Risk Score" field="risk_score" current={sortField} dir={sortDir} onSort={toggleSort} />
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Sanctions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((s) => (
                  <tr key={s.id} className="border-b transition-colors hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <Link href={`/suppliers/${s.id}`} className="font-medium text-blue-600 hover:underline">
                        {s.supplier_name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{s.country}</td>
                    <td className="px-4 py-3 text-gray-600">{s.commodity}</td>
                    <td className="px-4 py-3 font-mono text-gray-700">{formatSpend(s.annual_spend)}</td>
                    <td className="px-4 py-3"><CriticalityBadge level={s.business_criticality} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">{s.risk_score}</span>
                        <Badge className={getRiskBandColor(s.risk_band)}>{s.risk_band}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{s.onboarding_status.replace(/_/g, " ")}</Badge>
                    </td>
                    <td className="px-4 py-3"><SanctionsBadge status={s.sanctions_status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, filtered.length)} of {filtered.length}
          </p>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</Button>
            <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function SortableHeader({ label, field, current, dir, onSort }: {
  label: string; field: SortField; current: SortField; dir: SortDir; onSort: (f: SortField) => void;
}) {
  return (
    <th className="cursor-pointer select-none px-4 py-3 font-medium hover:text-gray-900" onClick={() => onSort(field)}>
      <span className="flex items-center gap-1">
        {label}
        {current === field && <ChevronDown className={`h-3 w-3 transition-transform ${dir === "asc" ? "rotate-180" : ""}`} />}
      </span>
    </th>
  );
}

function CriticalityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    critical: "bg-red-100 text-red-800", high: "bg-orange-100 text-orange-800",
    medium: "bg-yellow-100 text-yellow-800", low: "bg-gray-100 text-gray-600",
  };
  return <Badge className={map[level] || "bg-gray-100"}>{level}</Badge>;
}

function SanctionsBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    clear: "bg-green-100 text-green-800", pending_review: "bg-yellow-100 text-yellow-800",
    flagged: "bg-red-100 text-red-800", confirmed_match: "bg-red-600 text-white",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}
