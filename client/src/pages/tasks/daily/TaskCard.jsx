import { useState } from "react";
import {
  Circle,
  CheckCircle,
  User,
  Calendar,
  Clock,
  MoreVertical,
} from "lucide-react";
import CustomizeTaskSchedule from "./CustomizeTaskSchedule";
const TaskCard = function ({ task }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [customMenuOpen, setCustomMenuOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [editScheduleOpen, setEditScheduleOpen] = useState(false);
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
    <>
      <div className="relative border border-gray-700/30 bg-gradient-to-br from-zinc-800/50 to-gray-900/50 backdrop-blur-sm p-4 rounded-xl">
        {/* Status Badge */}
        <div className="absolute top-1 left-1 text-xs px-1 py-0.5 rounded-full border font-medium bg-teal-500/10 border-teal-500/20 text-teal-300 z-20">
          {task.status}
        </div>
        {customMenuOpen && (
          <div className="z-[9999] absolute top-6 right-4 w-32 bg-zinc-950/90  flex justify-center rounded-xl rounded-tr-none">
            <button
              onClick={() => {
                setEditScheduleOpen(true);

                setCustomMenuOpen(false);
                setOverlay(false);
              }}
              className="p-2 z-50 text-sm font-bold "
            >
              Edit Schedule
            </button>
            {overlay && (
              <div
                id="overlay"
                onClick={() => {
                  setCustomMenuOpen(false);
                  setOverlay(false);
                }}
                className="fixed -top-30 -left-50 w-screen h-screen"
              />
            )}{" "}
          </div>
        )}
        <button
          onClick={() => {
            setCustomMenuOpen((op) => !op);
            setOverlay(true);
          }}
          className="absolute top-2 right-2 text-slate-200 w-4"
        >
          <MoreVertical />
        </button>

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
          <div className="flex gap-1.5 items-center">
            <Clock className="w-4 h-4" />
            <div className="flex items-center gap-1.5 text-gray-400">
              <span> {task.startTime || "12:00"}</span>
              {" - "}
              <span> {task.endTime || "13:00"}</span>
            </div>
          </div>
        </div>
      </div>
      {editScheduleOpen && <CustomizeTaskSchedule task={task} />}
    </>
  );
};

export default TaskCard;
