const Project = require("../models/Project");
const Membership = require("../models/Membership");
const createGeneralProject = async (userId) => {
  const newProject = await Project.create({
    name: "General",
    owner: userId,
    protected: true,
  });

  await Membership.create({
    projectId: newProject._id,
    userId,
    role: "owner",
  });
};

module.exports = { createGeneralProject };
