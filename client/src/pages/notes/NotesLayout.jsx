// pages/notes/NotesLayout.jsx
import { Outlet, useParams, Link } from "react-router-dom";
import { useEffect, useState, useMemo, useCallback } from "react";
import fetcher from "../../lib/api";

export default function NotesLayout() {
  const { projectId } = useParams();

  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const basePath = useMemo(
    () => (projectId ? `/project/${projectId}/notes` : `/notes`),
    [projectId]
  );

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const url =`/notes`;
      const data = await fetcher(url);
      setNotes(data || []);
    } catch (err) {
      setError(err?.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Helpers children might need
  const ctx = useMemo(
    () => ({
      notes,
      refresh: fetchNotes,
  
    }),
    [notes, fetchNotes, ]
  );

  return (
    <div className=" space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-teal-400">
          My Notes
        </h1>
        <Link to={`${basePath}/new`} className="px-3 py-1 rounded bg-teal-600 text-white">+ New</Link>
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
