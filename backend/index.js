const express = require("express");
const app = express();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { userVerification } = require("./middlewares/AuthMiddleware");
const { createServer } = require("node:http");
const { connectToSocket } = require("./controllers/socketManager");

const server = createServer(app);
const io = connectToSocket(server);

//Routes
const userRouter = require("./routes/users.routes");

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json({ limit: "40kb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.get("/home", userVerification, (req, res) => {
  return res.status(200).json({
    message: "Authorized",
    user: req.user.username,
  });
});

server.listen(PORT, (req, res) => {
  console.log("Listing!!");
});
