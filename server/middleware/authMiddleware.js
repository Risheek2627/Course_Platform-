const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(404).json({ message: "Token not found" });
  try {
    const decode = jwt.verify(token, process.env.jwt_secret);
    const user = await User.findById(decode.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Token invalid", error: err.message });
  }
};
