const express = require("express");
const genreRoutes = require("./routes/genreRoutes");

const app = express();
// app.use(express.json());

// app.use("/", (req, res) => {
//   return res.json("Project Music App");
// });

app.use(express.json()); //to accept JSON data

app.use("/api/genre", genreRoutes);

module.exports = app;
