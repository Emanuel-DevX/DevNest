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

module.exports = { notifyMany, getNotifications };
