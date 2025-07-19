const express = require("express")
const { userAuth } = require("../middlewares/auth")

const profileRouter = express.Router()

profileRouter.get("/profile", userAuth, async(req, res) => {
    try {
        const user = req.user 
        if(!user) {
            throw new Error("user not found")
        }
        res.send(user)
    } catch (error) {
        res.status(400).send("Something went wrong")
    }
}) 

module.exports = profileRouter