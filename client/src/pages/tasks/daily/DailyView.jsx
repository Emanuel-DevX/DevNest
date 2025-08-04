import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import TaskCard from "./TaskCard";
import fetcher from "../../../lib/api";
import { useSearchParams } from "react-router-dom";

const DailyView = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const getInitialDate = () => {
    const urlDate = searchParams.get("date");
    return urlDate ? new Date(urlDate) : new Date();
  };
  const [selectedDate, setSelectedDate] = useState(getInitialDate());
  useEffect(() => {
    const formatted = formatDateForAPI(selectedDate);
    setSearchParams({ date: formatted });
  }, [selectedDate]);

  useEffect(() => {
    const urlDate = searchParams.get("date");
    if (urlDate) {
      const parsed = new Date(urlDate);
      if (!isNaN(parsed)) setSelectedDate(parsed);
    }
  }, [searchParams]);

  // Format date for API call (YYYY-MM-DD)
  const formatDateForAPI = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Check if selected date is today
  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Fetch tasks for selected date
  const fetchDailyTasks = async (date = selectedDate) => {
    try {
      setLoading(true);
      const formattedDate = formatDateForAPI(date);
      const res = await fetcher(`/tasks/daily?date=${formattedDate}`);

      setTasks(res);
    } catch (error) {
      console.error("Error fetching daily tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const prevDay = new Date(selectedDate);
    prevDay.setDate(prevDay.getDate() - 1);
    setSelectedDate(prevDay);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setSelectedDate(nextDay);
  };

  // Go to today
  const goToToday = () => {
    setSelectedDate(new Date());
  };

  // Fetch tasks when date changes
  useEffect(() => {
    fetchDailyTasks(selectedDate);
  }, [selectedDate]);
  return (
    <div className="flex flex-col gap-4">
      {/* Header with date navigation */}
      <div className="border p-2 rounded-xl border-zinc-800 flex items-center justify-center relative">
        <div className="absolute top-1 right-1 flex items-center gap-4">
          {!isToday(selectedDate) && (
            <button
              onClick={goToToday}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium text-teal-400 bg-teal-400/10 hover:bg-teal-400/20 rounded-md transition-colors"
            >
              <Calendar className="h-3 w-3" />
              Today
            </button>
          )}
        </div>
        <div className="flex items-center justify-center py-4 ">
          <div className="flex items-center gap-1">
            <button
              onClick={goToPreviousDay}
              className="p-2 text-zinc-400 hover:text-teal-300 hover:bg-zinc-700 rounded-md transition-colors"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="px-4 py-2  rounded-md min-w-0">
              <p className="text-sm font-medium text-white text-center whitespace-nowrap">
                {formatDateForDisplay(selectedDate)}
                {isToday(selectedDate) && (
                  <span className="text-xs text-teal-400 text-center">
                    {" "}
                    (Today)
                  </span>
                )}
              </p>
            </div>

            <button
              onClick={goToNextDay}
              className="p-2 text-zinc-400 hover:text-teal-300 hover:bg-zinc-700 rounded-md transition-colors"
              aria-label="Next day"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tasks list */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-300"></div>
          </div>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              onUpdate={() => fetchDailyTasks(selectedDate)}
              task={task}
              date={selectedDate}
            />
          ))
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm">
              No tasks scheduled for{" "}
              {isToday(selectedDate) ? "today" : "this day"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyView;
