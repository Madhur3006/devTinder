const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth");


app.use("/admin", adminAuth)
app.get('/admin/getData', (req, res) => {
    res.send("admin data")
})
app.use('/user',userAuth, (req, res) => {
    res.send("Authenticated user")
})
// app.use("/",(req,res) => {                             // order of routes matter a lot 
//     res.send("Hello from the server")
// })

// app.use("/test",(req,res) => {                         // This will match all HTTP methods to /test
//     res.send("Test From the server");
// })

app.get("/test",(req, res) => {                        // This will match only GET HTTP method
    res.send("This will match only GET HTTP method")
})  

app.post("/test", (req, res) => {                       // only Post 
    res.send("data saved successfully")
})

app.patch("/test", (req, res) => {                      // only patch
    res.send("data patch successfully")
})

app.delete("/test", (req, res) => {                     // only delete 
    res.send("data deleted successfully")
})

app.get("/user/:userId/:name/:password", (req, res) => {         //dynamic routing 
    console.log(req.params)
    res.send("dynamic routing")
})



app.use("/user", (req, res, next) => {              //response2
    console.log("Handle the route user")
    // res.send("response1")
    next()
    },
    (req, res) => {
        console.log("handle the route user")
        res.send("response2")
    }
)

app.use("/user", (req, res, next) => {              //response1
    console.log("Handle the route user")
    res.send("response1")
    next()
    },
    (req, res) => {
        console.log("handle the route user")
        res.send("response2")
    }
)

app.use("/user", (req, res, next) => {              //response2
    console.log("Handle the route user")
    next()
    res.send("response1")
    },
    (req, res) => {
        console.log("handle the route user")
        res.send("response2")
    }
) 


app.use("/user", (req, res) => {                // with res.send no result willl be printed and api will continue requesting 
    console.log("xym")
})

app.use('/', (err, req, res, next) => {
    if(err) {
        res.status(500).send("something went wrong")     //error handling 
    }
})


app.listen(3000, () => {
    console.log("Server is successfully on port 3000")
});