const Task = require("../models/Task");
const Sprint = require("../models/Sprint");
const User = require("../models/User");
const TaskSchedule = require("../models/TaskSchedule");

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

const updateTaskInfo = async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  if (!projectId || !taskId) {
    return res
      .status(400)
      .json({ message: "Project and Task IDs are required" });
  }
  try {
    const { participants, dueDate, title, description, duration, actualTime } =
      req.body;
    const updates = {};
    if (participants != null) updates.participants = participants;
    if (dueDate != null) updates.dueDate = new Date(dueDate);
    if (title != null) updates.title = title;
    if (description != null) updates.description = description;
    if (duration != null) updates.duration = duration;
    if (actualTime != null) updates.actualTime = actualTime;

    await Task.updateOne({ _id: taskId }, updates);
    return res.status(200).json({ message: "Successfully updated task info" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Could not update task info",
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const projectId = req.params.projectId;
  const taskId = req.params.taskId;
  if (!projectId || !taskId) {
    return res
      .status(400)
      .json({ message: "Project and Task IDs are required" });
  }
  try {
    const deleted = await Task.deleteOne({ _id: taskId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Could not find task to delete" });
    }
    return res
      .status(200)
      .json({ message: `Successfully deleted task: ${taskId}` });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Could not delete task",
      error: err.message,
    });
  }
};

const getTasksByDate = async (req, res) => {
  const userId = req.user.id;
  const date = new Date(req.query.date);
  if (isNaN(date)) {
    return res.status(400).json({ message: "Invalid date" });
  }

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const tasks = await Task.find({
    participants: { $in: userId },
    dueDate: { $gte: startOfDay, $lte: endOfDay },
  })
    .populate("participants", "name email _id")
    .lean();

  const taskIds = tasks.map((task) => task._id);

  const schedules = await TaskSchedule.find({
    userId,
    taskId: { $in: taskIds },
  }).lean();

  const scheduledMap = new Map();
  for (const s of schedules) {
    scheduledMap.set(s.taskId.toString(), s);
  }

  const merged = tasks.map((task) => {
    const schedule = scheduledMap.get(task._id.toString());
    return {
      ...task,
      userSchedule: schedule || null,
    };
  });

  return res.status(200).json(merged);
};

function generateOccurrences(startDate, intervalDays, count) {
  const occurrences = [];
  let current = new Date(startDate);
  for (let i = 0; i < count; i++) {
    occurrences.push({ date: new Date(current), done: false });
    current.setDate(current.getDate() + intervalDays);
  }
  return occurrences;
}

const customizeTaskSchedule = async (res, req) => {


module.exports = {
  addTask,
  addToCalendar,
  getTasksByProject,
  updateTaskCompletion,
  updateTaskInfo,
  deleteTask,
  getTasksByDate,
};
