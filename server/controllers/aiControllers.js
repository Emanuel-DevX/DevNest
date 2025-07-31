const generateTasks = async (req, res) => {
    
  //We will handle task generation here with helper functions to transform input and stuff
  const {
    projectId,
    sprintId,
    goals,
    contributors,
    hoursPerDay,
    includeWeekends,
    focus,
  } = req.body;
  console.log({
    projectId,
    sprintId,
    goals,
    contributors,
    hoursPerDay,
    includeWeekends,
    focus,
  });

  await new Promise(r =>setTimeout(r, 3000))
  const taskCount = Math.floor(Math.random() * 19);
  return res
    .status(200)
    .json({ message: "successfully generated tasks", taskCount });
};

module.exports = { generateTasks };
