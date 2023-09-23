const express = require("express");
const authorRouter = require("./routers/authorRouter");
const app = express();
app.use(express.json()); //middleware
app.use("/api/v1/authors", authorRouter);
app.use("/", (err, req, res, next) => {
  res.status(404).json({
    status: "error",
    error: err.message,
  });
});

module.exports = app;
