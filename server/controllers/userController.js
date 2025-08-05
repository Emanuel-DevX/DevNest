const User = require("../models/User");

const getUserById = async (req, res) => {
  const { userId } = req.params.id;
  const user = await User.findById(userId);

  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  if (String(id) !== String(userId)) {
    return res
      .status(403)
      .json({ message: "User not authorized to update this account" });
  }
  try {
    const { name, work, school } = req.body;
    if (!name.trim()) {
      return res.status(400).json({ message: "Name can not be empty" });
    }
    const updates = {
      name: name.trim(),
      work: work.trim(),
      school: school.trim(),
    };
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    const resp = {
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      school: updatedUser.school,
      work: updatedUser.work,
      image: updatedUser.image,
    };

    return res
      .status(200)
      .json({ message: "User Info updated successfully", user: resp });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Could not update user info", error: err.message });
  }
};

module.exports = { getUserById, updateUser };
