const jwt  = require("jsonwebtoken");
const userModel = require("../models/user-model");

const protect=async(req,res,next)=>{
    if(req.cookies.token){
        try {
            const data= jwt.verify(req.cookies.token, process.env.JWT_KEY);
            console.log(data)
            req.user=await userModel.findOne({email:data.email}).select("-password");
            console.log(req.user)
            next();
        } catch (error) {
            res.status(401).json({message:"Not Authorized.",error:error})
        }
    }

    if(!req.cookies.token){
        res.status(401).json({message:"Not Authorized,You don not have permission to access."})
    }
}

module.exports=protect;