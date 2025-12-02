const mongoose= require("mongoose");

//go to mongodb website
//create a free M0 cluster
//Create a User
//Get the connection string
// install mongo db compass

const connectDB = async ()=>{

    await mongoose.connect("mongodb+srv://anandabhinav785:<Abhianand@8298>@cluster0.7duxaex.mongodb.net/?appName=Cluster0");
} 

 module.exports={connectDB};


 // email: suunnyshekhar@gmail.com