import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ViewSprint } from "../sprint/SprintMeta";
import TaskList from "./TaskList";
import fetcher from "../../../lib/api";
import { ChevronDown, PlusCircle } from "lucide-react";
import TaskCreator from "../../../components/TaskCreateTabs";
import Toast from "../../../components/Toast";
const ProjectTaskView = function () {
  const [toast, setToast] = useState(null);
  const [currentSprint, setCurrentSprint] = useState({});
  const [currentSprintId, setCurrentSprintId] = useState(null);

  const [showSprintMenu, setShowSprintMenu] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);

  const [tasks, setTasks] = useState([]);
  const { project, refreshProject } = useOutletContext();

  useEffect(() => {
    // set default sprint (only when project changes and no selection yet)
    if (!project?.sprints) return;

    if (!currentSprintId) {
      const currSp = project.sprints.find((sp) => sp.isCurrent);
      if (currSp) {
        setCurrentSprint(currSp);
        setCurrentSprintId(currSp._id?.toString());
      } else {
        setCurrentSprint({});
        setCurrentSprintId(null);
      }
    }
  }, []);
  useEffect(() => {
    // whenever sprintId or project.sprints change, update currentSprint
    if (!project?.sprints) return;

    let currSp;
    if (currentSprintId) {
      currSp = project.sprints.find(
        (sp) => sp._id?.toString() === String(currentSprintId)
      );
    }
    setCurrentSprint(currSp ?? {});
  }, [project?.sprints, currentSprintId]);

  useEffect(() => {
    // fetch tasks when project or sprint id changes
    if (!project?._id) return;
    (async () => {
      try {
        let url = `/projects/${project._id}/tasks`;
        if (currentSprintId) url += `?sprintId=${currentSprintId}`;
        const res = await fetcher(url);
        setTasks(res);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [project, currentSprintId]);

  const handleSuccess = async (toast) => {
    setShowAddTaskForm(false);
    setToast(toast);
    await refreshProject();
  };

  return (
    <>
      <div className="relative ">
        {/* Header */}
        <div className="mb-1 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Task Management</h1>
          </div>
          <button
            onClick={() => {
              setShowAddTaskForm(true);
            }}
            className=" flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            Add Task
          </button>
        </div>
        <div className="flex items-start relative  mb-2">
          <ViewSprint sprintData={currentSprint}  viewOnly={true} />
          <div className="absolute right-0 top-3 ">
            <button
              className="flex text-sm items-end justify-end w-28"
              onClick={() => setShowSprintMenu(!showSprintMenu)}
            >
              {" "}
              Sprint
              <ChevronDown
                className={`h-5 ${showSprintMenu ? "rotate-180" : ""}`}
              />
            </button>
            {showSprintMenu && (
              <ul className="absolute w-32 right-1 flex flex-col items-start z-[9999] bg-zinc-800 rounded-lg">
                {project.sprints.map((sp) => (
                  <button
                    onClick={() => {
                      setShowSprintMenu(false);
                      setCurrentSprintId(sp._id);
                    }}
                    key={sp._id}
                    className="p-1 px-2 w-full flex items-start text-sm hover:bg-zinc-900 hover:text-teal-400"
                  >
                    {sp.title}
                  </button>
                ))}
                <button
                  onClick={() => {
                    setShowSprintMenu(false);
                    setCurrentSprintId(null);
                    setCurrentSprint({});
                  }}
                  key={"all-sprints"}
                  className="p-1 px-2 w-full flex items-start text-sm hover:bg-zinc-900 hover:text-teal-400"
                >
                  All
                </button>
              </ul>
            )}
          </div>
        </div>

        <TaskList
          tasks={tasks}
          projectMembers={project.members}
          projectId={project._id}
          refreshProject={refreshProject}
        />
      </div>
      {showAddTaskForm && (
        <TaskCreator
          onClose={() => setShowAddTaskForm(false)}
          onSuccess={handleSuccess}
          currentProject={project._id}
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
};
export default ProjectTaskView;
