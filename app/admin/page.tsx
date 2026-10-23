"use client";

import { useSession } from "better-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

const STATS = [
  { label: "Requests this month", value: "12", delta: "↑ 3 vs last month" },
  { label: "Pending quotes", value: "₦416,900", delta: "£0 · ₦416,900" },
  { label: "Active projects", value: "4", delta: "2 this week" },
  { label: "Deposits collected", value: "₦208,450", delta: "2 paid · 1 failed" },
];

const ACTIVITY = [
  { project: "Champagne gold dress", customer: "Abie Johnson", status: "Awaiting approval", updated: "2 days ago", type: "quote" },
  { project: "Tailored two-piece suit", customer: "Samuel Adebayo", status: "In progress", updated: "1 day ago", type: "project" },
  { project: "Green bespoke dress", customer: "Chinwe Okafor", status: "Completed", updated: "1 week ago", type: "review" },
  { project: "Navy formal gown", customer: "Elizabeth Mensah", status: "Awaiting confirmation", updated: "3 days ago", type: "quote" },
];

export default function DashboardPage() {
  const { session } = useSession();
  const [tab, setTab] = useState("activity");

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // handled by middleware; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-8">
      <div>
        <p className="micro">Dashboard</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">Studio overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map((s) => (
          <div key={s.label} className="bg-card border border-line rounded-lg p-6">
            <div className="text-4xl font-bold text-wine-900 serif">{s.value}</div>
            <div className="text-xs tracking-wider uppercase text-muted mt-1">{s.label}</div>
            <div className={`mt-3 text-sm font-bold ${s.delta.startsWith("↑") ? "text-ok" : "text-ink"}`}>{s.delta}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 text-xs font-bold border-b-2 ${tab === "activity" ? "border-wine text-wine" : "border-transparent text-muted hover:text-wine"}`}
            onClick={() => setTab("activity")}
          >
            Recent activity
          </button>
          <button
            className={`px-4 py-2 text-xs font-bold border-b-2 ${tab === "bookings" ? "border-wine text-wine" : "border-transparent text-muted hover:text-wine"}`}
            onClick={() => setTab("bookings")}
          >
            Upcoming bookings
          </button>
        </div>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Project</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Customer</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Updated</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {ACTIVITY.map((a) => (
            <tr key={a.project} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4">
                <div className="font-bold serif">{a.project}</div>
                <div className="text-xs micro">{a.type}</div>
              </td>
              <td className="py-4">{a.customer}</td>
              <td className="py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${a.status === "Completed" ? "bg-[#DFF2E4] text-[#1E6B3A]" : a.status === "In progress" ? "bg-[#E3EAFB] text-[#2B4C8A]" : "bg-[#EFE0E2] text-[#4B1F2E]"}`}>
                  {a.status}
                </span>
              </td>
              <td className="py-4 text-muted">{a.updated}</td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pt-8 border-t border-line">
        <p className="micro">Quick actions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Link href="/admin/quotes" className="bg-wine text-card px-5 py-3 rounded-sm font-bold text-center hover:bg-[#3E1522] transition">
            Create quote
          </Link>
          <Link href="/admin/requests" className="bg-card border border-line text-wine px-5 py-3 rounded-sm font-bold text-center hover:bg-[#F8F3E8] transition">
            Review requests
          </Link>
          <Link href="/admin/payments" className="bg-card border border-line text-wine px-5 py-3 rounded-sm font-bold text-center hover:bg-[#F8F3E8] transition">
            Check payments
          </Link>
        </div>
      </div>
    </div>
  );
}
