import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSortedProjects, setProjects } from "../app/features/projectSlice";
import LetterIcon from "./LetterIcon";
import { Link } from "react-router-dom";
import fetcher from "../lib/api";

const ProjectBar = function ({ collapsed }) {
  const sortedProjects = useSelector(getSortedProjects);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const projects = await fetcher("/projects");
      dispatch(setProjects(projects));
    };
    fetchData();
  }, []);

  return (
    <>
      {sortedProjects.map((project) => (
        <Link to={`project/${project._id}`} key={project._id}>
          <div className="flex gap-2 max-h-8 overflow-hidden my-2 items-center">
            <LetterIcon letter={project.name[0]} size="sm" />
            {!collapsed ? (
              <div className="text-sm max-h-6 overflow-hidden">
                {project.name}
              </div>
            ) : (
              <></>
            )}
          </div>
        </Link>
      ))}
    </>
  );
};

export default ProjectBar;
