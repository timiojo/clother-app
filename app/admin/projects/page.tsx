"use client";

import { useSession } from "better-auth/react";
import { useEffect, useState } from "react";

export default function ProjectPage() {
  const { session } = useSession();
  const [activeTab, setActiveTab] = useState("chat");

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect
    }
  }, [session]);

  if (!session || session.user.group !== "admin") return null;

  const tabs = [
    { key: "chat", label: "Chat" },
    { key: "brief", label: "Brief" },
    { key: "quote", label: "Quote" },
    { key: "files", label: "Files" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="micro">Project</p>
          <h1 className="serif text-2xl text-wine-900 mt-1">Champagne gold bespoke dress</h1>
          <p className="text-muted text-sm mt-1">Client: Abie Johnson · Status: Awaiting approval</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs font-bold text-wine px-3 py-1 rounded border border-line">
            Edit project
          </button>
        </div>
      </div>

      <div className="flex gap-2 border-b border-line mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-xs font-bold border-b-2 transition ${
              activeTab === t.key
                ? "border-wine text-wine"
                : "border-transparent text-muted hover:text-wine"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "chat" && (
        <div className="h-[600px] border border-line rounded-lg overflow-hidden flex flex-col">
          <iframe
            title="Project chat"
            src="/admin/projects/placeholder/chat"
            className="w-full h-full"
            style={{ border: "none" }}
          />
          <p className="text-center text-muted mt-4 pt-4 border-t border-line">
            Chat thread renders here — see <code>/admin/projects/[id]</code> for the live chat page.
          </p>
        </div>
      )}
      {activeTab === "brief" && (
        <div className="bg-card border border-line rounded-lg p-6">
          <p className="text-sm text-muted">Garment type: Evening dress · Occasion: December wedding</p>
          <p className="mt-2 text-sm">Design notes: Champagne gold, modest neckline, floor length.</p>
        </div>
      )}
      {activeTab === "quote" && (
        <div className="bg-card border border-line rounded-lg p-6">
          <p className="text-sm text-muted">Total: ₦416,900 · Deposit: ₦208,450 · Status: Sent</p>
        </div>
      )}
      {activeTab === "files" && (
        <div className="bg-card border border-line rounded-lg p-6">
          <p className="text-sm text-muted">Reference images: 2 uploaded · Measurements: on file</p>
        </div>
      )}
    </div>
  );
}
