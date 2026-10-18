"use client";

import { useSession, signIn, signUp, signOut } from "better-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function SignupPage() {
  const { session, loading } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [step, setStep] = useState("form"); // form | checking | success | error
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      const cb = new URLSearchParams(window.location.search).get("cb") || "/dashboard";
      router.push(cb);
    }
  }, [session, router]);

  if (step === "success") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-wine-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-wine-700 font-bold text-2xl">✓</span>
          </div>
          <h1 className="font-display text-3xl text-wine-900">Check your inbox</h1>
          <p className="mt-2 text-muted">We sent a verification link to <b>{email}</b>.</p>
          <p className="mt-2 text-xs muted">Open it on any device, then return here to access your projects.</p>
          <button className="btn btn-p mt-6" onClick={() => router.push("/login")}>Go to sign in</button>
        </div>
      </main>
    );
  }

  if (step === "error") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-paper">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button className="btn btn-g mt-6" onClick={() => setStep("form")}>Try again</button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-6 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <span className="logo serif text-4xl text-wine">Clother.</span>
          <p className="micro mt-2">Create your account</p>
        </div>

        <div className="bg-card border border-line rounded-lg p-8 shadow">
          <form onSubmit={(e) => {
            e.preventDefault();
            setStep("checking");
            setError("");
            signUp({
              email,
              password,
              name: name || undefined,
              callbackURL: `${window.location.origin}/signup?cb=dashboard`,
            }).then(() => setStep("success")).catch((err) => {
              setStep("error");
              setError(err?.message ?? "Something went wrong. Try again.");
            });
          }}>
            <label className="block">Full name</label>
            <input className="w-full border border-line rounded-sm p-3 mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Abie Johnson" />

            <label className="block mt-4">Email address</label>
            <input className="w-full border border-line rounded-sm p-3 mt-1" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="abie@example.com" />

            <label className="block mt-4">Password</label>
            <input className="w-full border border-line rounded-sm p-3 mt-1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />

            <p className="mt-4 text-xs muted">By continuing you agree to our terms and privacy policy.</p>

            <button className="btn btn-p w-full mt-6" disabled={loading || step === "checking"} type="submit">
              {loading || step === "checking" ? "Creating account…" : "Create account"}
            </button>
          </form>
          <p className="mt-6 text-center">
            Already have an account?{" "}
            <button className="btn btn-s mt-0" onClick={() => router.push("/login")}>Sign in</button>
          </p>
        </div>
      </div>
    </main>
  );
}
