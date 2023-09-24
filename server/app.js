const express = require("express");
const authorRouter = require("./routers/authorRouter");
const genreRoutes = require("./routers/genreRoutes");
const songRouter = require('./routers/songRouter');
const app = express();
app.use(express.json()); //middleware
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/genre", genreRoutes);
app.use('/api/v1/songs', songRouter);
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
