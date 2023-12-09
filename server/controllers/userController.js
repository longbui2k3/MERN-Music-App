const User = require("../models/userModel");

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

module.exports = { getUserById };
