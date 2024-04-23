"use strict";

const { startSession, Types } = require("mongoose");
const { BadRequestError } = require("../core/errorResponse");
const Song = require("../models/songModel");
const {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");
const getVideoDuration = require("get-video-duration");
const { musicList } = require("../models/musicListModel");
const Genre = require("../models/genreModel");
const firebaseConfig = require("../configs/firebase");
const { initializeApp } = require("firebase/app");
const Singer = require("../models/singerModel");
const storage = getStorage();
initializeApp(firebaseConfig);

class SongService {
  async getAllSongs({ search }) {
    const agg = [
      {
        $lookup: {
          from: "musiclists",
          localField: "album",
          foreignField: "_id",
          as: "album",
        },
      },
      {
        $unwind: "$album",
      },
      {
        $lookup: {
          from: "singers",
          localField: "singers",
          foreignField: "_id",
          as: "singers",
        },
      },
      {
        $lookup: {
          from: "genres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
    ];
    if (search !== undefined) {
      agg.unshift({
        $search: {
          index: "default",
          autocomplete: {
            query: search || " ",
            path: "name",
            fuzzy: { maxEdits: 1 },
          },
        },
      });
    }
    return await Song.aggregate(agg);
  }

  async getSong(id) {
    const song = await Song.findById(id)
      .populate("album")
      .populate("singers")
      .populate("genres")
      .exec();
    if (!song) {
      throw new BadRequestError("Song with this id is not found!");
    }

    return song;
  }

  async createSong({ body, files }) {
    const session = await startSession();
    session.startTransaction();
    body.genres = body.genres
      .split(",")
      .map((genre) => new Types.ObjectId(genre));
    body.singers = body.singers
      .split(",")
      .map((singer) => new Types.ObjectId(singer));

    const downloadImageURL = await getDownloadURLFunc(files, "images");
    const downloadVideoURL = await getDownloadURLFunc(files, "videos");

    const durationBySeconds = await getVideoDuration.getVideoDurationInSeconds(
      downloadVideoURL
    );

    const duration = `${Math.floor(Math.floor(durationBySeconds) / 60)}:${
      Math.floor(durationBySeconds) % 60 >= 10
        ? Math.floor(durationBySeconds) % 60
        : "0" + (Math.floor(durationBySeconds) % 60)
    }`;

    const song = await Song.create(
      [
        {
          ...body,
          imageURL: downloadImageURL,
          songURL: downloadVideoURL,
          duration,
        },
      ],
      { session }
    );

    if (!song[0]) {
      throw new BadRequestError("Create song unsuccessfully!");
    }

    const album = await musicList.findOneAndUpdate(
      { _id: song[0].album },
      { $addToSet: { songs: song[0] } },
      { session }
    );
    if (!album) {
      throw new BadRequestError(`Album with id ${song[0].album} not found`);
    }

    const singers = song[0].singers;
    for (let i = 0; i < singers.length; i++) {
      const singer = await Singer.findOneAndUpdate(
        { _id: singers[i] },
        { $addToSet: { songs: song[0] } },
        { session }
      );
      if (!singer) {
        throw new BadRequestError(`Singer with id ${singers[i]} not found`);
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

    return song[0];
  }
}

const getDownloadURLFunc = async (files, folder) => {
  const dateTime = Date.now();
  const file = files[folder == "images" ? 0 : 1];
  const storageRef = ref(storage, `songs/${folder}/${dateTime}`);

  const metadata = {
    contentType: file.mimetype,
  };
  const snapshot = await uploadBytesResumable(
    storageRef,
    file.buffer,
    metadata
  );

  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

module.exports = new SongService();
