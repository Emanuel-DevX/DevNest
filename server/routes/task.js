const express = require("express");
const router = express.Router();

const {
  addToCalendar,
  updateTaskCompletion,
  getTasksByDate
} = require("../controllers/taskController");

router.patch("/:taskId/complete", updateTaskCompletion);
router.patch("/:taskId/calendar", addToCalendar);
router.get("/daily", getTasksByDate);
module.exports = router;
