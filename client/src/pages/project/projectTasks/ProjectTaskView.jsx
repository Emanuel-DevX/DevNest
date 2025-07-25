import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ViewSprint } from "../sprint/SprintMeta";

const ProjectTaskView = function () {
  const [currentSprint, setCurrentSprint] = useState({});
  const [currentSprintId, setCurrentSprintId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const { project } = useOutletContext();
  useEffect(() => {
    async function filterCurrent() {
      const currSp = project.sprints.filter((sp) => sp.isCurrent)[0];
      setCurrentSprint(currSp);
      setCurrentSprintId(currSp._id);
    }
    filterCurrent();
  }, [currentSprintId]);

  return <>{currentSprintId && <ViewSprint sprintData={currentSprint} />}</>;
};
export default ProjectTaskView;
