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
      projectId,
      role: "member",
      createdBy: userId,
      expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 day
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

module.exports = { getInviteToken };
