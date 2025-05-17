const express= require("express");
const authRouter= express.Router();
const {validateSignUpData}= require("../utils/validateSignUpData.js");
const bcrypt= require("bcrypt");
const {User}= require("../models/user");
const jwt= require("jsonwebtoken");


authRouter.post("/signup",async (req,res)=>{
    const {firstName,lastName,emailId,password,photoURL}= req.body;


    try{
        //validate signup data
        validateSignUpData(req);

        //Encrypt password
        const passwordHash= await bcrypt.hash(password,10);
        // console.log(passwordHash);

        // Creating a new instance of User model
        const user= new User(
            {
                firstName,
                lastName,
                emailId,
                password:passwordHash,
                photoURL,
            }
        );
         // creating new instance of User model with "userObj==req.body" data
        const savedUser= await user.save();      // moongoose method to save data to database
        const token= await jwt.sign({_id:user._id},"SecretKey@123$234",{expiresIn:'1h'}); // token expires
        res.cookie("token",token, {
            httpOnly:true, expires: new Date(Date.now() + 900000)
        }); //cookie expires
        
        res.json({message:"Data added successfully", data: savedUser});
    } catch(err){
        res.status(400).send("Error Saving the User :"+ err.message);
    }
});

authRouter.post("/login",async (req,res)=>{
    try{
        const {password,emailId} = req.body;
    const user=await User.findOne({emailId});
    // const user=await User.findOne({emailId,password});
    // i have to find user by using both parameter emailId and PassWord

    //check email present int db or not
    if(! user){
        throw new Error("Invalid Credentials");
    };
    // compare passwordHash with given password
    const isPasswordValid =bcrypt.compare(password,user.password);
    if(isPasswordValid){
        // creating jwt token and sending it in cookie
        const token= await jwt.sign({_id:user._id},"SecretKey@123$234",{expiresIn:'1h'}); // token expires
        
        res.cookie("token",token,{httpOnly:true, expires: new Date(Date.now() + 900000)}); //cookie expires
        res.send(user);

    }else{
        throw new Error("Invalid Credentials");
    }
} catch (err){
    res.status(400).send("ERROR : "+err.message);
}
});

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{expires: new Date(Date.now())}); 
    res.send("Logout Successfull!!");
})

module.exports=authRouter;
