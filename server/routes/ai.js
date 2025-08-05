const express = require("express");
const { generateTasksFromAI } = require("../controllers/aiControllers");
const router = express.Router();

router.post("/tasks/generate", generateTasksFromAI);

module.exports = router;
