authRouter
post /signup
post /login
post /logout 

profileRouter
get /profile/view
patch /profile/edit
path /profile/password  // forgot password

requestRouter
post /request/send/interested/:userId
post /request/send/ignored/:userId
post /request/review/accepted/:userId
post /request/review/rejected/:userId

userRouter
get /user/connections
get /userrequest/received 
get /user/feed 