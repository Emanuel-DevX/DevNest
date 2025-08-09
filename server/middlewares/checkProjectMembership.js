const Membership = require("../models/Membership");

const checkProjectMembership = async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user?.id;

  if (!projectId || !userId) {
    return res.status(400).json({ message: "Project ID or User ID missing." });
  }

  try {
    const membership = await Membership.findOne({ projectId, userId });

    if (!membership) {
      return res
        .status(403)
        .json({
          message: "Access denied. Not a project member.",
          code: "NOT_PROJECT_MEMBER",
        });
    }

    next();
  } catch (err) {
    console.error("Project membership check failed:", err.message);
    return res
      .status(500)
      .json({ message: "Server error checking membership." });
  }
};

module.exports = checkProjectMembership;
