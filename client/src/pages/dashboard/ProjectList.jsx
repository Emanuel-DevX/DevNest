import { useState } from "react";
import LetterIcon from "../../components/LetterIcon";
import { Link } from "react-router-dom";
import { Pin } from "lucide-react";
import fetcher from "../../lib/api";
import { options } from "../../../../server/routes/dashboard";

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
      </div>{" "}
    </>
  );
};

const ProjectCard = function ({ projectInfo, onPinToggle }) {
  const [pinned, setPinned] = useState(projectInfo.pinned);
  const handlePin = async function (id) {
    endpoint = `/project/${id}`;
    options = {
      body: { pinned: !pinned },
      method: "PUT",
    };
    await fetcher(endpoint, options);
    const newPinState = !pinned;
    setPinned(newPinState);
    onPinToggle(id, newPinState);
    setPinned((p) => !p);
  };
  const firstLetter = projectInfo.name[0];
  return (
    <>
      <Link
        to={`/project/${projectInfo._id}`}
        className="md:w-[48%] lg:w-[32%] "
      >
        <div className="w-full relative flex flex-col justify-center items-center border-teal-200/50 bg-zinc-900/30 border rounded-lg my-2 p-2 hover:scale-105 h-40">
          <button
            onClick={(e) => {
              e.preventDefault(); // prevent <Link> navigation
              handlePin(projectInfo._id);
            }}
            className="absolute top-2 right-2 "
          >
            <Pin
              className={`w-4 h-4   ${pinned ? "text-yellow-400" : "text-white"} `}
            />
          </button>

          <LetterIcon letter={firstLetter} size="lg" className="" />
          <h2 className="text-teal-400 font-bold">{projectInfo.name}</h2>
          <p className="">{projectInfo.description}</p>
        </div>
      </Link>
    </>
  );
};

export default ProjectList;
