const express = require("express");
const { updateSprint } = require("../controllers/sprintController");

const router = express.Router();

router.put("/:sprintId", updateSprint);

module.exports = router;
