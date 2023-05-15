const router = require('express').Router()
const PlaceOrder = require('../models/PlaceOrder.model')
const dotenv = require('dotenv')
const mongoose=require("mongoose");
dotenv.config()

const uri=process.env.MONGO_URI
mongoose.connect(uri);

router.post('/track',async(req,res) => {
    console.log("inside trackorder");
  const {trackId}=req.body;
  try{
      console.log(trackId);
      const order=await PlaceOrder.find({_id:trackId});
      res.json(order);
   }catch(err){
       res.status(400).json(err)
   }
});

module.exports = router