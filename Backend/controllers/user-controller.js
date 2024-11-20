const userModel = require("../models/user-model");
const bcrypt=require("bcrypt");
const generateToken = require("../utils/generateToken");

const register=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
    
        let user=await userModel.findOne({email});
        if(user){
            return res.status(400).send("User already exist.")
        }
    
        const salt= await bcrypt.genSalt();
        const hash=await bcrypt.hash(password,salt);
    
        user=await userModel.create({
            name,
            email,
            password:hash
        })
    
        res.cookie("token", generateToken({email}),{
            httpOnly:true,
            secure:true,
            maxAge:10*60*1000
        });
        res.status(201).json({user:user,message:"user created successfully."})
    } catch (error) {
        res.status(500).json("Error while creating user.")
    }
};

const login=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(500).json({message:"User not found."})
        }
        const matchPassword=await bcrypt.compare(password,user.password);
        if(!matchPassword){
            return res.status(500).json({message:"Password not match."})
        }
        const token=await generateToken({email});
        res.cookie("token",token,{
                httpOnly:true,
                secure:true,
                maxAge:10*60*1000
        })
        res.status(201).json({message:"user loggedin."})
    } catch (error) {
        res.status(401).json({message:"Error while login.",Error:error});
    }
};

const logout=async(req,res)=>{
    try{
        res.clearCookie("token")
        res.status(201).json({message:"Logout successfully."})
    }catch(error){
        res.status(401).json({message:"Error while Logout",Error:error})
    }
};

const getUserProfile=async(req,res)=>{
 res.status(200).json({message:"Your profile.",user:req.user})
};

module.exports={register,login,logout,getUserProfile}
