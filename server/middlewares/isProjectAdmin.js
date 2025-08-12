const Membership = require("../models/Membership");

const isProjectAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const projectId = req.params.projectId;

    const membership = await Membership.findOne({ userId, projectId }).lean();

    if (!membership || !["admin", "owner"].includes(membership.role)) {
      return res.status(403).json({ message: "User is not a project admin" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isProjectAdmin;
