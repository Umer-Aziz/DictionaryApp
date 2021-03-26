const express=require("express");
const app=express();
const translate=require("translate");
const path=require("path");
const hbs=require("hbs");


const port=process.env.PORT || 3000;

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
app.get('/about',(req,res)=>{
    res.render("about");
})
app.get('/contact',(req,res)=>{
    res.render("contact");
})

app.listen(port,(req,res)=>{
console.log(`the Server running at port ${port}`)
})

