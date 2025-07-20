const Task = require("../models/Task");

const addToCalendar = async ({ taskId, userId, startTime }) => {
  if (!startTime) return false;

  try {
    const task = await Task.findById(taskId);
    if (!task) return false;

    const participant = task.participants.find(
      (p) => p.user.toString() === userId.toString()
    );
    if (!participant) return false;

    participant.addedToCalendar = true;
    participant.startTime = new Date(startTime);

    await task.save();
    return true;
  } catch (err) {
    console.error("Calendar error:", err);
    return false;
  }
};

const addTask = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user.id;
  const { title, description, duration, dueDate, participants, startTime } = req.body;
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
    });
    const isCreatorInParticipants = participants.some(
      (p) => p.user === userId || p.user.toString() === userId.toString()
    );

    if (isCreatorInParticipants && startTime) {
      await addToCalendar({
        taskId: newTask._id,
        userId,
        startTime,
      });
    }
  } catch (err) {}
};

module.exports = { addTask };
