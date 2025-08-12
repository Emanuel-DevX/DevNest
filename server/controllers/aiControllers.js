const generateTaskPrompt = require("../lib/generateTaskPrompt");
const askGemini = require("../lib/gemini");
const Project = require("../models/Project");
const Sprint = require("../models/Sprint");
const Task = require("../models/Task");
const User = require("../models/User");

const { extractJSONBlock } = require("../lib/utils");

const getPromptParams = async (req) => {
  const {
    projectId,
    sprintId,
    goals = "",
    contributors = 1,
    hoursPerDay = 5,
    includeWeekends = false,
    focus = "",
  } = req.body;

  if (!projectId || !sprintId) {
    throw new Error("projectId and sprintId are required");
  }

  const project = await Project.findById(projectId);
  const sprint = await Sprint.findById(sprintId);

  if (!project || !sprint) {
    throw new Error("Project or sprint not found");
  }

  const sprintStartDate = new Date(sprint.startDate);
  const sprintEndDate = new Date(sprint.endDate);
  const sprintStart = sprintStartDate.toISOString().split("T")[0];
  const sprintEnd = sprintEndDate.toISOString().split("T")[0];

  // Due date is 1 day before sprint ends
  const due = new Date(sprintEndDate);
  due.setDate(due.getDate() - 1);
  const dueDate = due.toISOString().split("T")[0];

  const totalDays =
    (sprintEndDate - sprintStartDate) / (1000 * 60 * 60 * 24) + 1;

  const workingDays = includeWeekends
    ? totalDays
    : Array.from({ length: totalDays }).filter((_, i) => {
        const date = new Date(sprintStartDate);
        date.setDate(date.getDate() + i);
        const day = date.getDay();
        return day !== 0 && day !== 6;
      }).length;

  return {
    projectName: project.name,
    projectDescription: project.description || "",
    sprintGoals: goals,
    sprintStart,
    sprintEnd,
    dueDate,
    coreFeatures: project.coreFeatures || [],
    completedFeatures: project.completedFeatures || [],
    contributors,
    hoursPerContributor: workingDays * hoursPerDay,
    focus,
  };
};

const consumeTokens = async (userId, usage) => {
  const used = usage?.totalTokenCount ?? 0;
  if (!used) return;
  await User.updateOne({ _id: userId }, [
    {
      $set: {
        "token.usage": {
          $min: [{ $add: ["$token.usage", used] }, "$token.cap"],
        },
      },
    },
  ]);
};

const generateTasksFromAI = async (req, res) => {
  try {
    const projectId = req.body.projectId;
    const userId = req.user.id;
    const params = await getPromptParams(req);
    const prompt = generateTaskPrompt(params);

    const { text, usage } = await askGemini(prompt);
    await consumeTokens(userId, usage);
    const cleaned = extractJSONBlock(text);
    const tasksArr = JSON.parse(cleaned);

    const tasks = tasksArr.map((task) => ({
      ...task,
      dueDate: new Date(task.dueDate),
      projectId,
      creator: userId,
      participants: [],
    }));
    const newTasks = await Task.insertMany(tasks);

    return res.status(200).json({ newTasks });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Internal error" });
  }
};

module.exports = { getPromptParams, generateTasksFromAI };
