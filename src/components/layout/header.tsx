"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, Search, X, Check, LogOut } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNotifications } from "@/components/notifications/notification-provider";
import { useAuth } from "@/components/auth/auth-provider";

export function Header() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [bellOpen, setBellOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications();
  const { user, signOut } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Sameer Saxena";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const avatarUrl = user?.user_metadata?.avatar_url;

  function handleSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && search.trim()) {
      router.push(`/suppliers?q=${encodeURIComponent(search.trim())}`);
    }
  }

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleBellClick() {
    setBellOpen(!bellOpen);
    if (!bellOpen && unreadCount > 0) {
      setTimeout(() => markAllRead(), 3000);
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search suppliers..."
            className="w-80 pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleSearch}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative" ref={bellRef}>
          <button
            className="relative rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            onClick={handleBellClick}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>
          {bellOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-96 rounded-lg border bg-white shadow-lg">
              <div className="flex items-center justify-between border-b px-4 py-3">
                <p className="text-sm font-semibold text-gray-900">
                  Notifications
                  {unreadCount > 0 && (
                    <span className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700">
                      {unreadCount} new
                    </span>
                  )}
                </p>
                <div className="flex items-center gap-1">
                  {notifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="rounded px-2 py-1 text-xs text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                      Clear all
                    </button>
                  )}
                  <button onClick={() => setBellOpen(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center gap-2 py-8">
                    <Check className="h-8 w-8 text-green-400" />
                    <p className="text-sm text-gray-400">All caught up!</p>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`border-b px-4 py-3 last:border-0 ${
                        n.isNew ? "bg-blue-50/60" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${
                            n.isNew
                              ? "bg-blue-500"
                              : n.urgent
                                ? "bg-red-400"
                                : "bg-gray-300"
                          }`}
                        />
                        <div>
                          <p className={`text-sm ${n.isNew ? "font-medium text-gray-900" : "text-gray-700"}`}>
                            {n.text}
                          </p>
                          <p className="mt-0.5 text-xs text-gray-400">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-gray-100"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={displayName}
                className="h-8 w-8 rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                {initials}
              </div>
            )}
            <span className="text-sm font-medium text-gray-700">{displayName}</span>
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border bg-white py-1 shadow-lg">
              <div className="border-b px-4 py-3">
                <p className="text-sm font-medium text-gray-900">{displayName}</p>
                {user?.email && (
                  <p className="text-xs text-gray-500">{user.email}</p>
                )}
              </div>
              <button
                onClick={() => {
                  setProfileOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
