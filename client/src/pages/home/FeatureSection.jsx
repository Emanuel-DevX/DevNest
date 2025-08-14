"use client";

import {
  Brain,
  CalendarCheck,
  ClipboardCheck,
  Users,
  NotebookPen,
  Code2,
} from "lucide-react";

export default function FeatureSection() {
  const features = [
    {
      title: "AI Task Generation",
      description:
        "Turn your project ideas into structured task lists instantly using AI. Let DevNest handle the planning so you can focus on building.",
      icon: <Brain className="w-6 h-6 text-teal-400" />,
    },
    {
      title: "Smart Calendar Integration",
      description:
        "Visualize your tasks and sprints in a unified calendar. Stay on top of deadlines with built-in scheduling tools.",
      icon: <CalendarCheck className="w-6 h-6 text-emerald-400" />,
    },
    {
      title: "Daily Task Planner",
      description:
        "Plan your day like a pro. Organize priorities, set focus goals, and track what matters in your daily flow.",
      icon: <ClipboardCheck className="w-6 h-6 text-cyan-400" />,
    },
    {
      title: "Team Collaboration",
      description:
        "Work together in shared workspaces. Assign tasks, leave notes, and sync progress in real-time.",
      icon: <Users className="w-6 h-6 text-pink-400" />,
    },
    {
      title: "Markdown Notes & Code Snippets",
      description:
        "Store and format rich notes or reusable code in one place. Everything searchable and beautifully organized.",
      icon: <NotebookPen className="w-6 h-6 text-yellow-400" />,
    },
    {
      title: "Built for Developers",
      description:
        "Clean UI, keyboard shortcuts, and blazing-fast performance. DevNest is made for devs, by devs.",
      icon: <Code2 className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section id="features" className=" py-20 px-6 ">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Supercharge Your Workflow
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-16">
          Discover how DevNest helps developers work smarter, not harder.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-slate-800 rounded-xl p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
