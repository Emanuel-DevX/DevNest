import { Square, CheckSquare } from "lucide-react";
import { useEffect, useState } from "react";

const TaskCard = function ({ task, handleDone, handleAssign, projectMembers }) {
  const [isComplete, setIsComplete] = useState(task.completed);

  return (
    <>
      <div className="border bg-gradient-to-br from-black via-teal-300/10 p-4 to-black flex">
        <button
          onClick={() => {
            handleDone(!isComplete);
            setIsComplete(!isComplete);
          }}
        >
          {isComplete ? <CheckSquare /> : <Square />}
        </button>

        {task.title}
        <div className="text-xs text-end text-teal-400">
          {new Date(task.dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </>
  );
};

export default TaskCard;
