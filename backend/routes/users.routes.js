const { Router } = require("express");

const router = Router();
const {
  Login,
  Signup,
  Logout,
  addToHistory,
  getUserHistory,
} = require("../controllers/AuthControllers");
const { userVerification } = require("../middlewares/AuthMiddleware");

router.route("/login").post(Login);
router.route("/signup").post(Signup);
router.route("/logout").get(Logout);
router.route("/add_to_activity").post(userVerification, addToHistory);
router.route("/get_all_activity").get(userVerification, getUserHistory);

module.exports = router;
