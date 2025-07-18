const express = require("express");
const {connectDB} = require('./config/database')
const app = express();
const User = require("./models/user")
const bcrypt = require("bcrypt")
const { signUpValidator } = require("./utils/dataValidator")

app.use(express.json())  // to convert JSON data to JS object to handle req 


app.post("/signup", async (req, res) => {
    try {
        signUpValidator(req)
        const {firstName, lastName, emailId, password} = req.body 
        const passwordHash = bcrypt.hash(password, 10)
        const user = new User({
            firstName, 
            lastName,
            emailId,
            password: passwordHash
        })
        await user.save()
        res.send("data added successfully")
    } catch (error) {
        res.send(`error saving data ${error}`)
    }
})

app.get("/user", async (req, res) => {
    const userName = req.body.name
    try {
        const user = await User.find({firstName: userName}) 
        if(user.length < 1) {
            res.status(404).send("user not found")
        }
        else {
            res.send(user) 
        }
    } catch (error) {
        res.status(404).send(`Something went wrong ${error}`)
    }
})

app.get("/allUser", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(400).send(`error getting data ${error}`)
    }
})

app.delete('/user', async (req, res) => {
    const userId = req.body.userId 

    try {
        const user = await User.findByIdAndDelete(userId)
        res.send("user deleted successfully")
    } catch (error) {
        res.status(400).send("soemthing went wrong")
    }
})

app.patch('/user', async (req, res) => {
    const userId = req.body.userId 
    const data = req.body 

    try {
        const isAllowed = ['password', 'age'] 
        const allowUpdated = Object.keys(data).every((key) => isAllowed.includes(key))
        if(!allowUpdated) { throw new Error("updates not allowed")}
        const user = await User.findByIdAndUpdate(userId, data, {
            runValidators: true,
            returnDocument: "after" 
        })
        res.send(user)
    } catch (error) {
        res.status(400).send("something went wrong")
    }
})



connectDB().then(() => {
    console.log("establising database connection")
    app.listen(3000, () => {
    console.log("Server is successfully on port 3000")
});
}).catch((err) => {
    console.log(`couldn't connect database successfully ${err}`)
})