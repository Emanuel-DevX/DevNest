// AssignTaskModal.jsx
import { useState } from "react";
import { X } from "lucide-react";

export default function AssignTaskModal({
  members,
  selected = [],
  onAssign,
  onClose,
}) {
  console.log(selected);
  const [selectedUsers, setSelectedUsers] = useState([...selected]);
  console.log(selectedUsers);
  const toggleUser = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">Assign Task</h2>
        <div className="flex flex-col gap-2">
          {members.map((member) => (
            <button
              key={member._id}
              onClick={() => toggleUser(member.userId)}
              className={`flex items-center gap-3 p-2 rounded-md text-left transition-colors text-sm
                ${
                  selectedUsers.includes(member.userId)
                    ? "bg-teal-500/30 text-teal-200"
                    : "bg-zinc-800 hover:bg-zinc-700 text-gray-200"
                }`}
            >
              <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-xs text-teal-400">
                {member.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-medium">{member.name}</div>
                <div className="text-xs text-gray-400">{member.role}</div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={() => onAssign(selectedUsers)}
          className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-md font-medium"
        >
          Confirm Assignment
        </button>
      </div>
    </div>
  );
}
