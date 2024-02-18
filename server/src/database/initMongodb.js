const { default: mongoose } = require("mongoose");

class Database {
  constructor() {
    this.connectString = `mongodb+srv://${process.env.USERNAME_MONGODB}:${process.env.PASSWORD_MONGODB}@cluster0.${process.env.ID_CLUSTER_MONGODB}.mongodb.net/`;
    this.connect();
  }
  connect() {
    mongoose
      .connect(this.connectString, {
        maxPoolSize: 50,
      })
      .then((res) => {
        console.log("Database connected successfully!");
      })
      .catch((err) => {
        console.error(`Error connecting to database!`);
      });
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const database = Database.getInstance();
module.exports = database;
