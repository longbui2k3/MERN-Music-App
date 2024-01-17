const User = require("../models/userModel");
const Singer = require("../models/singerModel");
const ListSongs = require("../models/listSongsModel");
const { startSession } = require("mongoose");

exports.getAllAlbums = async (req, res, next) => {
  try {
    const albums = await ListSongs.find({
      type: "Album",
    });

    res.status(200).json({
      status: "success",
      albums,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllAlbumsById = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).populate("listSongs").exec();
    if (!user) throw new Error(`User with id: ${userId} not found`);

    const albums = user.listSongs.filter((item) => item.type === "Album");

    res.status(200).json({
      status: "success",
      albums,
    });
  } catch (err) {
    next(err);
  }
};

exports.getAlbumById = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;

    const album = await ListSongs.findById(albumId);
    if (!album) throw new Error(`Album with id: ${albumId} not found`);

    res.status(200).json({
      status: "success",
      album,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAlbum = async (req, res, next) => {
  const session = await startSession();
  try {
    const singerId = req.params.singerId;

    session.startTransaction();
    const album = await ListSongs.create([req.body], { session });

    const updatedSinger = await Singer.findOneAndUpdate(
      { _id: singerId },
      { $push: { albums: album } },
      { session, new: true }
    );
    if (!updatedSinger) throw new Error(`Singer with id: ${singerId} not found`);

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      status: "success",
      album,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

exports.updateAlbum = async (req, res, next) => {
  const session = await startSession();
  try {
    const albumId = req.params.albumId;

    const updatedAlbum = await ListSongs.findByIdAndUpdate(albumId, req.body, {
      session,
      new: true,
    });
    if (!updatedAlbum) throw new Error(`Album with id: ${albumId} not found`);

    res.status(204);
  } catch (err) {
    next(err);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  const session = await startSession();
  try {
    const singerId = req.params.singerId;
    const albumId = req.params.albumId;

    session.startTransaction();
    const updatedSinger = await Singer.findOneAndUpdate(
      { _id: singerId },
      { $pull: { albums: albumId } }
    );
    if (!updatedSinger) throw new Error(`User with id: ${singerId} not found`);

    await ListSongs.findByIdAndDelete(albumId, { session, new: true });
    await session.commitTransaction();
    session.endSession();
    res.status(204);
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};
