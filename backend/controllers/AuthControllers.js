const { MeetingModel } = require("../models/MeetingModel");
const { UserModel } = require("../models/UserModel");
const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All Fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: "Email already exists" });
    }
    const user = await UserModel.create({
      email,
      password,
      username,
    });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-site cookie
    });
    res
      .status(StatusCodes.CREATED)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password or email" });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Incorrect password or email" });
    }
    const token = createSecretToken(user._id);
   res.cookie("token", token, {
     httpOnly: true,
     secure: process.env.NODE_ENV === "production", // Only secure in production
     sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // Required for cross-site cookie
   });
    res
      .status(StatusCodes.OK)
      .json({ message: "User logged in successfully", success: true });
    // next();
  } catch (error) {
    console.error(error);
  }
};

module.exports.Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "Lax", // use "None" + secure: true if frontend & backend are on different domains in prod
      secure: process.env.NODE_ENV === "production",
    });
    res.status(200).json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed", success: false });
  }
};

module.exports.getUserHistory = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const meetings = await MeetingModel.find({ user_id: user.username });
    res.status(200).json(meetings);
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err.message}` });
  }
};

module.exports.addToHistory = async (req, res) => {
  const { meeting_code } = req.body;

  try {
    const user = await UserModel.findById(req.user.id);
    const newMeeting = new MeetingModel({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    const saved = await newMeeting.save();
    res.status(201).json({ message: "Added code to history", data: saved });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong: ${err.message}` });
  }
};

