const express = require("express");
const router = express.Router();
const {
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const cleanUserInfo = require("../middlewares/cleanUserInfo");

router.get("/:id", getUserById);
router.patch("/:id", updateUser);
router.delete("/:id",cleanUserInfo, deleteUser);

module.exports = router;
