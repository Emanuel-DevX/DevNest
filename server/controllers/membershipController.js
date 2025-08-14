const crypto = require("crypto");
const Membership = require("../models/Membership");
const Project = require("../models/Project");
const Task = require("../models/Task");

const Invite = require("../models/Invite");

const getInviteToken = async (req, res) => {
  const projectId = req.params.projectId;
  const userId = req.user.id;

  try {
    const inviteToken = crypto.randomBytes(6).toString("base64url"); // URL-safe

    await Invite.create({
      token: inviteToken,
      project: projectId,
      role: "member",
      createdBy: userId,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7,
    });

    return res
      .status(201)
      .json({ token: inviteToken, message: "Invitation created" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not generate url", error: err.message });
  }
};

const getInviteInfo = async (req, res) => {
  const token = req.params.token;
  const inviteInfo = await Invite.findOne({ token })
    .populate("project", "name description")
    .populate("createdBy", "name email");
  return res.status(200).json(inviteInfo);
};

const acceptInvite = async (req, res, next) => {
  const token = req.params.token;
  const userId = req.user.id;
  const invite = await Invite.findOne({ token });
  if (!invite) return res.status(404).json({ error: "Invite not found" });
  if (invite.expiresAt < new Date())
    return res.status(410).json({ error: "Invite expired" });
  const projectId = invite.project;

  // If already member:
  const exists = await Membership.findOne({
    projectId: invite.project,
    userId: userId,
  });
  if (exists)
    return res
      .status(200)
      .json({ message: "Already a member", projectId: exists.projectId });

  try {
    await Membership.create({
      projectId: invite.project,
      userId: userId,
      role: "member",
    });

    const all = await Membership.find({ projectId }).select("userId").lean();
    const currentMemberIds = all
      .filter((m) => String(m.userId) !== String(userId))
      .map((m) => String(m.userId));
    const project = await Project.findById(projectId).select("name");

    res.locals.projectMembershipData = {
      actorId: userId,
      projectId,
      projectName: project?.name || "a project",
      newMemberId: userId,
      currentMemberIds,
    };

    return res.status(201).json({ ok: true, projectId: invite.project });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to add project membership",
      error: err.message,
    });
  } finally {
    next();
  }
};

const removeMember = async (req, res, next) => {
  try {
    const projectId = String(req.params.projectId);
    const memberId = String(req.params.memberId);
    const actorId = String(req.user.id);

    const isSelf = actorId === memberId;

    const mem = await Membership.deleteOne({ projectId, userId: memberId });
    if (mem.deletedCount !== 1)
      return res.status(404).json({ message: "Membership not found" });

    await Task.updateMany({ projectId }, { $pull: { participants: memberId } });

    const remaining = await Membership.find({ projectId })
      .select("userId")
      .lean();
    const remainingMemberIds = remaining.map((m) => String(m.userId));
    const project = await Project.findById(projectId).select("name");
    res.locals.projectMemberRemovedData = {
      actorId,
      projectId,
      projectName: project.name,
      removedMemberId: memberId,
      remainingMemberIds,
      reason: isSelf ? "left" : "removed",
    };

    return res.status(200).json({ message: "Successfully removed member" });
  } catch (err) {
    return res.status(500).json({ message: "Could not remove member" });
  } finally {
    next();
  }
};

const updateMember = async (req, res) => {
  const { role } = req.body;
  if (!["admin", "member"].includes(role.toLowerCase()))
    return res.status(400).json({ message: "Unsupported role" });
  const projectId = req.params.projectId;
  const memberId = req.params.memberId;

  await Membership.updateOne({ projectId, userId: memberId }, { role });
  return res.status(200).json({ message: "successfully updated member role" });
};

module.exports = {
  getInviteToken,
  getInviteInfo,
  acceptInvite,
  removeMember,
  updateMember,
};
