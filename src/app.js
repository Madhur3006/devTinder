const express = require("express");
const {connectDB} = require('./config/database')
const app = express();

connectDB().then(() => {
    console.log("establising database connection")
    app.listen(3000, () => {
    console.log("Server is successfully on port 3000")
});
}).catch((err) => {
    console.log(`couldn't connect database successfully ${err}`)
})