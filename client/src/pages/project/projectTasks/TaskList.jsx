import fetcher from "../../../lib/api";
import TaskCard from "./TaskCard";

const TaskList = function ({ tasks, projectMembers, refreshProject }) {
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
      We will list the tasks here with the proper list of members and stuff to
      handle assignments
      <div className="gap-3 flex flex-col">
        {tasks.map((task) => (
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
