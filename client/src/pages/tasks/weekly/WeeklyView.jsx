import React, { useEffect, useState } from "react";
import WeeklyTaskCard from "./WeeklyTaskCard"; // Adjust the import based on your structure
import fetcher from "../../../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getStartOfWeek,
  getLocalDateString,
  formatDate,
  getDateRangeForAPI,
} from "@/lib/date";

const WeeklyView = () => {
  const [tasksByDate, setTasksByDate] = useState({});
  const [weekDates, setWeekDates] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedWeekStart, setSelectedWeekStart] = useState(() => {
    const param = searchParams.get("date");
    if (param) {
      const [y, m, d] = param.split("-").map(Number);
      return getStartOfWeek(new Date(y, m - 1, d));
    }
    return getStartOfWeek(new Date());
  });
  useEffect(() => {
    const weekStartStr = getLocalDateString(selectedWeekStart);
    // setSearchParams({ date: weekStartStr });
    navigate(`?date=${weekStartStr}`);
  }, [selectedWeekStart]);

  useEffect(() => {
    const fetchTasks = async () => {
      const startOfWeek = selectedWeekStart;
      const week = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
      });
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6); // full 7-day week
      const { startDate, endDate } = getDateRangeForAPI(startOfWeek, endOfWeek);
      setWeekDates(week);

      const tasks = await fetcher(
        `/tasks/range?startDate=${startDate}&endDate=${endDate}`
      );

      // Group tasks by date (assuming tasks have .dueDate)
      const grouped = {};
      tasks.forEach((task) => {
        const schedule = task.userSchedule;

        // Recurring task (with list of occurrences)
        if (
          schedule?.recurring?.isRecurring &&
          Array.isArray(schedule.recurring.occurrences)
        ) {
          schedule.recurring.occurrences.forEach((occ) => {
            const localDateStr = getLocalDateString(new Date(occ.date));
            if (!grouped[localDateStr]) grouped[localDateStr] = [];
            grouped[localDateStr].push({ ...task, ...occ }); // merge occ info into task if needed
          });
        }

        // One-time task
        else {
          const localDateStr = getLocalDateString(new Date(task.dueDate));
          if (!grouped[localDateStr]) grouped[localDateStr] = [];
          grouped[localDateStr].push(task);
        }
      });

      setTasksByDate(grouped);
    };

    fetchTasks();
  }, [selectedWeekStart]);

  const goToNextWeek = () => {
    const nextWeek = new Date(selectedWeekStart);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setSelectedWeekStart(nextWeek);
  };
  const goToPrevioustWeek = () => {
    const prevWeek = new Date(selectedWeekStart);
    prevWeek.setDate(prevWeek.getDate() - 7);
    setSelectedWeekStart(prevWeek);
  };

  return (
    <div className="w-full">
      <div className="text-white text-lg font-semibold mb-4 flex items-center justify-center gap-2">
        <button
          onClick={goToPrevioustWeek}
          className="p-2 text-zinc-400 hover:text-teal-300 hover:bg-zinc-700 rounded-md transition-colors"
          aria-label="Next day"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <h2>
          Week of{" "}
          {selectedWeekStart.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={goToNextWeek}
          className="p-2 text-zinc-400 hover:text-teal-300 hover:bg-zinc-700 rounded-md transition-colors"
          aria-label="Next day"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>{" "}
      {/* Desktop View */}
      <div className="hidden gap-2 lg:grid grid-cols-7">
        {weekDates.map((d) => {
          const key = getLocalDateString(d);
          return (
            <div
              onClick={() => {
                const formatted = getLocalDateString(d); // → "2025-08-07"
                navigate(`/tasks/daily?date=${formatted}`);
              }}
              key={key}
              className=" cursor-pointer   bg-zinc-900 p-1 py-3 rounded-xl shadow-sm"
            >
              <h4 className="text-teal-300 text-sm font-medium mb-2 text-center">
                {formatDate(d)}
              </h4>
              <div className="flex flex-col gap-2">
                {tasksByDate[key]?.length ? (
                  tasksByDate[key].map((task) => (
                    <WeeklyTaskCard key={task._id} task={task} date={key} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm text-center">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile View */}
      <div className="lg:hidden flex flex-col gap-3">
        {weekDates.map((d) => {
          const key = getLocalDateString(d);
          return (
            <div
              onClick={() => {
                const formatted = getLocalDateString(d); // → "2025-08-07"
                navigate(`/tasks/daily?date=${formatted}`);
              }}
              key={key}
              className="bg-zinc-900 py-3 p-2 rounded-xl shadow-sm"
            >
              <h4 className="text-teal-300 text-base font-semibold mb-2">
                {formatDate(d)}
              </h4>
              <div className="flex flex-col gap-2">
                {tasksByDate[key]?.length ? (
                  tasksByDate[key].map((task) => (
                    <WeeklyTaskCard key={task._id} task={task} date={key} />
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeeklyView;
