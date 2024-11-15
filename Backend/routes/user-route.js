const express =require("express");
const { register, login, logout, getUserProfile } = require("../controllers/user-controller");
const protect = require("../middlewares/protect");
const userRouter=express.Router();

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/profile",protect,getUserProfile)

module.exports=userRouter;