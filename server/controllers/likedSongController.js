const ListSongs = require("../models/listSongsModel");
const User = require("../models/userModel");

exports.getAllLikedSongs = async (req, res, next) => {
  try {
    const likedSongs = await ListSongs.find({
      type: "LikedSongs",
    });

    res.status(200).json({
      status: "success",
      likedSongs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllLikedSongsById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("listSongs").exec();
    if (!user) {
      throw new Error(`User with id: ${userId} not found`);
    }

    const likedSongs = user.listSongs.filter(
      (item) => item.type === "LikedSongs"
    );

    res.status(200).json({
      status: "success",
      likedSongs,
    });
  } catch (err) {
    next(err);
  }
};

exports.getLikedSongById = async (req, res, next) => {
  try {
    const likedSongId = req.params.likedSongId;

    const likedSong = await ListSongs.findById(likedSongId);

    res.status(200).json({
      status: "success",
      likedSong,
    });
  } catch (err) {
    next(err);
  }
};

exports.createLikedSongs = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const likedSong = await ListSongs.create(req.body);

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { listSongs: likedSong } }
    );

    res.status(201).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateLikedSong = async (req, res, next) => {
  try {
    const likedSongId = req.params.likedSongId;

    const updatedLikedSong = await ListSongs.findByIdAndUpdate(
      likedSongId,
      req.body
    );

    res.status(204).json({
      status: "success",
      updatedLikedSong,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteLikedSong = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const likedSongId = req.params.likedSongId;

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $pull: { listSongs: likedSongId } }
    );

    await ListSongs.findByIdAndDelete(likedSongId);

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
