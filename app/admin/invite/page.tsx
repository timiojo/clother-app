import Link from "next/link";

export default function InvitePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="text-6xl text-muted mb-4">📨</div>
      <h1 className="serif text-3xl text-wine-900">Invite sent</h1>
      <p className="mt-2 text-muted">Your staff member will receive an email with a secure link to create their account and join the studio.</p>
      <Link
        href="/admin/staff"
        className="mt-6 bg-wine text-card px-6 py-2 rounded-sm font-bold hover:bg-[#3E1522] transition"
      >
        Back to staff
      </Link>
    </div>
  );
}
