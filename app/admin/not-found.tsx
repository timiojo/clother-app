"use client";

import { useSession } from "better-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const { session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session || session.user.group !== "admin") {
      router.push("/login?cb=" + encodeURIComponent(window.location.pathname));
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-6xl text-muted mb-4">🔒</div>
      <h1 className="serif text-3xl text-wine-900">Admin area</h1>
      <p className="mt-2 text-muted">Designer access only. Sign in to continue.</p>
      <button
        className="mt-6 bg-wine text-card px-6 py-2 rounded-sm font-bold hover:bg-[#3E1522] transition"
        onClick={() => router.push("/login?cb=" + encodeURIComponent(window.location.pathname))}
      >
        Sign in
      </button>
    </div>
  );
}
