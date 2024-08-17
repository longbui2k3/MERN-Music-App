"use strict";
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { default: helmet } = require("helmet");
require("dotenv").config();
const app = express();

// app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

require("./database/initMongodb");
app.use("/api/v1", require("./routers"));

// Page Not found
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  return next(error);
});

// Catch error
app.use((error, req, res, next) => {
  // console.log("Err", error.stack);
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: statusCode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
