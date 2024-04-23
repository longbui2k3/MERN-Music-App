const express = require("express");
const asyncHandler = require("../helpers/asyncHandler");
const { protect } = require("../auth/authUtils");
const SearchController = require("../controllers/SearchController");
const router = express.Router();

router.route("/").get(asyncHandler(SearchController.searchLists));

module.exports = router;
