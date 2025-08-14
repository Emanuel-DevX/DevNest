const Membership = require("../models/Membership");

const isProjectAdminOrSelf = async (req, res, next) => {
  try {
    const projectId = req.params.projectId;
    const userId = String(req.user.id);
    const memberId = String(req.params.memberId);

    const membership = await Membership.findOne({ userId, projectId }).lean();


    if (
      memberId !== userId &&
      (!membership || !["admin", "owner"].includes(membership.role))
    ) {
      return res.status(403).json({ message: "User is not a project admin" });
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = isProjectAdminOrSelf;
