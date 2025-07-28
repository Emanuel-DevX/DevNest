import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ViewSprint } from "../sprint/SprintMeta";
import TaskList from "./TaskList";
import fetcher from "../../../lib/api";
import { ChevronDown } from "lucide-react";

const ProjectTaskView = function () {
  const [currentSprint, setCurrentSprint] = useState({});
  const [currentSprintId, setCurrentSprintId] = useState(null);

  const [showSprintMenu, setShowSprintMenu] = useState(false);

  const [tasks, setTasks] = useState([]);
  const { project, refreshProject } = useOutletContext();

  useEffect(() => {
    async function filterCurrent() {
      const currSp = project.sprints.filter((sp) => sp.isCurrent)[0];
      if (currSp !== undefined) {
        setCurrentSprint(currSp);
        setCurrentSprintId(currSp._id);
      }
    }
    filterCurrent();
  }, []);

  useEffect(() => {
    const fetchSprintTasks = async () => {
      try {
        let url = `/projects/${project._id}/tasks`;
        if (currentSprintId) {
          url += `?sprintId=${currentSprintId}`;
        }
        const res = await fetcher(url);
        setTasks(res);
        if (currentSprintId) {
          const sp = project.sprints?.find((sp) => sp._id === currentSprintId);
          setCurrentSprint(sp || {});
        } else {
          setCurrentSprint({});
        }
      } catch (err) {
        console.error(err);
      }
    };
    if (project) {
      fetchSprintTasks();
    }
  }, [currentSprintId, project]);

  return (
    <>
      <div className="relative ">
        <div className="absolute right-0 top-0 ">
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
            <ul className=" flex flex-col items-start z-50 bg-zinc-800 rounded-lg">
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
                key={Math.random()}
                className="p-1 px-2 w-full flex items-start text-sm hover:bg-zinc-900 hover:text-teal-400"
              >
                All
              </button>
            </ul>
          )}
        </div>

        <ViewSprint sprintData={currentSprint} viewOnly={true} />

        <TaskList
          tasks={tasks}
          projectMembers={project.members}
          projectId={project._id}
          refreshProject={refreshProject}
        />
      </div>
    </>
  );
};
export default ProjectTaskView;
