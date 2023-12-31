const express = require("express");
const authorRouter = require("./routers/authorRouter");
const genreRoutes = require("./routers/genreRoutes");
const songRouter = require("./routers/songRouter");
const userRouter = require("./routers/userRouter");
const singerRouter = require("./routers/singerRouter");
const albumRouter = require("./routers/albumRouter");
const playlistRouter = require("./routers/playListRouter");
const likedSongRouter = require("./routers/likedSongRouter");
const sectionRouter = require("./routers/sectionRouter");
const router = express.Router();
const cors = require("cors");

const app = express();
app.use(cors());

const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json()); //middleware
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/songs", songRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/singer", singerRouter);
app.use("/api/v1/album", albumRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/likedSongs", likedSongRouter);
app.use("/api/v1/sections", sectionRouter);

app.use("/", (err, req, res, next) => {
  res.status(404).json({
    status: "error",
    error: err.message,
  });
});

// app.use(express.json());

// app.use("/", (req, res) => {
//   return res.json("Project Music App");
// });

module.exports = app;
