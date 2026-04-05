"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSuppliers, getAudits, getContracts } from "@/lib/data";
import { isSupabaseConfigured } from "@/lib/supabase";
import type { Supplier, Audit, Contract } from "@/types/database";
import Link from "next/link";

export default function AuditsRenewalsPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [audits, setAudits] = useState<(Audit & { supplier_name?: string })[]>([]);
  const [contracts, setContracts] = useState<(Contract & { supplier_name?: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [sups, a, c] = await Promise.all([
        getSuppliers(), getAudits(), getContracts(),
      ]);
      setSuppliers(sups);
      setAudits(a);
      setContracts(c);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gray-400" /></div>;
  }

  const now = new Date();

  // Supplier-level data (always available via demo data fallback)
  const overdueAuditSuppliers = suppliers.filter((s) => s.audit_status === "overdue");
  const upcomingAuditSuppliers = suppliers.filter((s) => {
    if (!s.audit_due_date || s.audit_status === "overdue") return false;
    const due = new Date(s.audit_due_date);
    const days = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 90;
  });
  const expiringContractSuppliers = suppliers.filter((s) => {
    const end = new Date(s.contract_end_date);
    const days = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return days > 0 && days <= 90;
  });
  const expiredContractSuppliers = suppliers.filter(
    (s) => new Date(s.contract_end_date) < now
  );

  // Supabase audit/contract data
  const overdueAudits = audits.filter((a) => a.status === "overdue");
  const scheduledAudits = audits.filter((a) => a.status === "scheduled");
  const expiringContracts = contracts.filter((c) => c.status === "expiring_soon");

  const useSupabaseAudits = isSupabaseConfigured && audits.length > 0;
  const useSupabaseContracts = isSupabaseConfigured && contracts.length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Audits & Contract Renewals</h1>
        <p className="text-sm text-gray-500">Track upcoming and overdue audits and contract renewals</p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-red-200 bg-red-50/50">
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-red-700">
              {useSupabaseAudits ? overdueAudits.length : overdueAuditSuppliers.length}
            </p>
            <p className="text-xs text-gray-500">Overdue Audits</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-amber-600">
              {useSupabaseAudits ? scheduledAudits.length : upcomingAuditSuppliers.length}
            </p>
            <p className="text-xs text-gray-500">Upcoming Audits</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-orange-50/50">
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-orange-700">
              {useSupabaseContracts ? expiringContracts.length : expiringContractSuppliers.length}
            </p>
            <p className="text-xs text-gray-500">Contracts Expiring (90 days)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <p className="text-2xl font-bold text-red-600">{expiredContractSuppliers.length}</p>
            <p className="text-xs text-gray-500">Expired Contracts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overdue-audits">
        <TabsList>
          <TabsTrigger value="overdue-audits">
            Overdue Audits ({useSupabaseAudits ? overdueAudits.length : overdueAuditSuppliers.length})
          </TabsTrigger>
          <TabsTrigger value="upcoming-audits">
            Upcoming ({useSupabaseAudits ? scheduledAudits.length : upcomingAuditSuppliers.length})
          </TabsTrigger>
          <TabsTrigger value="expiring-contracts">
            Expiring Contracts ({useSupabaseContracts ? expiringContracts.length : expiringContractSuppliers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overdue-audits">
          {useSupabaseAudits ? (
            <AuditTable audits={overdueAudits} now={now} />
          ) : (
            <SupplierDateTable suppliers={overdueAuditSuppliers} dateField="audit_due_date" dateLabel="Due Date" now={now} />
          )}
        </TabsContent>

        <TabsContent value="upcoming-audits">
          {useSupabaseAudits ? (
            <AuditTable audits={scheduledAudits} now={now} />
          ) : (
            <SupplierDateTable suppliers={upcomingAuditSuppliers} dateField="audit_due_date" dateLabel="Due Date" now={now} />
          )}
        </TabsContent>

        <TabsContent value="expiring-contracts">
          {useSupabaseContracts ? (
            <ContractTable contracts={expiringContracts} now={now} />
          ) : (
            <SupplierDateTable suppliers={expiringContractSuppliers} dateField="contract_end_date" dateLabel="Expires" now={now} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AuditTable({ audits, now }: { audits: (Audit & { supplier_name?: string })[]; now: Date }) {
  if (audits.length === 0) return <EmptyState />;
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Due Date</th>
              <th className="px-4 py-3 font-medium">Days</th>
            </tr>
          </thead>
          <tbody>
            {audits.map((a) => {
              const days = Math.floor((new Date(a.due_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <tr key={a.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium">{a.supplier_name || a.supplier_id}</td>
                  <td className="px-4 py-2.5 text-gray-600">{a.audit_type}</td>
                  <td className="px-4 py-2.5 text-gray-600">{new Date(a.due_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2.5"><DaysBadge days={days} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function ContractTable({ contracts, now }: { contracts: (Contract & { supplier_name?: string })[]; now: Date }) {
  if (contracts.length === 0) return <EmptyState />;
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Contract #</th>
              <th className="px-4 py-3 font-medium">End Date</th>
              <th className="px-4 py-3 font-medium">Value</th>
              <th className="px-4 py-3 font-medium">Days</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => {
              const days = Math.floor((new Date(c.end_date).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              return (
                <tr key={c.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2.5 font-medium">{c.supplier_name || c.supplier_id}</td>
                  <td className="px-4 py-2.5 text-gray-600">{c.contract_number}</td>
                  <td className="px-4 py-2.5 text-gray-600">{new Date(c.end_date).toLocaleDateString()}</td>
                  <td className="px-4 py-2.5 font-mono text-gray-600">${(c.value / 1_000_000).toFixed(1)}M</td>
                  <td className="px-4 py-2.5"><DaysBadge days={days} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function SupplierDateTable({ suppliers, dateField, dateLabel, now }: {
  suppliers: Supplier[]; dateField: "audit_due_date" | "contract_end_date"; dateLabel: string; now: Date;
}) {
  if (suppliers.length === 0) return <EmptyState />;
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-left text-gray-500">
              <th className="px-4 py-3 font-medium">Supplier</th>
              <th className="px-4 py-3 font-medium">Country</th>
              <th className="px-4 py-3 font-medium">Commodity</th>
              <th className="px-4 py-3 font-medium">Criticality</th>
              <th className="px-4 py-3 font-medium">{dateLabel}</th>
              <th className="px-4 py-3 font-medium">Days</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((s) => {
              const dateStr = s[dateField];
              const date = dateStr ? new Date(dateStr) : null;
              const days = date ? Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null;
              return (
                <tr key={s.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2.5">
                    <Link href={`/suppliers/${s.id}`} className="font-medium text-blue-600 hover:underline">{s.supplier_name}</Link>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{s.country}</td>
                  <td className="px-4 py-2.5 text-gray-600">{s.commodity}</td>
                  <td className="px-4 py-2.5">
                    <Badge className={
                      s.business_criticality === "critical" ? "bg-red-100 text-red-800"
                        : s.business_criticality === "high" ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-600"
                    }>{s.business_criticality}</Badge>
                  </td>
                  <td className="px-4 py-2.5 text-gray-600">{date?.toLocaleDateString() || "—"}</td>
                  <td className="px-4 py-2.5">{days !== null && <DaysBadge days={days} />}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function DaysBadge({ days }: { days: number }) {
  return (
    <Badge className={
      days < 0 ? "bg-red-100 text-red-800"
        : days < 30 ? "bg-orange-100 text-orange-800"
          : "bg-yellow-100 text-yellow-800"
    }>
      {days < 0 ? `${Math.abs(days)}d overdue` : `${days}d left`}
    </Badge>
  );
}

function EmptyState() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center py-12 text-gray-400">
        <CheckCircle className="mb-2 h-10 w-10" />
        <p>Nothing to show here</p>
      </CardContent>
    </Card>
  );
}
