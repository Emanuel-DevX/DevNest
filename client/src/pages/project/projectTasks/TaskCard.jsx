// TaskCard.jsx
import {
  Circle,
  CheckCircle,
  User,
  Calendar,
  Clock,
  MoreVertical,
} from "lucide-react";
import { useState } from "react";
import AssignTaskModal from "./AssignTaskModal";
import DeleteTaskConfirmation from "./DeleteTaskConfirmation";
import PushDueDateModal from "./PushDueDateModal";
import { getCurrentUser } from "../../../lib/auth";
import TaskEditModal from "../../../components/TaskEditModal";

export default function TaskCard({
  task,
  handleDone,
  handleAssign,
  handleDelete,
  handlePushDueDate,
  handleUpdateTask,
  projectMembers,
  status,
}) {
  const [isComplete, setIsComplete] = useState(task.completed);
  const [showMenu, setShowMenu] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPushModal, setShowPushModal] = useState(false);

  const isOverdue = status === "Over due";
  const isCompleted = status === "Completed";
  const currentUser = getCurrentUser();
  const isAdmin = ["admin", "owner"].includes(
    projectMembers
      .filter((p) => p.email === currentUser.email)[0]
      .role.toLowerCase()
  );
  const isParticipant = task.participants.some(
    (participant) => participant._id == currentUser.id
  );
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const getStatusColor = () => {
    if (isCompleted) return "text-green-400";
    if (isOverdue) return "text-red-400";
    return "text-teal-400";
  };
  
  return (
    <>
      <div className="relative border border-gray-700/30 bg-gradient-to-br from-zinc-800/50 to-gray-900/50 backdrop-blur-sm p-4 rounded-xl">
        {/* Status Badge */}
        <div className="absolute top-1 left-1 text-xs px-1 py-0.5 rounded-full border font-medium bg-teal-500/10 border-teal-500/20 text-teal-300 z-20">
          {status}
        </div>

        {/* Menu Button */}
        <div className="absolute top-2 right-2 z-20">
          <button onClick={() => setShowMenu((prev) => !prev)}>
            <MoreVertical className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
          {showMenu && (
            <>
              <button
                onClick={() => setShowMenu(false)}
                className="fixed inset-0 min-w-screen min-h-screen -top-120 -left-100 z-40 cursor-default"
              ></button>
              <div className="absolute right-4 top-1  w-40 bg-zinc-800 border border-gray-600 rounded-md shadow-lg z-100 ">
                <button
                  onClick={() => {
                    setShowAssignModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-1 text-left text-sm hover:bg-zinc-700 text-gray-200"
                >
                  Assign Task
                </button>
                <button
                  onClick={() => {
                    setShowPushModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-1 text-left text-sm hover:bg-zinc-700 text-gray-200"
                >
                  Push Due Date
                </button>
                <button
                  onClick={() => {
                    setShowEditModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-1 text-left text-sm hover:bg-zinc-700 text-gray-200"
                >
                  Edit details
                </button>
                <button
                  onClick={() => {
                    setShowDeleteModal(true);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 pb-1 text-left text-sm text-red-400 hover:bg-zinc-700"
                >
                  Delete Task
                </button>
              </div>
            </>
          )}
        </div>

        {/* Title and Description */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              handleDone(!isComplete);
              if (!isParticipant) return;
              setIsComplete(!isComplete);
            }}
            className=""
          >
            {isComplete ? (
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
              <span className={getStatusColor()}>
                {formatDate((task.dueDate))}
              </span>
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
      {/* Modals */}
      {showAssignModal && (
        <AssignTaskModal
          members={projectMembers}
          selected={task.participants.map((p) => p._id)}
          onAssign={(userIds) => {
            setShowAssignModal(false);
            handleAssign(userIds);
          }}
          canAssign={isAdmin}
          onClose={() => setShowAssignModal(false)}
        />
      )}

      {showDeleteModal && (
        <DeleteTaskConfirmation
          taskTitle={task.title}
          onConfirm={() => {
            setShowDeleteModal(false);
            handleDelete();
          }}
          onClose={() => setShowDeleteModal(false)}
          canDelete={isAdmin}
        />
      )}

      {showPushModal && (
        <PushDueDateModal
          currentDueDate={task.dueDate}
          onPush={(newDate) => {
            setShowPushModal(false);
            handlePushDueDate(newDate);
            console.log(newDate)
          }}
          onClose={() => setShowPushModal(false)}
        />
      )}
      {showEditModal && (
        <TaskEditModal
          task={task}
          canEdit={isAdmin}
          onUpdate={(updates) => {
            setShowEditModal(false);
            handleUpdateTask(updates);
          }}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
}
