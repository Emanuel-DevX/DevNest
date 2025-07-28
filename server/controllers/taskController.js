const Task = require("../models/Task");
const Sprint = require("../models/Sprint");
const User = require("../models/User");

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

  try {
    const newTask = await Task.create({
      title,
      description,
      duration,
      dueDate,
      participants,
      creator: userId,
      projectId,
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
  const { sprintId } = req.query;
  let filters = { projectId };

  // If sprintId is provided, add sprint date filtering
  if (sprintId) {
    const sprint = await Sprint.findById(sprintId);

    if (sprint) {
      const startDate = new Date(sprint.startDate);
      const endDate = new Date(sprint.endDate);

      // Add sprint date filtering to the base filter
      filters = {
        ...filters,
        dueDate: {
          $gte: startDate, // Tasks due on or after sprint start
          $lte: endDate, // Tasks due on or before sprint end
        },
      };
    }
  }

  try {
    console.log(JSON.stringify(filters, null, 2));

    const tasks = await Task.find(filters).populate(
      "participants",
      "name email"
    );

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json({
      message: `Could not fetch tasks with the project id ${projectId}`,
      error: err.message,
    });
  }
};

const updateTaskCompletion = async (req, res) => {
  const taskId = req.params.taskId;
  const userId = req.user.id;

  if (!taskId) {
    return res
      .status(400)
      .json({ message: "Task ID is required to mark a task as done" });
  }

  try {
    const { complete } = req.body;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Could not find task" });
    }

    const isParticipant = task.participants.some(
      (p) => p.toString() === userId.toString()
    );

    if (!isParticipant) {
      return res.status(401).json({
        message: "You need to be a participant of this task to mark it as done",
      });
    }

    task.completed = complete;
    task.status = complete ? "completed" : "pending";
    await task.save();

    return res.status(200).json({
      message: "Successfully updated task completion status",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Unable to update task completion",
      error: err.message,
    });
  }
};

const cleanUpTasks = async () => {
  const projectId = "687d4d3ec1d78e3d967d16af";
  const userId = "6875f615067e200fca4d7f4e";

  // Step 1: Get all tasks
  const tasks = await Task.find();

  // Step 2: Filter unique ones by title
  const seen = new Set();
  const uniqueTasks = [];

  for (const task of tasks) {
    if (!seen.has(task.title)) {
      seen.add(task.title);
      uniqueTasks.push(task);
    }
  }

  // Step 3: Delete all tasks
  await Task.deleteMany({});
  console.log("🗑️ Deleted all tasks.");

  // Step 4: Recreate only unique tasks with correct projectId and participants
  for (const task of uniqueTasks) {
    const newTask = new Task({
      title: task.title,
      description: task.description,
      duration: task.duration,
      dueDate: task.dueDate,
      completed: task.completed,
      creator: userId,
      participants: [userId],
      projectId: projectId,
      status: task.status,
    });

    await newTask.save();
    console.log(`✅ Recreated task: ${task.title}`);
  }

  console.log("🎉 Task cleanup complete.");
};

const updateTaskInfo = async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.projectId;
  if (!projectId || !taskId) {
    return res
      .status(400)
      .json({ message: "Project and Task IDs are required" });
  }
  try {
    const { participants } = req.body;
    const updates = {};
    if (participants !== undefined || participants !== null)
      updates.participants = participants;
    await Task.updateOne({ _id: taskId }, updates);
    return res.status(200).json({ message: "Successfully updated task info" });
  } catch (err) {
    return res.status(500).json({
      message: "Could not update task info",
      error: err.message,
    });
  }
};

module.exports = {
  addTask,
  addToCalendar,
  getTasksByProject,
  updateTaskCompletion,
};
