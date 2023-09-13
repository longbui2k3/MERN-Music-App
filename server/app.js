const express = require("express");

const app = express();
// app.use(express.json());

app.use("/", (req, res) => {
  return res.json("Project Music App");
});
module.exports = app;
