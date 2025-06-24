const mongoose=require("mongoose");

const extraSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    cost:{
        type:Number,
        required:true,
        min:0
    }
},{timestamps:true});

const Extra=mongoose.model("Extra",extraSchema);

module.exports={Extra}