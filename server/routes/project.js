const express = require("express");
const { createProject } = require("../controllers/projectController");
const { addSprint } = require("../controllers/sprintController");
const { addTask, getTasksByProject } = require("../controllers/taskController");

const router = express.Router();

router.post("/", createProject);

//Sprint Routes
router.post("/:projectId/sprints", addSprint);

//Task Routes
router.post("/:projectId/tasks", addTask);
router.get("/:projectId/tasks", getTasksByProject);

module.exports = router;
