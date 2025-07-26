import { useEffect, useState } from "react";
import fetcher from "../../../lib/api";
import TaskCard from "./TaskCard";
import { AlertTriangle, CheckCircle, ChevronDown, Clock } from "lucide-react";

const TaskList = function ({ tasks, projectMembers, refreshProject }) {
  const [doneTasks, setDoneTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [duePassedTasks, setDuePassedTasks] = useState([]);

  // Collapsible states
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isDuePassedOpen, setIsDuePassedOpen] = useState(true);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  useEffect(() => {
    const done = tasks.filter((task) => task.completed === true);
    const pending = tasks.filter(
      (task) => task.completed === false && new Date(task.dueDate) >= new Date()
    );
    const duePassed = tasks.filter(
      (task) => task.completed === false && new Date(task.dueDate) < new Date()
    );
    setDoneTasks(done);
    setPendingTasks(pending);
    setDuePassedTasks(duePassed);
  }, [tasks]);

  const handleTaskCompletion = async (taskId, complete) => {
    try {
      const url = `/tasks/${taskId}/complete`;
      const options = {
        body: JSON.stringify({ complete: complete }),
        method: "PATCH",
      };
      await fetcher(url, options);
      console.log(taskId, " is done!", complete);
      await refreshProject();
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <div id="pending" className="">
        <div className="py-2 flex w-full justify-between items-center  bg-zinc-800/40 p-2 rounded-xl">
          <div className="flex items-center gap-2 ">
            <Clock />
            <h3 className="flex flex-col text-teal-300 font-bold">
              Pending Tasks
              <span className="text-sm text-white">
                {pendingTasks.length} tasks
              </span>
            </h3>
          </div>
          <button
            onClick={() => setIsPendingOpen(!isPendingOpen)}
            className="w-10"
          >
            <ChevronDown className={`${isPendingOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
        {isPendingOpen && (
          <div className="gap-3 flex flex-col p-4">
            {pendingTasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                handleDone={(complete) =>
                  handleTaskCompletion(task._id, complete)
                }
                projectMembers={projectMembers || []}
                status="Pending"
              />
            ))}
          </div>
        )}
      </div>

      <div className="gap-3 flex flex-col">
        Due Passed Tasks
        {duePassedTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDone={(complete) => handleTaskCompletion(task._id, complete)}
            status="Over due"
          />
        ))}
      </div>
      <div className="gap-3 flex flex-col">
        Completed Tasks
        {doneTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDone={(complete) => handleTaskCompletion(task._id, complete)}
            status="Completed"
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
