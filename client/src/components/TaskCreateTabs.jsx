import { useState } from "react";
import AddTask from "./AddTaskForm";
import AiTaskGen from "./AiTaskGenForm";

export default function TaskCreator(onClose) {
  const [activeTab, setActiveTab] = useState("add"); // "add" or "ai"

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/80 flex justify-center items-center">
      <div className="bg-zinc-900 w-sm min-w-[22rem]  rounded-xl p-4 h-127 overflow-y-auto custom-scrollbar">
        {/* Tab Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab("add")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              activeTab === "add"
                ? "bg-teal-600 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
          >
            Add Task
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              activeTab === "ai"
                ? "bg-teal-600 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
          >
            AI Task Generation
          </button>
        </div>

        {/* Content */}
        <div className="">
          {activeTab === "add" ? (
            <AddTask onClose={onClose} />
          ) : (
            <AiTaskGen onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}
