"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllDocuments, getSuppliers } from "@/lib/data";
import type { SupplierDocument, Supplier } from "@/types/database";
import Link from "next/link";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<SupplierDocument[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    async function load() {
      const [docs, sups] = await Promise.all([getAllDocuments(), getSuppliers()]);
      setDocuments(docs);
      setSuppliers(sups);
      setLoading(false);
    }
    load();
  }, []);

  const supplierMap = useMemo(() => {
    const map = new Map<string, string>();
    suppliers.forEach((s) => map.set(s.id, s.supplier_name));
    return map;
  }, [suppliers]);

  const filtered = useMemo(() => {
    let docs = [...documents];
    if (search) {
      const q = search.toLowerCase();
      docs = docs.filter(
        (d) =>
          d.document_type.toLowerCase().includes(q) ||
          (supplierMap.get(d.supplier_id) || "").toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "all") docs = docs.filter((d) => d.status === statusFilter);
    return docs;
  }, [documents, search, statusFilter, supplierMap]);

  const counts = useMemo(() => {
    const c = { missing: 0, expired: 0, under_review: 0, submitted: 0, approved: 0 };
    documents.forEach((d) => { if (d.status in c) c[d.status as keyof typeof c]++; });
    return c;
  }, [documents]);

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
        <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
        <p className="text-sm text-gray-500">Due diligence document tracking across all suppliers</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        <SummaryCard label="Missing" count={counts.missing} color="text-red-600" />
        <SummaryCard label="Expired" count={counts.expired} color="text-orange-600" />
        <SummaryCard label="Under Review" count={counts.under_review} color="text-yellow-600" />
        <SummaryCard label="Submitted" count={counts.submitted} color="text-blue-600" />
        <SummaryCard label="Approved" count={counts.approved} color="text-green-600" />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search document or supplier..." className="w-72 pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="h-4 w-4 text-gray-400" />
          {["all", "missing", "expired", "under_review", "submitted", "approved"].map((s) => (
            <Button key={s} variant={statusFilter === s ? "default" : "outline"} size="sm" onClick={() => setStatusFilter(s)}>
              {s === "all" ? "All" : s.replace(/_/g, " ")}
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
                  <th className="px-4 py-3 font-medium">Supplier</th>
                  <th className="px-4 py-3 font-medium">Document Type</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Expires</th>
                </tr>
              </thead>
              <tbody>
                {filtered.slice(0, 50).map((doc) => (
                  <tr key={doc.id} className="border-b transition-colors hover:bg-gray-50">
                    <td className="px-4 py-2.5">
                      <Link href={`/suppliers/${doc.supplier_id}`} className="font-medium text-blue-600 hover:underline">
                        {supplierMap.get(doc.supplier_id) || doc.supplier_id}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5 text-gray-700">{doc.document_type}</td>
                    <td className="px-4 py-2.5"><DocBadge status={doc.status} /></td>
                    <td className="px-4 py-2.5 text-gray-500">{doc.submitted_at ? new Date(doc.submitted_at).toLocaleDateString() : "—"}</td>
                    <td className="px-4 py-2.5 text-gray-500">{doc.expires_at ? new Date(doc.expires_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length > 50 && (
            <p className="border-t px-4 py-3 text-center text-sm text-gray-500">
              Showing 50 of {filtered.length} documents. Use filters to narrow results.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function SummaryCard({ label, count, color }: { label: string; count: number; color: string }) {
  return (
    <Card>
      <CardContent className="pt-4 text-center">
        <p className={`text-2xl font-bold ${color}`}>{count}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </CardContent>
    </Card>
  );
}

function DocBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    approved: "bg-green-100 text-green-800", submitted: "bg-blue-100 text-blue-800",
    under_review: "bg-yellow-100 text-yellow-800", missing: "bg-red-100 text-red-800",
    expired: "bg-orange-100 text-orange-800",
  };
  return <Badge className={map[status] || "bg-gray-100"}>{status.replace(/_/g, " ")}</Badge>;
}
