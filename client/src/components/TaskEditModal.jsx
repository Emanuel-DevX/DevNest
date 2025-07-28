import { useState } from "react";
import { X } from "lucide-react";

export default function TaskEditModal({
  task,
  onUpdate,
  onClose,
  canEdit = true,
}) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [timeEstimate, setTimeEstimate] = useState(task?.duration / 60 || "");
  const [actualTime, setActualTime] = useState(task?.actualTime / 60 || "");

  const handleSave = () => {
    const updates = {
      title: title.trim(),
      description: description.trim(),
      duration: Number(timeEstimate) * 60,
      actualTime: Number(actualTime) * 60,
    };
    onUpdate(updates);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4 text-white">Edit Task</h2>

        <div className="flex flex-col gap-4 text-white">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full bg-zinc-800 border border-gray-600 rounded p-2 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={!canEdit}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={3}
              className="w-full bg-zinc-800 border border-gray-600 rounded p-2 text-white resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!canEdit}
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Time Estimate (hrs)
              </label>
              <input
                type="number"
                step={0.5}
                className="w-full bg-zinc-800 border border-gray-600 rounded p-2 text-white"
                value={timeEstimate}
                onChange={(e) => setTimeEstimate(e.target.value)}
                disabled={!canEdit}
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">
                Actual Time (hrs)
              </label>
              <input
                step={0.5}
                type="number"
                className="w-full bg-zinc-800 border border-gray-600 rounded p-2 text-white"
                value={actualTime}
                onChange={(e) => setActualTime(e.target.value)}
                disabled={!canEdit}
              />
            </div>
          </div>
        </div>

        <button
          onClick={canEdit ? handleSave : null}
          title={!canEdit ? "Only owners and admins can edit tasks" : ""}
          className={`mt-6 w-full py-2 rounded-md font-medium ${
            canEdit
              ? "bg-teal-600 hover:bg-teal-700 text-white"
              : "bg-slate-800/50 text-white/80 cursor-not-allowed"
          }`}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
