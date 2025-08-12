function buildNotification({
  recipientId,
  type,
  title,
  body = "",
  actorId = null,
  projectId = null,
  link = null,
}) {
  if (!recipientId) throw new Error("recipientId is required");
  if (!type) throw new Error("type is required");
  if (!title) throw new Error("title is required");

  return {
    recipientId,
    type,
    title,
    body,
    actorId,
    projectId,
    link,
  };
}

module.exports = buildNotification;



