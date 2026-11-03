"use client";

import { useSession } from "better-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import NotificationBell from "@/components/NotificationBell";

export default function CustomerDashboardPage() {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.group !== "customer") {
      router.push("/login?cb=" + encodeURIComponent("/dashboard"));
    }
  }, [session, router]);

  if (!session || session.user.group !== "customer") return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="micro">Dashboard</p>
          <h1 className="serif text-3xl text-wine-900 mt-1">Your projects</h1>
        </div>
        <NotificationBell />
      </div>

      <div className="flex items-center justify-between mb-4">
        <Link href="/request" className="bg-wine text-card px-5 py-2 rounded-sm font-bold text-sm hover:bg-[#3E1522] transition">
          New request
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {[
          { title: "Champagne gold dress", status: "Awaiting approval", stage: "Quote sent", date: "20 Oct 2026" },
          { title: "Tailored suit", status: "In progress", stage: "Production", date: "15 Oct 2026" },
          { title: "Green cocktail dress", status: "Completed", stage: "Delivered", date: "02 Oct 2026" },
        ].map((p, i) => (
          <div key={i} className="bg-card border border-line rounded-lg p-6">
            <h3 className="serif text-lg text-wine-900 font-bold mb-2">{p.title}</h3>
            <p className="text-sm text-muted mb-3">{p.stage}</p>
            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
              p.status === "Completed" ? "bg-[#DFF2E4] text-[#1E6B3A]" :
              p.status === "In progress" ? "bg-[#E3EAFB] text-[#2B4C8A]" :
              "bg-[#EFE0E2] text-[#4B1F2E]"
            }`}>{p.status}</span>
            <p className="text-xs micro mt-3">{p.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
