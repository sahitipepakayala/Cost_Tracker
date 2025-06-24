const {User}=require("../Models/User");
const jwt=require("jsonwebtoken");
require("dotenv").config(); 

const Authuser=async(req,res,next)=>{
    try{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).send("Not logged in");
    }
    const decode=jwt.verify(token,process.env.SECRET_KEY);
    const user=await User.findById(decode._id);
    if(!user)
    {
        return res.status(404).send("User Not Found");
    }
    req.user=user;
    next();
}
catch(error){
    console.log(error);
    return res.status(500).json({msg:"error",data:error})
}

}

module.exports={Authuser}