const mongoose= require('mongoose');

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",  // This reference to User collection
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        reqired: true,
        ref : "User",
    },
    status:{
        type:String,
        required:true,
        enum:{
            values: ["interested","ignored","accepted","rejected"],
            message:'{VALUE} is invalid status type',
        }
     },
     
},{timestamps:true},
);
//compound index
connectionRequestSchema.index({toUserId: 1,fromUserId:1});
// this "pre" function will be called every time when connection Request db is called - This is schema level validation
connectionRequestSchema.pre("save", function (next){
    const connectionRequest=this;
    // check if fromUserId is sama as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send connection request to yourself!!");
    }
    next();
})

const ConnectionRequestModel= new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);
module.exports= ConnectionRequestModel;