import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "@/lib/date";

export default function NoteCard({ note, basePath }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`${basePath}/${note._id}`}
      className="block group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`m-1
        p-4 rounded-lg border border-zinc-700 
        bg-gradient-to-br from-zinc-900/80 to-zinc-800/60
        backdrop-blur-sm
        transition-all duration-300 ease-out
        hover:border-zinc-600 hover:shadow-lg hover:shadow-zinc-900/20
        hover:-translate-y-0.5 hover:scale-[1.01]
        relative
      `}
      >
        {/* Subtle glow effect on hover */}
        <div
          className={`
          absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500/10 to-zinc-950/5
          transition-opacity duration-300
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        />

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-white mb-2 transition-colors duration-200 group-hover:text-blue-100">
            {note.title || "Untitled"}
          </h3>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
              by {note.author?.name || "Unknown"}
            </span>

            <div className="flex items-center gap-2">
              <div
                className={`
                w-1.5 h-1.5 rounded-full bg-emerald-400
                transition-all duration-300
                ${isHovered ? "scale-125 shadow-sm shadow-emerald-400/50" : ""}
              `}
              />
              <span className="text-gray-500 group-hover:text-gray-400 transition-colors duration-200">
                {formatDate(new Date(note.updatedAt)).toString() }
              </span>
            </div>
          </div>
        </div>

      </div>
    </Link>
  );
}
