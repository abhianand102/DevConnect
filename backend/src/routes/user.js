const express=require("express");
const { userAuth } = require("../middleware/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const { User } = require("../models/user");
const userRouter= express.Router();
const USER_SAFE_DATA="firstName lastName photoURL about skill gender";

userRouter.get("/user/requests/received",userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
        
        const requests= await ConnectionRequestModel.find({
            toUserId :loggedInUser._id,
            status:"interested",
            }).populate("fromUserId",
                USER_SAFE_DATA,
            );
    // }).populate("fromUserId",["firstName","lastName"]);
        res.json({
            message:"Data fetched Successfully!!",
            requests,
        })

    }catch(err){
        res.status(400).send("ERROR :"+err.message);
    }
});

userRouter.get("/user/connections",userAuth,async (req,res)=>{
    try{
        const loggedInUser= req.user;
        const connectionRequests= await ConnectionRequestModel.find({
            $or:[
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId: loggedInUser._id, status:"accepted"},
            ]
        }).populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA);
        
        const data=connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString()===loggedInUser._id.toString()){
                return row.toUserId;
            }else{
                return row.fromUserId;
            }
        });
        res.json({data});

    }catch(err){
        res.status(400).send({message: err.message});
    }
});

userRouter.get("/feed",userAuth,async (req,res)=>{
    try{
        const logggedInUser= req.user;
        const page= parseInt(req.query.page);
        let limit= parseInt(req.query.limit);
        limit= limit>30? 30:limit;
        const skip=(page-1)*limit;
        //get all users except
        //- sent connection request
        //- received connection request
        //- ignored logggedIn user
        //- itself
        

        const connections=await ConnectionRequestModel.find({
            $or:[{fromUserId:logggedInUser._id},{toUserId:logggedInUser._id}]
        }).select("fromUserId toUserId");

        const hideUserfromFeed= new Set();
        connections.forEach((req)=>{
            hideUserfromFeed.add(req.fromUserId.toString());
            hideUserfromFeed.add(req.toUserId.toString());
        });

        const users= await User.find({
            $and:[
                {_id:{$nin: Array.from(hideUserfromFeed)}},
                {_id:{$ne: logggedInUser._id}},
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        //skip() & limit() => used for pagination
        res.send(users);
    } catch(err){
        res.status(400).json({meaasge: err.message});
    }
})


module.exports=userRouter;