import { useState } from "react";
import { ChevronDown, Users, Settings, Calendar, Pin } from "lucide-react";

const ProjectMeta = function ({ project }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-gradient-to-br from-black via-teal-900/14 to-black border border-teal-500/20 rounded-xl p-6 mb-6 shadow-md shadow-teal-500/10">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          {project.pinned && (
            <div className="mt-1">
              <Pin className="w-4 h-4 text-teal-400 fill-current" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              {project.name}
              {project.protected && (
                <span className="text-xs bg-black/40 text-teal-300 px-2 py-1 rounded-full border border-teal-500/30">
                  Protected
                </span>
              )}
            </h1>
            <p className="text-gray-300 leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>

        {/* Members Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-black/20 hover:bg-black/30 text-white px-4 py-2 rounded-lg transition-all duration-200 border border-teal-500/30 hover:border-teal-400/50 backdrop-blur-sm"
          >
            <Users className="w-4 h-4" />
            <span className="md:block hidden">Members</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-64 bg-black/60 backdrop-blur-xl border border-teal-500/30 rounded-lg shadow-xl z-20 overflow-hidden">
                <div className="p-4 border-b border-teal-500/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-teal-300">
                      Project Members
                    </span>
                    <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-1 rounded-full">
                      {project.members?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Current user avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white text-sm font-medium border-2 border-teal-500/30">
                      U
                    </div>
                    {/* +X more */}
                    {project.members?.length > 1 && (
                      <div className="text-sm text-teal-300">
                        +{project.members.length - 1} more
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      window.location.href = `/project/${project._id}/settings/members`;
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-teal-300 hover:bg-teal-500/10 rounded-md transition-colors duration-200"
                  >
                    <Settings className="w-4 h-4" />
                    Manage Members
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
          <span className="text-white font-medium">{project.taskCount}</span>
          <span className="text-gray-400">Tasks</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <span className="text-white font-medium">{project.noteCount}</span>
          <span className="text-gray-400">Notes</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>Updated {formatDate(project.updatedAt)}</span>
        </div>

        {project.sprints?.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
            <span className="text-white font-medium">
              {project.sprints.length}
            </span>
            <span className="text-gray-400">Sprints</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectMeta;
