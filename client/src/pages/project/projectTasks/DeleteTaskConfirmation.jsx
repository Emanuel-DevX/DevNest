// DeleteTaskConfirmation.jsx
import { X, Trash2 } from "lucide-react";
import { getCurrentUser } from "../../../lib/auth";

export default function DeleteTaskConfirmation({
  taskTitle,
  onConfirm,
  onClose,
  canDelete
}) {

  return (
    <div className="min-w-screen min-h-screen fixed top-0 left-0 bg-black/50 z-50 flex justify-center items-center">
      <div className=" ">
        <div className="bg-zinc-900 rounded-lg p-6 w-full max-w-sm relative">
          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <Trash2 className="text-red-400 w-6 h-6" />
            <h2 className="text-xl font-semibold text-white">Delete Task</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Are you sure you want to delete <strong>{taskTitle}</strong>?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-200"
            >
              Cancel
            </button>
            {canDelete ? (
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>
            ) : (
              <button
                onClick={() => {}}
                className="px-4 py-2 rounded-md bg-slate-800/50  text-white"
                title="Only admins and owners can delete a task"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
