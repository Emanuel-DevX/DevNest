const crypto = require("crypto");
const Membership = require("../models/Membership");
const Project = require("../models/Project");
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

const acceptInvite = async (req, res) => {
  const token = req.params.token;
  const userId = req.user.id;
  const invite = await Invite.findOne({ token });
  if (!invite) return res.status(404).json({ error: "Invite not found" });
  if (invite.expiresAt < new Date())
    return res.status(410).json({ error: "Invite expired" });

  // If already member:
  const exists = await Membership.findOne({
    projectId: invite.project,
    userId: userId,
  });
  if (exists)
    return res
      .status(200)
      .json({ message: "Already a member", projectId: exists.projectId });

  await Membership.create({
    projectId: invite.project,
    userId: userId,
    role: "member",
  });

  return res.status(201).json({ ok: true, projectId: invite.project });
};
module.exports = { getInviteToken, getInviteInfo, acceptInvite };
