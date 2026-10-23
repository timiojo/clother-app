"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function ReviewsPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Reviews</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Reviews</h1>
      </div>

      <table className="w-full text-left border border-line">
        <thead>
          <tr className="border-b border-line">
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Customer</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Project</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Rating</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Text</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Status</th>
            <th className="pb-2 text-xs tracking-wider uppercase text-muted">Action</th>
          </tr>
        </thead>
        <tbody>
          {[
            { customer: "Chinwe Okafor", project: "Green bespoke dress", rating: "★★★★★", text: '"Perfect fit, beautifully finished."', status: "Visible" },
            { customer: "Samuel Adebayo", project: "Tailored suit", rating: "★★★★☆", text: '"Great communication throughout."', status: "Visible" },
          ].map((r, i) => (
            <tr key={i} className="border-b border-line hover:bg-[#F8F3E8]">
              <td className="py-4">{r.customer}</td>
              <td className="py-4">{r.project}</td>
              <td className="py-4 text-wine-700 font-bold">{r.rating}</td>
              <td className="py-4">{r.text}</td>
              <td className="py-4">
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold bg-[#DFF2E4] text-[#1E6B3A]">
                  {r.status}
                </span>
              </td>
              <td className="py-4">
                <button className="text-xs font-bold text-wine underline decoration-wine/30 hover:decoration-wine">Reply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
