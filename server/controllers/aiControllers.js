const Project = require("../models/Project");
const Sprint = require("../models/Sprint");

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

module.exports = { getPromptParams };
