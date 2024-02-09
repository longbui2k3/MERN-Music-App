const Song = require("../models/songModel");
const Author = require("../models/authorModel");
const Singer = require("../models/singerModel");
const Genre = require("../models/genreModel");
const ListSongs = require("../models/listSongsModel");
const multer = require("multer");
const getVideoDuration = require("get-video-duration");
const firebaseConfig = require("../config/firebaseConfig");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });
const { startSession, Types } = require("mongoose");

const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .populate("album")
      .populate("singers")
      .populate("genres")
      .exec();

    res.status(200).json({
      status: "success",
      data: songs,
    });
  } catch (err) {
    next(err);
  }
};

const getSong = async (req, res, next) => {
  try {
    const id = req.params.id;
    const song = await Song.findById(id)
      .populate("album")
      .populate("singers")
      .populate("genres")
      .exec();

    res.status(200).json({
      status: "success",
      data: song,
    });
  } catch (err) {
    next(err);
  }
};
const getDownloadURLFunc = async (req, folder) => {
  const dateTime = Date.now();
  const file = req.files[folder == "images" ? 0 : 1];
  const storageRef = ref(storage, `songs/${folder}/${dateTime}`);
  // Create file metadata including the content type
  const metadata = {
    contentType: file.mimetype,
  };

  // Upload the file in the bucket storage
  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );
  //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

  // // Grab the public url
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
const uploadSingle = upload.any();
const createSong = async (req, res, next) => {
  const session = await startSession();
  try {
    session.startTransaction();
    req.body.genres = req.body.genres
      .split(",")
      .map((genre) => new Types.ObjectId(genre));
    req.body.singers = req.body.singers
      .split(",")
      .map((singer) => new Types.ObjectId(singer));
    const downloadImageURL = await getDownloadURLFunc(req, "images");
    const downloadVideoURL = await getDownloadURLFunc(req, "videos");

    const duration = await getVideoDuration.getVideoDurationInSeconds(
      downloadVideoURL
    );

    const song = await Song.create(
      [
        {
          ...req.body,
          imageURL: downloadImageURL,
          songURL: downloadVideoURL,
          duration: `${Math.floor(Math.floor(duration) / 60)}:${
            Math.floor(duration) % 60 >= 10
              ? Math.floor(duration) % 60
              : "0" + (Math.floor(duration) % 60)
          }`,
        },
      ],
      { session }
    );
    const album = await ListSongs.findOneAndUpdate(
      { _id: song[0].album },
      { $addToSet: { songs: song[0] } },
      { session }
    );
    if (!album) {
      throw new Error(`Album with id ${song[0].album} not found`);
    }

    // const authors = song[0].authors;
    // for (let i = 0; i < authors.length; i++) {
    //   const author = await Author.findOneAndUpdate(
    //     { _id: authors[i] },
    //     { $push: { songs: song } },
    //     { session }
    //   );
    //   if (!author) {
    //     throw new Error(`Author with id ${authors[i]} not found`);
    //   }
    // }

    const singers = song[0].singers;
    for (let i = 0; i < singers.length; i++) {
      const singer = await Singer.findOneAndUpdate(
        { _id: singers[i] },
        { $addToSet: { songs: song[0] } },
        { session }
      );
      if (!singer) {
        throw new Error(`Singer with id ${singers[i]} not found`);
      }
    }

    const genres = song[0].genres;
    for (let i = 0; i < genres.length; i++) {
      const genre = await Genre.findOneAndUpdate(
        { _id: genres[i] },
        { $addToSet: { songs: song[0] } },
        { session, new: true }
      );
      if (!genre) {
        throw new Error(`Genre with id ${genres[i]} not found`);
      }
    }

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      status: "add song success",
      song,
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    console.log(err);
    next(err);
  }
};

const deleteSong = async (req, res, next) => {
  const session = await startSession();

  try {
    const id = req.params.id;

    session.startTransaction();
    const song = await Song.findById(id);
    if (!song) throw new Error(`Song with id ${id} not found`);

    const albumId = song.album;
    const updatedAlbum = await ListSongs.findByIdAndUpdate(
      { _id: albumId },
      { $pull: { songs: id } },
      { session, new: true }
    );
    if (!updatedAlbum) {
      throw new Error(`Album with id ${albumId} not found`);
    }

    const authors = song.authors;
    for (let i = 0; i < authors.length; i++) {
      const author = await Author.findOneAndUpdate(
        { _id: authors[i] },
        { $pull: { songs: id } },
        { session, new: true }
      );
      if (!author) {
        throw new Error(`Author with id ${authors[i]} not found`);
      }
    }

    const singers = song.singers;
    for (let i = 0; i < singers.length; i++) {
      const singer = await Singer.findOneAndUpdate(
        { _id: singers[i] },
        { $pull: { songs: id } },
        { session, new: true }
      );
      if (!singer) {
        throw new Error(`Singer with id ${singers[i]} not found`);
      }
    }

    const genres = song.genres;
    for (let i = 0; i < genres.length; i++) {
      const genre = await Genre.findOneAndUpdate(
        { _id: genres[i] },
        { $pull: { songs: id } },
        { session, new: true }
      );
      if (!genre) {
        throw new Error(`Genre with id ${genres[i]} not found`);
      }
    }

    await Song.findByIdAndDelete(id, { session, new: true });

    await session.commitTransaction();
    session.endSession();

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

const updateSong = async (req, res, next) => {
  const session = await startSession();
  try {
    const id = req.params.id;

    session.startTransaction();
    const updatedSong = await Song.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedSong) {
      throw new Error(`Song with Id: ${id} does not exist!`);
    }

    res.status(204).json({
      status: "success",
      updatedSong,
    });

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
  uploadSingle,
};
