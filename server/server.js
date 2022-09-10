require('dotenv').config({path:"./.env"});
const express =require("express");
const cors=require("cors");
const paymentRouter = require("./Router/paymentRouter");


const app=express();
app.use(express.json());
app.use(cors());
app.get("/",(req,res,next) =>{
    res.json("server start")
}) 
app.use(paymentRouter);
const  PORT=process.env.PORT || 8080;

app.listen(PORT,()=>
{
    console.log("Server connected to",PORT);
})