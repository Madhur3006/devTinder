const express = require("express")
const requestRouter = express.Router()
const { userAuth } = require("../middlewares/auth")
const User = require("../models/user")
const ConnectionRequest = require("../models/connectionRequest")

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    // get from,to and status
    // check if status is valid
    // check if toUserId exist
    // check if there is already a connection request with same Id's 
    // define new connection 
    // save new connection 
    try {
        const fromUserId = req.user._id
        const toUserId = req.params.toUserId
        const status = req.params.status 

        const allowedStatus = ['ignored', 'interested']
        if(!allowedStatus.includes(status)) {
            throw new Error("Invalid Status")
        }

        const toUser = await User.findById(toUserId)
        console.log(toUser);
        if(!toUser) {
            return res.status(404).send("user not found")
        }

        const isExistingRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {toUserId: fromUserId, fromUserId: toUserId}
            ]
        })
        if(isExistingRequest) {
            throw new Error("Connection request already exist")
        }

        const connectionRequest = new ConnectionRequest({
            fromUserId, toUserId, status
        })
        await connectionRequest.save()
        res.send("connection send successfully")
    } catch (error) {
        res.status(400).send(`bad connection request ${error}`)
    }
})

module.exports = requestRouter