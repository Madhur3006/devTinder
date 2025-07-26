const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")

const userRouter = express.Router()

// get all pending connection request for its logged in user 
userRouter.get("/user/requests/received", userAuth, async(req, res) => {
    //get loggedInUser 
    // get all requests from db received to loggedInuser 
    // send response back 
    try {
        const loggedInUser = req.user 
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", ["firstName", "lastName"])            // ref, populate helps to connect to table 
                                                                        // in this case user and connectionRequest table is joined using ref, populate 
        res.json({
            message: "data fetched successfully",
            data: connectionRequests
        })
    } catch (error) {
        res.status(400).send(`bad connection request ${error}`)
    }
})

module.exports = userRouter