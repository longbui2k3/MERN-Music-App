const User = require("../models/userModel");
const Singer = require("../models/singerModel");
const ListSongs = require("../models/listSongsModel");
const { startSession, Types } = require("mongoose");
const multer = require("multer");
const firebaseConfig = require("../config/firebaseConfig");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const Song = require("../models/songModel");
const Genre = require("../models/genreModel");
initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });
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

    const album = await ListSongs.findById(albumId).populate({
      path: "songs",
      populate: "singers",
    });
    if (!album) throw new Error(`Album with id: ${albumId} not found`);

    res.status(200).json({
      status: "success",
      album,
    });
  } catch (err) {
    next(err);
  }
};
exports.uploadSingle = upload.single("image");
exports.createAlbum = async (req, res, next) => {
  const session = await startSession();
  try {
    session.startTransaction();
    console.log(req.body.genres.split(","));
    req.body.genres = req.body.genres
      .split(",")
      .map((genre) => new Types.ObjectId(genre));
    req.body.singers = req.body.singers
      .split(",")
      .map((singer) => new Types.ObjectId(singer));
    const dateTime = Date.now();

    const storageRef = ref(storage, `albums/${dateTime}`);
    // Create file metadata including the content type
    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );
    //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

    // Grab the public url
    const downloadURL = await getDownloadURL(snapshot.ref);

    const album = await ListSongs.create(
      [
        {
          ...req.body,
          imageURL: downloadURL,
          type: "Album",
          singers: req.body.singers,
        },
      ],
      { session }
    );
    for (let i = 0; i < req.body.genres.length; i++) {
      const genre = await Genre.findByIdAndUpdate(
        { _id: req.body.genres[i] },
        { $addToSet: { listSongs: album } },
        { session, new: true }
      );
      if (!genre) {
        throw new Error(`Genre with id ${req.body.genres[i]} not found`);
      }
    }
    for (let i = 0; i < album[0].singers.length; i++) {
      const updatedSinger = await Singer.findOneAndUpdate(
        { _id: album[0].singers[i] },
        { $push: { listSongs: album[0] } },
        { session, new: true }
      );
      if (!updatedSinger)
        throw new Error(`Singer with id: ${album[0].singers[i]} not found`);
    }
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
