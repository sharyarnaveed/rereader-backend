const { Router } = require("express");

const { health, checkacc } = require("../controller/healthcheck.controller");
const { signup, signin, logout, forgotpassword } = require("../controller/auth.controller");
const { verificationOtp } = require("../controller/verify.controller");
const { userData } = require("../controller/userData.controller");
const { verifyjwt } = require("../middlewares/VerifyToken");
const passport = require("../services/passport");
const { generateToken } = require("../services/GenerateToken");
const { uploadProduct } = require("../controller/uploadproduct.controller");

const router = Router();

router.route("/healthcheck").get(health);
router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/verifyotp").post(verificationOtp);
router.route("/getuserinfo").get(userData);
router.route("/checklogin").get(verifyjwt, checkacc);
router.route("/logout").post(verifyjwt, logout);
router.route("/resetmail").post(forgotpassword)
router.route("/uploadporduct").post(uploadProduct)





// GOOGLE AUTHENTICATION
router.route("/auth/google").get(
  passport.authenticate('google', { scope: ['profile', 'email'] })
);


router.route("/auth/google/callback").get(
     passport.authenticate('google', { session: false }),
async(req, res) => {
    
 const token =await generateToken(req.user.dataValues.id)

  res
          .cookie("accessToken", token.accessToken, token.Accessoptions)
          .cookie("refreshToken", token.refreshToken, token.Refreshoptions);

    res.redirect(process.env.FRONTENDURL); 
    
 

    // user token here
    console.log(req.user.dataValues.id,"from req,user");
    
})


module.exports = router;
