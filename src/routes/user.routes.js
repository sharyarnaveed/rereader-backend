const {Router}=require("express");
const {test} = require("../controller/auth.controller");


const router=Router();

router.route("/test").post(test)

module.exports=router