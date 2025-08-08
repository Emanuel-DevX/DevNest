const Notification = require("../models/Notification");
const buildNotification = require("../lib/buildNotification");
async function notifyMany({
  recipientIds,
  type,
  title,
  body = "",
  actorId = null,
  projectId = null,
  link = null,
}) {
  if (!Array.isArray(recipientIds) || recipientIds.length === 0) {
    throw new Error("recipientIds array is required and cannot be empty");
  }

  const notifications = recipientIds.map((recipientId) =>
    buildNotification({
      recipientId,
      type,
      title,
      body,
      actorId,
      projectId,
      link,
    })
  );

  return Notification.insertMany(notifications);
}

const getNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await Notification.find({
      recipientId: userId,
    }).lean();
    const sorted = notifications.sort((a, b) => b.createdAt - a.createdAt);
    return res.status(200).json(sorted);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not fetch notifications", error: err.message });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const userId = req.user.id;
    const notificationId = req.params.id;

    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipientId: userId },
      { readAt: new Date() },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
};
module.exports = { notifyMany, getNotifications, markNotificationAsRead };
