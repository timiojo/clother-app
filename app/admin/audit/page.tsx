"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function AuditPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Audit Log</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Audit log</h1>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Time</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Admin</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Record</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Details</th>
          </tr>
        </thead>
        <tbody>
          {[
            { time: "21 Oct, 09:12", admin: "Designer (you)", action: "Quote accepted", record: "Q-2026-041", details: "₦180,000 · Samuel Adebayo" },
            { time: "20 Oct, 14:05", admin: "Designer (you)", action: "Project updated", record: "Champagne gold dress", details: "Stage: Production · 65%" },
            { time: "19 Oct, 11:30", admin: "Designer (you)", action: "Quote sent", record: "Q-2026-042", details: "₦416,900 · Abie Johnson" },
          ].map((a, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4 font-mono text-xs text-muted">{a.time}</td>
              <td className="py-4">{a.admin}</td>
              <td className="py-4">{a.action}</td>
              <td className="py-4">{a.record}</td>
              <td className="py-4">{a.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
