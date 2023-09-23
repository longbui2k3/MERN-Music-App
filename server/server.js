const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const app = require("./app");
const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connected successful!"));

const port = process.env.PORT || 4000;

const server = app.listen(port, "127.0.0.1", () => {
  console.log("Server is listening at localhost:4000");
});
