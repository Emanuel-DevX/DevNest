const express = require("express");
const router = express.Router();
const { getInviteInfo, acceptInvite } = require("../controllers/membershipController");

router.get("/:token", getInviteInfo);
router.post("/:token/accept", acceptInvite);

module.exports = router;
