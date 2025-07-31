import SectionCard from "../../../components/SectionCard";
import { LinkIcon, Copy , Shield } from "lucide-react";
function InvitesSection({ isAdmin, onInvite, inviteLink }) {
  const [email, setEmail] = useState("");

  if (!isAdmin) {
    return (
      <SectionCard
        id="invites"
        title="Invites"
        icon={LinkIcon}
        description="Only admins can invite new members."
      >
        <p className="text-sm text-zinc-400">
          Ask a project admin to invite teammates.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      id="invites"
      title="Invites"
      icon={LinkIcon}
      description="Invite people by email or share an invite link."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-zinc-300">
            Invite by email
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-md border border-zinc-700 bg-transparent pl-9 pr-3 py-2 focus:outline-none focus:ring focus:ring-teal-600"
              />
            </div>
            <button
              onClick={() => {
                if (!email.trim()) return;
                onInvite(email.trim());
                setEmail("");
              }}
              className="rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold hover:bg-teal-500"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-xs text-zinc-500">
            Recipients will get an email with an accept link.
          </p>
        </div>

        <div>
          <label className="block text-sm mb-1 text-zinc-300">
            Invite link
          </label>
          <div className="flex gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-400"
            />
            <button
              onClick={() => navigator.clipboard?.writeText(inviteLink)}
              className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="h-3.5 w-3.5" />
            <span>Link expires in 7 days or after first use.</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default InvitesSection;
