// components/NotificationCard.jsx
import { Bell, CheckCircle, Info } from "lucide-react";

export default function NotificationCard({
  title,
  body,
  type,
  readAt,
  link,
  onClick,
}) {
  const isRead = Boolean(readAt);

  const typeStyles = {
    TASK_ASSIGNED: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    TASK_UPDATED: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    default: "bg-zinc-800/50 text-zinc-200 border-zinc-700",
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer hover:bg-zinc-800/70 transition-colors ${
        typeStyles[type] || typeStyles.default
      }`}
      onClick={onClick}
    >
      <div className="flex-shrink-0 mt-1">
        {type === "TASK_ASSIGNED" ? (
          <CheckCircle className="w-5 h-5 text-blue-400" />
        ) : type === "TASK_UPDATED" ? (
          <Info className="w-5 h-5 text-yellow-400" />
        ) : (
          <Bell className="w-5 h-5 text-zinc-400" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        {body && <p className="text-sm opacity-80 line-clamp-2">{body}</p>}
        <p className="text-xs text-zinc-500 mt-1">
          {isRead ? "Read" : "Unread"}
        </p>
      </div>
    </div>
  );
}
