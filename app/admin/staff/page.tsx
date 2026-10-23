"use client";

import { useSession } from "better-auth/react";
import { useEffect, useState } from "react";

type StaffMember = {
  id: string;
  name: string;
  email: string;
  role: "designer" | "support";
  joined: string;
  status: "active" | "invited";
};

const INITIAL_STAFF: StaffMember[] = [
  { id: "s1", name: "Adaeze Okonkwo", email: "adaeze@clother.com", role: "designer", joined: "01 Sep 2026", status: "active" },
  { id: "s2", name: "Temi Adebayo", email: "temi@clother.com", role: "support", joined: "15 Oct 2026", status: "active" },
];

export default function StaffPage() {
  const { session } = useSession();
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"designer" | "support">("support");
  const [inviting, setInviting] = useState(false);
  const [inviteSent, setInviteSent] = useState<string | null>(null);

  useEffect(() => {
    if (!session || session.user.group !== "admin" || session.user.adminType !== "designer") {
      // only Designer can manage staff
    }
  }, [session]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteEmail.trim()) return;
    setInviting(true);
    setTimeout(() => {
      setInviting(false);
      setInviteSent(inviteEmail);
      setStaff([
        ...staff,
        {
          id: "s-" + Date.now(),
          name: inviteEmail.split("@")[0],
          email: inviteEmail,
          role: inviteRole,
          joined: "Pending",
          status: "invited",
        },
      ]);
      setInviteEmail("");
    }, 800);
  };

  const handleRemove = (id: string) => {
    setStaff(staff.filter((s) => s.id !== id));
  };

  if (!session || session.user.group !== "admin") {
    return null;
  }

  const isDesigner = session.user.adminType === "designer";

  return (
    <div className="space-y-6">
      <div>
        <p className="micro">Staff Management</p>
        <h1 className="serif text-2xl text-wine-900 mt-1">Studio staff</h1>
        <p className="text-muted text-sm mt-2">
          Multiple staff can read and reply in project chat. Only the Lead Designer can invite or remove staff.
        </p>
      </div>

      {!isDesigner ? (
        <div className="bg-[#F5D9D9] border border-[#8F2424] rounded-lg p-4 text-sm">
          You are viewing as a Support staff member. Staff management is restricted to the Lead Designer.
        </div>
      ) : (
        <div className="bg-card border border-line rounded-lg p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <form onSubmit={handleInvite} className="flex gap-2">
              <input
                type="email"
                placeholder="staff@clother.com"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                className="flex-1 border border-line rounded-sm p-3"
                required
              />
              <select
                value={inviteRole}
                onChange={(e) => setInviteRole(e.target.value as "designer" | "support")}
                className="border border-line rounded-sm p-3"
              >
                <option value="support">Support / Operations</option>
                <option value="designer">Lead Designer</option>
              </select>
              <button
                type="submit"
                disabled={inviting}
                className="bg-wine text-card px-5 py-3 rounded-sm font-bold text-sm disabled:opacity-50 hover:bg-[#3E1522] transition"
              >
                {inviting ? "Sending…" : "Invite staff"}
              </button>
            </form>
            {inviteSent && (
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E6B3A] bg-[#DFF2E4] px-3 py-2 rounded">
                            Invite sent to {inviteSent}
              </div>
            )}
          </div>
          <p className="text-[11px] text-muted mt-3">
            Invites expire in 7 days. Staff use the link to create their own login and join the studio.
          </p>
        </div>
      )}

      <div className="bg-card border border-line rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="pb-3 text-xs tracking-wider uppercase text-muted">Name</th>
              <th className="pb-3 text-xs tracking-wider uppercase text-muted">Email</th>
              <th className="pb-3 text-xs tracking-wider uppercase text-muted">Role</th>
              <th className="pb-3 text-xs tracking-wider uppercase text-muted">Joined</th>
              <th className="pb-3 text-xs tracking-wider uppercase text-muted">Status</th>
              {isDesigner ? (
                <th className="pb-3 text-xs tracking-wider uppercase text-muted">Action</th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {staff.map((s) => (
              <tr key={s.id} className="border-b border-line hover:bg-[#F8F3E8]">
                <td className="py-4">{s.name}</td>
                <td className="py-4">{s.email}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    s.role === "designer"
                      ? "bg-[#E3EAFB] text-[#2B4C8A]"
                      : "bg-[#EFE0E2] text-[#4B1F2E]"
                  }`}>
                    {s.role === "designer" ? "Lead Designer" : "Support"}
                  </span>
                </td>
                <td className="py-4">{s.joined}</td>
                <td className="py-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                    s.status === "active"
                      ? "bg-[#DFF2E4] text-[#1E6B3A]"
                      : "bg-[#F3E8C8] text-[#7A5410]"
                  }`}>
                    {s.status}
                  </span>
                </td>
                {isDesigner && s.status === "active" && staff.length > 1 ? (
                  <td className="py-4">
                    <button
                      onClick={() => handleRemove(s.id)}
                      className="text-xs font-bold text-[#8F2424] underline decoration-[#8F2424]/30 hover:decoration-[#8F2424]"
                    >
                      Remove
                    </button>
                  </td>
                ) : (
                  <td className="py-4">{isDesigner ? "—" : ""}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
