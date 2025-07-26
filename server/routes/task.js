const express = require("express");
const router = express.Router();

const { addToCalendar, updateTaskCompletion } = require("../controllers/taskController");

router.patch("/:taskId/complete", updateTaskCompletion);
router.patch("/:taskId/calendar", addToCalendar);
module.exports = router;
