const express = require("express");
const { getNotifications } = require("../controllers/notificationControllers");
const router = express.Router();

router.get("/", getNotifications);

module.exports = router;
