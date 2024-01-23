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
const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  await User.findById(id)
    .populate({ path: "listSongs", populate: { path: "user" } })
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

const addFavoriteListsong = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      status: "fail",
      message: "Can not add your favorite list because you are not logged in!",
    });
  }
  const listsongId = req.body.listSong;

  const checkExistsFavoriteListsong = await User.findOne({
    _id: user._id,
    listSongs: { $in: listsongId },
  });
  if (checkExistsFavoriteListsong) {
    return res.status(400).json({
      status: "fail",
      message: "Added to favorite list already!",
    });
  }
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $push: { listSongs: listsongId },
  });
  if (!updatedUser) {
    return res.status(400).json({
      status: "fail",
      message: "Something error!",
    });
  }

  return res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

const removeFavoriteListsong = async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({
      status: "fail",
      message:
        "Can not remove your favorite list because you are not logged in!",
    });
  }
  const listsongId = req.params.listSong;
  const updatedUser = await User.findByIdAndUpdate(user._id, {
    $pull: { listSongs: listsongId },
  });
  if (!updatedUser) {
    return res.status(400).json({
      status: "fail",
      message: "Something error!",
    });
  }

  return res.status(200).json({
    status: "success",
    data: updatedUser,
  });
};

module.exports = {
  getUserById,
  getAllUsers,
  getMe,
  addFavoriteListsong,
  removeFavoriteListsong,
};
