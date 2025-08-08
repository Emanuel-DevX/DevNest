const Project = require("../models/Project");
const Sprint = require("../models/Sprint");
const Membership = require("../models/Membership");
const Task = require("../models/Task");
const Note = require("../models/Note");

const createProject = async (req, res) => {
  const userId = req.user.id;
  const { name, description } = req.body;
  if (!name.trim() || name.trim().length < 3) {
    return res
      .status(401)
      .json({ error: "Project names are required to be 3 or more charactes" });
  }
  try {
    const newProject = await Project.create({
      name: name.trim(),
      description: description,
      owner: req.user.id,
    });

    await Membership.create({
      projectId: newProject._id,
      userId,
      role: "owner",
    });
    return res.status(201).json({ message: "Project created successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not create project", error: err });
  }
};

const getAllProjects = async (req, res) => {
  const userId = req.user.id;
  try {
    const memberships = await Membership.find({ userId }).lean();
    const projectIds = memberships.map((m) => m.projectId);
    let projects = await Project.find({ _id: { $in: projectIds } }).lean();
    projects = projects.map((project) => ({
      ...project,
      pinned:
        memberships.filter(
          (m) => m.projectId.toString() === project._id.toString()
        )[0].pinned || false,
    }));
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({
      message: `Failed to fetch projects for user: ${userId}`,
      error: err.message,
    });
  }
};

const getProjectInfo = async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return res.status(401).json({ message: "Project Id is required" });
  }
  try {
    const project = await Project.findById(projectId).lean();
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    let members = await Membership.find({ projectId })
      .populate("userId", "name email")
      .lean();
    members = members.map((member) => ({
      ...member,
      name: member.userId.name,
      email: member.userId.email,
      userId: member.userId._id,
    }));
    const sprints = await Sprint.find({ projectId });
    const today = new Date();
    const sprintData = sprints.map((sprint) => ({
      ...sprint.toObject(),
      isCurrent:
        new Date(sprint.startDate) <= today &&
        today <= new Date(sprint.endDate),
    }));
    const taskCount = await Task.countDocuments({ projectId });
    const noteCount = await Note.countDocuments({ projectId });

    return res.status(200).json({
      ...project,
      members,
      sprints: sprintData,
      taskCount,
      noteCount,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch project information",
      erorr: err.message,
    });
  }
};

const deleteProject = async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return res
      .status(401)
      .json({ message: "Project ID is required to delete a project" });
  }
  try {
    const deleted = await Project.deleteOne({ _id: projectId });
    if (deleted.deletedCount === 0) {
      return res
        .status(404)
        .status(404)
        .json({ message: "Project not found or not owned by user" });
    }
    await Membership.deleteMany({ projectId });
    await Task.deleteMany({ projectId });
    return res.status(200).json({ message: "Project successfully deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to delete project", error: err.message });
  }
};

const updateProject = async (req, res) => {
  const userId = req.user.id;
  const projectId = req.params.projectId;
  if (!projectId) {
    return res
      .status(401)
      .json({ message: "Project ID required to perform this operation" });
  }
  try {
    const { pinned, name, description } = req.body;
    const updates = {};
    if (pinned !== undefined && pinned !== null) {
      await Membership.updateOne({ userId, projectId }, { pinned });
    }
    if (name && name.trim().length > 3) {
      updates.name = name.trim();
    }
    if (description && description.trim().length > 3) {
      updates.description = description.trim();
    }
    const member = await Membership.findOne({ projectId, userId });
    if (member.role !== "owner" && member.role !== "admin") {
      return res.status(403).json({
        message: "You don't have proper authorization to update this project",
      });
    }
    await Project.updateOne({ _id: projectId }, updates);
    return res.status(200).json({ message: "Project info updated" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Failed to update project", error: err.message });
  }
};

const getOwnedProjects = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get memberships where user is owner/admin
    const memberships = await Membership.find({
      userId,
      role: { $in: ["owner", "admin"] },
    });

    const projectIds = memberships.map((m) => m.projectId);

    // Get all projects
    let projects = await Project.find({
      _id: { $in: projectIds },
    }).lean();

    // Get all memberships for those projects
    const allMemberships = await Membership.find({
      projectId: { $in: projectIds },
    }).populate("userId", "name email"); // populate name + email from User

    // Group members by projectId
    const membersByProject = {};
    for (const m of allMemberships) {
      const pid = m.projectId.toString();
      if (!membersByProject[pid]) membersByProject[pid] = [];
      membersByProject[pid].push({
        _id: m.userId._id,
        name: m.userId.name,
        email: m.userId.email,
        role: m.role,
      });
    }

    //Get all sprints for selected projects
    const allSprints = await Sprint.find({ projectId: { $in: projectIds } })
      .sort({ startDate: 1 })
      .lean();

    // group sprints by projectId
    const sprintsByProject = {};
    for (const s of allSprints) {
      const pid = s.projectId.toString();
      if (!sprintsByProject[pid]) sprintsByProject[pid] = [];
      sprintsByProject[pid].push({
        _id: s._id,
        name: s.name || s.title,
        startDate: s.startDate,
        endDate: s.endDate,
        status: s.status,
      });
    }

    //attach members + sprints to each project
    projects = projects.map((p) => {
      const pid = p._id.toString();
      return {
        ...p,
        members: membersByProject[pid] || [],
        sprints: sprintsByProject[pid] || [],
      };
    });

    res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not fetch projects." });
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectInfo,
  deleteProject,
  updateProject,
  getOwnedProjects,
};
