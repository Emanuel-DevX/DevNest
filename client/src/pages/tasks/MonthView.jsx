import { useState } from "react";

const MonthView = function () {
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Sample tasks data
  const tasks = [
    { id: 1, date: "2025-07-02", title: "Team meeting" },
    { id: 2, date: "2025-07-02", title: "Code review" },
    { id: 3, date: "2025-07-05", title: "Project deadline" },
    { id: 4, date: "2025-07-08", title: "Client call" },
    { id: 5, date: "2025-07-12", title: "Fix navbar bug" },
    { id: 6, date: "2025-07-12", title: "Update docs" },
    { id: 7, date: "2025-07-15", title: "Sprint planning" },
    { id: 8, date: "2025-07-18", title: "Deploy to staging" },
    { id: 9, date: "2025-07-22", title: "Performance review" },
    { id: 10, date: "2025-07-25", title: "Holiday planning" },
    { id: 11, date: "2025-07-28", title: "Team lunch" },
    { id: 12, date: "2025-07-30", title: "Month end reports" },
  ];

  // Get calendar data
  const getCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);

    // Get day of week (0 = Sunday, 1 = Monday, etc.)
    // Convert to our format where Monday = 0
    const startDay = (firstDay.getDay() ) % 7;

    const daysInMonth = lastDay.getDate();
    const calendarDays = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startDay; i++) {
      calendarDays.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      calendarDays.push(day);
    }

    // Fill remaining cells to complete the grid (35 cells = 5 rows × 7 days)
    while (calendarDays.length < 35) {
      calendarDays.push(null);
    }

    return calendarDays;
  };

  // Get tasks for a specific date
  const getTasksForDate = (day) => {
    if (!day) return [];
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return tasks.filter((task) => task.date === dateString);
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

  const calendarDays = getCalendarData();
  const today = new Date();
  const isToday = (day) => {
    return (
      day &&
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

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
          const isCurrentDay = isToday(day);

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
                    {dayTasks.map((task, taskIndex) => (
                      <div
                        key={task.id}
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
