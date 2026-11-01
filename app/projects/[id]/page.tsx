"use client";

import { useSession } from "better-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerProjectPage() {
  const { session } = useSession();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!session || session.user.group !== "customer") {
      router.push("/login?cb=" + encodeURIComponent("/projects"));
    }
  }, [session, router]);

  if (!session || session.user.group !== "customer") return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setInput("");
    }, 600);
  };

  return (
    <div className="flex flex-col h-full">
      <header className="border-b border-line p-4 bg-card flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-card border border-line flex items-center justify-center text-wine-700 font-bold serif">
            C
          </div>
          <div>
            <h1 className="serif text-xl text-wine-900 font-bold">Project chat</h1>
            <p className="text-xs micro">Champagne gold bespoke dress · Studio: Dej. by Ayodeji</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-wine px-2 py-1 rounded bg-[#EFE0E2] text-[#4B1F2E]">
            Active
          </span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="flex justify-start max-w-[85%]">
          <div className="p-3 bg-card border border-line text-ink rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F3E8C8] text-[#7A5410] px-2 py-0.5 rounded">
                You
              </span>
              <span className="text-[10px] text-muted">10:03 AM</span>
            </div>
            <p className="text-sm leading-relaxed">I love the champagne swatch — can we keep the neckline modest?</p>
          </div>
        </div>
        <div className="flex justify-start max-w-[85%]">
          <div className="p-3 bg-[#E3EAFB] text-[#2B4C8A] rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFE0E2] text-[#4B1F2E] px-2 py-0.5 rounded">
                Studio (Lead Designer)
              </span>
              <span className="text-[10px] text-muted">10:15 AM</span>
            </div>
            <p className="text-sm leading-relaxed">Noted — I've updated the sketch with a higher neckline. See attached.</p>
          </div>
        </div>
        <div className="flex justify-start max-w-[85%]">
          <div className="p-3 bg-[#EFE0E2] text-[#4B1F2E] rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFE0E2] text-[#4B1F2E] px-2 py-0.5 rounded">
                Studio (Support)
              </span>
              <span className="text-[10px] text-muted">2:45 PM</span>
            </div>
            <p className="text-sm leading-relaxed">Fabric is in stock. Shall I book the fitting for Thursday?</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-line bg-card">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message…"
            rows={1}
            className="flex-1 border border-line rounded-lg p-3 text-sm focus:outline-none focus:border-wine-500 resize-none"
            maxLength="1000"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="bg-wine text-card px-5 py-3 rounded-lg font-bold text-sm disabled:opacity-50 hover:bg-[#3E1522] transition"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
        <p className="text-[10px] text-muted mt-2">
          Studio staff can read and reply. Messages are private to you and the studio team.
        </p>
      </form>
    </div>
  );
}
