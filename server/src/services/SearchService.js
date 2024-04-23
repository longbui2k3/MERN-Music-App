const { MusicList } = require("../models/musicListModel");
const Singer = require("../models/singerModel");

class SearchService {
  async searchLists({ search, limit }) {
    const albums = await MusicList.aggregate([
      {
        $search: {
          index: "default",
          autocomplete: {
            query: search || " ",
            path: "name",
            fuzzy: { maxEdits: 1, prefixLength: 0 },
          },
        },
      },
      {
        $match: {
          type: "Album",
        },
      },
    ]);
    const playlists = await MusicList.aggregate([
      {
        $search: {
          index: "default",
          autocomplete: {
            query: search,
            path: "name",
            fuzzy: { maxEdits: 1, prefixLength: 0 },
          },
        },
      },
      {
        $lookup: {
          from: "playlists",
          localField: "musiclist_attributes",
          foreignField: "_id",
          as: "musiclist_attributes",
        },
      },
      {
        $unwind: "$musiclist_attributes",
      },
      {
        $lookup: {
          from: "users",
          localField: "musiclist_attributes.user",
          foreignField: "_id",
          as: "musiclist_attributes.user",
        },
      },
      {
        $unwind: "$musiclist_attributes.user",
      },
      {
        $match: {
          type: "Playlist",
          "musiclist_attributes.user.role": "admin",
        },
      },
      {
        $project: {
          "musiclist_attributes.user": 0,
        },
      },
    ]);
    const artists = await Singer.aggregate([
      {
        $search: {
          index: "default",
          autocomplete: {
            query: search,
            path: "name",
            fuzzy: { maxEdits: 1, prefixLength: 0 },
          },
        },
      },
    ]);
    const lists = [...albums, ...playlists, ...artists];
    return lists;
  }
}

module.exports = new SearchService();
