const Task = require("../models/Task");
const TaskSchedule = require("../models/TaskSchedule");

const removeSchedulesWithDeletedTask = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const schedules = await TaskSchedule.find(
      { userId },
      { _id: 1, taskId: 1 }
    ).lean();
    if (schedules.length === 0) return next();

    const taskIds = schedules.map((s) => s.taskId);

    const existingTaskIds = new Set(
      (await Task.find({ _id: { $in: taskIds } }, { _id: 1 }).lean()).map((t) =>
        String(t._id)
      )
    );

    const orphanedScheduleIds = schedules
      .filter((s) => !existingTaskIds.has(String(s.taskId)))
      .map((s) => s._id);

    if (orphanedScheduleIds.length > 0) {
      await TaskSchedule.deleteMany({ _id: { $in: orphanedScheduleIds } });
    }

    next();
  } catch (err) {
    next(err);
  }
};
module.exports = removeSchedulesWithDeletedTask;
