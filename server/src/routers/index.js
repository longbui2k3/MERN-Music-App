const express = require("express");
const authenRouter = require("./authenRouter");
const userRouter = require("./userRouter");
const singerRouter = require("./singerRouter");
const genreRouter = require("./genreRouter");
const albumRouter = require("./albumRouter");
const sectionRouter = require("./sectionRouter");
const songRouter = require("./songRouter");
const playlistRouter = require("./playlistRouter");
const likedSongsRouter = require("./likedSongsRouter");
const router = express.Router();

router.use("/user", userRouter);
router.use("/singer", singerRouter);
router.use("/genre", genreRouter);
router.use("/album", albumRouter);
router.use("/section", sectionRouter);
router.use("/song", songRouter);
router.use("/playlist", playlistRouter);
router.use("/likedsongs", likedSongsRouter);
router.use("/", authenRouter);

module.exports = router;
