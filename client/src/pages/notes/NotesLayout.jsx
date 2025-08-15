// pages/notes/NotesLayout.jsx
import { Outlet, useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import fetcher from "../../lib/api";
import { Plus } from "lucide-react";

export default function NotesLayout() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);
  const projectId = useParams().id;

  const basePath = useMemo(
    () => (projectId ? `/project/${projectId}/notes` : `/notes`),
    [projectId]
  );

  const fetchNotes = useCallback(async () => {
    try {
      setError(null);
      const url = projectId ? `/projects/${projectId}/notes` : `/notes`;
      const data = await fetcher(url);
      data.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setNotes(data || []);
    } catch (err) {
      setError(err?.message || "Failed to load notes");
    }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Helpers children might need
  const ctx = useMemo(
    () => ({
      notes,
      refresh: fetchNotes,
      basePath,
    }),
    [notes, fetchNotes, basePath]
  );

  return (
    <div className=" space-y-4 max-w-[21rem] md:max-w-none  px-1 w-full mx-auto">
      <header className="flex items-center justify-between">
        <Link to={basePath}>
          <h1 className="text-2xl font-bold">
            {projectId ? <>Project</> : <>My</>} Notes
          </h1>
        </Link>
        <Link
          to={`${basePath}/new`}
          className="pl-2 pr-3 py-1 rounded bg-zinc-900 text-teal-400 font-bold flex items-center gap-1"
        >
          <Plus className="h-5" />
          New
        </Link>
      </header>

      <Outlet context={ctx} />
      {error && (
        <div className="text-red-400 text-sm border border-red-700/50 rounded p-2">
          {error}
        </div>
      )}
    </div>
  );
}
