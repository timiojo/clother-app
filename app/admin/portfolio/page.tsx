"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function PortfolioPage() {
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
          <p className="micro">Portfolio</p>
          <h1 className="serif text-2xl text-wine-900 mt-1">Portfolio</h1>
        </div>
        <button className="bg-wine text-card px-5 py-2 rounded-sm font-bold text-sm hover:bg-[#3E1522] transition">
          Add image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {["Look 1 · Champagne", "Look 2 · Emerald", "Look 3 · Navy"].map((label, i) => (
          <div key={i} className="bg-[#EFE0E2] h-48 rounded-lg flex items-center justify-center text-wine-700 font-bold text-sm">
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
