import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ViewSprint } from "../sprint/SprintMeta";
import TaskList from "./TaskList"
import fetcher from "../../../lib/api";

const ProjectTaskView = function () {
  const [currentSprint, setCurrentSprint] = useState({});
  const [currentSprintId, setCurrentSprintId] = useState(null);

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
      } catch (err) {
        console.error(err);
      }
    };
    if (project && (currentSprintId || project.sprints?.length === 0)) {
      fetchSprintTasks();
    }
  }, [currentSprintId, project]);

  return (
    <>
      <div>
        {currentSprintId && (
          <ViewSprint sprintData={currentSprint} viewOnly={true} />
        )}
        <TaskList tasks={tasks} refreshProject={refreshProject}  />
    
      </div>
    </>
  );
};
export default ProjectTaskView;
