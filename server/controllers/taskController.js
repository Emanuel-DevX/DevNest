const Task = require("../models/Task");

// PATCH /tasks/:taskId/calendar
const addToCalendar = async (req, res) => {
  const { taskId } = req.params;
  const userId = req.user.id;
  const { startTime } = req.body;

  if (!startTime) {
    return res.status(400).json({ message: "Start time is required" });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const participant = task.participants.find(
      (p) => p.user.toString() === userId
    );

    if (!participant)
      return res.status(403).json({ message: "You are not a participant" });

    participant.addedToCalendar = true;
    participant.startTime = new Date(startTime);
    await task.save();

    res.status(200).json({ message: "Task added to calendar", task });
  } catch (err) {
    console.error("Calendar error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

//POST /projects/:projectId/tasks
const addTask = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user.id;
  const { title, description, duration, dueDate, participants } = req.body;
  if (!projectId || title.trim().length < 3) {
    return res
      .status(401)
      .json({ message: "Project id and task title are required" });
  }
  const participantObjects = participants.map((uid) => ({
    user: uid,
  }));
  try {
    const newTask = await Task.create({
      title,
      description,
      duration,
      dueDate,
      participants: participantObjects,
      creator: userId,
    });

    return res.status(201).json({
      message: "Task created successfully",
      taskId: newTask._id,
    });
  } catch (err) {
    console.error("Task creation error:", err);
    return res.status(500).json({
      message: "Server error while creating task",
      error: err.message,
    });
  }
};

const getTasksByProject = async (req, res) => {
  const projectId = req.params.projectId;
  if (!projectId) {
    return res
      .status(401)
      .json({ message: "Project Id required to get tasks" });
  }
  try {
    const tasks = await Task.find({projectId});
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: `Could not fetch tasks with the project id ${projectId}`,
      error: err.message,
    });
  }
};

module.exports = { addTask, addToCalendar, getTasksByProject };
