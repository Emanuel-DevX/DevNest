import { useParams, Route, Routes } from "react-router-dom";
import ProjectMeta from "./ProjectMeta";
import { useEffect, useState } from "react";
import fetcher from "../../lib/api";

const Project = function () {
  const { id } = useParams();
  const [project, setProject] = useState({});
  useEffect(() => {
    async function fetchProject() {
      const res = await fetcher(`/projects/${id}`);
      setProject(res);
    }
    fetchProject()
  }, [id]);

  return (
    <>
      <div className="min-h-screen">
        <ProjectMeta project={project} />
        <div></div>

        <Routes>
          <Route path="/task" element={null}></Route>
        </Routes>
      </div>
    </>
  );
};

export default Project;
