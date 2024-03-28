// Middlewares/AuthMiddleware.js
const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {

    return res.status(401).json({ message: "No token provided, authorization denied" });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token is not valid" });
    } else {
      try {
        const user = await User.findById(decoded.id).select("-password"); // Excludes password from the user object
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
        next();
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
      }
    }
  });
};
