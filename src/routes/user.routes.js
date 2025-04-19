const {Router}=require("express");

const { health } = require("../controller/healthcheck.controller");
const { signup, signin } = require("../controller/auth.controller");
const { verificationOtp } = require("../controller/verify.controller");


const router=Router();


router.route("/healthcheck").get(health)
router.route("/signup").post(signup)
router.route("/signin").post(signin)
router.route("/verifyotp").post(verificationOtp)

module.exports=router