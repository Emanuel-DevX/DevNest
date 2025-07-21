import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../../lib/auth";
import fetcher from "../../lib/api";
import { useState } from "react";
import Overview from "./Overview";
import ProjectList from "./ProjectList";
export default function Dashboard() {
  const [overview, setOverview] = useState({});
  const [projectList, setProjectList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let endpoint = "/dashboard/overview";
      const res = await fetcher(endpoint);
      const user = getCurrentUser();
      res.user = user;
      setOverview(res);

      const projects = await fetcher("/projects");
      setProjectList(projects);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Overview userData={overview} />
        <h1 className="text-2xl mb-2 font-jetbrains text-teal-300">
          <span className="text-teal-400 mr-0.5">#</span>Projects
        </h1>
        <ProjectList projectList={projectList} />
      </div>
    </>
  );
}
