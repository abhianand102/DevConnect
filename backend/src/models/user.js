 const mongoose= require("mongoose");
 const validator=require("validator");
 const bcrypt= require("bcrypt");

 // defining Schema
 const schema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address"+ value);
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    skill:{
        type:[String],
        maxLength:50
    },
    gender:{
        type:String,
        default:"male",
        enum:{
            values:["male","female","others"],
            massage:'{VALUE} is not a valid gender type '
        },
        // validate(value){
        //     if(!["male","female","others"].includes(value)){
        //         throw new Error("Gender data is not valid");
        //     }
        // }

    },
    password:{
        type:String,
        // required:true
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Invalid Email Address"+ value);
            }
        }
    },
    about:{
        type:String,
        default:"This is deault info about the user"
    },
    photoURL:{
        type:String,
        default:"www.photo.com",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid url "+ value);
            }
        }
    }
 },
{
    timestamps:true,
});

schema.index({firstName:1,lastName:1});
 const User= mongoose.model("User",schema);   // mongoose.model("model Name",schema)

//  const schema.methods.getJWT= async function(){
//     const user= this;
//     const token= await jwt.sign({_id:user._id},"SecretKey@123$234",{expiresIn:'1h'});
//     return token;
//  }

// const schema.methods.validatePassword=function(){
//     const user= this;
//     const isPasswordValid =bcrypt.compare(password,user.password);
//     return isPasswordValid;
// }
 module.exports = {User};

 