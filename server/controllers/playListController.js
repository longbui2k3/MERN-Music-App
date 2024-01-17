const User = require("../models/userModel");
const ListSongs = require("../models/listSongsModel");

exports.getAllPlaylist = async (req, res, next) => {
  try {
    const playlists = await ListSongs.find({
      type: "Playlist",
    });

    res.status(200).json({
      status: "success",
      playlists,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPlaylistsById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId)
      .populate({ path: "listSongs", populate: { path: "user" } })
      .exec();
    const playlists = user.listSongs.filter((item) => item.type === "Playlist");

    res.status(200).json({
      status: "success",
      playlists,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPlaylistById = async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;

    const playlist = await ListSongs.findById(playlistId).populate("songs");
    res.status(200).json({
      status: "success",
      playlist,
    });
  } catch (err) {
    next(err);
  }
};

exports.createPlaylist = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const playlist = await ListSongs.create({ ...req.body, user: userId });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { listSongs: playlist } }
    );

    res.status(201).json({
      status: "success",
      // updatedUser,
      playlist,
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const playlistId = req.params.playlistId;

    const updatedPlaylist = await ListSongs.findByIdAndUpdate(
      playlistId,
      req.body
    );

    res.status(204).json({
      status: "success",
      updatedPlaylist,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $pull: { listSongs: playlistId } }
    );

    await ListSongs.findByIdAndDelete(playlistId);

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
