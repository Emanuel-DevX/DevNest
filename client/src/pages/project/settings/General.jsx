import SectionCard from "../../../components/SectionCard";
import { Settings } from "lucide-react";
function GeneralSettings({ project, onSave }) {
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);

  return (
    <SectionCard
      id="general"
      title="Project info"
      icon={Settings}
      description="Edit the project’s name and description."
      right={
        <button
          onClick={() => onSave({ name, description })}
          className="rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold hover:bg-teal-500"
        >
          Save
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-zinc-300">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring focus:ring-teal-600"
            placeholder="Project name"
          />
        </div>
        <div>
          <label className="block text-sm mb-1 text-zinc-300">Slug</label>
          <input
            value={project.slug}
            readOnly
            className="w-full rounded-md border border-zinc-800 bg-zinc-950/50 px-3 py-2 text-zinc-500"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm mb-1 text-zinc-300">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-zinc-700 bg-transparent px-3 py-2 focus:outline-none focus:ring focus:ring-teal-600 resize-none"
            placeholder="What is this project about?"
          />
        </div>
      </div>
    </SectionCard>
  );
}

export default GeneralSettings