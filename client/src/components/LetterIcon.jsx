import React from "react";

const LetterIcon = ({ letter, size = "md" }) => {
  // Light, muted color palette
  const colors = [
    "border-slate-400 text-slate-600",
    "border-gray-400 text-gray-600",
    "border-zinc-400 text-zinc-600",
    "border-stone-400 text-stone-600",
    "border-red-300 text-red-500",
    "border-orange-300 text-orange-500",
    "border-amber-300 text-amber-500",
    "border-yellow-300 text-yellow-500",
    "border-lime-300 text-lime-500",
    "border-green-300 text-green-500",
    "border-emerald-300 text-emerald-500",
    "border-teal-300 text-teal-500",
    "border-cyan-300 text-cyan-500",
    "border-sky-300 text-sky-500",
    "border-blue-300 text-blue-500",
    "border-indigo-300 text-indigo-500",
    "border-violet-300 text-violet-500",
    "border-purple-300 text-purple-500",
    "border-fuchsia-300 text-fuchsia-500",
    "border-pink-300 text-pink-500",
    "border-rose-300 text-rose-500",
  ];

  const sizeClasses = {
    sm: "w-8 h-8 text-sm border-2",
    md: "w-12 h-12 text-lg border-3",
    lg: "w-16 h-16 text-2xl border-4",
    xl: "w-20 h-20 text-3xl border-4",
  };

  // Get consistent color based on letter
  const char = letter.toUpperCase();
  const colorIndex = char.charCodeAt(0) % colors.length;
  const colorClass = colors[colorIndex];
  const sizeClass = sizeClasses[size];

  return (
    <div
      className={`
        ${sizeClass}
        ${colorClass}
        rounded-full
        border-solid
        
        flex 
        items-center 
        justify-center 
        font-bold 
        shadow-lg
        hover:shadow-xl
        transition-all
        duration-200
        hover:scale-105
        relative
        before:absolute
        before:inset-0
        before:rounded-full
        before:border-2
        before:border-white
        before:-z-10
        before:translate-x-1
        before:translate-y-1
        before:opacity-20
      `}
      style={{
        filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
      }}
    >
      {char}
    </div>
  );
};

export default LetterIcon;
