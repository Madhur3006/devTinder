const express = require("express");
const {connectDB} = require('./config/database')
const app = express();

const User = require("./models/user")

app.post("/signup", async (req, res) => {
    const user = new User({
        firstName: "Madhur",
        lastName: "Mangal",
        age: 25,
        gender: "male"

    })
    try {
        await user.save()
        res.send("data added successfully")
    } catch (error) {
        res.send(`error saving data ${error}`)
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