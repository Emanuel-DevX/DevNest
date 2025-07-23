const Project = require("../models/Project");
const Sprint = require("../models/Sprint");
const Membership = require("../models/Membership");
const Task = require("../models/Task");

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
    const projects = await Project.find({ _id: { $in: projectIds } });
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
    const members = await Membership.find({ projectId });
    const sprints = await Sprint.find({ projectId });
    const today = new Date();
    const sprintData = sprints.map((sprint) => ({
      ...sprint.toObject(),
      isCurrent:
        new Date(sprint.startDate) <= today &&
        today <= new Date(sprint.endDate),
    }));
    const taskCount = await Task.countDocuments(projectId);

    return res
      .status(200)
      .json({
        ...project,
        members,
        sprints: sprintData,
        taskCount: taskCount,
        noteCount: 0,
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
  const userId = req.user.id;
  if (!projectId) {
    return res
      .status(401)
      .json({ message: "Project ID is required to delete a project" });
  }
  try {
    const deleted = await Project.deleteOne({ _id: projectId, owner: userId });
    if (deleted.deletedCount === 0) {
      return res
        .status(404)
        .status(404)
        .json({ message: "Project not found or not owned by user" });
    }
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
      updates.pinned = pinned;
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

module.exports = {
  createProject,
  getAllProjects,
  getProjectInfo,
  deleteProject,
  updateProject,
};
