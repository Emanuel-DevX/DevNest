import { useEffect, useState, useMemo } from "react";
import fetcher from "../../../lib/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getLocalDateString,
  getMonthRangeUTC,
  getCalendarData,
} from "@/lib/date";
const MonthView = function () {
  const [searchParams, setSearchParams] = useSearchParams();
  const days = useMemo(
    () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    []
  );
  const [tasksByDate, setTasksByDate] = useState({}); // { "YYYY-MM-DD": Task[] }
  const navigate = useNavigate();
  useEffect(() => {
    const m = searchParams.get("month");
    if (!m) {
      const now = new Date();
      setMonth(new Date(now.getFullYear(), now.getMonth(), 1), {
        replace: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const currentDate = useMemo(() => {
    const m = searchParams.get("month"); // "YYYY-MM"
    if (!m) return new Date();
    const [y, mm] = m.split("-").map(Number);
    if (!y || !mm) return new Date();
    return new Date(y, mm - 1, 1);
  }, [searchParams]);
  const setMonth = (date, opts = {}) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    setSearchParams({ month: `${y}-${m}` }, opts); // opts: { replace: true } if desired
  };

  // Navigate months
  const previousMonth = () => {
    setMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setMonth(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthNames = useMemo(
    () => [
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
    ],
    []
  );

  const calendarDays = useMemo(
    () => getCalendarData(currentDate),
    [currentDate]
  );

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
  const todayKey = getLocalDateString(new Date());

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
          const key =
            day &&
            `${currentDate.getFullYear()}-${String(
              currentDate.getMonth() + 1
            ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const dayTasks = day ? tasksByDate[key] || [] : [];
          const isCurrentDay = day && key === todayKey;

          return (
            <div
              onClick={() => {
                if (!day) return;
                // navigate to Daily for this cell's date
                navigate(`/tasks/daily?date=${key}`);
              }}
              key={index}
              className={`ring ring-emerald-300/10 h-32 md:h-36 p-[1px] overflow-hidden relative hover:text-white text-teal-400
                ${day ? "hover:bg-teal-500/10 hover:text-white cursor-pointer" : "bg-zinc-900/50"}
                ${isCurrentDay ? "bg-emerald-500/15 text-white font-bold" : ""}
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
                    {dayTasks.map((task) => {
                      const when =
                        task.userSchedule?.scheduledAt || task.dueDate || "";

                      return (
                        <div
                          key={`${task._id}-${when}`}
                          className="text-xs  px-1 py-0.5 rounded truncate leading-tight"
                          title={task.title}
                        >
                          {task.title}
                        </div>
                      );
                    })}
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
