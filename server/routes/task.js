const express = require("tasks");
const router = express.Router();

const { addToCalendar } = require("../controllers/taskController");

router.patch("/:taskId/calendar", addToCalendar);
module.exports = router;
