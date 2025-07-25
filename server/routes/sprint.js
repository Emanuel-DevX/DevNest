const express = require("express")
const { updateSprint } = require("../controllers/sprintController")

router.put("/:sprintId", updateSprint)

module.exports = router