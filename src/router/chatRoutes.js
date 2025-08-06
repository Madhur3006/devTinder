const express = require("express")
const { userAuth } = require("../middlewares/auth");
const Chat = require("../models/chat");

const chatRouter = express.Router()

chatRouter.get("/chat/:toUserId", userAuth, async(req, res) => {
    try {
        //get touserId from Params
        // get fromUserId from userAuth
        // find chat with participants
        // if chat not present then create one -> save chat
        // res response back 
        const { toUserId } = req.params;
        const fromUserId = req.user._id;

        let chat = await Chat.findOne({
            participants: {$all: [fromUserId, toUserId]}
        }).populate({
            path: "messages.senderId",
            select: "firstName lastName"
        })

        if(!chat) {
            chat = new Chat({
                participants: [fromUserId, toUserId],
                messages: []
            })
        }

        await chat.save() 
        res.send(chat)

    } catch (error) {
        res.status(404).send(`Bad request ${error}`)
    }
})

module.exports = chatRouter