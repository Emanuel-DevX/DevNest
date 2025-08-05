import { useState } from "react";
import { Settings, Users, Link as LinkIcon, Trash2 } from "lucide-react";
import { useOutletContext, useNavigate } from "react-router-dom";

import InvitesSection from "./InvitesSection";
import MembersSection from "./MembersSection";
import GeneralSettings from "./General";
import DangerZone from "./DangerZone";
import { getCurrentUser } from "../../../lib/auth";
import fetcher from "../../../lib/api";

const isAdminRole = (role) => role === "owner" || role === "admin";

function SettingsSubNav() {
  const links = [
    { id: "general", label: "General", icon: Settings },
    { id: "members", label: "Members", icon: Users },
    { id: "invites", label: "Invites", icon: LinkIcon },
    { id: "danger", label: "Danger", icon: Trash2 },
  ];
  return (
    <nav className="">
      <ul className="flex  gap-2 overflow-auto hide-scrollbar">
        {links.map(({ id, label, icon: Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm hover:border-teal-700 hover:bg-zinc-900"
            >
              <Icon className="h-4 w-4 text-zinc-400" />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const ProjectSettings = function () {
  const [inviteLink, setInviteLink] = useState("");

  const { project, refreshProject } = useOutletContext();
  const navigate = useNavigate();
  const currentUserId = getCurrentUser().id;

  const handleSaveGeneral = async (patch) => {
    try {
      await fetcher(`/projects/${project._id}`, {
        method: "PUT",
        body: JSON.stringify(patch),
      });
      await refreshProject();
      setToast({ message: "Saved!", type: "success" });
    } catch (err) {}
  };

  const handleChangeRole = async (memberId, role) => {
    try {
      const options = {
        body: JSON.stringify({ role }),
        method: "PATCH",
      };
      const url = `/projects/${project._id}/members/${memberId}`;
      await fetcher(url, options);
      refreshProject();
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const url = `/projects/${project._id}/members/${memberId}`;
      await fetcher(url, { method: "DELETE" });
      await refreshProject();
    } catch (err) {
      console.error(err);
    }
  };

  const handleInvite = async () => {
    const res = await fetcher(`/projects/${project._id}/invite`);
    // const baseURL = "http://localhost:4000/invite/";
    const baseURL = "https://devnest.molla.dev/invite/";

    setInviteLink(baseURL + res.token);
  };

  const handleDeleteProject = async () => {
    try {
      const url = `/projects/${project._id}`;
      const res = await fetcher(url, { method: "DELETE" });
      navigate("/dashboard");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLeaveProject = async () => {
    try {
      const url = `/projects/${project._id}/members/${currentUserId}`;
      await fetcher(url, { method: "DELETE" });
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const me = project.members.find(
    (m) => m.userId.toString() === currentUserId.toString()
  );
  const iAmAdmin = isAdminRole(me?.role ?? "member");

  return (
    <div className="mx-auto max-w-6xl md:w-full w-[20rem] md:px-4 py-6 md:py-8 ">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Project settings</h1>
          <p className="text-sm text-zinc-400">
            Manage <span className="text-zinc-200">{project.name}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Sub‑nav */}
        <div className="md:col-span-3 ">
          <SettingsSubNav />
        </div>

        {/* Content */}
        <div className="md:col-span-9 space-y-6">
          <GeneralSettings project={project} onSave={handleSaveGeneral} />

          <MembersSection
            project={project}
            currentUserId={currentUserId}
            onChangeRole={handleChangeRole}
            onRemove={handleRemoveMember}
          />

          <InvitesSection
            isAdmin={iAmAdmin}
            onInvite={handleInvite}
            inviteLink={inviteLink}
          />

          <DangerZone
            isAdmin={iAmAdmin}
            onDelete={handleDeleteProject}
            onLeave={handleLeaveProject}
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectSettings;
