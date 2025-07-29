import { useEffect, useState } from "react";
import Toast from "./Toast";
import DarkDatePicker from "./DatePicker";
import { ChevronDown } from "lucide-react";
import fetcher from "../lib/api";
const AddTaskForm = function ({ selectedProject, onSave, onCancel }) {
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectList, setProjectList] = useState([]);
  const [open, setOpen] = useState(false);
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    const fetchOwnedProjects = async () => {
      const res = await fetcher("/projects/owned");
      setProjectList(res);
      if (res.some((p) => p._id === selectedProject._id)) {
        setProjectName(selectedProject.name);
        setProjectId(selectedProject._id);
      }
    };
    fetchOwnedProjects();
  }, []);
  useEffect(() => {
    const membs =
      projectList.filter((p) => p._id.toString() === projectId.toString())[0]
        ?.members || [];
    setMemberList(membs);
  }, [projectId]);
  const handleAddTask = () => {
    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 3) {
      setError("Title must be at least 3 characters.");
      return;
    }
    const newTask = {
      title: trimmedTitle,
      description,
      dueDate: dueDate ? new Date(dueDate) : null,
      duration: duration ? Math.floor(Number(duration) * 2)/2 * 60 : null,
      projectId,
      participants: selectedMembers
    };
    onSave(newTask);
  };

  return (
    <>
      <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black/80 flex items-center justify-center">
        <div className="z-50 w-sm min-w-[22rem] bg-zinc-800 rounded-xl p-4 flex flex-col gap-4">
          <div className="mx-auto">Add a new task</div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition resize-none"
          />
          <div className="flex gap-2 w-full">
            <DarkDatePicker
              type="date"
              value={dueDate}
              minDate={new Date().toISOString().split("T")[0]}
              onChange={(d) => setDueDate(d)}
              className="w-full p-2 rounded-md bg-gray-800 text-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
            />
            <input
              type="number"
              min="0"
              step={0.5}
              placeholder="Time estimate (hrs)"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Select Project
            </label>
            <div className="relative w-full text-sm">
              <button
                onClick={() => setOpen(!open)}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md flex justify-between items-center border border-zinc-700"
              >
                {projectName || "Select a project"}
                <ChevronDown
                  className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
                />
              </button>

              {open && (
                <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg">
                  {projectList.map((project) => (
                    <div
                      key={project._id}
                      onClick={() => {
                        setProjectId(project._id);
                        setProjectName(project.name);
                        setOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-teal-600 hover:text-black cursor-pointer"
                    >
                      {project.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-1">
              Assign Members
            </label>
            <div className="relative w-full text-sm">
              <button
                onClick={() => setMemberDropdownOpen(!memberDropdownOpen)}
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded-md flex justify-between items-center border border-zinc-700"
              >
                {selectedMembers.length > 0
                  ? `${selectedMembers.length} member${selectedMembers.length > 1 ? "s" : ""} selected`
                  : "Select members"}
                <ChevronDown
                  className={`w-4 h-4 transition ${memberDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {memberDropdownOpen && (
                <div className="absolute z-50 mt-1 w-full bg-zinc-800 border border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
                  {memberList.map((member) => (
                    <label
                      key={member._id}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-teal-600 hover:text-black"
                    >
                      <input
                        type="checkbox"
                        checked={selectedMembers.includes(member._id)}
                        onChange={() => {
                          setSelectedMembers((prev) =>
                            prev.includes(member._id)
                              ? prev.filter((id) => id !== member._id)
                              : [...prev, member._id]
                          );
                        }}
                        className="accent-teal-500"
                      />
                      {member.name || member.email}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full flex justify-end gap-3 pt-2">
            <button
              onClick={onCancel}
              className="px-5 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-2xl"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="px-7 py-1 bg-teal-700 rounded-2xl font-bold hover:bg-teal-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {error && (
        <Toast type="error" message={error} onClose={() => setError(null)} />
      )}
    </>
  );
};
export default AddTaskForm;
