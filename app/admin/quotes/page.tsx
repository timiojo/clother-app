"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function QuotesPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="micro">Quotes</p>
          <h1 className="serif text-2xl text-wine-900 mt-1">Quotes</h1>
        </div>
        <button className="bg-wine text-card px-5 py-2 rounded-sm font-bold text-sm hover:bg-[#3E1522] transition">
          Create quote
        </button>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Quote #</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Customer</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Total</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Deposit</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Expires</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { no: "Q-2026-042", customer: "Abie Johnson", total: "₦416,900", deposit: "₦208,450", expires: "28 Oct 2026", status: "Sent" },
            { no: "Q-2026-041", customer: "Samuel Adebayo", total: "₦180,000", deposit: "₦90,000", expires: "25 Oct 2026", status: "Accepted" },
            { no: "Q-2026-040", customer: "Elizabeth Mensah", total: "₦296,900", deposit: "₦148,450", expires: "20 Oct 2026", status: "Declined" },
          ].map((q, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4 font-mono text-xs">{q.no}</td>
              <td className="py-4">{q.customer}</td>
              <td className="py-4 font-bold text-wine-900 serif">{q.total}</td>
              <td className="py-4">{q.deposit}</td>
              <td className="py-4">{q.expires}</td>
              <td className="py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${q.status === "Accepted" ? "bg-[#DFF2E4] text-[#1E6B3A]" : q.status === "Sent" ? "bg-[#EFE0E2] text-[#4B1F2E]" : "bg-[#F5D9D9] text-[#8F2424]"}`}>
                  {q.status}
                </span>
              </td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
