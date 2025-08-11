const Membership = require("../models/Membership");
const TaskSchedule = require("../models/TaskSchedule");

const cleanUserInfo = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    await Promise.all([
      Membership.deleteMany({ userId }),
      TaskSchedule.deleteMany({ userId }),
    ]);

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = cleanUserInfo;
