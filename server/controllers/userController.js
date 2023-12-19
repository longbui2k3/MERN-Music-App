const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find();
    if (user) {
      return res.status(200).json({ success: true, data: user });
    }
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  await User.findById(id)
    .then((result) => {
      res.status(200).json({
        status: "success",
        data: result,
      });
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = { getUserById, getAllUsers };
