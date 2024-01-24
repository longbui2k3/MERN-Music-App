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
const cors = require("cors");
const morgan = require("morgan");

const app = express();
app.use(cors());
app.use(morgan("dev"));
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

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use("/", (err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    status: "error",
    code: statusCode,
    error: err.message || "Internal Server Error",
  });
});

// app.use(express.json());

// app.use("/", (req, res) => {
//   return res.json("Project Music App");
// });

module.exports = app;
