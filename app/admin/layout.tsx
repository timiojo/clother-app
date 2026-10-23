"use client";

import { useSession } from "better-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const NAV = [
  { key: "dashboard", label: "Dashboard", icon: "📊", href: "/admin" },
  { key: "requests", label: "Requests", icon: "📝", href: "/admin/requests" },
  { key: "projects", label: "Projects", icon: "👗", href: "/admin/projects" },
  { key: "bookings", label: "Bookings", icon: "📅", href: "/admin/bookings" },
  { key: "quotes", label: "Quotes", icon: "🧾", href: "/admin/quotes" },
  { key: "payments", label: "Payments", icon: "💳", href: "/admin/payments" },
  { key: "portfolio", label: "Portfolio", icon: "🖼️", href: "/admin/portfolio" },
  { key: "services", label: "Services", icon: "✂️", href: "/admin/services" },
  { key: "reviews", label: "Reviews", icon: "★", href: "/admin/reviews" },
  { key: "cases", label: "Support Cases", icon: "⚠️", href: "/admin/cases" },
  { key: "audit", label: "Audit Log", icon: "📋", href: "/admin/audit" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const [open, setOpen] = useState(false);

  if (!session || session.user.group !== "admin") {
    return null; // middleware redirects to login anyway
  }

  return (
    <div className="flex min-h-screen bg-paper text-ink">
      <aside className={`w-64 bg-wine text-card shrink-0 border-r border-white/10 ${open ? "translate-x-0" : "-translate-x-full"} fixed left-0 top-0 bottom-0 z-50 transition`}>
        <div className="p-5 border-b border-white/10">
          <span className="serif text-2xl font-bold">Clother.</span>
          <p className="micro mt-1">ADMIN</p>
        </div>
        <nav className="p-4">
          {NAV.map((n) => (
            <Link
              key={n.key}
              href={n.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm ${"text-card/85 hover:bg-white/10"}`}
            >
              <span className="w-5">{n.icon}</span>
              {n.label}
            </Link>
          ))}
          <div className="mt-8 pt-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm text-card/85 hover:bg-white/10" onClick={() => {}}>
              🚪 Sign out
            </button>
          </div>
        </nav>
      </aside>

      <button
        className="fixed top-4 left-4 z-60 bg-wine text-card border-none rounded-sm px-4 py-2 font-bold"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        ☰ Menu
      </button>

      <main className="flex-1 pl-64 md:pl-0 p-6 md:p-10">
        {children}
      </main>
    </div>
  );
}
