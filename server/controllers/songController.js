const Song = require("../models/songModel");
const Author = require("../models/authorModel");
const Singer = require("../models/singerModel");
const Genre = require("../models/genreModel");
const ListSongs = require("../models/listSongsModel");
const { startSession } = require("mongoose");

const getAllSongs = async (req, res, next) => {
  try {
    const songs = await Song.find()
      .populate("album")
      .populate("authors")
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
      .populate("authors")
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

const createSong = async (req, res, next) => {
  const session = await startSession();
  try {
    let albumId = req.body.album;

    session.startTransaction();
    if (!albumId) {
      newAlbum = await ListSongs.create(
        [
          {
            name: req.body.name,
            type: "Album",
            imageURL: req.body.imageURL,
            singers: req.body.singers,
            songs: [],
          },
        ],
        { session }
      );

      albumId = newAlbum[0]._id;
      req.body.album = newAlbum[0]._id;
    }

    const song = await Song.create([req.body], { session });
    const album = await ListSongs.findOneAndUpdate(
      { _id: albumId },
      { $push: { songs: song } },
      { session }
    );
    if (!album) {
      throw new Error(`Album with id ${albumId} not found`);
    }

    const authors = song[0].authors;
    for (let i = 0; i < authors.length; i++) {
      const author = await Author.findOneAndUpdate(
        { _id: authors[i] },
        { $push: { songs: song } },
        { session }
      );
      if (!author) {
        throw new Error(`Author with id ${authors[i]} not found`);
      }
    }

    const singers = song[0].singers;
    for (let i = 0; i < singers.length; i++) {
      const singer = await Singer.findOneAndUpdate(
        { _id: singers[i] },
        { $push: { songs: song } },
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
        { $push: { songs: song } },
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


const searchSong = async (req, res, next) => {
  try {
    const keyword = req.params.name;
    


    // const song = await Song.find({ $text: { $search:  keyword}  }).collation({ locale: 'en', strength: 2 })
    //   .populate("album")
    //   .populate("authors")
    //   .populate("singers")
    //   .populate("genres")
    //   .exec();


    const song = await Song.find({ name: { $regex: new RegExp(keyword, 'i') }  }).collation({ locale: 'en', strength: 2 })
    .populate("album")
    .populate("authors")
    .populate("singers")
    .populate("genres")
    .exec();
    res.status(200).json({
      status: "success",
      data: song,});

  } catch(err) {
    next(err);
  }
}

module.exports = {
  getAllSongs,
  getSong,
  createSong,
  deleteSong,
  updateSong,
  searchSong
};
