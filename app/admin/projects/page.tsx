"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function ProjectsPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Projects</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Active projects</h1>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button className="btn-outline" style={{ padding: "6px 12px", fontSize: "12px", fontWeight: "700", borderRadius: "4px" }}>
          Mark all reviewed
        </button>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Project</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Customer</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Stage</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Deposit</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Balance</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Progress</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { project: "Champagne gold dress", customer: "Abie Johnson", stage: "Production", deposit: "₦208,450", balance: "₦208,450", progress: 65 },
            { project: "Tailored suit", customer: "Samuel Adebayo", stage: "Fittings", deposit: "₦90,000", balance: "₦90,000", progress: 40 },
          ].map((p, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4 font-bold serif">{p.project}</td>
              <td className="py-4">{p.customer}</td>
              <td className="py-4">{p.stage}</td>
              <td className="py-4 font-bold text-wine-900">{p.deposit}</td>
              <td className="py-4 font-bold text-wine-900">{p.balance}</td>
              <td className="py-4">
                <div className="text-xs">{p.progress}%</div>
                <div className="h-2 w-full bg-[#F8F3E8] rounded-full mt-1">
                  <div className={`h-full rounded-full bg-wine`} style={{ width: `${p.progress}%` }} />
                </div>
              </td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
