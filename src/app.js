const express = require("express");
const {connectDB} = require('./config/database')
const app = express();
const User = require("./models/user")
const bcrypt = require("bcrypt")
const { signUpValidator } = require("./utils/dataValidator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth");
const authRouter = require("./router/authRoutes");
const profileRouter = require("./router/profileRoutes");
const requestRouter = require("./router/requestRoutes");
const userRouter = require("./router/userRoutes");
const cors = require("cors")
require("dotenv").config()

app.use(express.json())  // to convert JSON data to JS object to handle req 
app.use(cookieParser())
app.use(cors({                         // to handle cors error 
    origin: "http://localhost:5173",
    credentials: true
}))

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)

// app.get("/user", async (req, res) => {
//     const userName = req.body.name
//     try {
//         const user = await User.find({firstName: userName}) 
//         if(user.length < 1) {
//             res.status(404).send("user not found")
//         }
//         else {
//             res.send(user) 
//         }
//     } catch (error) {
//         res.status(404).send(`Something went wrong ${error}`)
//     }
// })

// app.get("/allUser", async (req, res) => {
//     try {
//         const users = await User.find({})
//         res.send(users)
//     } catch (error) {
//         res.status(400).send(`error getting data ${error}`)
//     }
// })

// app.delete('/user', async (req, res) => {
//     const userId = req.body.userId 

//     try {
//         const user = await User.findByIdAndDelete(userId)
//         res.send("user deleted successfully")
//     } catch (error) {
//         res.status(400).send("soemthing went wrong")
//     }
// })

// app.patch('/user', async (req, res) => {
//     const userId = req.body.userId 
//     const data = req.body 

//     try {
//         const isAllowed = ['password', 'age'] 
//         const allowUpdated = Object.keys(data).every((key) => isAllowed.includes(key))
//         if(allowUpdated) { throw new Error("updates not allowed")}
//         const user = await User.findByIdAndUpdate(userId, data, {
//             runValidators: true,
//             returnDocument: "after" 
//         })
//         res.send(user)
//     } catch (error) {
//         res.status(400).send(`something went wrong ${error}`)
//     }
// })



connectDB().then(() => {
    console.log("establising database connection")
    app.listen(process.env.PORT, () => {
    console.log("Server is successfully on port 3000")
});
}).catch((err) => {
    console.log(`couldn't connect database successfully ${err}`)
})