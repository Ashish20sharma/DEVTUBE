require("dotenv").config();
const express =require("express");
const path=require("path")
const connection = require("./config/mongodb-connect");
const app=express();
const config=require("config");
const cookieParser=require("cookie-parser");
const userRouter = require("./routes/user-route");
const authRouter = require("./routes/auth-router");
const passport = require("passport");
const expressSession=require("express-session");
// const port=process.env.PORT||3000;

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(expressSession({
    secret:process.env.EXPRESS_SECRET,
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/user/api",userRouter);
app.use("/auth",authRouter);

require("./config/googleStrategy");

app.listen(config.get("PORT"),()=>{
    console.log(`Server running `);
    connection();
});