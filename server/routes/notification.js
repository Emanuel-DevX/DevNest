const express = require("express");
const {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} = require("../controllers/notificationControllers");
const router = express.Router();

router.get("/", getNotifications);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification)

module.exports = router;
