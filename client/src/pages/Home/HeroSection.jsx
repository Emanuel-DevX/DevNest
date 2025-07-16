import React from "react";
import {
  Code,
  FolderOpen,
  StickyNote,
  GitBranch,
  Zap,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { isAuthenticated, login } from "../../lib/auth";

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="relative h-[90vh]  overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Code Elements */}
        <div className="absolute top-20 left-10 text-teal-400/20 text-6xl font-mono animate-pulse">
          {"{ }"}
        </div>
        <div className="absolute top-40 right-20 text-emerald-400/20 text-4xl font-mono animate-bounce">
          &lt;/&gt;
        </div>

        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-teal-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-cyan-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            Built for Developers, By Developers
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-transparent bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 bg-clip-text">
              Your Dev
            </span>
            <br />
            <span className="text-white font-mono">Productivity</span>
            <br />
            <span className="text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text">
              Sanctuary
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Manage all your projects, notes, and ideas in one intelligent
            workspace.
            <span className="text-teal-400 font-semibold">DevNest</span> boosts
            your productivity with
            <span className="text-emerald-400 font-semibold">
              {" "}
              AI-powered task generation
            </span>{" "}
            and seamless workflow organization.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-12">
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-2 text-xs mb-10">
              {[
                {
                  label: "Project Management",
                  icon: <FolderOpen className="w-3.5 h-3.5 text-teal-400" />,
                },
                {
                  label: "Smart Notes",
                  icon: <StickyNote className="w-3.5 h-3.5 text-emerald-400" />,
                },
                {
                  label: "Code Snippets",
                  icon: <Code className="w-3.5 h-3.5 text-teal-400" />,
                },
                {
                  label: "AI Task Generator",
                  icon: <Zap className="w-3.5 h-3.5 text-cyan-400" />,
                },
                {
                  label: "Daily Task Planner",
                  icon: <GitBranch className="w-3.5 h-3.5 text-amber-400" />,
                },
              ].map(({ label, icon }, idx) => (
                <div
                  key={idx}
                  className="hover:scale-105 transition-transform duration-200 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full text-gray-300 backdrop-blur-sm"
                >
                  {icon}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                if (isAuthenticated()) {
                  navigate("/dashboard");
                } else {
                  login();
                }
              }}
              className="group relative px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-lg hover:shadow-teal-500/25"
            >
              <span className="relative z-10">Start Building</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>

            <a
              href="#features"
              className="group px-8 py-4 border-2 border-teal-500/50 hover:border-teal-400 text-teal-400 hover:text-teal-300 font-semibold rounded-lg transition-all duration-300 hover:bg-teal-500/10 backdrop-blur-sm flex items-center gap-3"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="5,3 19,12 5,21 5,3"></polygon>
              </svg>
              Explore Features
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-teal-400/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-teal-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
