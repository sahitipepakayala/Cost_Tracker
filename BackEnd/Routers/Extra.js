const express=require("express");
const { Authuser } = require("../middleware/Authuser");
const {Extra}=require("../Models/Extra");
const { Product } = require("../Models/Product");
const Extrarouter=express.Router();
Extrarouter.post("/newExtra",Authuser,async(req,res)=>{
    const{description,cost}=req.body;
    const userId=req.user._id;
    try{
    const product1=new Extra({
        userId,description,cost
    })
    await product1.save();
    res.status(200).json({msg:"Added Successfully",data:product1});
}
catch(error){
    console.log(error);
    res.status(500).json({msg:"Error",data:error});
}
})



Extrarouter.get("/getExtras",Authuser,async(req,res)=>{
    const user=req.user._id;
    try{
        const products=await Extra.find({userId:user});
        res.status(200).send(products);

    }
    catch(error){
        console.log(error);
    res.status(500).json({msg:"Error",data:error});
    }
})

Extrarouter.delete("/delete/:id",Authuser,async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await Extra.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Extra item not found" });
          }
        res.json({success:true,data:product});
        }
    catch(error){
        res.status(500).send(error.message);
        console.log(error.message)
    }
})

Extrarouter.get("/high_to_low",Authuser,async(req,res)=>{
    const user=req.user._id;
    try{

        const products=await Extra.find({userId:user}).sort({cost:-1});
        res.json({ success: true, products });
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error in ordering high to low"})
    }
})






Extrarouter.get("/low_to_high",Authuser,async(req,res)=>{
    const user=req.user._id;
    try{

        const products=await Extra.find({userId:user}).sort({cost:1});
        res.json({ success: true, products });
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error in ordering low to high"})
   
    }
})



module.exports={Extrarouter}