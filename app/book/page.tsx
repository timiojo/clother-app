"use client";

import { useSession } from "better-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function BookPage() {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.group !== "customer") {
      router.push("/login?cb=" + encodeURIComponent("/book"));
    }
  }, [session, router]);

  if (!session || session.user.group !== "customer") return null;

  return (
    <div className="max-w-md mx-auto px-6 py-12 space-y-6">
      <div>
        <p className="micro">Book a consultation</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">Schedule your consultation</h1>
      </div>

      <div className="bg-card border border-line rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Format</label>
          <select className="w-full border border-line rounded-sm p-3">
            <option>Online (video link)</option>
            <option>In-person — Lagos studio</option>
          </select>
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Date</label>
          <input type="date" className="w-full border border-line rounded-sm p-3" />
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Time</label>
          <select className="w-full border border-line rounded-sm p-3">
            <option>10:00 AM</option>
            <option>2:00 PM</option>
            <option>4:00 PM</option>
          </select>
        </div>
        <button className="bg-wine text-card w-full py-3 rounded-sm font-bold text-sm hover:bg-[#3E1522] transition">
          Book consultation
        </button>
      </div>
    </div>
  );
}
