const express=require("express");
const app=express();
const mongoose = require('mongoose');
const {UserRouter}=require("./Routers/UserRouter");
const cookieParser = require('cookie-parser');
const { Productrouter } = require("./Routers/ProductRouter");
const { Extrarouter } = require("./Routers/Extra");
const cors=require("cors")
require('dotenv').config();

const port=process.env.PORT||5000;

app.use(cookieParser());
app.use(express.json());

app.use(cors({
    origin:"https://cost-trackerf.onrender.com",
    credentials:true
}))

const connectDB=async ()=>{
try{

  await mongoose.connect(process.env.MONGOOSE_LINK);
  console.log("DataBase connected Successfully");
}
catch(error){
    console.log(error);

}
}

connectDB().then(()=>{
    app.listen(port,()=>{
        console.log("Listening to the port 5000");
    })

})
.catch((error)=>{
    console.log(error);
})

app.use("/user",UserRouter);
app.use("/product",Productrouter);
app.use("/extra",Extrarouter)

app.use("/",(req,res)=>{
    res.send("hello welcome")
})