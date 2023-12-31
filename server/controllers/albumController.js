const User = require("../models/userModel");
const ListSongs = require("../models/listSongsModel");

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

    res.status(200).json({
      status: "success",
      album,
    });
  } catch (err) {
    next(err);
  }
};

exports.createAlbum = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    const album = await ListSongs.create(req.body);

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { listSongs: album } }
    );

    res.status(201).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    const albumId = req.params.albumId;

    const updatedAlbum = await ListSongs.findByIdAndUpdate(albumId, req.body);

    res.status(204).json({
      status: "success",
      updatedAlbum,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAlbum = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const albumId = req.params.albumId;

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $pull: { listSongs: albumId } }
    );

    await ListSongs.findByIdAndDelete(albumId);

    res.status(200).json({
      status: "success",
      updatedUser,
    });
  } catch (err) {
    next(err);
  }
};
