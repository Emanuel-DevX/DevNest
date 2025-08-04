import React, { useEffect, useState } from "react";
import TaskCard from "../daily/TaskCard"; // Adjust the import based on your structure
import fetcher from "../../../lib/api";
import { getStartOfWeek, getLocalDateString, formatDate } from "@/lib/date"


const WeeklyView = () => {
  const [tasksByDate, setTasksByDate] = useState({});
  const [weekDates, setWeekDates] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const startOfWeek = getStartOfWeek(new Date());
      const week = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(startOfWeek);
        d.setDate(d.getDate() + i);
        return d;
      });

      setWeekDates(week);

      const tasks = await fetcher(
        `/tasks/weekly?start=${startOfWeek.toISOString().split("T")[0]}`
      );

      // Group tasks by date (assuming tasks have .dueDate)
      const grouped = {};
      tasks.forEach((task) => {
        const date = new Date(task.dueDate).toISOString().split("T")[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(task);
      });

      setTasksByDate(grouped);
    };

    fetchTasks();
  }, []);

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:flex gap-4">
        {weekDates.map((d) => {
          const key = getLocalDateString(d);
          return (
            <div
              key={key}
              className="flex-1 bg-zinc-800 p-3 rounded-xl shadow-sm"
            >
              <h4 className="text-white text-sm font-medium mb-2 text-center">
                {formatDate(d)}
              </h4>
              <div className="flex flex-col gap-2">
                {tasksByDate[key]?.length ? (
                  tasksByDate[key].map((task) => (
                    <TaskCard key={task._id} task={task} date={key} />
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
      <div className="md:hidden flex flex-col gap-4">
        {weekDates.map((d) => {
          const key =getLocalDateString(d);
          return (
            <div key={key} className="bg-zinc-800 p-4 rounded-xl shadow-sm">
              <h4 className="text-white text-base font-semibold mb-2">
                {formatDate(d)}
              </h4>
              <div className="flex flex-col gap-2">
                {tasksByDate[key]?.length ? (
                  tasksByDate[key].map((task) => (
                    <TaskCard key={task._id} task={task} date={key} />
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
