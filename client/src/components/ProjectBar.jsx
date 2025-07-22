import { useState } from "react";
import { useSelector } from "react-redux";
import { getSortedProjects } from "../features/projectSlice";

const ProjectBar = function ({ isCollapsed }) {
  const [collapsed, setCollapsed] = useState(isCollapsed);
  const sortedProjects = useSelector(getSortedProjects);
  return (
    <>
      {sortedProjects.map((project) => (
        <div>{project.name}</div>
      ))}
    </>
  );
};

export default ProjectBar;
