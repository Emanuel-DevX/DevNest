const express = require("express");
const router = express.Router();
const { getUserNotes, deleteNote } = require("../controllers/noteControllers");

router.get("/", getUserNotes);
router.delete("/:noteId", deleteNote);

module.exports = router;
