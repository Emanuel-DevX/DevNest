import { useState } from "react";
import { Settings, Users, Link as LinkIcon, Trash2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";

import InvitesSection from "./InvitesSection";
import MembersSection from "./MembersSection";
import GeneralSettings from "./General";
import DangerZone from "./DangerZone";
import { getCurrentUser } from "../../../lib/auth";


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
