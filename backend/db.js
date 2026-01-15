const mongoose = require("mongoose");
const logger = require("./config/logger");
const { error } = require("winston");
const mongoURL = "mongodb://localhost:27017/i-NoteBook";
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURL);
    // console.log("MongoDb connected successfully");
    logger.info("MongoDb connected successfully");
  } catch {
    // console.error(" MongoDB connection failed:", error.message);
    logger.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};
module.exports = connectToMongo;
