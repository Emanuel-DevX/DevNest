import { useState } from "react";
import { ChevronDown, Clock, Calendar, Repeat } from "lucide-react";

const CustomizeTaskSchedule = function ({ task, onSave, onClose }) {
  const [duration, setDuration] = useState(task?.duration || 30);
  const [scheduledDate, setScheduledDate] = useState(
    task?.dueDate
      ? new Date(task.dueDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0]
  );
  const [scheduledTime, setScheduledTime] = useState("09:00");
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrencePattern, setRecurrencePattern] = useState("daily");
  const [recurrenceEndDate, setRecurrenceEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Generate time options with 30-minute intervals
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        const displayTime = new Date(
          `2000-01-01T${timeString}`
        ).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        times.push({ value: timeString, display: displayTime });
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const handleSave = () => {
    const [hours, minutes] = scheduledTime.split(":").map(Number);
    const dateObj = new Date(scheduledDate);
    dateObj.setHours(hours, minutes, 0, 0);
    const scheduleData = {
      taskId: task._id,
      duration: Math.floor(Number(duration)),
      scheduledDate: dateObj,
      isRecurring,
      recurrencePattern: isRecurring ? recurrencePattern : null,
      recurrenceEndDate: isRecurring ? new Date(recurrenceEndDate) : null,
    };

    onSave(scheduleData);
  };

  if (!task) {
    return (
      <div className="p-6 bg-gray-900 text-white rounded-lg">
        <p>No task data provided</p>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-50 bg-black/50">
      <div className="p-6 bg-zinc-900 text-white rounded-lg max-w-md mx-auto min-w-sm">
        <h2 className="text-xl font-bold mb-4 text-teal-400">
          Customize Task Schedule
        </h2>

        {/* Task Info Display */}
        <div className="mb-6 p-4 bg-zinc-800 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
          {task.description && (
            <p className="text-gray-300 text-sm mb-2">{task.description}</p>
          )}
          <div className="text-sm text-gray-400">
            <p>Original Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Estimated Duration: {task.duration} minutes</p>
          </div>
        </div>

        {/* Duration Adjustment */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Clock className="w-4 h-4" />
            Personal Duration (minutes)
          </label>
          <input
            type="number"
            min="15"
            step="15"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Scheduled Date */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium mb-2">
            <Calendar className="w-4 h-4" />
            Scheduled Date
          </label>
          <input
            type="date"
            value={scheduledDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setScheduledDate(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        {/* Scheduled Time */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Scheduled Time
          </label>
          <div className="relative">
            <select
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              className="w-full px-3 py-2 bg-zinc-800 border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none cursor-pointer custom-scrollbar"
            >
              {timeOptions.map((time) => (
                <option key={time.value} value={time.value}>
                  {time.display}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Recurring Toggle */}
        <div className="mb-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={(e) => setIsRecurring(e.target.checked)}
              className="w-4 h-4 text-teal-500 bg-gray-800 border-gray-600 rounded focus:ring-teal-500"
            />
            <span className="flex items-center gap-2 text-sm font-medium">
              <Repeat className="w-4 h-4" />
              Make this a recurring task
            </span>
          </label>
        </div>

        {/* Recurrence Pattern */}
        {isRecurring && (
          <div className="mb-6 p-4 bg-zinc-800 rounded-lg border border-gray-700">
            <label className="block text-sm font-medium mb-3">
              Repeat Pattern
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="recurrence"
                  value="daily"
                  checked={recurrencePattern === "daily"}
                  onChange={(e) => setRecurrencePattern(e.target.value)}
                  className="w-4 h-4 text-teal-500 bg-zinc-700 border-gray-600"
                />
                <span className="text-sm">Every day</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="recurrence"
                  value="weekly"
                  checked={recurrencePattern === "weekly"}
                  onChange={(e) => setRecurrencePattern(e.target.value)}
                  className="w-4 h-4 text-teal-500 bg-zinc-700 border-gray-600"
                />
                <span className="text-sm">Once a week</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="recurrence"
                  value="monthly"
                  checked={recurrencePattern === "monthly"}
                  onChange={(e) => setRecurrencePattern(e.target.value)}
                  className="w-4 h-4 text-teal-500 bg-zinc-700 border-gray-600"
                />
                <span className="text-sm">Every month</span>
              </label>
            </div>
            <label className="block text-sm font-medium mb-2 mt-4">
              End Date
            </label>
            <input
              type="date"
              value={recurrenceEndDate}
              min={scheduledDate}
              onChange={(e) => setRecurrenceEndDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-teal-600 hover:bg-teal-500 rounded-lg font-medium transition-colors"
          >
            Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizeTaskSchedule;
