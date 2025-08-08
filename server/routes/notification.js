const express = require("express");
const {
  getNotifications,
  markNotificationAsRead,
} = require("../controllers/notificationControllers");
const router = express.Router();

router.get("/", getNotifications);
router.patch("/:id/read", markNotificationAsRead);

module.exports = router;
