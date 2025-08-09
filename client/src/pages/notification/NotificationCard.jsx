import { Bell, CheckCircle, Info, Check, X } from "lucide-react";

export default function NotificationCard({
  notification,
  onClick,
  onMarkAsRead,
  onDismiss,
}) {
  const { title, body, type, readAt, link, createdAt } = notification;
  const isRead = Boolean(readAt);
  const typeStyles = {
    TASK_ASSIGNED: {
      card: "bg-gradient-to-r from-zinc-950 via-teal-400/5 to-zinc-950/5 border-teal-500/30 ",
      text: "text-teal-300",
      icon: "text-teal-400",
    },
    TASK_UPDATED: {
      card: "bg-gradient-to-r from-zinc-950 to-yellow-600/5 border-yellow-500/30",
      text: "text-yellow-300",
      icon: "text-yellow-400",
    },
    SYSTEM: {
      card: "bg-gradient-to-r from-purple-500/10 to-purple-600/5 border-purple-500/30",
      text: "text-purple-300",
      icon: "text-purple-400",
    },
    default: {
      card: "bg-gradient-to-r from-zinc-950 via-zinc-800 to-zinc-900/10 border-zinc-700/50 ",
      text: "text-zinc-200",
      icon: "text-zinc-400",
    },
  };

  const styles = typeStyles[type] || typeStyles.default;

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString();
  };

  const handleMarkAsRead = (e) => {
    e.stopPropagation();
    if (!isRead && onMarkAsRead) {
      onMarkAsRead(notification._id);
    }
  };

  const handleDismiss = (e) => {
    e.stopPropagation();
    if (onDismiss) {
      onDismiss(notification._id);
    }
  };

  return (
    <div
      className={`relative flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 cursor-pointer transform hover:scale-[1.005] hover:shadow-lg ${
        styles.card
      } ${isRead ? "opacity-70 hover:opacity-90" : "shadow-md"}`}
      onClick={()=>onClick(notification)}
    >
      {/* Unread indicator */}
      {!isRead && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-teal-500 to-teal-600 rounded-r-full opacity-80" />
      )}

      {/* Icon */}
      <div className="flex-shrink-0 mt-1 relative">
        <div className={`p-2 rounded-lg bg-black/20 border border-white/10 `}>
          {type === "TASK_ASSIGNED" ? (
            <CheckCircle className={`w-4 h-4 ${styles.icon}`} />
          ) : type === "TASK_UPDATED" ? (
            <Info className={`w-4 h-4 ${styles.icon}`} />
          ) : (
            <Bell className={`w-4 h-4 ${styles.icon}`} />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3
            className={`text-sm font-semibold leading-tight ${styles.text} ${!isRead ? "font-bold" : ""}`}
          >
            {title}
          </h3>

          {/* Action buttons */}
          <div className="flex items-center gap-1 ">
            {!isRead && (
              <button
                onClick={handleMarkAsRead}
                className="p-1.5 rounded-md bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 hover:border-green-500/50 transition-colors"
                title="Mark as read"
              >
                <Check className="w-3 h-3 text-green-400" />
              </button>
            )}
            {onDismiss && (
              <button
                onClick={handleDismiss}
                className="p-1.5 rounded-md bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 transition-colors"
                title="Dismiss"
              >
                <X className="w-3 h-3 text-red-400" />
              </button>
            )}
          </div>
        </div>

        {body && (
          <p className="text-sm opacity-80 mt-1 leading-relaxed line-clamp-2 text-zinc-300">
            {body}
          </p>
        )}

        <div className="flex items-center justify-between mt-2">
          <p className="text-xs text-zinc-500">
            {createdAt ? formatTimeAgo(createdAt) : "Recently"}
          </p>
          <div className="flex items-center gap-1">
            {isRead && (
              <div className="flex items-center gap-1 text-xs text-green-400/80">
                <Check className="w-3 h-3" />
                <span>Read</span>
              </div>
            )}
            {!isRead && (
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
