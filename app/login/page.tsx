"use client";

import { useSession, signIn } from "better-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { session, loading } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      const cb = new URLSearchParams(window.location.search).get("cb") || "/dashboard";
      router.push(cb);
    }
  }, [session, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="logo serif text-4xl text-wine">Clother.</span>
          <p className="micro mt-2">Sign in to your studio</p>
        </div>

        <div className="bg-card border border-line rounded-lg p-8 shadow">
          <form onSubmit={(e) => {
            e.preventDefault();
            setError("");
            signIn("email", {
              email,
              password,
              callbackURL: `${window.location.origin}/login?cb=dashboard`,
            }).catch((err) => {
              setError(err?.message ?? "Invalid email or password.");
            });
          }}>
            <label className="block">Email address</label>
            <input className="w-full border border-line rounded-sm p-3 mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abie@example.com" />

            <label className="block mt-4">Password</label>
            <input className="w-full border border-line rounded-sm p-3 mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

            {error && <p className="mt-2 text-danger text-sm">{error}</p>}
            <p className="mt-4 text-xs muted">Forgot your password? We'll send a reset link.</p>

            <button className="btn btn-p w-full mt-6" disabled={loading} type="submit">
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="mt-6 text-center">
            New to Clother?{" "}
            <button className="btn btn-s mt-0" onClick={() => router.push("/signup")}>Create account</button>
          </p>
        </div>
      </div>
    </main>
  );
}
