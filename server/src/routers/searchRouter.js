const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const SearchController = require("../controllers/SearchController");
const router = express.Router();

router.route("/songs").get(asyncHandler(SearchController.searchSongs));
router.route("/albums").get(asyncHandler(SearchController.searchAlbums));
router.route("/playlists").get(asyncHandler(SearchController.searchPlaylists));
router.route("/singers").get(asyncHandler(SearchController.searchArtists));
router.route("/").get(asyncHandler(SearchController.searchLists));

module.exports = router;
