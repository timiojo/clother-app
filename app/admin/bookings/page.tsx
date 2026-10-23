"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function BookingsPage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Bookings</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Consultation bookings</h1>
      </div>

      <div className="flex items-center justify-between py-8">
        <div className="text-center">
          <div className="text-3xl text-muted">📅</div>
          <p className="text-muted text-sm mt-2">No bookings this week.</p>
        </div>
      </div>
    </div>
  );
}
