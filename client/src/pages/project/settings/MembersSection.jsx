import { Users, Crown } from "lucide-react";
import { useMemo } from "react";
import SectionCard from "../../../components/SectionCard";
function MembersSection({ project, currentUserId, onChangeRole, onRemove }) {
  const me = useMemo(
    () => project.members.find((m) => m.userId === currentUserId),
    [currentUserId, project.members]
  );
  const isAdminRole = (role) => role === "owner" || role === "admin";

  const iAmAdmin = isAdminRole(me?.role ?? "member");

  return (
    <SectionCard
      id="members"
      title="Members & roles"
      icon={Users}
      description="View members. Admins can update roles or remove people."
    >
      <div className=" hide-scrollbar overflow-auto">
        <div className=" rounded-xl border border-zinc-800 max-h-[40rem]">
          <div className="w-full text-sm">
            {project.members.map((m) => (
              <div
                key={m._id}
                className="bg-zinc-900/70 backdrop-blur-sm border border-zinc-800/50 rounded-lg p-4 mb-3 shadow-sm hover:bg-zinc-900/90 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* User Info Section */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-zinc-700 to-zinc-800 rounded-full flex items-center justify-center text-zinc-300 font-medium text-sm">
                      {m.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-white truncate">
                          {m.name}
                        </h3>
                        {m.role === "owner" && (
                          <Crown className="h-4 w-4 text-amber-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-zinc-400 text-sm truncate">
                        {m.email}
                      </p>
                    </div>
                  </div>

                  {/* Actions Section */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    {/* Role Display/Selector */}
                    <div className="min-w-0">
                      {iAmAdmin && m.role !== "owner" ? (
                        <select
                          value={m.role}
                          onChange={(e) =>
                            onChangeRole(m.userId, e.target.value)
                          }
                          className="bg-zinc-800 border border-zinc-700 rounded-md px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700 focus:ring focus:ring-teal-300 outline-0 transition-colors"
                        >
                          <option value="owner" disabled>
                            Owner
                          </option>
                          <option value="admin">Admin</option>
                          <option value="member">Member</option>
                        </select>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-800 text-zinc-300 capitalize">
                          {m.role}
                        </span>
                      )}
                    </div>

                    {/* Remove Button */}
                    {iAmAdmin &&
                      m.role !== "owner" &&
                      m._id !== currentUserId && (
                        <button
                          onClick={() => onRemove(m.userId)}
                          className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-400 border border-red-400/30 rounded-md hover:bg-red-400/10 hover:border-red-400/50 transition-colors focus:ring-2 focus:ring-red-400/20 focus:outline-none"
                        >
                          Remove
                        </button>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export default MembersSection;
