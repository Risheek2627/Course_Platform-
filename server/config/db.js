const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MAX_RETRIES = 5; // Max retry attempts
const RETRY_DELAY_MS = 3000; // 3 seconds between retries

let retryCount = 0;

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // fail fast if no response in 5s
    });
    console.log("MongoDB connected");
  } catch (error) {
    retryCount++;

    if (retryCount < MAX_RETRIES) {
      console.warn(
        `MongoDB connection failed (Attempt ${retryCount}/${MAX_RETRIES}) ..Retrying in ${
          RETRY_DELAY_MS / 1000
        }s...`
      );
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      await connectDB(); // retry
    } else {
      console.error(
        "FATAL: MongoDB connection failed after max retries",
        error
      );
      process.exit(1); // Exit with error code
    }
  }
}

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB disconnected due to app termination");
  process.exit(0);
});

module.exports = connectDB;
