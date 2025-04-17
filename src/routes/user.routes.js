const {Router}=require("express");

const { health } = require("../controller/healthcheck.controller");


const router=Router();


router.route("/healthcheck").get(health)

module.exports=router