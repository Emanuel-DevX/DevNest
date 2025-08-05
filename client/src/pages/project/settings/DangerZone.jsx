import { Trash2, LogOut } from "lucide-react";
import SectionCard from "../../../components/SectionCard";
function DangerZone({ isAdmin, onDelete, onLeave }) {
  return (
    <SectionCard
      id="danger"
      title="Danger zone"
      icon={Trash2}
      description="Irreversible actions."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isAdmin && (
          <div className="rounded-xl border border-red-900/40 bg-red-950/30 p-4">
            <h3 className="font-semibold text-red-300">Delete project</h3>
            <p className="mt-1 text-sm text-red-400/80">
              This action permanently removes the project and all its data.
            </p>
            <button
              onClick={onDelete}
              className="mt-3 rounded-lg bg-red-700 px-3 py-2 text-sm font-semibold hover:bg-red-600"
            >
              <Trash2 className="mr-1 inline h-4 w-4" />
              Delete project
            </button>
          </div>
        )}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
          <h3 className="font-semibold text-zinc-200">Leave project</h3>
          <p className="mt-1 text-sm text-zinc-400">
            You’ll lose access until re‑invited.
          </p>
          <button
            onClick={onLeave}
            className="mt-3 rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
          >
            <LogOut className="mr-1 inline h-4 w-4" />
            Leave project
          </button>
        </div>
      </div>
    </SectionCard>
  );
}

export default DangerZone;
