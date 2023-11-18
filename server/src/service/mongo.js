const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection opened");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    dbName: DB_NAME,
  });
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
