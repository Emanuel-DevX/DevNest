const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectInfo,
  deleteProject,
  updateProject,
  getOwnedProjects,
  setProjectPinned,
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
const {
  sendTaskUpdateNotifications,
  sendProjectMemberRemovedNotifications,
  sendProjectDeletedNotifications,
} = require("../middlewares/notify.js");
const isProjectAdmin = require("../middlewares/isProjectAdmin.js");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/owned", getOwnedProjects);

router.use("/:projectId", checkProjectMembership);

router.get("/:projectId", getProjectInfo);
router.delete(
  "/:projectId",
  isProjectAdmin,
  deleteProject,
  sendProjectDeletedNotifications
);
router.put("/:projectId", isProjectAdmin, updateProject);
router.patch("/:projectId", setProjectPinned);

//Sprint Routes
router.post("/:projectId/sprints", isProjectAdmin, addSprint);

//Task Routes
router.post("/:projectId/tasks", isProjectAdmin, addTask);
router.get("/:projectId/tasks", getTasksByProject);
router.patch(
  "/:projectId/tasks/:taskId",
  updateTaskInfo,
  sendTaskUpdateNotifications
);
router.delete("/:projectId/tasks/:taskId", isProjectAdmin, deleteTask);

// Membership Routes
router.get("/:projectId/invite", getInviteToken);
router.delete(
  "/:projectId/members/:memberId",
  isProjectAdmin,
  removeMember,
  sendProjectMemberRemovedNotifications
);
router.patch("/:projectId/members/:memberId", updateMember);

//Note Routes

router.get("/:projectId/notes", getProjectNotes);
router.get("/:projectId/notes/:noteId", getNoteById);
router.put("/:projectId/notes/:noteId", updateNote);
router.post("/:projectId/notes", createNote);

module.exports = router;
