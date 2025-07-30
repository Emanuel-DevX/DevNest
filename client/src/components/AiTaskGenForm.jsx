import { useEffect, useState } from "react";
import Toast from "./Toast";
import fetcher from "../lib/api";
import { ChevronDown, X } from "lucide-react";

const AiTaskGenForm = function ({ onClose, onSuccess = () => {} }) {
  // Data sources
  const [projects, setProjects] = useState([]);
  const [sprints, setSprints] = useState([]);

  // Selection
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [sprintId, setSprintId] = useState("");
  const [sprintName, setSprintName] = useState("");

  // Dropdowns
  const [projectOpen, setProjectOpen] = useState(false);
  const [sprintOpen, setSprintOpen] = useState(false);

  // Form fields
  const [featureInput, setFeatureInput] = useState("");
  const [features, setFeatures] = useState([]);
  const [contributors, setContributors] = useState(""); // override (optional)
  const [hoursPerDay, setHoursPerDay] = useState(4); // default sensible focus
  const [numTasks, setNumTasks] = useState(10); // desired number of tasks
  const [includeWeekends, setIncludeWeekends] = useState(false);
  const [focus, setFocus] = useState("balance"); // generation bias

  // UI
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Load owned projects
  useEffect(() => {
    (async () => {
      try {
        const res = await fetcher("/projects/owned");
        setProjects(res || []);
      } catch (e) {
        setToast({ type: "error", message: "Failed to load projects." });
      }
    })();
  }, []);

  // When project changes, load sprints for that project
  useEffect(() => {
    if (!projectId) {
      setSprints([]);
      setSprintId("");
      setSprintName("");
      return;
    }
    (async () => {
      try {
        const spList = projects.filter(
          (p) => p._id.toString() === projectId.toString()
        )[0].sprints;
        setSprints(spList || []);
        setSprintId("");
        setSprintName("");
      } catch (e) {
        setToast({ type: "error", message: "Failed to load sprints." });
      }
    })();
  }, [projectId]);

  // Helpers
  const addFeaturesFromInput = () => {
    const parts = featureInput
      .split(/[\n,]/g)
      .map((t) => t.trim())
      .filter(Boolean);
    if (parts.length) {
      setFeatures((prev) => {
        const set = new Set(prev);
        parts.forEach((p) => set.add(p));
        return Array.from(set);
      });
      setFeatureInput("");
    }
  };

  const removeFeature = (text) =>
    setFeatures((prev) => prev.filter((f) => f !== text));

  // Validation
  const validate = () => {
    if (!projectId) return "Please select a project.";
    if (!sprintId) return "Please select a sprint.";
    if (features.length === 0) return "Add at least one feature/goal.";
    if (numTasks <= 0) return "Number of tasks must be at least 1.";
    if (hoursPerDay < 0) return "Hours per day cannot be negative.";
    if (contributors && Number(contributors) < 1)
      return "Contributors must be at least 1.";
    return null;
    // Note: due date will be derived from the sprint on the backend.
  };

  const handleGenerate = async () => {
    const err = validate();
    if (err) {
      setToast({ type: "error", message: err });
      return;
    }

    try {
      setLoading(true);

      // Build payload for backend
      const payload = {
        projectId,
        sprintId,
        goals: features, // user-entered core features
        contributorsOverride: contributors ? Number(contributors) : undefined,
        hoursPerDay: Number(hoursPerDay), // per contributor
        numTasks: Number(numTasks),
        includeWeekends: !!includeWeekends,
        focus, // "balance" | "frontend" | "backend" | "bugs" | "docs-tests"
        // Backend can derive sprint start/end; dueDate: sprintEnd - 1 day (your BE rule)
      };

      // Adjust to your chosen endpoint
      const result = await fetcher("/ai/tasks/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Let parent handle toast/refresh/close
      await onSuccess(result);
    } catch (e) {
      setToast({ type: "error", message: e?.message || "Generation failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col gap-4">
        {/* Project selector */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Project <span className="text-red-400">*</span>
          </label>
          <div className="relative w-full text-sm">
            <button
              type="button"
              onClick={() => setProjectOpen((o) => !o)}
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md flex justify-between items-center border border-zinc-700"
            >
              {projectName || "Select a project"}
              <ChevronDown
                className={`w-4 h-4 transition ${projectOpen ? "rotate-180" : ""}`}
              />
            </button>
            {projectOpen && (
              <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg max-h-64 overflow-auto">
                {projects.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => {
                      setProjectId(p._id);
                      setProjectName(p.name);
                      setProjectOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-teal-600 hover:text-black cursor-pointer"
                  >
                    {p.name}
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="px-4 py-2 text-gray-400">
                    No projects found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sprint selector */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Sprint <span className="text-red-400">*</span>
          </label>
          <div className="relative w-full text-sm">
            <button
              type="button"
              disabled={!projectId}
              onClick={() => projectId && setSprintOpen((o) => !o)}
              className={`w-full px-4 py-2 rounded-md flex justify-between items-center border ${
                projectId
                  ? "bg-zinc-800 text-white border-zinc-700"
                  : "bg-zinc-900 text-gray-500 border-zinc-800 cursor-not-allowed"
              }`}
            >
              {sprintName ||
                (projectId ? "Select a sprint" : "Select a project first")}
              <ChevronDown
                className={`w-4 h-4 transition ${sprintOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sprintOpen && (
              <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg max-h-64 overflow-auto">
                {sprints.map((s) => (
                  <div
                    key={s._id}
                    onClick={() => {
                      setSprintId(s._id);
                      setSprintName(
                        s.name || s.title || `Sprint ${s.index ?? ""}`
                      );
                      setSprintOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-teal-600 hover:text-black cursor-pointer"
                  >
                    {s.name || s.title || `Sprint ${s.index ?? ""}`}
                  </div>
                ))}
                {sprints.length === 0 && (
                  <div className="px-4 py-2 text-gray-400">
                    No sprints found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Features / goals chip input */}
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Core features / goals <span className="text-red-400">*</span>
          </label>
          <div className="flex gap-2">
            <input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === ",") {
                  e.preventDefault();
                  addFeaturesFromInput();
                }
              }}
              placeholder="Type a feature and press Enter (or paste comma/newline-separated)"
              className="flex-1 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <button
              type="button"
              onClick={addFeaturesFromInput}
              className="px-4 py-2 bg-zinc-800 text-white rounded-md border border-zinc-700 hover:bg-zinc-700"
            >
              Add
            </button>
          </div>
          {features.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {features.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 bg-zinc-800 text-gray-100 px-2 py-1 rounded-md text-xs border border-zinc-700"
                >
                  {f}
                  <button
                    onClick={() => removeFeature(f)}
                    className="hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Generation parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Contributors (override)
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g., 3"
              value={contributors}
              onChange={(e) => setContributors(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <p className="text-xs text-gray-400 mt-1">
              Optional — use this if members aren’t invited yet.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Hours per day (per contributor)
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Number of tasks
            </label>
            <input
              type="number"
              min="1"
              value={numTasks}
              onChange={(e) => setNumTasks(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

      
        </div>

        {/* Focus + Weekends */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Focus
            </label>
            <select
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700"
            >
              <option value="balance">Balanced</option>
              <option value="frontend">Frontend heavy</option>
              <option value="backend">Backend heavy</option>
              <option value="bugs">Bugs & refactors</option>
              <option value="docs-tests">Docs & tests</option>
            </select>
          </div>

          <label className="flex items-center gap-2 mt-6">
            <input
              type="checkbox"
              className="accent-teal-500"
              checked={includeWeekends}
              onChange={(e) => setIncludeWeekends(e.target.checked)}
            />
            <span className="text-sm text-gray-200">
              Include weekends in capacity
            </span>
          </label>
        </div>

        {/* Actions */}
        <div className="w-full flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-2xl"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="px-7 py-1 bg-teal-700 rounded-2xl font-bold hover:bg-teal-600 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate"}
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default AiTaskGenForm;
