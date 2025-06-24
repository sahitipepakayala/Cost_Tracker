const express=require("express");
const { Product } = require("../Models/Product");
const { Authuser } = require("../middleware/Authuser");
const Productrouter=express.Router();

Productrouter.post("/newProduct",Authuser,async(req,res)=>{
    const{item,price}=req.body;
    const userId=req.user._id;
    try{
    const product1=new Product({
        userId,item,price
    })
    await product1.save();
    res.status(200).json({msg:"Added Successfully",data:product1});
}
catch(error){
    console.log(error);
    res.status(500).json({msg:"Error",data:error});
}
})


Productrouter.delete("/delete/:id",Authuser,async(req,res)=>{
    const {id}=req.params;
    try{
        const product=await Product.findByIdAndDelete(id);
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


Productrouter.get("/getProducts",Authuser,async(req,res)=>{
    const user=req.user._id;
    try{
        const products=await Product.find({userId:user});
        res.status(200).send(products);

    }
    catch(error){
        console.log(error);
    res.status(500).json({msg:"Error",data:error});
    }
})


Productrouter.get("/high_to_low",Authuser,async(req,res)=>{
    const user=req.user._id;
    try{

        const products=await Product.find({userId:user}).sort({price:-1});
        res.json({ success: true, products });
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error in ordering high to low"})
    }
})




Productrouter.get("/low_to_high",Authuser,async(req,res)=>{
    const user=req.user._id;
    try{

        const products=await Product.find({userId:user}).sort({price:1});
        res.json({ success: true, products });
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error in ordering low to high"})
   
    }
})


module.exports={Productrouter}