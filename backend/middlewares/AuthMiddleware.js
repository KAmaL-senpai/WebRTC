const { UserModel } = require("../models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await UserModel.findById(data.id);

    if (!user) {
      return res.status(401).json({ status: false, message: "User not found" });
    }

    req.user = { id: user._id, username: user.username }; // attach user to req
    next(); // call next middleware or route handler
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid token" });
  }
};