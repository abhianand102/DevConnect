const validator= require("validator");
const validateSignUpData= (req)=>{
    const {firstName,lastName,password,emailId}= req.body;

    if(!firstName || !lastName){
        throw new Error("Name is invalid");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter strong password");
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("Invalid Email address");
    }
}
module.exports={validateSignUpData};