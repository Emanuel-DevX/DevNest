import { useState } from "react";
import Toast from "./Toast";
import DarkDatePicker from "./DatePicker";
const AddTaskForm = function ({ selectedProject, onSave, onCancel }) {
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [duration, setDuration] = useState("");

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
      duration: duration ? Number(duration) : null,
    };
    onSave(newTask);
  };

  return (
    <>
      <div className="z-50 fixed top-0 left-0 w-screen h-screen bg-black/50 flex items-center justify-center">
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
            {selectedProject.name}
            <select name="project" id="" value={selectedProject.name}>
                
                <option>ff</option>
            </select>
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
