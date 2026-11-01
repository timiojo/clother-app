"use client";

import { useSession } from "better-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function CustomerProjectsPage() {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.group !== "customer") {
      router.push("/login?cb=" + encodeURIComponent("/projects"));
    }
  }, [session, router]);

  if (!session || session.user.group !== "customer") return null;

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">My projects</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">All projects</h1>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Project</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Updated</th>
            <th className="pb-3 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { title: "Champagne gold dress", status: "Awaiting approval", updated: "2 days ago" },
            { title: "Tailored suit", status: "In progress", updated: "1 day ago" },
            { title: "Green cocktail dress", status: "Completed", updated: "1 week ago" },
          ].map((p, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4">{p.title}</td>
              <td className="py-4">
                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                  p.status === "Completed" ? "bg-[#DFF2E4] text-[#1E6B3A]" :
                  p.status === "In progress" ? "bg-[#E3EAFB] text-[#2B4C8A]" :
                  "bg-[#EFE0E2] text-[#4B1F2E]"
                }`}>{p.status}</span>
              </td>
              <td className="py-4 text-muted">{p.updated}</td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">Open</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
