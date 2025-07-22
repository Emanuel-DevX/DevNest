const Sprint = require("../models/Sprint");

const addSprint = async (req, res) => {
  const projectId = req.params.projectId;
  const { title, startDate, endDate, features } = req.body;

  if (!projectId || title.trim().length < 3) {
    return res.status(401).json({
      message: "Project ID and Title are required to create a sprint",
    });
  }
  try {
    const stDate = new Date(startDate);
    const enDate = new Date(endDate);
    if (enDate - stDate < 1) {
      return res
        .status(400)
        .json({ message: "Sprint end date must be in future of start date" });
    }
    await Sprint.create({
      projectId: projectId,
      title: title,
      startDate: stDate,
      endDate: enDate,
      features: features ? features : [],
    });
    return res.status(201).json({ message: "Sprint added successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not add sprint", error: err.message });
  }
};

module.exports = { addSprint };
