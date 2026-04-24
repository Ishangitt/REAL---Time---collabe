const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Connecting with URI:", process.env.MONGODB_URI.split('@')[1]); // safe logging
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to MongoDB: ${db.connection.host}`);
  } catch (error) {
    console.log("DB connection error:", error.message);
    // process.exit(1) stops the server if DB fails. Took me a while to find this!
    process.exit(1);
  }
};

module.exports = connectDB;
