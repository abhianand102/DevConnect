const {User}= require("../models/user");
const jwt= require("jsonwebtoken");
const adminAuth = (req,res,next)=>{
    const token="xyz";
    const isValidToken= token==="xyz";
    if(!isValidToken){
        res.status(401).send("Unauthorised Access");
    }else{
        next();
    }
};

const userAuth=async (req,res,next)=>{
    try{
        const {token}=req.cookies;
    if(!token){
        throw new Error("Token is not valid !!!!");        
    }

    const decodedObj=await jwt.verify(token,"SecretKey@123$234");
    const {_id}=decodedObj;

    const user=await User.findById(_id);
    if(!user){
        throw new Error("User not Found");
    }

    req.user=user;
    next();
    } catch(err){
        res.status(400).send("ERROR"+ err.message);
    }
};

const userTokenAuth = async (req,res,next)=>{
    try{
        const cookies=req.cookies;
        const {token}=cookies;

        const decodedData= jwt.verify(token, "SecretKey@123$234");
        const {_id}=decodedData;
        const userData= await User.findById(_id);
        if(!userData){
            throw new Error("Invalid token !!!");
        }
        req.userData=userData;
        next();
        // res.send(userData);
        } catch(err){
            res.status(400).send("ERROR : "+err.message);
        }
}

const validateEditProfileData = (req)=>{
    const allowedEditProfileField=[
        "firstName",
        "lastName",
        "emailId",
        "age",
        "about",
        "photoURL",
        "skill",
        "gender"
    ];

    const isEditAllowed = Object.keys(req.body).every((field)=>
        allowedEditProfileField.includes(field)
    );
    return isEditAllowed;
}
module.exports={adminAuth,userAuth,userTokenAuth,validateEditProfileData};