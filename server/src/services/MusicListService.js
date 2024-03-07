"use strict";

const {
  BadRequestError,
  InternalServerError,
} = require("../core/errorResponse");
const {
  MusicList,
  Album,
  Playlist,
  LikedSongs,
  PlaylistSong,
} = require("../models/musicListModel");
const multer = require("multer");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const firebaseConfig = require("../configs/firebase");
const { startSession, Types } = require("mongoose");
const Genre = require("../models/genreModel");
const Singer = require("../models/singerModel");
const User = require("../models/userModel");
const Song = require("../models/songModel");
const { LIKEDSONGS_IMAGE_URL } = require("../configs");
const { removeUndefinedInObject } = require("../utils");
initializeApp(firebaseConfig);
const storage = getStorage();

class MusicListFactory {
  static musicListRegistry = {};
  static registerMusicListType(type, classRef) {
    MusicListFactory.musicListRegistry[type] = classRef;
  }
  static async createMusicList({ type, payload = {}, file = {}, userId }) {
    const musicListClass = MusicListFactory.musicListRegistry[type];
    if (!musicListClass) {
      throw new BadRequestError(`Invalid Musiclist type ${type}`);
    }

    return new musicListClass(payload).createMusicList({ file, userId });
  }
  static async getMusicListById({ type, id }) {
    const musicListClass = MusicListFactory.musicListRegistry[type];
    if (!musicListClass) {
      throw new BadRequestError(`Invalid Musiclist type ${type}`);
    }
    return new musicListClass({}).getMusicListById(id);
  }

  static async addSongToMusicList({ type, song, userId, id }) {
    const musicListClass = MusicListFactory.musicListRegistry[type];
    if (!musicListClass) {
      throw new BadRequestError(`Invalid Musiclist type ${type}`);
    }
    return new musicListClass({}).addSongToMusicList({ song, userId, id });
  }

  static async removeSongFromMusicList({ type, song, userId }) {
    const musicListClass = MusicListFactory.musicListRegistry[type];
    if (!musicListClass) {
      throw new BadRequestError(`Invalid Musiclist type ${type}`);
    }
    return new musicListClass({}).removeSongFromMusicList({
      song,
      userId,
    });
  }
  static async findAllMusicLists({ type, filter, limit }) {
    const musicListClass = MusicListFactory.musicListRegistry[type];
    if (!musicListClass) {
      throw new BadRequestError(`Invalid Musiclist type ${type}`);
    }
    return new musicListClass({}).findAllMusicLists({ filter, limit });
  }
}
class PlaylistFactory {
  static playlistRegistry = {};
  static registerPlaylistType(type, classRef) {
    PlaylistFactory.playlistRegistry[type] = classRef;
  }

  static async getPlaylistByUser({ type, user }) {
    const playlistClass = PlaylistFactory.playlistRegistry[type];
    if (!playlistClass) {
      throw new BadRequestError(`Invalid Musiclist type ${type}`);
    }
    return new playlistClass({}).getPlaylistByUser({ user });
  }
}

class MusicListService {
  constructor({
    name,
    type,
    imageURL,
    description,
    musiclist_attributes,
    songs,
    genres,
  }) {
    this.name = name;
    this.type = type;
    this.imageURL = imageURL;
    this.description = description;
    this.musiclist_attributes = musiclist_attributes
      ? JSON.parse(musiclist_attributes)
      : null;
    this.songs = songs;
    this.genres = genres;
  }

  async createMusicList(id, session, file = {}) {
    this.genres = this.genres
      ?.split(",")
      .map((genre) => new Types.ObjectId(genre));
    const dateTime = Date.now();

    if (file.mimetype && file.buffer) {
      const storageRef = ref(storage, `${this.type.toLowerCase()}/${dateTime}`);
      // Create file metadata including the content type
      const metadata = {
        contentType: file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata
      );

      const downloadURL = await getDownloadURL(snapshot.ref);
      this.imageURL = downloadURL;
    }
    if (this.type === "Playlist") {
      this.songs = await Promise.all(
        this.songs.map(async (song) => {
          const newPlaylistSong = await PlaylistSong.create({
            song,
          });
          if (!newPlaylistSong) {
            throw new BadRequestError("Create playlist unsuccessfully!");
          }
          return newPlaylistSong._id;
        })
      );
    }
    const newMusicList = await MusicList.create(
      [
        {
          ...this,
          musiclist_attributes: id,
        },
      ],
      { session }
    );

    if (!newMusicList[0]) {
      throw new BadRequestError(
        `Create ${this.type.toLowerCase()} unsuccessfully!`
      );
    }

    return newMusicList;
  }

  async getMusicListById(id) {
    const type = (await MusicList.findById(id)).type;
    let musiclist;
    if (type === "Album") {
      musiclist = await MusicList.findById(id)
        .populate({
          path: "musiclist_attributes",
          populate: { path: "singers", strictPopulate: false },
          strictPopulate: false,
        })
        .populate({
          path: "musiclist_attributes",
          populate: { path: "user", strictPopulate: false },
          strictPopulate: false,
        })
        .populate({
          path: "songs",
          populate: { path: "singers", strictPopulate: false },
          strictPopulate: false,
        })
        .lean();
    } else {
      musiclist = await MusicList.findById(id)
        .populate({
          path: "musiclist_attributes",
          populate: { path: "singers", strictPopulate: false },
          strictPopulate: false,
        })
        .populate({
          path: "musiclist_attributes",
          populate: { path: "user", strictPopulate: false },
          strictPopulate: false,
        })
        .populate({
          path: "songs",
          populate: {
            path: "song",
            strictPopulate: false,
            populate: { path: "singers", strictPopulate: false },
          },
          strictPopulate: false,
        })
        .populate({
          path: "songs",
          populate: {
            path: "song",
            strictPopulate: false,
            populate: { path: "album", strictPopulate: false },
          },
          strictPopulate: false,
        })
        .lean();
    }
    if (!musiclist) {
      throw new BadRequestError(`Musiclist with id: ${id} not found`);
    }
    return musiclist;
  }
}

class AlbumService extends MusicListService {
  constructor({
    name,
    type,
    imageURL,
    description,
    musiclist_attributes,
    songs,
    genres,
  }) {
    super({
      name,
      type,
      imageURL,
      description,
      musiclist_attributes,
      songs,
      genres,
    });
    this.type = "Album";
  }
  async createMusicList({ file = {} }) {
    const session = await startSession();
    session.startTransaction();
    this.musiclist_attributes.singers = this.musiclist_attributes.singers.map(
      (singer) => new Types.ObjectId(singer)
    );

    const newAlbum = await Album.create([this.musiclist_attributes], {
      session,
    });
    if (!newAlbum[0]) {
      throw new BadRequestError("Create album unsucessfully");
    }

    const newMusicList = await super.createMusicList(
      newAlbum[0]._id,
      session,
      file
    );
    if (!newMusicList[0]) {
      throw new BadRequestError("Create album unsucessfully");
    }

    for (let i = 0; i < this.genres.length; i++) {
      const genre = await Genre.findByIdAndUpdate(
        { _id: this.genres[i] },
        { $addToSet: { musicLists: newMusicList[0] } },
        { session, new: true }
      );
      if (!genre) {
        throw new BadRequestError(`Genre with id ${this.genres[i]} not found`);
      }
    }
    for (let i = 0; i < newAlbum[0].singers.length; i++) {
      const updatedSinger = await Singer.findOneAndUpdate(
        { _id: newAlbum[0].singers[i] },
        { $addToSet: { musicLists: newMusicList[0] } },
        { session, new: true }
      );
      if (!updatedSinger)
        throw new Error(`Singer with id: ${newAlbum[0].singers[i]} not found`);
    }
    await session.commitTransaction();
    session.endSession();
    return newMusicList[0];
  }

  async findAllMusicLists({ filter, limit = 20 }) {
    const { song, genre, singer } = filter;

    let musiclists;
    if (singer) {
      const albums = await Album.find({
        singers: singer,
      });

      musiclists = await Promise.all(
        albums.map(async (album) => {
          const queryObject = removeUndefinedInObject({
            musiclist_attributes: album._id,
            song,
            genre,
          });
          const musiclist = await MusicList.findOne(queryObject).populate(
            "musiclist_attributes"
          );
          return musiclist;
        })
      );
      return musiclists.slice(0, limit);
    }
    const queryObject = removeUndefinedInObject({
      song,
      genre,
    });
    musiclists = await MusicList.find(queryObject)
      .populate("musiclist_attributes")
      .limit(limit);
    return musiclists;
  }
}

class PlaylistService extends MusicListService {
  constructor({
    name,
    type,
    imageURL,
    description,
    musiclist_attributes,
    songs,
    genres,
  }) {
    super({
      name,
      type,
      imageURL,
      description,
      musiclist_attributes,
      songs,
      genres,
    });
    this.type = "Playlist";
  }
  async createMusicList({ userId, file = {} }) {
    const session = await startSession();
    session.startTransaction();
    if (!this.musiclist_attributes) {
      this.musiclist_attributes = {
        user: userId,
      };
    }
    const newPlaylist = await Playlist.create([this.musiclist_attributes], {
      session,
    });

    if (!newPlaylist[0]) {
      throw new BadRequestError("Create playlist unsucessfully");
    }

    const newMusicList = await super.createMusicList(
      newPlaylist[0]._id,
      session,
      file
    );
    if (!newMusicList[0]) {
      throw new BadRequestError("Create playlist unsucessfully");
    }

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $push: {
          musicLists: {
            musicList: newMusicList[0],
            dateAdded: Date.now(),
            datePlayed: Date.now(),
          },
        },
      },
      { session, new: true }
    );

    if (!updatedUser)
      throw new BadRequestError(`User with id: ${userId} not found`);
    await session.commitTransaction();
    session.endSession();

    return newMusicList[0];
  }

  async addSongToMusicList({ song, id }) {
    const session = await startSession();
    session.startTransaction();

    const playlist = await MusicList.findById(id);

    if (!playlist) {
      throw new BadRequestError(`Playlist with id ${id} does not exist!`);
    }

    const existedSong = await Song.findById(song);
    if (!existedSong) {
      throw new BadRequestError(`Song with id ${song} does not exist!`);
    }

    const existedMusicList = await MusicList.findById(id).populate({
      path: "songs",
      match: {
        song,
      },
    });

    if (existedMusicList.songs[0])
      throw new BadRequestError("This song is already in your Liked Song List");

    const playlistSong = await PlaylistSong.create(
      [
        {
          song,
          dateAdded: Date.now(),
        },
      ],
      { session }
    );
    if (!playlistSong[0]) {
      throw new BadRequestError("Add song unsuccessfully!");
    }
    const musicList = await MusicList.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          songs: playlistSong[0],
        },
      },
      { session, new: true }
    ).populate("songs");

    if (!musicList) {
      throw new BadRequestError("Add to Playlist unsuccessfully!");
    }

    await session.commitTransaction();
    session.endSession();

    return musicList;
  }
}

class LikedSongsService extends MusicListService {
  constructor({
    name,
    type,
    imageURL,
    description,
    musiclist_attributes,
    songs,
    genres,
  }) {
    super({
      name,
      type,
      imageURL,
      description,
      musiclist_attributes,
      songs,
      genres,
    });
    this.type = "LikedSongs";
    this.imageURL = LIKEDSONGS_IMAGE_URL;
    this.name = "Liked Songs";
  }

  async createMusicList({ userId, file = {} }) {
    const session = await startSession();
    session.startTransaction();
    if (!this.musiclist_attributes) {
      this.musiclist_attributes = {
        user: userId,
      };
    }

    const newLikedSongs = await LikedSongs.create([this.musiclist_attributes], {
      session,
    });

    if (!newLikedSongs[0]) {
      throw new BadRequestError("Create likedsongs unsucessfully");
    }

    const newMusicList = await super.createMusicList(
      newLikedSongs[0]._id,
      session,
      file
    );
    if (!newMusicList[0]) {
      throw new BadRequestError("Create likedsongs unsucessfully");
    }

    const updatedUser = await User.updateOne(
      { _id: userId },
      {
        $push: {
          musicLists: {
            musicList: newMusicList[0],
            dateAdded: Date.now(),
            datePlayed: Date.now(),
          },
        },
      },
      { session, new: true }
    );

    if (!updatedUser)
      throw new BadRequestError(`User with id: ${userId} not found`);

    await session.commitTransaction();
    session.endSession();

    return newMusicList[0];
  }

  async addSongToMusicList({ song, userId }) {
    const session = await startSession();
    session.startTransaction();
    const likedSongs = await LikedSongs.findOne({
      user: userId,
    });

    if (!likedSongs) {
      throw new BadRequestError("The user doesn't have Liked Songs list!");
    }

    const existedSong = await Song.findById(song);
    if (!existedSong) {
      throw new BadRequestError(`Song with id ${song} does not exist!`);
    }

    const existedMusicList = await MusicList.findOne({
      musiclist_attributes: likedSongs._id,
    }).populate({
      path: "songs",
      match: {
        song,
      },
    });

    if (existedMusicList.songs[0])
      throw new BadRequestError("This song is already in your Liked Song List");

    const playlistSong = await PlaylistSong.create(
      [
        {
          song,
          dateAdded: Date.now(),
        },
      ],
      { session }
    );
    if (!playlistSong[0]) {
      throw new BadRequestError("Add song unsuccessfully!");
    }
    const musicList = await MusicList.findOneAndUpdate(
      {
        musiclist_attributes: likedSongs._id,
      },
      {
        $addToSet: {
          songs: playlistSong[0],
        },
      },
      { session, new: true }
    ).populate("songs");

    if (!musicList) {
      throw new BadRequestError("Add to Liked Songs unsuccessfully!");
    }
    await session.commitTransaction();
    session.endSession();
    return musicList;
  }

  async removeSongFromMusicList({ song, userId }) {
    const session = await startSession();
    session.startTransaction();

    const likedSongs = await LikedSongs.findOne({
      user: userId,
    });

    if (!likedSongs) {
      throw new BadRequestError("The user has no Liked Songs list!");
    }

    const existedMusicList = await MusicList.findOne({
      musiclist_attributes: likedSongs._id,
    }).populate({
      path: "songs",
      match: {
        song,
      },
    });

    if (!existedMusicList.songs[0])
      throw new BadRequestError("This song is not in your Liked Song List");

    const existedPlaylistSong = await PlaylistSong.findById(
      existedMusicList.songs[0]._id
    );
    if (!existedPlaylistSong) {
      throw new BadRequestError(
        `Playlistsong with id ${existedMusicList.songs[0]._id} is not existed!`
      );
    }

    const updatedMusicList = await MusicList.findOneAndUpdate(
      { musiclist_attributes: likedSongs._id },
      {
        $pull: { songs: existedPlaylistSong._id },
      },
      { session, new: true }
    ).populate("songs");

    if (!updatedMusicList) {
      throw new BadRequestError("Remove failed, please try again later!");
    }

    await PlaylistSong.findByIdAndDelete(existedPlaylistSong._id, { session });

    await session.commitTransaction();
    session.endSession();

    return updatedMusicList;
  }

  async getPlaylistByUser({ user }) {
    const likedSongs = await LikedSongs.findOne({ user });

    if (!likedSongs) {
      throw new BadRequestError(
        "Your favorite list is not found with this user!"
      );
    }

    const musicList = await MusicList.findOne({
      musiclist_attributes: likedSongs._id,
    }).populate({ path: "songs", strictPopulate: false });

    return musicList;
  }
}

MusicListFactory.registerMusicListType("Album", AlbumService);
MusicListFactory.registerMusicListType("Playlist", PlaylistService);
MusicListFactory.registerMusicListType("LikedSongs", LikedSongsService);

PlaylistFactory.registerPlaylistType("Playlist", PlaylistService);
PlaylistFactory.registerPlaylistType("LikedSongs", LikedSongsService);

module.exports = {
  MusicListFactory,
  PlaylistFactory,
};
