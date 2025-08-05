const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
