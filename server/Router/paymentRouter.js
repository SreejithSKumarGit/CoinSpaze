const express=require("express");
const payment = require("../Handler/paymentHandler");

const paymentRouter=express.Router();

paymentRouter.post("/payment",payment);

module.exports=paymentRouter;