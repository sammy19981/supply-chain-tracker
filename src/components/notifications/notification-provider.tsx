"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export type Notification = {
  id: string;
  text: string;
  time: string;
  urgent: boolean;
  isNew: boolean;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
  clearAll: () => void;
};

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAllRead: () => {},
  clearAll: () => {},
});

export function useNotifications() {
  return useContext(NotificationContext);
}

const defaultNotifications: Notification[] = [
  { id: "d1", text: "3 suppliers flagged for sanctions review", time: "2h ago", urgent: true, isNew: false },
  { id: "d2", text: "Overdue audit: Shenzhen Electronics Co.", time: "5h ago", urgent: true, isNew: false },
  { id: "d3", text: "Contract expiring in 30 days: Baltic Timber Group", time: "1d ago", urgent: false, isNew: false },
  { id: "d4", text: "New risk score update: 12 suppliers recalculated", time: "1d ago", urgent: false, isNew: false },
  { id: "d5", text: "Document expired: ISO 14001 — Mekong Delta Textiles", time: "2d ago", urgent: true, isNew: false },
];

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(defaultNotifications);
  const [toast, setToast] = useState<string | null>(null);

  const addNotification = useCallback((text: string, urgent: boolean) => {
    const notif: Notification = {
      id: crypto.randomUUID(),
      text,
      time: timeAgo(new Date()),
      urgent,
      isNew: true,
    };
    setNotifications((prev) => [notif, ...prev].slice(0, 20));
    setToast(text);
    setTimeout(() => setToast(null), 4000);
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const channel = supabase
      .channel("realtime-notifications")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "suppliers" },
        (payload) => {
          const name = (payload.new as { supplier_name?: string }).supplier_name || "Unknown";
          addNotification(`New supplier added: ${name}`, true);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "suppliers" },
        (payload) => {
          const newRow = payload.new as {
            supplier_name?: string;
            risk_score?: number;
            risk_band?: string;
            sanctions_status?: string;
            audit_status?: string;
          };
          const oldRow = payload.old as typeof newRow;
          const name = newRow.supplier_name || "Unknown";

          if (oldRow.risk_score !== undefined && newRow.risk_score !== undefined && oldRow.risk_score !== newRow.risk_score) {
            const direction = newRow.risk_score > oldRow.risk_score ? "increased" : "decreased";
            addNotification(
              `Risk score ${direction} for ${name}: ${oldRow.risk_score} → ${newRow.risk_score}`,
              newRow.risk_score >= 70
            );
          } else if (oldRow.sanctions_status !== newRow.sanctions_status) {
            addNotification(
              `Sanctions status changed for ${name}: ${(oldRow.sanctions_status || "").replace(/_/g, " ")} → ${(newRow.sanctions_status || "").replace(/_/g, " ")}`,
              true
            );
          } else if (oldRow.audit_status !== newRow.audit_status) {
            addNotification(
              `Audit status updated for ${name}: ${(newRow.audit_status || "").replace(/_/g, " ")}`,
              newRow.audit_status === "overdue"
            );
          } else {
            addNotification(`Supplier updated: ${name}`, false);
          }
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "suppliers" },
        (payload) => {
          const name = (payload.old as { supplier_name?: string }).supplier_name || "Unknown";
          addNotification(`Supplier removed: ${name}`, true);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "supplier_documents" },
        () => {
          addNotification("New document uploaded", false);
        }
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "sanctions_matches" },
        () => {
          addNotification("New sanctions match detected — review required", true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [addNotification]);

  const unreadCount = notifications.filter((n) => n.isNew).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
  }

  function clearAll() {
    setNotifications([]);
  }

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllRead, clearAll }}>
      {children}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="flex items-center gap-3 rounded-lg border bg-white px-4 py-3 shadow-lg">
            <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
            <p className="max-w-xs text-sm text-gray-700">{toast}</p>
            <button onClick={() => setToast(null)} className="text-gray-400 hover:text-gray-600">
              ×
            </button>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
