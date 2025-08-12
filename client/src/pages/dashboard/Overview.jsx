import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Overview = ({ userData }) => {
  const username = userData?.user?.name
    ? userData.user.name.split(" ")[0]
    : null;
  const {
    name = username || "there",
    totalProjects = 0,
  
    tasksDueToday = 0,
    tasksDueThisWeek = 0,
    usedTokens = 0,
  } = userData || {};
  const cap = 50000;
  const pct = Math.min(usedTokens / cap, 1);
  const color = pct < 0.7 ? "#14b8a6" : pct < 0.9 ? "#f59e0b" : "#ef4444";

  return (
    <div className="bg-zinc-900/80 text-gray-200 rounded-xl md:p-6 p-3 w-full shadow-md mb-6">
      <h1 className="text-2xl font-semibold text-teal-400 mb-4">
        Welcome back, {name} 👋
      </h1>
      <p className="text-sm text-zinc-400 mb-6">
        Here's a quick look at your productivity today.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="md:gap-4 gap-2 md:h-24 flex md:w-1/2 w-full">
          <OverviewCard label="Projects" value={totalProjects} />
          <OverviewCard label="Due Today" value={tasksDueToday} />
          <OverviewCard label="This Week" value={tasksDueThisWeek} />
        </div>

        <div className="md:w-36 flex flex-col gap-1 w-24  mx-auto">
          <CircularProgressbar
            value={usedTokens}
            maxValue={cap}
            text={`${usedTokens.toLocaleString()}/50K`}
            strokeWidth={10}
            styles={buildStyles({
              pathColor: color,
              trailColor: "#27272a", // dark gray trail
              textColor: "#e5e7eb", // light text
              textSize: "12px",
              strokeLinecap: "round",
              pathTransitionDuration: 0.5, // smooth animate
            })}
          />
          <h2 className="text-center">Token Usage</h2>
        </div>
      </div>
    </div>
  );
};

const OverviewCard = ({ label, value }) => (
  <div className="bg-zinc-800 w-full md:p-3 p-2 rounded-lg flex flex-col justify-center items-center hover:ring-1 hover:ring-emerald-400 transition">
    <span className="text-sm text-zinc-400">{label}</span>
    <span className="text-xl  font-bold text-teal-300">{value}</span>
  </div>
);

export default Overview;
