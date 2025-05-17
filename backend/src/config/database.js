const mongoose= require("mongoose");

//go to mongodb website
//create a free M0 cluster
//Create a User
//Get the connection string
// install mongo db compass

const connectDB = async ()=>{

    await mongoose.connect("mongodb+srv://suunnyshekhar:csFBRHuIDBjVn7ah@user.n07ug.mongodb.net/devTinder");
} 

 module.exports={connectDB};


 // email: suunnyshekhar@gmail.com