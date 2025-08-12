import { useState } from "react";
import Toast from "./Toast";
import fetcher from "../lib/api";
import { useDispatch } from "react-redux";
import { setProjects } from "../app/features/projectSlice";

const CreateProjectForm = function ({ onClose, onSuccess }) {
  const [name, setName] = useState("");
  const [toast, setToast] = useState(null);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const refreshProjects = async () => {
    const projects = await fetcher("/projects");
    dispatch(setProjects(projects));
  };

  const handleCreateProject = async () => {
    const trimmedName = name.trim();
    if (trimmedName.length < 3) {
      setToast({
        message: "Title needs to be at least 3 characters long",
        type: "error",
      });
      return;
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          name: trimmedName,
          description: description.trim(),
        }),
      };
      await fetcher(`/projects`, options);
      onClose();
      onSuccess();
      refreshProjects();
    } catch (err) {
      console.error(err.message);
      setToast({ message: "Could not create project", type: "error" });
    }
  };
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/80 flex justify-center items-center">
        <div className="w-sm bg-zinc-900  rounded-xl p-4 min-w-sm flex flex-col gap-3">
          <div className="mx-auto text-xl text-teal-500 font-bold">
            Create a Project
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={3}
            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-teal-500 focus:border-teal-500 transition resize-none"
          />

          <div className="w-full flex justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-2xl"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateProject}
              className="px-7 py-1 bg-teal-700 rounded-2xl font-bold hover:bg-teal-600"
            >
              Save
            </button>
          </div>
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

export default CreateProjectForm;
