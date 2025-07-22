import { useState } from "react";
import LetterIcon from "../../components/LetterIcon";
import { Link } from "react-router-dom";
import { Pin } from "lucide-react";
import fetcher from "../../lib/api";

const ProjectList = function ({ projectList }) {
  const sorted = [...projectList].sort((a, b) => {
    // Sort by pinned first (true before false)
    if (a.pinned !== b.pinned) {
      return b.pinned - a.pinned; // pinned=true comes first
    }
    // Then sort by creation date
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const handlePinToggle = (id, newPinnedValue) => {
    const updated = projects.map((p) =>
      p._id === id ? { ...p, pinned: newPinnedValue } : p
    );
    setProjects(updated);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row w-full flex-wrap justify-around gap-4">
        {sorted.map((project) => (
          <ProjectCard
            key={project._id}
            projectInfo={project}
            onPinToggle={handlePinToggle}
          />
        ))}
      </div>
    </>
  );
};

const ProjectCard = function ({ projectInfo, onPinToggle }) {
  const [pinned, setPinned] = useState(projectInfo.pinned);

  const handlePin = async function (id) {
    const endpoint = `/projects/${id}`;
    const options = {
      body: JSON.stringify({ pinned: !pinned }),
      method: "PUT",
  
    };

    try {
      await fetcher(endpoint, options);
      const newPinState = !pinned;
      setPinned(newPinState);
      onPinToggle(id, newPinState);
    } catch (error) {
      console.error("Failed to toggle pin:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const firstLetter = projectInfo.name[0];

  return (
    <div className="group relative lg:w-[32%] md:w[48%] mx-2 md:mx-0 ">
      {/* Pin Button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          handlePin(projectInfo._id);
        }}
        className={`
          absolute -top-2 -right-2 z-10 
          w-8 h-8 rounded-full 
          flex items-center justify-center
          transition-all duration-200
          hover:scale-110 
          shadow-lg hover:shadow-xl
          ${
            pinned
              ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-300"
              : "bg-white/90 text-gray-600 hover:bg-white hover:text-gray-800"
          }
          backdrop-blur-sm
        `}
      >
        <Pin
          className={`w-4 h-4 transition-transform ${pinned ? "rotate-12" : ""}`}
          fill={pinned ? "currentColor" : "none"}
        />
      </button>

      {/* Project Card */}
      <Link to={`/project/${projectInfo._id}`} className="block h-full">
        <div
          className="
          relative h-40 p-6
          bg-white/5 backdrop-blur-sm
          border border-white/10
          rounded-2xl
          transition-all duration-300
          hover:scale-[1.02] hover:bg-white/10
          hover:border-white/20
          hover:shadow-2xl hover:shadow-teal-500/2
          flex flex-col items-center justify-center
          text-center
          group-hover:translate-y-[-2px]
        "
        >
          {/* Icon */}
          <div className="mb-4">
            <LetterIcon letter={firstLetter} size="lg" />
          </div>

          {/* Project Name */}
          <h2 className="text-xl font-bold text- mb-2">
            {projectInfo.name}
          </h2>


          {/* Creation Date */}
          <div className="mt-auto pt-2 border-t border-white/10 w-full">
            <span className="text-xs text-gray-400 font-medium">
              Created {formatDate(projectInfo.createdAt)}
            </span>
          </div>

     
        </div>
      </Link>
    </div>
  );
};
export default ProjectList;
