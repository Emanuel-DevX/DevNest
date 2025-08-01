import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Notebook,
  CheckSquare,
  Calendar,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Bell,
  BellDot,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import ProjectBar from "./ProjectBar";

const SideNavbar = function ({ setExpand }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const location = useLocation();
  const isActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setCollapsed(mobile);
      setExpand(mobile);
    };

    handleResize(); // run once on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // clean up
    };
  }, []);
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
    {
      name: "Notifications",
      icon: hasUnread ? (
        <div className="relative" >
          <Bell size={20} />
          <span className="absolute w-2 h-2 bg-red-500 rounded-full -top-1 -right-1"></span>
        </div>
      ) : (
        <Bell size={20} />
      ),
      path: "/notifications",
    },
  ];

  return (
    <>
      <nav
        className={`h-screen md:bg-zinc-950/10 bg-[#0e0d0d] border-r border-teal-300/10 transition-all duration-300
        ${collapsed ? "w-16" : "w-48"} fixed z-40`}
      >
        {/* Top Section */}
        <div className="h-full flex flex-col overflow-hidden">
          {/* Toggle Button */}
          <div
            className={`flex  p-2 ${collapsed ? "justify-center" : "justify-start pl-5"}`}
          >
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
          <button
            onClick={() => {
              if (isMobile) {
                setCollapsed(true);
              }
            }}
          >
            <ul className=" px-2 space-y-1 ">
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
              <hr className="h-[0.2px]  bg-gray-700 mx-3 my-1 border-none" />
            </ul>
          </button>
          <h2
            className={`font-bold ml-2 mt-2 pb-2  text-teal-400 ${collapsed ? "text-xs" : "text-lg"}`}
          >
            Projects
          </h2>
          <div className="px-4 pb-4 max-h-80 overflow-auto hide-scrollbar">
            <ProjectBar collapsed={collapsed} />
          </div>
        </div>
      </nav>
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}
    </>
  );
};

export default SideNavbar;
