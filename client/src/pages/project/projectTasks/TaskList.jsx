import { useEffect, useState } from "react";
import fetcher from "../../../lib/api";
import TaskCard from "./TaskCard";
import { AlertTriangle, CheckCircle, ChevronDown, Clock } from "lucide-react";
import Toast from "../../../components/Toast";

const TaskList = function ({
  tasks,
  projectMembers,
  refreshProject,
  projectId,
}) {
  const [doneTasks, setDoneTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [duePassedTasks, setDuePassedTasks] = useState([]);

  // Collapsible states
  const [isPendingOpen, setIsPendingOpen] = useState(true);
  const [isDuePassedOpen, setIsDuePassedOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);

  const [toast, setToast] = useState(null);
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
      await refreshProject();
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleTaskAssignment = async (taskId, userIds) => {
    let res;
    try {
      const options = {};
      options.body = JSON.stringify({ participants: userIds });
      options.method = "PATCH";
      res = await fetcher(`/projects/${projectId}/tasks/${taskId}`, options);
      let ts = {
        type: "success",
        message: res.message || "Successfull task assignment",
      };
      setToast(ts);
      refreshProject();
    } catch (err) {
      let ts = {
        type: "error",
        message: res.message || "Could not assign task",
      };
      setToast(ts);
      console.error(res.message || "Could not assign task");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
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
                  handleAssign={(userIds) =>
                    handleTaskAssignment(task._id, userIds)
                  }
                  projectMembers={projectMembers || []}
                  status="Pending"
                />
              ))}
            </div>
          )}
        </div>

        <div id="overdue" className="">
          <div className="py-2 flex w-full justify-between items-center  bg-zinc-800/40 p-2 rounded-xl">
            <div className="flex items-center gap-2 ">
              <AlertTriangle />
              <h3 className="flex flex-col text-red-600 font-bold">
                Overdue Tasks
                <span className="text-sm text-white">
                  {duePassedTasks.length} tasks
                </span>
              </h3>
            </div>
            <button
              onClick={() => setIsDuePassedOpen(!isDuePassedOpen)}
              className="w-10"
            >
              <ChevronDown
                className={`${isDuePassedOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {isDuePassedOpen && (
            <div className="gap-3 flex flex-col p-4">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleDone={(complete) =>
                    handleTaskCompletion(task._id, complete)
                  }
                  projectMembers={projectMembers || []}
                  status="Over due"
                />
              ))}
            </div>
          )}
        </div>
        <div id="completed" className="">
          <div className="py-2 flex w-full justify-between items-center  bg-zinc-800/40 p-2 rounded-xl">
            <div className="flex items-center gap-2 ">
              <CheckCircle />
              <h3 className="flex flex-col text-green-500 font-bold">
                Completed Tasks
                <span className="text-sm text-white">
                  {doneTasks.length} tasks
                </span>
              </h3>
            </div>
            <button
              onClick={() => setIsCompletedOpen(!isCompletedOpen)}
              className="w-10"
            >
              <ChevronDown
                className={`${isCompletedOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
          {isCompletedOpen && (
            <div className="gap-3 flex flex-col p-4">
              {doneTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleDone={(complete) =>
                    handleTaskCompletion(task._id, complete)
                  }
                  projectMembers={projectMembers || []}
                  status="Completed"
                />
              ))}
            </div>
          )}
        </div>
      </div>
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

export default TaskList;
