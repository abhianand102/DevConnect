# DevITinder APIs

authRouter
-POST /signup
-POST /login
-POST /logout

profileRouter
 -PATCH /profile/edit
 -GET /profile/view
 -PATCH /profile/ password

# connectionRequestRouter
 -POST /request/send/interested/:userId
 -POST /request/send/ignored/:userId
 -POST /request/review/accepted/:requestId
 -POST /request/review/rejected/:requestId

# userRouter
 -GET /user/connection
 -GET /user/request
 -GET /user/feed - Gets you the profile of other user on platform

status : ignored, interested, accepted, rejected