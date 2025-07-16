import { useState } from "react";
import {
  LayoutDashboard,
  Notebook,
  CheckSquare,
  Calendar,
  Settings,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/dashboard",
  },
  { name: "Notes", icon: <Notebook size={20} />, path: "/notes" },
  { name: "Tasks", icon: <CheckSquare size={20} />, path: "/tasks" },
  {
    name: "Settings",
    icon: <Settings size={20} />,
    path: "/settings",
  },
];

const SideNavbar = function ({ setExpand }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={`h-screen bg-zinc-950 border-r border-teal-300/50 transition-all duration-300
        ${collapsed ? "w-16" : "w-48"} fixed z-50`}
      >
        {/* Top Section */}
        <div className="h-full flex flex-col overflow-hidden">
          {/* Toggle Button */}
          <div className={`flex  p-2 ${collapsed ? "justify-center" : "justify-start pl-5"}`}>
            <button
              onClick={() => {
                setCollapsed((prev) => !prev);
                setExpand(!collapsed);
              }}
              className="text-teal-300 hover:text-teal-400 transition-colors"
              aria-label="Toggle Sidebar"
            >
              {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
            </button>
          </div>

          {/* Menu Items */}
          <ul className="flex-1 px-2 space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 
                  text-white hover:bg-zinc-800 ${
                    isActive(item.path)
                      ? "bg-zinc-800 text-teal-400"
                      : "text-gray-300"
                  }`}
                >
                  <span>{item.icon}</span>
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.name}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Optional: Footer Actions */}
          <div className="px-2 pb-4">
            {/* Add more options like logout or profile here if needed */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideNavbar;
