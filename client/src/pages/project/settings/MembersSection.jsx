function MembersSection({ project, currentUserId, onChangeRole, onRemove }) {
  const me = useMemo(
    () => project.members.find((m) => m._id === currentUserId),
    [project.members, currentUserId]
  );
  const iAmAdmin = isAdminRole(me?.role ?? "member");

  return (
    <SectionCard
      id="members"
      title="Members & roles"
      icon={Users}
      description="View members. Admins can update roles or remove people."
    >
      <div className="overflow-hidden rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900/60 text-zinc-300">
            <tr>
              <th className="px-4 py-2 text-left">Member</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {project.members.map((m) => (
              <tr key={m._id} className="border-t border-zinc-800">
                <td className="px-4 py-2 flex items-center gap-2">
                  {m.role === "owner" && (
                    <Crown className="h-4 w-4 text-amber-400" />
                  )}
                  <span>{m.name}</span>
                </td>
                <td className="px-4 py-2 text-zinc-400">{m.email}</td>
                <td className="px-4 py-2">
                  {iAmAdmin ? (
                    <select
                      value={m.role}
                      onChange={(e) => onChangeRole(m._id, e.target.value)}
                      className="rounded-md border border-zinc-700 bg-zinc-900 px-2 py-1"
                    >
                      <option value="owner" disabled>
                        Owner
                      </option>
                      <option value="admin">Admin</option>
                      <option value="member">Member</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  ) : (
                    <span className="text-zinc-300">{m.role}</span>
                  )}
                </td>
                <td className="px-4 py-2 text-right">
                  {iAmAdmin &&
                    m.role !== "owner" &&
                    m._id !== currentUserId && (
                      <button
                        onClick={() => onRemove(m._id)}
                        className="rounded-md border border-zinc-800 px-3 py-1.5 text-zinc-300 hover:bg-zinc-900 hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

export default MembersSection;
