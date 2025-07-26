const express = require("express")
const { userAuth } = require("../middlewares/auth")
const ConnectionRequest = require("../models/connectionRequest")
const User = require("../models/user")
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

userRouter.get("/user/connections", userAuth, async(req, res) => {
    // get loggedIn user
    // get id of loggedIn user 
    // check if id is part of to,From id 
    // check the status 
    // map only connection data 
    // send response back 
    try {
        const loggedInUser = req.user

        const {_id} = loggedInUser

        const connections = await ConnectionRequest.find({
            $or: [{ toUserId: _id, status: 'accepted'}, {fromUserId: _id, status: 'accepted'}]
        }).populate("fromUserId", ["firstName", "lastName"])
        
        const data = connections.map((connection) => connection.fromUserId)

        res.json({
            message: `you have ${connections.length} connections`,
            data: data,
        })
    } catch (error) {
        res.status(400).send("bad connection request")
    }
})

userRouter.get("/feed", userAuth, async(req, res) => {
    // get logged in user 
    // user should see all the user cards except
    /* 
        1) his own 
        2) once that are ignored
        3) once that are connected 
        4) once that are already interested 
    */ 
    try {
        const loggedInUser = req.user 

        const page = parseInt(req.query.page) || 1                        // defining page, limit, skip for pagination 
        let limit = parseInt(req.query.limit) || 10                       // parseInt is used parse integger from string 
        limit = limit > 50 ? 50 : limit                                   // to sanitize limit                    
        const skip = (page - 1)*limit                                     // /feed?page=1&limit=10 these are query 

        const connectionRequest = await ConnectionRequest.find({                 // for finding all connected users 
            $or: [{toUserId: loggedInUser._id}, {fromUserId: loggedInUser._id}]
        })

        const hideUserConections = new Set()                         // for findind all distinct user id's 
        connectionRequest.forEach((req) => {                         // set here is same a python as it only allow distinct values 
            hideUserConections.add(req.fromUserId.toString());
            hideUserConections.add(req.toUserId.toString())
        })

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserConections)}},            // $nin stands for not in 
                { _id: { $ne: loggedInUser._id}}                            // $ne stands for not equal to
            ]
        }).select(["firstName", "lastName"]).skip(skip).limit(limit)         // skip and limit are used for pagination 

        res.json({
            message: "data fetched successfully",
            data: users, 
        })

    } catch (error) {
        res.status(400).send(`Bad connection request ${error}`)
    }
})

module.exports = userRouter