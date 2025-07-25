import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ViewSprint } from "../sprint/SprintMeta";

const ProjectTaskView = function () {
  const [currentSprint, setCurrentSprint] = useState({});
  const [currentSprintId, setCurrentSprintId] = useState(null);

  const [tasks, setTasks] = useState([]);
  const { project, refreshProject } = useOutletContext();

  const { id } = useParams;
  useEffect(() => {
    async function filterCurrent() {
      const currSp = project.sprints.filter((sp) => sp.isCurrent)[0];
      if (currSp !== undefined) {
        setCurrentSprint(currSp);
        setCurrentSprintId(currSp._id);
      }
    }
    filterCurrent();
  }, [currentSprintId]);
  useEffect(() => {
    refreshProject();
  }, [id]);

  return (
    <>
      {currentSprintId && (
        <ViewSprint sprintData={currentSprint} viewOnly={true} />
      )}
    </>
  );
};
export default ProjectTaskView;
