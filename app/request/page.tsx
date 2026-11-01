"use client";

import { useSession } from "better-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RequestPage() {
  const { session } = useSession();
  const router = useRouter();
  const [garmentType, setGarmentType] = useState("");
  const [occasion, setOccasion] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!session || session.user.group !== "customer") {
      router.push("/login?cb=" + encodeURIComponent("/request"));
    }
  }, [session, router]);

  if (!session || session.user.group !== "customer") return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      router.push("/projects");
    }, 800);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <p className="micro">New request</p>
        <h1 className="serif text-3xl text-wine-900 mt-1">Tell us about your piece</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-line rounded-lg p-6 space-y-5">
        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Garment type</label>
          <select value={garmentType} onChange={(e) => setGarmentType(e.target.value)} className="w-full border border-line rounded-sm p-3">
            <option value="">Select…</option>
            <option value="evening-dress">Evening dress</option>
            <option value="tailored-suit">Tailored suit</option>
            <option value="cocktail-dress">Cocktail dress</option>
            <option value="bridal-gown">Bridal gown</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Occasion</label>
          <input type="text" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="e.g. December wedding" className="w-full border border-line rounded-sm p-3" required />
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Budget range</label>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full border border-line rounded-sm p-3">
            <option value="">Select…</option>
            <option value="100k-200k">₦100k – ₦200k</option>
            <option value="200k-400k">₦200k – ₦400k</option>
            <option value="400k-plus">₦400k+</option>
          </select>
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Needed by</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full border border-line rounded-sm p-3" required />
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Design notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder="Colours, neckline, references…" className="w-full border border-line rounded-sm p-3" required />
        </div>

        <div>
          <label className="block text-xs tracking-wider uppercase text-muted mb-1">Reference images</label>
          <input type="file" accept="image/*" multiple className="w-full border border-line rounded-sm p-3" />
        </div>

        <button type="submit" disabled={submitting} className="bg-wine text-card w-full py-3 rounded-sm font-bold text-sm disabled:opacity-50 hover:bg-[#3E1522] transition">
          {submitting ? "Sending…" : "Send request"}
        </button>
      </form>
    </div>
  );
}
