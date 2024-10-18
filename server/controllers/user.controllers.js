const User = require("../models/user.models");

exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({ message: "Successfully gotten user data", user });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUserInfo = async (req, res) => {
  const { name, password } = req.body;

  try {
    const updateData = { name };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      ...updateData,
    }).exec();

    res.json({ message: "User updated successfully", user: updatedUser });

  } catch (error) {

    console.error(error);

    res.status(500).json({ error: "Internal server error" });
  }
};
