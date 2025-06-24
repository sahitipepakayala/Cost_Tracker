const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    item:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    }
},{timestamps:true})

const Product=mongoose.model("Product",productSchema);
module.exports={Product}