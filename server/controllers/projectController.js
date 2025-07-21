const Project = require("../models/Project");
const createProject = async (req, res) => {
  const { name, description } = req.body;
  if (!name.trim() || name.trim().length < 3) {
    return res
      .status(401)
      .json({ error: "Project names are required to be 3 or more charactes" });
  }
  try {
    await Project.create({
      name: name.trim(),
      description: description,
      owner: req.user.id,
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
    const projects = await Project.find({ owner: userId });
    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({
      message: `Failed to fetch projects for user: ${userId}`,
      error: err.message,
    });
  }
};

module.exports = { createProject, getAllProjects };
