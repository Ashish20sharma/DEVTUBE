const jwt=require("jsonwebtoken");

const generateToken=async(data)=>{
    return token= jwt.sign(data,process.env.JWT_KEY);
}

module.exports=generateToken;