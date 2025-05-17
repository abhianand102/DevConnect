const express= require("express");
const profileRouter=express.Router();
const {adminAuth,userAuth,userTokenAuth,validateEditProfileData}= require("../middleware/auth");

profileRouter.get("/profile/view",userTokenAuth, (req,res)=>{

    res.send(req.userData);
});

profileRouter.patch("/profile/edit", userTokenAuth,async (req,res)=>{
    
    try{
        if(! validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
        }

    const loggedInUser=req.userData;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
    
    await loggedInUser.save();


    res.json({message: '{loggedInUser.firstName} profile is updated successfully',data : loggedInUser});
    }catch(err){
        res.status(404).send("ERROR : "+err.message);
    }

})

module.exports= profileRouter;