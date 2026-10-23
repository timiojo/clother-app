"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function ServicesPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Services</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Services</h1>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Service</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Type</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Starting price</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Active</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { service: "Bespoke evening dress", type: "Couture", price: "₦120,000", active: "Active" },
            { service: "Tailored two-piece suit", type: "Tailoring", price: "₦180,000", active: "Active" },
            { service: "Cocktail dress", type: "Ready-to-wear", price: "₦95,000", active: "Draft" },
          ].map((s, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4">{s.service}</td>
              <td className="py-4">{s.type}</td>
              <td className="py-4 font-bold text-wine-900 serif">{s.price}</td>
              <td className="py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${s.active === "Active" ? "bg-[#DFF2E4] text-[#1E6B3A]" : "bg-[#EFE0E2] text-[#4B1F2E]"}`}>
                  {s.active}
                </span>
              </td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
