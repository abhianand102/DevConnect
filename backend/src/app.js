const express= require("express");
const app= express();  // creating instatance of new server
const cors= require("cors");

const {connectDB}=require("./config/database");
const cookieParser= require("cookie-parser");

const authRouter =require("./routes/authRoute.js");
const profileRouter= require("./routes/profile.js");
const requestRouter= require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());    // it's a middleware used to convert request body json object to js object and put in body of request
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

connectDB()
.then(()=>{
    console.log("Database Connected Successfully!!");
    // const PORT=process.env.PORT || 3000;
    app.listen(3002,()=>{
        console.log("server starts listening...");
    });
})
.catch((err)=>{
    // console.log("Database cannot be Connected ");
    console.log(err);
    process.exit(1);
})

// connectDB();

// -Create POST/logout API
// -Create PATCH /profile/edit API
// -Create PATCH /profile/password API =>forgot password API
// -Make you validate all data in every POST, PATCH apis 