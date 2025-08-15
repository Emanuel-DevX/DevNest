import SectionCard from "../../../components/SectionCard";
import { Link as LinkIcon, Shield, Copy } from "lucide-react";
import { useState } from "react";
function InvitesSection({ isAdmin, onInvite, inviteLink }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!inviteLink) return;
    navigator.clipboard?.writeText(inviteLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2s
    });
  };

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
      description="Invite people by sharing an invite link."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <button
            onClick={onInvite}
            className="border px-2 p-2 mb-2 rounded-2xl border-zinc-800 text-sm text-teal-400 hover:bg-zinc-900"
          >
            Generate Invite Link
          </button>

          <div className="flex gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-xs text-zinc-400"
            />
            <button
              onClick={handleCopy}
              className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
            >
              <Copy className="h-4 w-4" />
            </button>
            {copied && <p className="mt-1 text-xs text-center self-center text-teal-400">Copied!</p>}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
            <Shield className="h-3.5 w-3.5" />
            <span>Link expires in 7 days.</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default InvitesSection;
