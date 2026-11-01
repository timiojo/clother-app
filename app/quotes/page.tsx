"use client";

import Link from "next/link";
import { useSession } from "better-auth/react";

export default function QuotesPage() {
  const { session } = useSession();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <div>
        <p className="micro">Quotes</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">Your quotes</h1>
      </div>

      <div className="bg-card border border-line rounded-lg overflow-hidden">
        <div className="p-6 border-b border-line">
          <h2 className="serif text-xl text-wine-900 font-bold mb-4">Champagne gold bespoke couture dress</h2>
          <div className="flex justify-between items-end mb-4">
            <div>
              <div className="text-xs micro">Quote #Q-2026-042</div>
              <div className="text-xs text-muted">Sent 19 Oct 2026 · Expires 28 Oct 2026</div>
            </div>
            <div className="text-2xl font-bold text-wine-900 serif">₦416,900</div>
          </div>

          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b border-line">
                <th className="pb-2 text-left text-xs tracking-wider uppercase text-muted">Item</th>
                <th className="pb-2 text-right text-xs tracking-wider uppercase text-muted">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-line">
                <td className="py-3">Champagne gold bespoke couture dress</td>
                <td className="py-3 text-right font-bold">₦296,900</td>
              </tr>
              <tr className="border-b border-line">
                <td className="py-3">Green bespoke dress</td>
                <td className="py-3 text-right font-bold">₦120,000</td>
              </tr>
              <tr>
                <td className="py-3 text-right font-bold">Total</td>
                <td className="py-3 text-right font-bold text-wine-900 serif">₦416,900</td>
              </tr>
            </tbody>
          </table>

          <div className="bg-[#F8F3E8] border border-[#E5DACA] rounded-sm p-4 mb-6 text-sm">
            <div className="micro mb-2">Payment schedule</div>
            <p>Deposit ₦208,450 now · Balance ₦208,450 on final approval.</p>
          </div>

          <div className="p-4 bg-card border border-line rounded-sm mb-6 text-sm">
            <p className="mb-2"><span className="font-bold">Materials:</span> Studio-sourced lace</p>
            <p className="mb-2"><span className="font-bold">Measurements:</span> In-person fitting</p>
            <p className="mb-2"><span className="font-bold">Fulfilment:</span> Collection Lagos / courier UK +₦18,000</p>
          </div>

          <div className="bg-[#EFE0E2] rounded-sm p-4 text-sm mb-6">
            <div className="micro mb-2">Cancellation &amp; refund</div>
            <p>Consultation reschedulable to 24h before. Custom pieces non-refundable once cut. Statutory rights unaffected.</p>
          </div>

          <div className="flex gap-3">
            <button className="bg-wine text-card flex-1 py-4 rounded-sm font-bold text-center hover:bg-[#3E1522] transition">
              Accept &amp; pay deposit
            </button>
            <button className="border border-wine text-wine flex-1 py-4 rounded-sm font-bold hover:bg-[#F8F3E8] transition">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
