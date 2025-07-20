const Project = require("../models/Project");
const createProject = async (req, res) => {
  const { name, description } = req.body;
  if (!name.trim() || name.trim().length < 3) {
    return res
      .status(401)
      .json({ error: "Project names are required to be 3 or more charactes" });
  }
  try {
    console.log(req.user)
    await Project.create({
    
      name: name.trim(),
      description: description,
      owner: req.user._id,
    });
    return res.status(201).json({ message: "Project created successfully!" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not create project", error: err });
  }
};

module.exports = { createProject };
