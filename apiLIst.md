authRouter
post /signup
post /login
post /logout 

profileRouter
get /profile/view
patch /profile/edit
path /profile/password  // forgot password

requestRouter
post /request/send/:status/:userId

post /request/review/:status/:userId

userRouter
get /user/connections
get /user/request/received 
get /user/feed 