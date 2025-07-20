const express = require("express");
const router = express.Router();

const {addSprint} = require("../controllers/sprintController");

router.post("/:projectId", addSprint);

module.exports = router;
