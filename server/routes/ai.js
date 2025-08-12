const express = require("express");
const { generateTasksFromAI } = require("../controllers/aiControllers");
const ensureAiQuota = require("../middlewares/ensureAiQuota");
const router = express.Router();

router.post("/tasks/generate", ensureAiQuota, generateTasksFromAI);

module.exports = router;
