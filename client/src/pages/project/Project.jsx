import { useParams, Routes, Route, NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import fetcher from "../../lib/api";

import ProjectMeta from "./ProjectMeta";

const ProjectLayout = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    async function fetchProject() {
      const res = await fetcher(`/projects/${id}`);
      setProject(res);
    }
    fetchProject();
  }, [id]);
  const refreshProject = async () => {
    const res = await fetcher(`/projects/${id}`);
    setProject(res);
  };

  if (!project) return <div className="text-white">Loading...</div>;

  return (
    <div className="min-h-screen md:px-6">
      <ProjectMeta project={project} />

      {/* Nav Tabs */}
      <div className="flex gap-4 mb-4 border-b border-gray-700 text-sm font-medium">
        <NavLink
          to="tasks"
          className={({ isActive }) =>
            `pb-2 px-2 ${
              isActive
                ? "border-b-2 border-teal-400 text-teal-300"
                : "text-gray-400"
            }`
          }
        >
          Tasks
        </NavLink>
        <NavLink
          to="sprints"
          className={({ isActive }) =>
            `pb-2 px-2 ${
              isActive
                ? "border-b-2 border-teal-400 text-teal-300"
                : "text-gray-400"
            }`
          }
        >
          Sprints
        </NavLink>
        <NavLink
          to="notes"
          className={({ isActive }) =>
            `pb-2 px-2 ${
              isActive
                ? "border-b-2 border-blue-400 text-blue-300"
                : "text-gray-400"
            }`
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `pb-2 px-2 ${
              isActive
                ? "border-b-2 border-purple-400 text-purple-300"
                : "text-gray-400"
            }`
          }
        >
          Settings
        </NavLink>
      </div>

      {/* Render tab content */}
      <Outlet
        key={project._id + project.sprints?.length}
        context={{ project, refreshProject }}
      />
    </div>
  );
};

export default ProjectLayout;
