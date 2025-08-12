const Membership = require("../models/Membership");
const TaskSchedule = require("../models/TaskSchedule");
const User = require("../models/User");

const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    const [totalProjects, tasksDueToday, tasksDueThisWeek, user] =
      await Promise.all([
        Membership.countDocuments({ userId }),
        TaskSchedule.countDocuments({
          userId,
          scheduledAt: { $gte: today, $lte: endOfToday },
        }),
        TaskSchedule.countDocuments({
          userId,
          scheduledAt: { $gt: endOfToday, $lte: oneWeekFromNow },
        }),
        User.findById(userId).select("token").lean(),
      ]);

    const usedTokens = user?.token?.usage ?? 0;

    const overview = {
      totalProjects,
      tasksDueToday,
      tasksDueThisWeek,
      usedTokens,
    };

    return res.status(200).json(overview);
  } catch (err) {
    console.error("Error in getOverview:", err);
    return res.status(500).json({ message: "Failed to load overview data." });
  }
};

module.exports = { getOverview };
