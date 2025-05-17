const express=require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { User } = require("../models/user");
const requestRouter= express.Router();


requestRouter.get("/user",async (req,res)=>{
    const userEmail = req.body.emailId;
    try{
        const user=await User.find({emailId:userEmail});
         res.send(user);
    }catch(err){
        res.status(404).send("Something went wrong");
    }
});
requestRouter.get("/users",async (req,res)=>{
    try{
        const user=await User.find({});
        res.send(user);
    }catch(err){
        res.status(404).send("Something went wrong");
    }
});

requestRouter.patch("/user", async(req,res)=>{
    const data=req.body;
    try{
        
        const ALLOWED_UPDATES=["photoURL","about","skill","gender","age"];

        const isUpdateAllowed= Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k)
        );
       
        if(isUpdateAllowed){
            throw new Error("Update not allowed");
        }
        if(data?.skill.length > 10){
            throw new Error("Skills cannot be more than 10");
        }
        
        // const temp=await User.findOneAndUpdate({emailId:req.body.emailId},data,{returnDocument :"after"});"
        const temp=await User.findByIdAndUpdate(req.body._id,data,{returnDocument :"after"});
        res.send(temp);
    }catch(err){
        res.status(404).send("Something went wrong in updation ops");
    }
});

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res)=>{
    const user=req.user;
    try{
        const toUserId=req.params.toUserId;
        const fromUserId=user._id;
        const status=req.params.status;
         
        const allowedStatus= ["interested","ignored"];
        if(! allowedStatus.includes(status)) return res.status(400).json({message: "Invalid status Type"});

        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(400).json({message: "User not found !"});
        }

        const existingConnectionRequest = await ConnectionRequestModel.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId : toUserId,toUserId : fromUserId}
            ]
        });
        
        if(existingConnectionRequest){
            return res.status(400).json({
                message:"Connection already exist !!"
            });
        }

        const connectionRequest =  new ConnectionRequestModel({
            fromUserId,
            toUserId,
            status,
        });


        const data=await connectionRequest.save();
        
        res.json({
            message:req.user.firstName+" is "+status+ " in "+ toUser.firstName,
            data,
        })
    } catch(err){
        res.status(400).send("ERROR "+err.message);
    }
    
});

requestRouter.post("/request/review/:status/:requestId",userAuth,async (req,res)=>{
    const {status,requestId}= req.params;
    const loggedInuser= req.user;
    try{
        const validStatus=["accepted","rejected"];

    if(!validStatus.includes(status)){
        return res.status(400).json({message:"Invalid status type"});
    }
    const connectionRequest= await ConnectionRequestModel.findOne({
        _id:requestId,
        toUserId:loggedInuser._id,
        status:"interested"
    });
    if(!connectionRequest){
        return res.status(404).json({message:"Connection Request not found!!"});
    }

    connectionRequest.status= status;
    const data= await connectionRequest.save();
    res.status(400).json({message:"Connection request "+status , data});

    }catch(err){
        res.status(404).send("Error :"+ err.message);
    }

    // status validation
    // validate requestId
    // loggedInUser=> toUserId
    // status = interested
})


module.exports= requestRouter;