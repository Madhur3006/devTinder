const express = require("express")
const { userAuth } = require("../middlewares/auth")
const { editUserValidator } = require("../utils/dataValidator")

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

module.exports = profileRouter