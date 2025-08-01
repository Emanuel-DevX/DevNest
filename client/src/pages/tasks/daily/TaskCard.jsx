import { useState } from "react";
import { Circle, CheckCircle, User, Calendar, Clock } from "lucide-react";
const TaskCard = function ({ task }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const getStatusColor = () => {
    if (isCompleted) return "text-green-400";
    if (true) return "text-red-400";
    return "text-teal-400";
  };
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  return (
    <div className="relative border border-gray-700/30 bg-gradient-to-br from-zinc-800/50 to-gray-900/50 backdrop-blur-sm p-4 rounded-xl">
      {/* Status Badge */}
      <div className="absolute top-1 left-1 text-xs px-1 py-0.5 rounded-full border font-medium bg-teal-500/10 border-teal-500/20 text-teal-300 z-20">
        {task.status}
      </div>

      {/* Title and Description */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            handleDone(!isCompleted);
            if (!isParticipant) return;
            setIsCompleted(!isCompleted);
          }}
          className=""
        >
          {isCompleted ? (
            <CheckCircle className="text-green-400 w-5 h-5" />
          ) : (
            <Circle className="text-gray-400 hover:text-teal-400 w-5 h-5" />
          )}
        </button>
        <div className="flex-1 mt-2 min-w-0">
          <h4
            className={`text-lg font-semibold mb-1 ${isCompleted ? "text-gray-400 line-through" : "text-white"}`}
          >
            {task.title}
          </h4>
          {task.description && (
            <p
              className={`text-sm ${isCompleted ? "text-gray-500" : "text-gray-300"}`}
            >
              {task.description}
            </p>
          )}
        </div>
      </div>

      {/* Info Row */}
      <div className="flex flex-col md:flex-row justify-between flex-wrap  text-sm mt-4">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-1.5">
            <Calendar className={`w-4 h-4 ${getStatusColor()}`} />
            <span className={getStatusColor()}>{formatDate(task.dueDate)}</span>
          </div>
          {/* Participants */}
          {task.participants?.length > 0 && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-gray-400" />
              <div className="flex -space-x-1">
                {task.participants.slice(0, 4).map((participant) => (
                  <div
                    key={participant._id}
                    className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-xs text-teal-400 font-medium"
                    title={participant.name}
                  >
                    {participant.name?.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-1.5 items-center">
          <Clock className="w-4 h-4" />
          {task.duration && (
            <div className="flex items-center gap-1.5 text-gray-400">
              <span>Est. {task.duration / 60}hr</span>
            </div>
          )}

          {task.actualTime && isCompleted && (
            <div className="flex items-center gap-1.5 text-gray-400">
              <span>Act. {task.actualTime / 60}hr</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
