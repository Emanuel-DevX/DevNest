const { notifyMany } = require("../controllers/notificationControllers");

async function sendTaskUpdateNotifications(req, res) {
  const data = res.locals.notificationData;
  if (!data)
    return res.status(200).json({ message: "Successfully updated task info" });

  const {
    actorId,
    projectId,
    taskId,
    title,
    newlyAssigned,
    participantsChanged,
    participantsFinal,
  } = data;

  try {
    if (participantsChanged && newlyAssigned.length > 0) {
      // Notify new assignees
      await notifyMany({
        recipientIds: newlyAssigned.filter((id) => id !== actorId),
        actorId,
        projectId,
        type: "TASK_ASSIGNED",
        title: "You have been assigned to a task",
        link: `/project/${projectId}/tasks`,
      });

      // Notify others
      const others = participantsFinal.filter(
        (id) => id !== actorId && !newlyAssigned.includes(id)
      );
      if (others.length > 0) {
        await notifyMany({
          recipientIds: others,
          actorId,
          projectId,
          type: "TASK_UPDATED",
          title: "New member assigned to the task",
          link: `/project/${projectId}/tasks`,
        });
      }
    } else {
      // Any other change
      const others = participantsFinal.filter((id) => id !== actorId);
      if (others.length > 0) {
        await notifyMany({
          recipientIds: others,
          actorId,
          projectId,
          type: "TASK_UPDATED",
          title: "Task info updated",
          link: `/project/${projectId}/tasks`,
        });
      }
    }
  } catch (err) {
    console.error("Notification error:", err);
    return res
      .status(200)
      .json({ message: "Task updated, but notifications failed" });
  }
}

async function sendProjectMembershipNotifications(req, res, next) {
  const data = res.locals.projectMembershipData;
  if (!data) return next(); // no-op if nothing to do

  const { actorId, projectId, newMemberId, currentMemberIds } = data;

  try {
    // Notify the rest of the team that someone joined
    const others = (currentMemberIds || [])
      .map(String)
      .filter((id) => id !== String(actorId) && id !== String(newMemberId));

    if (others.length) {
      await notifyMany({
        recipientIds: others,
        actorId,
        projectId,
        type: "PROJECT_MEMBER_ADDED",
        title: "New member joined the project",
        link: `/project/${projectId}/settings#members`,
      });
    }
  } catch (err) {
    console.error("Project membership notify error:", err);
    // swallow; don’t break the main response
  } finally {
    next();
  }
}

async function sendProjectMemberRemovedNotifications(req, res, next) {
  const data = res.locals.projectMemberRemovedData;
  if (!data) return next();

  const { actorId, projectId, removedMemberId, remainingMemberIds, reason } =
    data;
  // reason: "left" | "removed"

  try {
    // Tell the removed user (skip if they triggered it)
    if (removedMemberId && String(removedMemberId) !== String(actorId)) {
      await notifyMany({
        recipientIds: [removedMemberId],
        actorId,
        projectId,
        type: "PROJECT_MEMBER_REMOVED",
        title:
          reason === "left"
            ? "You left a project"
            : "You were removed from a project",
        link: `/dashboard`, // project page won't exist anymore for them
      });
    }

    // 2) Tell the rest of the team
    const others = (remainingMemberIds || [])
      .map(String)
      .filter((id) => id !== String(actorId) && id !== String(removedMemberId));

    if (others.length) {
      await notifyMany({
        recipientIds: others,
        actorId,
        projectId,
        type: "PROJECT_MEMBER_REMOVED",
        title:
          reason === "left"
            ? "A member left the project"
            : "A member was removed from the project",
        link: `/project/${projectId}/settings#members`,
      });
    }
  } catch (err) {
    console.error("Member removed notify error:", err);
  } finally {
    next();
  }
}
async function sendProjectDeletedNotifications(req, res, next) {
  const data = res.locals.projectDeletedData;
  if (!data) return next();

  const { actorId, projectId, memberIds, projectName } = data;

  try {
    const recipients = (memberIds || []).map(String);

    if (recipients.length) {
      await notifyMany({
        recipientIds: recipients,
        actorId,
        projectId,
        type: "PROJECT_DELETED",
        title: projectName
          ? `Project deleted: “${projectName}”`
          : "A project you were in was deleted",
        link: "/dashboard", // safe landing page
      });
    }
  } catch (err) {
    console.error("Project deleted notify error:", err);
  } finally {
    next();
  }
}

module.exports = {
  sendTaskUpdateNotifications,
  sendProjectMembershipNotifications,
  sendProjectMemberRemovedNotifications,
  sendProjectDeletedNotifications,
};
