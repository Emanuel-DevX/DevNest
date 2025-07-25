import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const SprintView = function () {
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

  return <>{currentSprintId && <SprintMeta sprintData={currentSprint} />}</>;
};
export default SprintView;

const SprintMeta = function ({ sprintData }) {
  const [showMore, setShowMore] = useState(false);

  const startDate = new Date(sprintData.startDate).toDateString().slice(4);
  const endDate = new Date(sprintData.endDate).toDateString().slice(4);

  return (
    <div className=" text-white shadow-md">
      <h2 className="text-lg font-bold text-teal-300">{sprintData.title}</h2>
      <p className="text-xs text-gray-400 mb-2">
        {startDate} – {endDate}
      </p>

      <button
        onClick={() => setShowMore((prev) => !prev)}
        className="text-xs text-teal-400 hover:underline"
      >
        {showMore ? "Show Less" : "Show Details"}
      </button>

      {showMore && (
        <div className="mt-2 space-y-2">
          {sprintData.description && (
            <p className="text-sm text-gray-300">{sprintData.description}</p>
          )}

          <div>
            <h4 className="text-sm font-semibold text-gray-200 mb-1">
              Features / Goals
            </h4>
            <ul className="list-disc list-inside text-sm text-gray-300">
              {sprintData.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
