const express = require("express")
const User = require("../models/user")
const bcrypt = require("bcrypt")
const { signUpValidator } = require("../utils/dataValidator")
const authRouter = express.Router()
const cookieParser = require("cookie-parser");

authRouter.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body 
        const user = await User.findOne({emailId: emailId})
        console.log(user)
        if(!user) {
            throw new Error('Invalid credentials')
        }
        const isPasswordValid = await user.validatePassword(password, user.password)
        if(isPasswordValid) {
            const token = await user.getJWT()     // created token using jwt.sign(unique id, secret password)
            console.log(token)
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000)
            })                                     // stored token under cookie 
            res.send("login successful")
        }
        else {
            throw new Error("Invalid credentials")
        }
    } catch (error) {
        res.status(400).send(`Something went wrong ${error}`)
    }
})

authRouter.post("/signup", async (req, res) => {
    try {
        signUpValidator(req)
        const {firstName, lastName, emailId, password} = req.body 
        const passwordHash = await bcrypt.hash(password, 10)
        const user = new User({
            firstName, lastName, emailId, password: passwordHash
        })
        await user.save()
        res.send("Signed up successfully")
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

authRouter.post("/logout", async (req, res) => {
    try {
       res.cookie("token", null, {
        expires: new Date(Date.now())
       })
       res.send("logged out successfully");
    } catch (error) {
        res.status(400).send(`something went wrong ${error}`)
    }
})

module.exports = authRouter