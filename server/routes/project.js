const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectInfo,
  deleteProject,
  updateProject,
  getOwnedProjects,
} = require("../controllers/projectController");
const { addSprint } = require("../controllers/sprintController");
const {
  addTask,
  getTasksByProject,
  updateTaskInfo,
  deleteTask,
} = require("../controllers/taskController");
const { getInviteToken, removeMember } = require("../controllers/membershipController");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/owned", getOwnedProjects);
router.get("/:projectId", getProjectInfo);
router.delete("/:projectId", deleteProject);
router.put("/:projectId", updateProject);

//Sprint Routes
router.post("/:projectId/sprints", addSprint);

//Task Routes
router.post("/:projectId/tasks", addTask);
router.get("/:projectId/tasks", getTasksByProject);
router.patch("/:projectId/tasks/:taskId", updateTaskInfo);
router.delete("/:projectId/tasks/:taskId", deleteTask);

// Membership Routes
router.get("/:projectId/invite", getInviteToken);
router.delete("/:projectId/members/memberId", removeMember);

module.exports = router;
