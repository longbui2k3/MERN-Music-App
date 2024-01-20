const User = require("../models/userModel");
const ListSongs = require("../models/listSongsModel");
const { startSession } = require("mongoose");

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
    if (!user) throw new Error(`User with id: ${userId} not found`);
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

    const playlist = await ListSongs.findById(playlistId)
      .populate("songs")
      .populate("singers")
      .exec();

    if (!playlist) throw new Error(`Playlist with Id: ${playlistId} not found`);
    res.status(200).json({
      status: "success",
      playlist,
    });
  } catch (err) {
    next(err);
  }
};

exports.createPlaylist = async (req, res, next) => {
  const session = await startSession();
  try {
    const userId = req.params.userId;
    session.startTransaction();

    const playlist = await ListSongs.create([{ ...req.body, user: userId }], {
      session,
    });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { listSongs: playlist[0] } },
      { session, new: true }
    );

    if (!updatedUser) throw new Error(`User with id: ${userId} not found`);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "success",
      // updatedUser,
      playlist: playlist[0],
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
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
    if (!updatedPlaylist)
      throw new Error(`Playlist with id: ${playlistId} not found`);

    res.status(204).json({
      status: "success",
      updatedPlaylist,
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  const session = await startSession();
  try {
    const userId = req.params.userId;
    const playlistId = req.params.playlistId;

    // const updatedUser = await User.updateOne(
    //   { _id: userId },
    //   { $pull: { listSongs: playlistId } }
    // );
    const user = await User.findById(userId);
    if (!user) throw new Error(`User with id: ${userId} not found`);

    const playlist = await ListSongs.findById(playlistId);
    if (!playlist) throw new Error(`Playlist with id: ${playlistId} not found`);

    session.startTransaction();

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { listSongs: playlistId } },
      { session, new: true }
    );
    if (!updatedUser) throw new Error("Fail to update user!");

    await ListSongs.findByIdAndDelete(playlistId, { session, new: true });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};
