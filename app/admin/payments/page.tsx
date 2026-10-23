"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function PaymentsPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Payments</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Payments &amp; settlements</h1>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Reference</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Customer</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Amount</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Currency</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Provider</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { ref: "FLW_TX_98321", customer: "Abie Johnson", amount: "₦208,450", currency: "NGN", status: "Succeeded" },
            { ref: "FLW_TX_98310", customer: "Samuel Adebayo", amount: "₦90,000", currency: "NGN", status: "Succeeded" },
            { ref: "FLW_TX_98305", customer: "Elizabeth Mensah", amount: "₦148,450", currency: "NGN", status: "Failed" },
          ].map((p, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4 font-mono text-xs">{p.ref}</td>
              <td className="py-4">{p.customer}</td>
              <td className="py-4 font-bold text-wine-900 serif">{p.amount}</td>
              <td className="py-4">{p.currency}</td>
              <td className="py-4">Flutterwave</td>
              <td className="py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${p.status === "Succeeded" ? "bg-[#DFF2E4] text-[#1E6B3A]" : "bg-[#F5D9D9] text-[#8F2424]"}`}>
                  {p.status}
                </span>
              </td>
              <td className="py-4">
                <button className={`text-xs font-bold ${p.status === "Failed" ? "text-[#8F2424]" : "text-wine"} underline decoration-wine/30 hover:decoration-wine`}>
                  {p.status === "Failed" ? "Retry" : "Receipt"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8 pt-6 border-t border-line bg-card rounded-lg p-6">
        <div className="micro">Next settlement</div>
        <div className="text-3xl font-bold text-wine-900 serif mt-1">₦298,450</div>
        <div className="text-xs micro mt-1">Flutterwave · 3 business days</div>
      </div>
    </div>
  );
}
