const express = require("express");
const authorRouter = require("./routers/authorRouter");
const app = express();
app.use(express.json()); //middleware
app.use("/api/v1/authors", authorRouter);
app.use("/api/v1/genre", genreRoutes);
app.use("/", (err, req, res, next) => {
  res.status(404).json({
    status: "error",
    error: err.message,
  });
});
const genreRoutes = require("./routes/genreRoutes");

// app.use(express.json());

// app.use("/", (req, res) => {
//   return res.json("Project Music App");
// });



module.exports = app;
