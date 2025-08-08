const express = require("express");
const {
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
  markAllUserNotificationsAsRead,
} = require("../controllers/notificationControllers");
const router = express.Router();

router.get("/", getNotifications);
router.patch("/read", markAllUserNotificationsAsRead);
router.patch("/:id/read", markNotificationAsRead);
router.delete("/:id", deleteNotification)

module.exports = router;
