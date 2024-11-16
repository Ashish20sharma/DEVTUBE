const express=require("express");
const googleOauth = require("../controllers/auth-controller");
const passport = require("passport");
const router=express.Router();

router.get("/google",passport.authenticate("google",{scope:["profile"]}),googleOauth);

module.exports=router;