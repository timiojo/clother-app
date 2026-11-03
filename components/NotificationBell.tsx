"use client";

import { useSession } from "better-auth/react";
import { useEffect, useState } from "react";
import { Bell, BellRing, Mail, X } from "lucide-react";

export default function NotificationBell() {
  const { session } = useSession();
  const [notifications, setNotifications] = useState<Array<any>>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    fetchNotifications();
  }, [session]);

  async function fetchNotifications() {
    if (!session?.user) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/notifications?limit=10`,
        { headers: { cookie: document.cookie } }
      );
      const data = await res.json();
      setNotifications(data.notifications ?? []);
      setUnreadCount(data.unreadCount ?? 0);
    } catch {
      setUnreadCount(0);
    } finally {
      setLoading(false);
    }
  }

  async function markAllRead() {
    if (!session?.user) return;
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAll: true }),
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }

  async function markRead(id: string) {
    if (!session?.user) return;
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notificationId: id }),
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((c) => Math.max(0, c - 1));
  }

  if (!session?.user) return null;

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-wine-700 hover:text-wine-900"
        aria-label="Notifications"
      >
        <BellRing className={`w-5 h-5 ${unreadCount > 0 ? "animate-ping text-[#A83232]" : "text-wine-700"}`} />
        <Bell className="w-5 h-5 text-wine-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-[#A83232] text-[card] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-80 bg-card border border-line rounded-lg shadow-lg z-50 flex flex-col"
          style={{ boxShadow: "0 10px 30px rgba(62,21,34,.15)" }}
        >
          <div className="px-4 py-3 border-b border-line flex justify-between items-center">
            <span className="serif text-sm font-bold text-wine-900">Notifications</span>
            {!loading && unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-xs font-bold text-[#A83232] hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {loading ? (
            <div className="px-4 py-4 text-center text-muted text-xs">
              Loading…
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-4 py-6 text-center text-muted text-sm">
              No notifications yet.
            </div>
          ) : (
            <div className="divide-y divide-line">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className="px-4 py-3 flex gap-3 group cursor-pointer hover:bg-[#F8F3E8]"
                  onClick={() => {
                    if (!n.read) markRead(n.id);
                    setOpen(false);
                    if (n.link) window.location.href = n.link;
                  }}
                >
                  {n.read ? (
                    <Bell className="w-4 h-4 text-muted mt-0.5" />
                  ) : (
                    <Mail className="w-4 h-4 text-[#A83232] mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-ink truncate">{n.title}</p>
                    <p className="text-[11px] text-muted truncate">{n.body}</p>
                    <p className="text-[10px] text-muted mt-1">
                      {new Date(n.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="mt-0.5 w-1.5 h-1.5 bg-[#4B1F2E] rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
