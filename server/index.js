const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
app.use(express.json());

connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port 3000`);
});
