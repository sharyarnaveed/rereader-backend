const {Router}=require("express");

const { health } = require("../controller/healthcheck.controller");
const { signup, signin } = require("../controller/auth.controller");


const router=Router();


router.route("/healthcheck").get(health)
router.route("/signup").post(signup)
router.route("/signin").post(signin)

module.exports=router