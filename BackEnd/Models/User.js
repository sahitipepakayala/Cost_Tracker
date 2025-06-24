const mongoose=require("mongoose");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")

const userSchema=new mongoose.Schema({
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requires:true
    }
})
userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},process.env.SECRET_KEY,{ expiresIn: "1d" });
    return token;

}

userSchema.methods.validatePassword=async function(password){
    const user=this;
    const check=await bcrypt.compare(password,user.password);
    return check;
}


const User=mongoose.model("User",userSchema);

module.exports={User}