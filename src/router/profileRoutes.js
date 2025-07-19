const express = require("express")
const { userAuth } = require("../middlewares/auth")
const { editUserValidator, editPasswordValidator } = require("../utils/dataValidator")
const bcrypt = require("bcrypt")

const profileRouter = express.Router()

profileRouter.get("/profile/view", userAuth, async(req, res) => {
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

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if(!editUserValidator(req)) {
            throw new Error('edit not allowed')
        }
        const loogedInUser = req.user
        Object.keys(req.body).forEach((key) => loogedInUser[key] = req.body[key])
        await loogedInUser.save()
        res.json({                                                                     // alternate to res.send
            message: `${loogedInUser.firstName}, your profile update successfully `,
            data: loogedInUser
        })
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})

profileRouter.patch("/profile/password", userAuth, async(req, res) => {
    try {
        //take password from body 
        //validate password 
        //convert password 
        //update password 

        if(!editPasswordValidator(req)) {
            throw new Error("not a valid password")
        }
        const loggedInUser = req.user
        const updatedPasswordHash = await bcrypt.hash(req.body.password, 10)
        loggedInUser.password = updatedPasswordHash
        await loggedInUser.save()
        res.send("password change successfull")
    } catch (error) {
        res.status(400).send(`something went wrong ${error}`)
    }
})

module.exports = profileRouter