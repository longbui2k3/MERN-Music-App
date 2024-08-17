const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const SearchController = require("../controllers/SearchController");
const router = express.Router();

router.route("/songs").get(
  // #swagger.tags = ['Search']
  // #swagger.summary = 'Search songs'
  asyncHandler(SearchController.searchSongs)
);
router.route("/albums").get(
  // #swagger.tags = ['Search']
  // #swagger.summary = 'Search albums'
  asyncHandler(SearchController.searchAlbums)
);
router.route("/playlists").get(
  // #swagger.tags = ['Search']
  // #swagger.summary = 'Search playlists'
  asyncHandler(SearchController.searchPlaylists)
);
router.route("/singers").get(
  // #swagger.tags = ['Search']
  // #swagger.summary = 'Search artists'
  asyncHandler(SearchController.searchArtists)
);
router.route("/").get(
  // #swagger.tags = ['Search']
  // #swagger.summary = 'Search lists'
  asyncHandler(SearchController.searchLists)
);

module.exports = router;
