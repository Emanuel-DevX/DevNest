const express = require("express")
const router = express.Router()
const {getUserNotes} = require("../controllers/noteControllers")

router.get("/", getUserNotes)

module.exports = router