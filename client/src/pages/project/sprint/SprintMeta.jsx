import { useRef, useState, useEffect } from "react";
import {
  Calendar,
  Edit3,
  Save,
  X,
  Plus,
  Target,
  Cross,
  Delete,
  Trash,
  EllipsisVertical,
  TrashIcon,
  Edit2,
} from "lucide-react";

// View Sprint Component
const ViewSprint = ({ sprintData, onEdit, onDelete, viewOnly }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isActive = () => {
    const now = new Date();
    const start = new Date(sprintData.startDate);
    const end = new Date(sprintData.endDate);
    return now >= start && now <= end;
  };
  if (!sprintData || !sprintData._id) {
    return (
      <div className="py-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-medium text-white">
                No sprint selected
              </h3>
            </div>
            <div className="text-sm text-slate-400">
              Select a sprint above or create one from the Sprints page
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 ">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-medium text-white">
              {sprintData.title}
            </h3>
            {isActive() && (
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                Active
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>
                {formatDate(sprintData.startDate)} –{" "}
                {formatDate(sprintData.endDate)}
              </span>
            </div>
            {sprintData.features?.length > 0 && (
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>{sprintData.features.length} goals</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
          >
            {showDetails ? "Less" : "Details"}
          </button>

          {showDetails && (
            <div className="space-y-3 mt-4 pl-4 border-l-2 border-teal-500/30">
              {sprintData.description && (
                <div>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {sprintData.description}
                  </p>
                </div>
              )}

              {sprintData.features?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-200 mb-2">
                    Goals & Features
                  </h4>
                  <ul className="space-y-1">
                    {sprintData.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-sm text-slate-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 flex-shrink-0"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        {!viewOnly === true && (
          <div className="relative" ref={menuRef}>
            <button
              className="cursor-pointer "
              onClick={() => {
                setShowMenu((prev) => !prev);
              }}
            >
              <EllipsisVertical className="w-4" />
            </button>
            {showMenu && (
              <div className="flex flex-col bg-black/80  w-24 gap-1 border p-1 rounded-2xl rounded-tr-none absolute -bottom-17 -left-21">
                <button
                  onClick={onEdit}
                  className="flex items-center gap-1 text-sm hover:bg-white/5 p-1 hover:text-teal-300"
                >
                  <Edit2 className="w-3 h-3 text-teal-300" />
                  Edit
                </button>
                <button
                  onClick={onDelete}
                  className="flex items-center gap-1 text-sm hover:bg-white/5 p-1 hover:text-red-500"
                >
                  <Trash className="w-3 h-3 text-red-500" />
                  Delete
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const EditSprint = ({ sprintData, onSave, onCancel }) => {
  const [title, setTitle] = useState(sprintData.title);
  const [startDate, setStartDate] = useState(
    new Date(sprintData.startDate).toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date(sprintData.endDate).toISOString().split("T")[0]
  );
  const [description, setDescription] = useState(sprintData.description || "");
  const [features, setFeatures] = useState(sprintData.features || [""]);

  const addFeature = () => setFeatures([...features, ""]);

  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedData = {
      ...sprintData,
      title,
      startDate,
      endDate,
      description,
      features: features.filter((f) => f.trim()),
    };
    onSave(updatedData);
  };

  return (
    <div className="py-4 border-b border-slate-700/50 bg-slate-800/20 rounded-lg p-4 -mx-4">
      <div className="space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none transition-colors text-lg font-medium"
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <textarea
          placeholder="Sprint description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors resize-none"
        />

        <div>
          <label className="block text-xs text-slate-400 mb-2">
            Features & Goals
          </label>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                placeholder="Feature or goal..."
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
              />
              {features.length > 1 && (
                <button
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addFeature}
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            + Add feature
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors text-sm"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-slate-600 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors text-sm"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

// Create New Sprint Component
const CreateSprint = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([""]);

  const addFeature = () => setFeatures([...features, ""]);

  const updateFeature = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  const removeFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const sprintData = {
      title,
      startDate,
      endDate,
      description,
      features: features.filter((f) => f.trim()),
    };
    onSave(sprintData);
  };

  return (
    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 bg-slate-900/20">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5 text-teal-400" />
        <h3 className="text-lg font-semibold text-white">Create New Sprint</h3>
      </div>

      <div className="space-y-4">
        <input
          placeholder="Sprint title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
        />

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white focus:border-teal-400 focus:outline-none transition-colors"
            />
          </div>
        </div>

        <textarea
          placeholder="Sprint description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors resize-none"
        />

        <div>
          <label className="block text-xs text-slate-400 mb-2">
            Features & Goals
          </label>
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                placeholder="Add a feature or goal..."
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
              />
              {features.length > 1 && (
                <button
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
          <button
            onClick={addFeature}
            className="text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            + Add another feature
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-4 border-t border-slate-700">
        <button
          onClick={handleSave}
          disabled={!title || !startDate || !endDate}
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <Save className="w-4 h-4" />
          Create Sprint
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 border border-slate-600 hover:bg-slate-800 text-slate-300 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export { CreateSprint, ViewSprint, EditSprint };
