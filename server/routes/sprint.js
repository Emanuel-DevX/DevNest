const express = require("express");
const {
  updateSprint,
  deleteSprint,
} = require("../controllers/sprintController");

const router = express.Router();

router.put("/:sprintId", updateSprint);
router.delete("/:sprintId", deleteSprint);
module.exports = router;
