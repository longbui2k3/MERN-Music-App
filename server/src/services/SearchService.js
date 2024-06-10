const { MusicList, Album, Playlist } = require("../models/musicListModel");
const Singer = require("../models/singerModel");
const { fetchSearchURL } = require("../utils/elasticsearch");

class SearchService {
  async searchLists({ search }) {
    const [musiclists, singers, songs] = await Promise.all([
      this.searchMusiclists({ search }),
      this.searchSingers({ search, limit: 5 }),
      this.searchSongs({ search, limit: 4 }),
    ]);

    return {
      albums: musiclists.filter((list) => list.type === "Album").slice(0, 5),
      playlists: musiclists
        .filter((list) => list.type === "Playlist")
        .slice(0, 5),
      singers,
      songs,
    };
  }

  async searchMusiclists({ search, limit }) {
    const resMusiclists = await fetchSearchURL("musiclists", search);

    let resultMusiclists = await Promise.all(
      resMusiclists.hits.hits.map(async (hit) => {
        const value = hit._source;
        value._id = value.id;
        let musiclist_attributes;
        if (value.type === "Album") {
          musiclist_attributes = await Album.findById(
            value.musiclist_attributes
          );
        } else if (value.type === "Playlist") {
          musiclist_attributes = await Playlist.findById(
            value.musiclist_attributes
          ).populate({ path: "user", select: { _id: 1, name: 1, role: 1 } });
        }
        value.musiclist_attributes = musiclist_attributes;
        return value;
      })
    );
    resultMusiclists = resultMusiclists.filter((musiclist) => {
      return (
        musiclist.type === "Album" ||
        musiclist.musiclist_attributes?.user?.role === "admin"
      );
    });
    if (limit) return resultMusiclists.slice(0, limit);
    return resultMusiclists;
  }

  async searchAlbums({ search, limit }) {
    const musiclists = await this.searchMusiclists({ search, limit });
    return musiclists.filter((list) => list.type === "Album");
  }
  async searchPlaylists({ search, limit }) {
    const musiclists = await this.searchMusiclists({ search, limit });
    return musiclists.filter((list) => list.type === "Playlist");
  }
  async searchSingers({ search, limit }) {
    const resSingers = await fetchSearchURL("singers", search);
    let resultSingers = await Promise.all(
      resSingers.hits.hits.map(async (hit) => {
        const value = hit._source;
        value._id = value.id;
        return value;
      })
    );
    if (limit) return resultSingers.slice(0, limit);
    return resultSingers;
  }

  async searchSongs({ search, limit }) {
    const resSongs = await fetchSearchURL("songs", search);
    let resultSongs = await Promise.all(
      resSongs.hits.hits.map(async (hit) => {
        const value = hit._source;
        value._id = value.id;
        value.singers = await Promise.all(
          value.singers.map(
            async (singer) => await Singer.findById(singer).select({ name: 1 })
          )
        );
        return value;
      })
    );
    if (limit) return resultSongs.slice(0, limit);
    return resultSongs;
  }
}

module.exports = new SearchService();
