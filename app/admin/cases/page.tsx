"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function CasesPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Support Cases</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Support cases</h1>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Case #</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Project</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Issue</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Raised</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { no: "CASE-001", project: "Navy formal gown", issue: "Delivery delay", raised: "14 Oct 2026", status: "Open" },
          ].map((c, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4 font-mono text-xs">{c.no}</td>
              <td className="py-4">{c.project}</td>
              <td className="py-4">{c.issue}</td>
              <td className="py-4">{c.raised}</td>
              <td className="py-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-[#E3EAFB] text-[#2B4C8A]">
                  {c.status}
                </span>
              </td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">Review</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
