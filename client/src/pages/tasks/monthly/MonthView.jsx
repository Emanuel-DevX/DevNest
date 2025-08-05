import { useEffect, useState } from "react";
import fetcher from "../../../lib/api";
import {
  getLocalDateString,
  getMonthRangeUTC,
  getCalendarData,
  isToday,
} from "@/lib/date";
const MonthView = function () {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [tasksByDate, setTasksByDate] = useState({}); // { "YYYY-MM-DD": Task[] }

  // Get tasks for a specific calendar cell (day number)
  const getTasksForDate = (day) => {
    if (!day) return [];
    const key = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasksByDate[key] || [];
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const calendarDays = getCalendarData(currentDate);

  useEffect(() => {
    const fetchMonth = async () => {
      try {
        const { startDate, endDate } = getMonthRangeUTC(currentDate);
        const tasks = await fetcher(
          `/tasks/range?startDate=${startDate}&endDate=${endDate}`
        );

        // Group by LOCAL day, preferring userSchedule.scheduledAt over dueDate
        const grouped = {};
        for (const t of tasks) {
          const when = t.userSchedule?.scheduledAt || t.dueDate;
          if (!when) continue;
          const key = getLocalDateString(new Date(when)); // "YYYY-MM-DD" in local timezone
          if (!grouped[key]) grouped[key] = [];
          grouped[key].push(t);
        }

        // sort tasks within a day by start time
        Object.keys(grouped).forEach((k) => {
          grouped[k].sort((a, b) => {
            const aWhen = a.userSchedule?.scheduledAt || a.dueDate;
            const bWhen = b.userSchedule?.scheduledAt || b.dueDate;
            return new Date(aWhen) - new Date(bWhen);
          });
        });

        setTasksByDate(grouped);
      } catch (e) {
        // setError(e?.message || "Failed to load tasks");
        setTasksByDate({});
      } finally {
        // setLoading(false);
      }
    };

    fetchMonth();
  }, [currentDate]);

  return (
    <div className="w-full max-w-screen-lg mx-auto overflow-hidden mt-2">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="px-3 py-1 bg-teal-500 text-black rounded hover:bg-teal-600 transition-colors"
        >
          ← Prev
        </button>
        <h2 className="text-xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <button
          onClick={nextMonth}
          className="px-3 py-1 bg-teal-500 text-black rounded hover:bg-teal-600 transition-colors"
        >
          Next →
        </button>
      </div>

      {/* Day Headers */}
      <header className="grid grid-cols-7 w-full mb-2">
        {days.map((day, i) => (
          <div key={i} className="text-center font-medium py-2 text-sm">
            {day}
          </div>
        ))}
      </header>

      {/* Calendar Grid */}
      <main className="grid grid-cols-7  gap-px w-full">
        {calendarDays.map((day, index) => {
          const dayTasks = getTasksForDate(day);
          const isCurrentDay = isToday(new Date(day));

          return (
            <div
              key={index}
              className={`ring ring-emerald-300/10 h-32 md:h-36 p-[1px] overflow-hidden relative hover:text-white text-teal-400
                ${day ? "hover:bg-teal-500/10 hover:text-white" : "bg-zinc-900/50"}
                ${isCurrentDay ? "bg-emerald-500/10" : ""}
              `}
            >
              {day && (
                <>
                  {/* Day number */}
                  <div
                    className={`text-xs sm:text-sm font-medium mb-1  
                    ${isCurrentDay ? "text-teal-300" : "text-white"}
                  `}
                  >
                    {day}
                  </div>

                  {/* Tasks */}
                  <div className="space-y-px ">
                    {dayTasks.map((task) => (
                      <div
                        key={task._id + task.scheduledAt?.toString()}
                        className="text-xs  px-1 py-0.5 rounded truncate leading-tight"
                        title={task.title}
                      >
                        {task.title}
                      </div>
                    ))}
                  </div>

                  {/* Show count if too many tasks */}
                  {dayTasks.length > 3 && (
                    <div className="absolute bottom-1 right-1 text-xs text-gray-500 bg-gray-200 px-1 rounded">
                      +{dayTasks.length - 3}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default MonthView;
