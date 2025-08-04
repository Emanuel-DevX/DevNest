const express = require("express");
const router = express.Router();

const {
  addToCalendar,
  updateTaskCompletion,
  customizeTaskSchedule,
  getTasksByRange,
} = require("../controllers/taskController");

router.patch("/:taskId/complete", updateTaskCompletion);
router.patch("/:taskId/calendar", addToCalendar);
router.put("/:taskId/schedule", customizeTaskSchedule);
router.get("/range", getTasksByRange);
module.exports = router;
