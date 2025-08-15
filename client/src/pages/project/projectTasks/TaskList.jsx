import { useEffect, useState } from "react";
import fetcher from "../../../lib/api";
import TaskCard from "./TaskCard";
import { AlertTriangle, CheckCircle, ChevronDown, Clock } from "lucide-react";
import Toast from "../../../components/Toast";
import { getCurrentUser } from "../../../lib/auth";
import { toLocalDateOnly, toLocalDateOnlyUTC, toLocalMidnight } from "@/lib/date";

const currentUser = getCurrentUser();
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
    const today = toLocalMidnight(toLocalDateOnly(new Date()));

    const done = tasks.filter((task) => task.completed === true);
    const pending = tasks.filter(
      (task) =>
        task.completed === false &&
        toLocalDateOnlyUTC(task.dueDate) >= toLocalDateOnlyUTC(new Date())
    );
    const duePassed = tasks.filter(
      (task) =>
        task.completed === false && toLocalDateOnly(task.dueDate) < today
    );
    setDoneTasks(done);
    setPendingTasks(pending);
    setDuePassedTasks(duePassed);
  }, [tasks]);
  const handleTaskCompletion = async (taskId, complete) => {
    const isParticipant = tasks
      .filter((task) => task._id === taskId)[0]
      .participants.some((p) => p._id == currentUser.id);
    if (!isParticipant) {
      setToast({
        message: "You need to be a participant of this task to mark it as done",
        type: "Error",
      });
      return;
    }
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
  const handleTaskDeletion = async (taskId) => {
    try {
      await fetcher(`/projects/${projectId}/tasks/${taskId}`, {
        method: "DELETE",
      });
      let ts = {
        type: "success",
        message: "Successfuly deleted task",
      };
      setToast(ts);
      refreshProject();
    } catch (err) {
      let ts = {
        type: "error",
        message: "Could not delete task",
      };
      setToast(ts);
      console.error(err.message || "Could not delete task");
    }
  };
  const handleUpdateTask = async (taskId, updates) => {
    try {
      const options = {};
      options.body = JSON.stringify({ ...updates });
      options.method = "PATCH";
      const res = await fetcher(
        `/projects/${projectId}/tasks/${taskId}`,
        options
      );
      let ts = {
        type: "success",
        message: res.message || "Successfull task update",
      };
      setToast(ts);
      refreshProject();
    } catch (err) {
      let ts = {
        type: "error",
        message: res.message || "Could not update task",
      };
      setToast(ts);
      console.error(res.message || "Could not update task");
    }
  };
  const handlePushDueDate = async (taskId, newDate) => {
    try {
      const options = {};
      options.body = JSON.stringify({ dueDate: newDate });
      options.method = "PATCH";
      const res = await fetcher(
        `/projects/${projectId}/tasks/${taskId}`,
        options
      );
      let ts = {
        type: "success",
        message: "Success",
      };
      setToast(ts);
      refreshProject();
    } catch (err) {
      let ts = {
        type: "error",
        message: res.message || "Could not push task dueDate",
      };
      setToast(ts);
      console.error(err.message || "Could not task dueDate");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <div id="pending" className="">
          <button
            onClick={() => setIsPendingOpen(!isPendingOpen)}
            className="w-full"
          >
            <div className="py-2 flex  justify-between items-center  bg-zinc-800/40 p-2 rounded-xl">
              <div className="flex items-center gap-2 ">
                <Clock />
                <h3 className="flex flex-col items-start text-teal-300 font-bold">
                  Pending Tasks
                  <span className="text-sm text-white">
                    {pendingTasks.length} tasks
                  </span>
                </h3>
              </div>
              <ChevronDown
                className={`w-10 ${isPendingOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
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
                  handleDelete={() => handleTaskDeletion(task._id)}
                  projectMembers={projectMembers || []}
                  status="Pending"
                  handlePushDueDate={(newDate) =>
                    handlePushDueDate(task._id, newDate)
                  }
                  handleUpdateTask={(updates) =>
                    handleUpdateTask(task._id, updates)
                  }
                />
              ))}
            </div>
          )}
        </div>

        <div id="overdue" className="">
          <button
            onClick={() => setIsDuePassedOpen(!isDuePassedOpen)}
            className="w-full"
          >
            <div className="py-2 flex w-full justify-between items-center  bg-zinc-800/40 p-2 rounded-xl">
              <div className="flex items-center gap-2 ">
                <AlertTriangle />
                <h3 className="flex flex-col items-start text-red-600 font-bold">
                  Overdue Tasks
                  <span className="text-sm text-white">
                    {duePassedTasks.length} tasks
                  </span>
                </h3>
              </div>
              <ChevronDown
                className={`w-10 ${isDuePassedOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
          {isDuePassedOpen && (
            <div className="gap-3 flex flex-col p-4">
              {duePassedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleDone={(complete) =>
                    handleTaskCompletion(task._id, complete)
                  }
                  handleAssign={(userIds) =>
                    handleTaskAssignment(task._id, userIds)
                  }
                  handleDelete={() => handleTaskDeletion(task._id)}
                  projectMembers={projectMembers || []}
                  status="Over due"
                  handlePushDueDate={(newDate) =>
                    handlePushDueDate(task._id, newDate)
                  }
                  handleUpdateTask={(updates) =>
                    handleUpdateTask(task._id, updates)
                  }
                />
              ))}
            </div>
          )}
        </div>
        <div id="completed" className="">
          <button
            onClick={() => setIsCompletedOpen(!isCompletedOpen)}
            className="w-full"
          >
            <div className="py-2 flex w-full justify-between items-center  bg-zinc-800/40 p-2 rounded-xl">
              <div className="flex items-center gap-2 ">
                <CheckCircle />
                <h3 className="flex flex-col items-start text-green-500 font-bold">
                  Completed Tasks
                  <span className="text-sm text-white">
                    {doneTasks.length} tasks
                  </span>
                </h3>
              </div>
              <ChevronDown
                className={`w-10 ${isCompletedOpen ? "rotate-180" : ""}`}
              />
            </div>
          </button>
          {isCompletedOpen && (
            <div className="gap-3 flex flex-col p-4">
              {doneTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  handleDone={(complete) =>
                    handleTaskCompletion(task._id, complete)
                  }
                  handleAssign={(userIds) =>
                    handleTaskAssignment(task._id, userIds)
                  }
                  handleDelete={() => handleTaskDeletion(task._id)}
                  projectMembers={projectMembers || []}
                  status="Completed"
                  handlePushDueDate={(newDate) =>
                    handlePushDueDate(task._id, newDate)
                  }
                  handleUpdateTask={(updates) => {
                    handleUpdateTask(task._id, updates);
                  }}
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
