"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function SettingsPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Settings</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Studio settings</h1>
      </div>
      <div className="bg-card border border-line rounded-lg p-6">
        <p className="text-sm text-muted">Manage studio profile, notification preferences, and payment settings here.</p>
      </div>
    </div>
  );
}
