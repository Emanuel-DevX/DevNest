import { useState } from "react";
import { ChevronDown, Calendar, Clock, List } from "lucide-react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

import MonthView from "./monthly/MonthView";
import WeeklyView from "./weekly/WeeklyView";
import DailyView from "./daily/DailyView";

const views = {
  daily: {
    component: <DailyView />,
    icon: Clock,
    label: "Daily",
  },
  weekly: {
    component: <WeeklyView />,
    icon: List,
    label: "Weekly",
  },
  monthly: {
    component: <MonthView />,
    icon: Calendar,
    label: "Monthly",
  },
};

const Tasks = function () {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const currentViewKey = location.pathname.split("/").pop(); // "daily"
  const currentView = views[currentViewKey] || views["daily"];
  const CurrentIcon = currentView.icon;

  return (
    <div className="font-inter  min-h-screen text-white">
      <div className="flex justify-between items-center pb-6">
        <h1 className="text-2xl font-bold ">{currentView.label} Tasks</h1>

        {/* Dropdown Button */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 border border-emerald-300/20 rounded-lg shadow-sm hover:bg-zinc-950 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/50"
          >
            <CurrentIcon className="w-4 h-4 text-teal-400" />
            <span className="md:font-medium text-sm md:text-md">
              {currentView.label}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-teal-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-zinc-950 border border-emerald-300/20 rounded-lg shadow-lg z-10">
              {Object.entries(views).map(([key, viewData]) => {
                const IconComponent = viewData.icon;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      navigate(`/tasks/${key}`); // preserve ?date=
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-zinc-800 first:rounded-t-lg last:rounded-b-lg transition-colors
                      ${currentViewKey === key ? " bg-zinc-900 text-teal-300" : "text-white bg-zinc-950"}
                    `}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{viewData.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Close dropdown when clicking outside */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}

      {/* Current View */}
      <div className="min-h-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Tasks;
