const Project = require("../models/Project");
const Sprint = require("../models/Sprint");
const Membership = require("../models/Membership");
const Task = require("../models/Task");
const Note = require("../models/Note");
const TaskSchedule = require("../models/TaskSchedule");

const getOverview = async (req, res) => {
  try {
    const userId = req.user.id;

    const today = new Date();
    today.setHours(0, 0, 0, 0); // start of today

    const endOfToday = new Date(today);
    endOfToday.setHours(23, 59, 59, 999);

    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(today.getDate() + 7);

    const [
      totalProjects,
      totalTasks,
      completedTasks,
      tasksDueToday,
      tasksDueThisWeek,
      totalNotes,
    ] = await Promise.all([
      Membership.countDocuments({ userId }),
      Task.countDocuments({ participants: { $in: userId } }),
      Task.countDocuments({
        participants: userId,
        status: "completed",
      }),
      TaskSchedule.countDocuments({
        userId,
        scheduledAt: { $gte: today, $lte: endOfToday },
      }),
      TaskSchedule.countDocuments({
        userId,
        scheduledAt: { $gt: endOfToday, $lte: oneWeekFromNow },
      }),
      Note.countDocuments({ author: userId }),
    ]);

    const overview = {
      totalProjects,
      totalTasks,
      completedTasks,
      tasksDueToday,
      tasksDueThisWeek,
      totalNotes,
    };

    return res.status(200).json(overview);
  } catch (err) {
    console.error("Error in getOverview:", err);
    return res.status(500).json({ message: "Failed to load overview data." });
  }
};

module.exports = { getOverview };
