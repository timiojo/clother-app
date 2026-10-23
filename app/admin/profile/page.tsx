"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { session } = useSession();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      // middleware handles redirect; guard anyway
    }
  }, [session]);

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Profile</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Studio profile</h1>
      </div>

      <div className="max-w-md bg-card border border-line rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-wine flex items-center justify-center text-card font-bold text-xl">DA</div>
          <div>
            <p className="font-bold serif text-lg">Dej. by Ayodeji</p>
            <p className="text-xs micro">Designer · Admin</p>
          </div>
        </div>
        <form className="space-y-5">
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1">Studio name</label>
            <input className="w-full border border-line rounded-sm p-3" defaultValue="Dej. by Ayodeji" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1">Location</label>
            <input className="w-full border border-line rounded-sm p-3" defaultValue="Lagos, Nigeria" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1">Specialisms</label>
            <input className="w-full border border-line rounded-sm p-3" defaultValue="Evening dresses · Tailored suits · Cocktail wear" />
          </div>
          <div>
            <label className="block text-xs tracking-wider uppercase text-muted mb-1">Consultation formats</label>
            <input className="w-full border border-line rounded-sm p-3" defaultValue="Online · In-person" />
          </div>
          <button className="bg-wine text-card w-full py-3 rounded-sm font-bold text-sm hover:bg-[#3E1522] transition">Save changes</button>
        </form>
      </div>
    </div>
  );
}
