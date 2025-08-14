const Membership = require("../models/Membership");
const TaskSchedule = require("../models/TaskSchedule");
const User = require("../models/User");
const Task = require("../models/Task");


const getStartOfWeek = (date) => {
  const d = new Date(date);
  const day = d.getDay(); // Sunday = 0
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday start
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
};
const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const weekStart = getStartOfWeek(new Date());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 7);

    const [totalProjects, tasksDueToday, tasksDueThisWeek, user] =
      await Promise.all([
        Membership.countDocuments({ userId }),
        TaskSchedule.countDocuments({
          userId,
          scheduledAt: { $gte: today, $lte: endOfToday },
        }),
        TaskSchedule.countDocuments({
          userId,
          scheduledAt: { $gte: weekStart, $lt: weekEnd },
        }),
        User.findById(userId).select("token").lean(),
      ]);

    const scheduledTaskIds = await TaskSchedule.distinct("taskId", {
      userId,
    });
    const unscheduledDueToday = await Task.countDocuments({
      participants: { $in: [userId] }, // adjust to your schema
      dueDate: { $gte: today, $lt: endOfToday },
      _id: { $nin: scheduledTaskIds },
    });

    // Due THIS WEEK (no schedule)
    const unscheduledDueThisWeek = await Task.countDocuments({
      participants: { $in: [userId] },
      dueDate: { $gte: weekStart, $lt: weekEnd },
      _id: { $nin: scheduledTaskIds },
    });

    const usedTokens = user?.token?.usage ?? 0;

    const overview = {
      totalProjects,
      tasksDueToday: tasksDueToday + unscheduledDueToday,
      tasksDueThisWeek: tasksDueThisWeek + unscheduledDueThisWeek,
      usedTokens,
    };

    return res.status(200).json(overview);
  } catch (err) {
    console.error("Error in getOverview:", err);
    return res.status(500).json({ message: "Failed to load overview data." });
  }
};

module.exports = { getOverview };
