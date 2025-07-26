import { useEffect, useState } from "react";
import fetcher from "../../../lib/api";
import TaskCard from "./TaskCard";

const TaskList = function ({ tasks, projectMembers, refreshProject }) {
  const [doneTasks, setDoneTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [duePassedTasks, setDuePassedTasks] = useState([]);

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
    refreshProject()
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
      <div className="gap-3 flex flex-col">
        Pending Tasks
        {pendingTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDone={(complete) => handleTaskCompletion(task._id, complete)}
          />
        ))}
      </div>
      <div className="gap-3 flex flex-col">
        Due Passed Tasks
        {duePassedTasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            handleDone={(complete) => handleTaskCompletion(task._id, complete)}
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
          />
        ))}
      </div>
    </>
  );
};

export default TaskList;
