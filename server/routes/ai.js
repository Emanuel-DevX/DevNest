const express = require("express");
const { generateTasks } = require("../controllers/aiControllers");
const router = express.Router();

router.post("/tasks/generate", generateTasks);

module.exports = router;
