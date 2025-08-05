const express = require("express");
const router = express.Router();
const { getUserById, updateUser } = require("../controllers/userController");

router.get("/:id", getUserById);
router.patch("/:id", updateUser)

module.exports = router;
