const { Router } = require("express");

const { health, checkacc } = require("../controller/healthcheck.controller");
const { signup, signin, logout } = require("../controller/auth.controller");
const { verificationOtp } = require("../controller/verify.controller");
const { userData } = require("../controller/userData.controller");
const { verifyjwt } = require("../middlewares/VerifyToken");

const router = Router();

router.route("/healthcheck").get(health);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/verifyotp").post(verificationOtp);
router.route("/getuserinfo").get(userData);
router.route("/checklogin").get(verifyjwt, checkacc);
router.route("/logout").post(verifyjwt, logout);

module.exports = router;
