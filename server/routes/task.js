const express = require("express");
const router = express.Router();

const {
  updateTaskCompletion,
  customizeTaskSchedule,
  getTasksByRange,
} = require("../controllers/taskController");
const removeSchedulesWithDeletedTask = require("../middlewares/removeSchedulesWithDeletedTask");

router.patch("/:taskId/complete", updateTaskCompletion);
router.put("/:taskId/schedule", customizeTaskSchedule);
router.get("/range", removeSchedulesWithDeletedTask, getTasksByRange);
module.exports = router;
