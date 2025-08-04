import { Clock } from "lucide-react";
import { getTimeRangeString } from "@/lib/date";

export default function WeeklyTaskCard({ task }) {
  const { startTime, endTime } = getTimeRangeString(
    task.userSchedule?.scheduledAt,
    task.userSchedule?.duration
  );

  return (
    <div className="bg-zinc-800/60 rounded-lg p-3 border border-zinc-700 shadow-sm hover:bg-zinc-700/60 transition-all">
      <h4 className="text-xs font-semibold  text-white truncate">
        {task.title}
      </h4>
      <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
        <Clock className="w-4 h-4" />
        <span>
          {startTime || "Unscheduled"}
          {startTime && endTime && ` - ${endTime}`}
        </span>
      </div>
    </div>
  );
}
