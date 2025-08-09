const express = require("express");
const router = express.Router();
const { getInviteInfo, acceptInvite } = require("../controllers/membershipController");
const { sendProjectMembershipNotifications } = require("../middlewares/notify");

router.get("/:token", getInviteInfo);
router.post("/:token/accept", acceptInvite, sendProjectMembershipNotifications);

module.exports = router;
