const express= require("express");
const app= express();  // creating instatance of new server

app.listen(7777,()=>{
    console.log("server starts listening...");
});



/*
// app.use("/",(req,res)=>{
//     res.send("Hii Sunny");
// });

app.use("/hello",(req,res)=>{
    res.send("Hello Hello Hello");
});


// This will match all the HTTP method  API calls to /test

app.use("/test",(req,res)=>{
    res.send("Hello from test server");
    
});



// response handler
// app.use((req,res)=>{
//     res.send("Server is successfully listening on port 7777");
// });

//here all /user related http methods are handled and all "/user" handler would not get any chance
// app.use("/user",(req,res)=>{
//     res.send("All user method is handled here");
// })

// This will only handle GET call to /user
app.get("/user/:userId/:name/:password",(req,res)=>{
    //getting query params to route handler - req.query
    //making routing dyanamic - req.param
    console.log(req.query)
    console.log(req.params);
    res.send({firstName:"Sunny",lastName:"Shekhar"});
});
app.post('/user',(req,res)=>{
    res.send("Data successfully saved to the database!");
});

app.delete("/user",(req,res)=>{
    res.send("Deleted Successfully");
});

// +, ?, *, (ab)?,([$]),/.*fly$/
app.get("abc",(req,res)=>{
    res.send("Different routing technique are used");
})

app.get("/dynamicRouting/:userId/:name/:password",(req,res)=>{
    //getting query params to route handler - req.query
    //making routing dyanamic - req.param
    console.log(req.query);
    console.log(req.params);
    res.send({firstName:"Sunny",lastName:"Shekhar"});
});

*/


app.get("/user",[(req,res,next)=>{
    console.log("handling user 1");
    next();
},
(req,res,next)=>{
    console.log("handling user 2");
    // res.send("Response 2");
    next();
},
(req,res,next)=>{
    console.log("handling user 3");
    // res.send("Response 3");
    next();
}],
(req,res,next)=>{
    console.log("handling user 4");
    // res.send("Response 4");
    next();
},
(req,res)=>{
    console.log("handling user 5");
    res.send("Response 5");
}
)

// How express js basically handles requests behind the scene
// Write a dummy Auth middleWare for admin 

app.use("/admin",adminAuth);

app.use("/user/login",(req,res)=>{
    res.send("LOgged In Successfully!!");
})

app.get("/user",userAuth,(req,res)=>{
    res.send("User Responded");
})

app.get("/admin/getAllData",(req,res)=>{ 
    res.send("Sent all Data");
});

app.get("/admin/delete",(req,res)=>{
    res.send("all Data Deleted");
});



app.use("/",(err,req,res,next)=>{

    if(err){
        res.status(201).send("Error caught");
    }else{
        res.send("End");
    }
})

app.use("/getUserData",(req,res)=>{
    try{
    throw new Error("Error Encountered");
    res.send("User data sent"); // this exit fron this function if error is encountered
    } catch(err){
        res.status(201).send("Error Catched");
    }
});

app.use("/",(err,req,res,next)=>{ // always put this wild card error handler in the last of program to handle any unknown error

    if(err){
        res.status(201).send("Error caught");
    }else{
        res.send("End");
    }
})



/*
always maintain same order for respective parameter number
2-parameter=>(req,res);
3-parameter=>(req,res,next);
4-parameter=>(err,req,res,next);
*/
// mongoose is a library used to talk to database
// document of mongoose is very good


const express= require("express");
const app= express();  // creating instatance of new server
const {adminAuth,userAuth}= require("./middleware/auth");
const {connectDB}=require("./config/database");
const {User}=require("./models/user");

const userObj = {
    firstName:"Sachin",
    lastName: "kr",
    emailId:"achin@989898gmail.com",
    age:102
   
}

connectDB()
.then(()=>{
    console.log("Database Connected Successfully!!");
    app.listen(7777,()=>{
        console.log("server starts listening...");
    });
})
.catch((err)=>{
    console.log("Database cannot be Connected ");
})

connectDB();

const userObj = {
    firstName:"Sachin",
    lastName: "kr",
    emailId:"achin@989898gmail.com",
    age:102
   
}

const user= new User(userObj);      // creating new instance of User model with "userObj" data

app.post("/signup",async (req,res)=>{
    try{
        await user.save();      // moongoose method to save data to database
        res.send("Data added successfully");
    } catch(err){
        res.status(400).send("Error Saving the User :"+ err.message);
    }
    
});

app.post("/sendConnectionRequest",userTokenAuth,(req,res)=>{
    console.log("Connection request Sent !");
    res.send("Connection Request Sent from "+ req.userData.firstName+" "+req.userData.lastName);
})

app.delete("/user",async (req,res)=>{

    try{
        const temp=await User.findByIdAndDelete(req.body.id);
        res.send(temp);
    }catch(err){
        res.status(404).send("Something went wrong in deletion ops");
    }
})