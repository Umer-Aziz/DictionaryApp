const mongoose=require("mongoose");
// creating database
mongoose.connect('mongodb://localhost:27017/khanAgency',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection is Successful")
}).catch((error)=>{
    console.log(error)
})