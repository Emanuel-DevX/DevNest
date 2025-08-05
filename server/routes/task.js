const express = require("express");
const router = express.Router();

const {
  updateTaskCompletion,
  customizeTaskSchedule,
  getTasksByRange,
} = require("../controllers/taskController");

router.patch("/:taskId/complete", updateTaskCompletion);
router.put("/:taskId/schedule", customizeTaskSchedule);
router.get("/range", getTasksByRange);
module.exports = router;
