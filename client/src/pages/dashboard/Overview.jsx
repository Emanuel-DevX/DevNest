const Overview = ({ userData }) => {
  const username = userData?.user?.name
    ? userData.user.name.split(" ")[0]
    : null;
  const {
    name = username || "there",
    totalProjects = 0,
    totalTasks = 0,
    completedTasks = 0,
    tasksDueToday = 0,
    tasksDueThisWeek = 0,
    totalNotes = 0,
  } = userData || {};

  return (
    <div className="bg-zinc-900/80 text-gray-200 rounded-xl p-6 w-full shadow-md mb-6">
      <h1 className="text-2xl font-semibold text-teal-400 mb-4">
        Welcome back, {name} 👋
      </h1>
      <p className="text-sm text-zinc-400 mb-6">
        Here's a quick look at your productivity today.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <OverviewCard label="Projects" value={totalProjects} />
        <OverviewCard label="Tasks" value={totalTasks} />
        <OverviewCard label="Completed" value={completedTasks} />
        <OverviewCard label="Due Today" value={tasksDueToday} />
        <OverviewCard label="This Week" value={tasksDueThisWeek} />
        <OverviewCard label="Notes" value={totalNotes} />
      </div>
    </div>
  );
};

const OverviewCard = ({ label, value }) => (
  <div className="bg-zinc-800 p-4 rounded-lg flex flex-col justify-center items-start hover:ring-1 hover:ring-emerald-400 transition">
    <span className="text-sm text-zinc-400">{label}</span>
    <span className="text-xl font-bold text-teal-300">{value}</span>
  </div>
);

export default Overview;
