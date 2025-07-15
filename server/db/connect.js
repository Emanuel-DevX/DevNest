const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

const connectDB = async function () {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected succefully");
  } catch (err) {
    console.error("Can't connect to db: ", err);
  }
};

module.exports = connectDB;
