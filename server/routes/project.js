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
const {
  getInviteToken,
  removeMember,
  updateMember,
} = require("../controllers/membershipController");

const {
  updateNote,
  getNoteById,
  createNote,
  getProjectNotes,
} = require("../controllers/noteControllers");
const checkProjectMembership = require("../middlewares/checkProjectMembership");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/owned", getOwnedProjects);

router.use("/:projectId", checkProjectMembership);

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
router.delete("/:projectId/members/:memberId", removeMember);
router.patch("/:projectId/members/:memberId", updateMember);

//Note Routes

router.get("/:projectId/notes", getProjectNotes);
router.get("/:projectId/notes/:noteId", getNoteById);
router.put("/:projectId/notes/:noteId", updateNote);
router.post("/:projectId/notes", createNote);

module.exports = router;
