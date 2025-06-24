const express=require("express");
const UserRouter=express.Router();
const {User}=require("../Models/User");
const bcrypt=require("bcrypt");
const { Authuser } = require("../middleware/Authuser");
require("dotenv").config(); 

UserRouter.post("/signup",async(req,res)=>{
    const {emailId,password}=req.body;
    try{
        const existing=await User.findOne({emailId});
        if(existing)
        {
          return res.status(500).send("User Exists!");
        }
        const hashPwd=await bcrypt.hash(password,10);
        const user=new User({
            emailId,
            password:hashPwd
        })

        await user.save();
        const token=await user.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,           // ✅ Required for HTTPS (on production)
            sameSite: "None",       // ✅ Required for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(200).json({msg:"Signed In successfully",data:{_id:user._id,emailId:user.emailId}})

    }
    catch(error){
        console.log(error);
        return res.status(500).send(error);
    }
})


UserRouter.get("/logout",async(req,res)=>{
    res.clearCookie("token");
     res.status(200).send("Logged Out successfully");

})

UserRouter.post("/login",async(req,res)=>{
    const {emailId,password}=req.body;
    try{
        const existing=await User.findOne({emailId});
        if(!existing)
            return res.status(500).send("No User Found");
        const check=await existing.validatePassword(password);
        if(!check)
            return res.status(500).send("Incorrect Password");
        const token=await existing.getJWT();
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,           // ✅ Required for HTTPS (on production)
            sameSite: "None",       // ✅ Required for cross-site cookies
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.status(200).json({
            msg: "Logged In successfully",
            data: { _id: existing._id, emailId: existing.emailId }
          });
          

    }
    catch(error){
        console.log(error);
        return res.status(500).send(error);
        }
;})

// UserRouter.js
UserRouter.get("/current", Authuser, async (req, res) => {
    res.json(req.user); // req.user was added by your Authuser middleware
});


UserRouter.get('/profile',Authuser , async (req, res) => {
    const user = await User.findById(req.user._id);
    res.json(user);
  });
  

module.exports={UserRouter};