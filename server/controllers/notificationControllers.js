const Notification = require("../models/Notification");
const buildNotification = require("./buildNotification");
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

module.exports = {notifyMany};
