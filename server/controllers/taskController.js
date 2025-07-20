const Task = require("../models/Task");

const addToCalendar = async ({ taskId, userId, startTime }) => {
  if (!startTime) return { success: false, message: "Start time required" };

  try {
    const task = await Task.findById(taskId);
    if (!task) return { success: false, message: "Task not found" };

    const participant = task.participants.find(
      (p) => p.user.toString() === userId.toString()
    );
    if (!participant)
      return { success: false, message: "User not a participant" };

    participant.addedToCalendar = true;
    participant.startTime = new Date(startTime);

    await task.save();
    return { success: true };
  } catch (err) {
    console.error("Calendar error:", err);
    return {
      success: false,
      message: "Error saving to calendar",
      error: err.message,
    };
  }
};

const addTask = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user.id;
  const { title, description, duration, dueDate, participants, startTime } =
    req.body;
  if (!projectId || title.trim().length < 3) {
    return res
      .status(401)
      .json({ message: "Project id and task title are required" });
  }
  const participantObjects = participants.map((uid) => {
    return {
      user: uid,
    }
  });
  try {
    const newTask = await Task.create({
      title,
      description,
      duration,
      dueDate,
      participants :participantObjects,
      creator: userId,
    });
    const isCreatorInParticipants = participants.some(
      (p) => p.user === userId || p.user.toString() === userId.toString()
    );

    let calendarResult = { success: false, message: "Not attempted" };

    if (isCreatorInParticipants && startTime) {
      calendarResult = await addToCalendar({
        taskId: newTask._id,
        userId,
        startTime,
      });
    }
    return res.status(201).json({
      message: "Task created successfully",
      task: newTask,
      calendarStatus: calendarResult,
    });
  } catch (err) {}
};

module.exports = { addTask };
