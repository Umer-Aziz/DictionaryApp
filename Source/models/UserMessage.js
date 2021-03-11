const mongoose=require("mongoose");
const validator=require("validator");

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        min:10,
    },
    message:{
        type:String,
        required:true,
        minlength:5,
    },
    date:{
        type:Date,
        default:Date.now
    }
})
// creating Collections 

const User=mongoose.model("User",UserSchema);
module.exports=User;