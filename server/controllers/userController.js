const User = require("../models/User");

const getUserById = async (req, res) => {
  const { userId } = req.params.id;
  const user = await User.findById(userId);

  return res.status(200).json(user);
};
