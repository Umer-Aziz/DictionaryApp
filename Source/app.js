const express=require("express");
const app=express();
const path=require("path");
const hbs=require("hbs");
require('./db/conn');
const User=require("./models/UserMessage");
const { urlencoded } = require("express");
const port=process.env.PORT || 3300;

// setting path
const spath=path.join(__dirname,"../public");
const viewPath=path.join(__dirname,"../templates/views");
const PartialsPath=path.join(__dirname,"../templates/partials");
app.use(express.static(spath))
app.use(express.urlencoded({extended:false}))
// console.log(app.use(express.static("../public")));
// app.use("/css",express.static(__dirname+("../public/css")))
app.set('view engine','hbs');
app.set("views",viewPath);
hbs.registerPartials(PartialsPath)

app.get('/',(req,res)=>{
    res.render("index");
})
app.post("/contact",async(req,res)=>{
 try {
     
     const UserData=new User(req.body);
     await UserData.save();
     res.status(201).render("index");
 } catch (error) {
     res.status(500).send(error.message);
 }
})
app.listen(port,(req,res)=>{
console.log(`the Server running at port ${port}`)
})