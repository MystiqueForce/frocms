const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const uri=process.env.MONGO_URI

mongoose.connect(uri);


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
//middleware
app.use(express.json());//req.body
app.use(cors());


//Routes

app.use("/auth",require("./routes/jwtAuth"));
app.use('/placeorder',require('./routes/jwtOrder'));
app.use("/dashboard",require("./routes/dashboard"));
app.use("/customers",require("./routes/uploadDoc"));
app.use("/orders",require("./routes/checkstatus"));
// app.use("/orderDetails",require("./routes/trackOrder"));

app.get("/client/src/components/Login.js",function(req,res){
  res.render("home");
})
const port=process.env.PORT
app.listen(port,function(req,res){
    console.log("Server is running at port 3000");
});
