const express = require("express");
const router = express.Router();

const {
  addToCalendar,
  updateTaskCompletion,
  getTasksByDate,
  customizeTaskSchedule,
} = require("../controllers/taskController");

router.patch("/:taskId/complete", updateTaskCompletion);
router.patch("/:taskId/calendar", addToCalendar);
router.put("/:taskId/schedule", customizeTaskSchedule);
router.get("/daily", getTasksByDate);
module.exports = router;
