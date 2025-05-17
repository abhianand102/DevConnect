-create a repository
-Initilize the repository
-node_modules, package.json, package-lock.json
-Install express
-create a server
-Listen to port 7777
-write request handlers for /test, /hello
-Install nodemoon and update script inside package.json
-what are dependencies
-what is the use of "-g" while npm install
-difference between cater and tilde(^ vs ~);

-initiate git
-gitignore
-create a remote repo on github
-push all code to remote origin
-play with routes and route extensions ex /hello, /hello/2, /xyz
-Order of route matters a lot
-Install Postman app and make a workspace / collection > test API call
-write  logic to handle GET, POST, PATCH,DELETE Api calls and test them on postman
-Explore routing and use of ?,+.*,() in the routes
-use of regex in routes /a/ ,/.*fly$/
-Reading the query params in the routes
-Reading the dynamic routes

-Multiple route Handlers -play with the code
-next()
-next function and errors along with res.send()
-app.use("/user", rH,[rH2,rH3],rH4,rH5);
-what is middleware ? Why do we need it?
-How express js basically handles requests behind the scene
-Difference between app.use and app.all;
-Write a dummy Auth middleWare for admin 
-write a dummy auth middleWare for all user routes, except /user/login
-Error Handling using app.use("/", (err,req,res,next)=>{});
-google http status code

-Create a free cluster on MongoDB official website (Mongo Atlas)
-Install mongoose library
-Connect your application to the Database "Connection-url"/devTinder
-Call the connectDB function and connect to database before starting application on 7777
-Create a UserSchema & User Model
-Create POST / signUp API to add data to database
-Push some documents using API calls from postman
-what is __v in database
-Error Handling using try catch 

-Js object vs JSON (difference)
-Add the express.json middleware to your app
-Exlore the function of express.json
-Make your signup API dyanamic to receive data from the end user
-User.findOne with duplicate email ids, which object reutrned
-API -Get user by email
-API -Feed API -Get /feed -get all the users from the database
-API -Get user by ID
-Create a delete user API
-Difference between PATCH and PUT
-API - Update a user
-Explore the Mongoose Documentation for Model methods
-What are options in a Mode.findOneAndUpdate method, explore more about it
-API - Update the user with email ID

-Explore schematype options from the documentation
-add required , unique, lowercase, min, minlength,trim
-Add Default
-Create a custom validate function for gender
-Improve the DB schema  -PUT all appropriate validations on each field in schema
-Add timestamps to the userSchema
-Add API level validation on patch request & signup in post api
-DATA Sanitizing Add API validation for each field
-Install Validator
-Explore validator library functions and use validator function for password, email. photoURL
-NEVER trust req.body

-Validate data in SignUp API
-Install npm bcrypt package
-Create passwordHash using bcrypt.hash & save the user in incrypted password
-Create logiin API
-Comapre passwords and throw  errors if email or password is invalid

-install cookie-parser
-just send a dummy cookie to user
-create GET / profile API and check if you get the cookie backw
-install jsonwebtoken
-In login API, after email and password validation, create a JWT token and send it to user in cookies
-read the cookie inside your profile API and find the logged in user
-userAuth MiddleWare
-Add the userAuth middle ware in profile API ansd a new sendConnectionRequest API
-Set the expiry of JWT token and cookies to 7 days
-create UserSchema method to getJWT()
-Create UserSchema method to comparepassword (passwordInputByUser)

-Explore tinder APIs
-Create a list all APIs you can think of in Dev Tinder 
-Group multiple routes under respective routers
-Read documentation for express.Router
-Create routes folder for managing , auth, profile,request routers
-Create authRouter, profileRouter,requestRouter
-Import these routers in app.js
-Create POST/logout API


# ProfileRouter
-GET/profile/view
-Create PATCH /profile/edit API   // homework
-Create PATCH /profile/password API =>forgot password API   // homework

-Make you validate all data in every POST, PATCH apis

# ConnectionRequestRouter
-Post/ request/send/interested/:userId
-POST/ request/send/ignored/:userId
-POST/ request/review/accepted/:requestId
-POST/ request/review/rejected/:requestId

## userRouter
-GET /user/connections
-GET /user/requests
-GET /user/ feed - Gets you the profile of user on platform

status : ignore, interested, accepted, rejected


 -Create connection Request Schema
 -Send Connection Request Api
 -proper validation of data
 -think about All corner cases
 -$or query $and query in mongoose // go to website
 -Schema.pre("save") function
 -Read more about index in DB
 -why do we need index in DB
 -what is advantage and disadvantage of creating index
 -read more about compound index on website
 -ALWAYS THINK ABOUT CORNER CASES  //Learning

 -write code with proper validation for POST /request/review/:status/:requestId
 -Thought process -POST vs GET
 -Read about ref and populate from mongoose website
 -Create GET /user/requests/received with all checks

 -Logic for GET /feed API
 -Explore the $nin, $and , $ne and other query operators