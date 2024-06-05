const SearchService = require("../services/SearchService");
const { CREATED, OK } = require("../core/successResponse");
class SearchController {
  static searchLists = async (req, res, next) => {
    const lists = await SearchService.searchLists({ search: req.query.search });
    return new OK({
      message: "Search lists successfully!",
      metadata: {
        lists,
      },
    }).send(res);
  };

  static searchSongs = async (req, res, next) => {
    const songs = await SearchService.searchSongs({ search: req.query.search });

    return new OK({
      message: "Search songs successfully!",
      metadata: {
        songs,
      },
    }).send(res);
  };
  static searchArtists = async (req, res, next) => {
    const artists = await SearchService.searchSingers({
      search: req.query.search,
    });

    return new OK({
      message: "Search artists successfully!",
      metadata: {
        artists,
      },
    }).send(res);
  };
  static searchAlbums = async (req, res, next) => {
    const albums = await SearchService.searchAlbums({
      search: req.query.search,
    });

    return new OK({
      message: "Search albums successfully!",
      metadata: {
        albums,
      },
    }).send(res);
  };
  static searchPlaylists = async (req, res, next) => {
    const playlists = await SearchService.searchPlaylists({
      search: req.query.search,
    });

    return new OK({
      message: "Search playlists successfully!",
      metadata: {
        playlists,
      },
    }).send(res);
  };
}

module.exports = SearchController;
