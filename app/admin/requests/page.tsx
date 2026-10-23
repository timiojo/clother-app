"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function RequestsPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Requests</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Outfit requests</h1>
      </div>

      <div className="flex items-center justify-between mb-4">
        <button className="btn-outline" style={{ padding: "6px 12px", fontSize: "12px", fontWeight: "700", borderRadius: "4px" }}>
          Export CSV
        </button>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Customer</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Garment</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Occasion</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Budget</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Deadline</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { customer: "Abie Johnson", garment: "Evening dress", occasion: "December wedding", budget: "₦200k–₦400k", deadline: "15 Dec 2026", status: "New" },
            { customer: "Samuel Adebayo", garment: "Tailored suit", occasion: "Corporate gala", budget: "₦100k–₦200k", deadline: "10 Nov 2026", status: "Quoted" },
            { customer: "Chinwe Okafor", garment: "Cocktail dress", occasion: "Birthday party", budget: "₦100k–₦200k", deadline: "5 Nov 2026", status: "Accepted" },
          ].map((r, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4">{r.customer}</td>
              <td className="py-4">{r.garment}</td>
              <td className="py-4">{r.occasion}</td>
              <td className="py-4 font-bold text-wine-900">{r.budget}</td>
              <td className="py-4">{r.deadline}</td>
              <td className="py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${r.status === "Accepted" ? "bg-[#DFF2E4] text-[#1E6B3A]" : r.status === "Quoted" ? "bg-[#E3EAFB] text-[#2B4C8A]" : "bg-[#EFE0E2] text-[#4B1F2E]"}`}>
                  {r.status}
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
