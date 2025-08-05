import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, getCurrentUser } from "../../lib/auth";
import fetcher from "../../lib/api";
import Overview from "./Overview";
import ProjectList from "./ProjectList";
import CreateProjectForm from "../../components/CreateProjectForm";
import Toast from "../../components/Toast";
import { useSelector, useDispatch } from "react-redux";
import { setProjects } from "../../features/projectSlice";
import { PlusCircle } from "lucide-react";

export default function Dashboard() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [overview, setOverview] = useState({});
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.project.projectList);

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
      dispatch(setProjects(projects));
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Overview userData={overview} />
        <div className="flex justify-between  w-full mb-3">
          <h1 className="text-2xl font-jetbrains text-teal-300">
            <span className="text-teal-400 mr-0.5">#</span>Projects
          </h1>
          <button
            title={"Create a new project"}
            onClick={() => {
              setShowCreateForm(true);
            }}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            <PlusCircle className="w-6 h-6" />
            Create
          </button>
        </div>
        <ProjectList projectList={projectList} />
      </div>
      {showCreateForm && (
        <CreateProjectForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={() =>
            setToast({
              message: "Project created successfully!",
              type: "success",
            })
          }
        />
      )}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}
