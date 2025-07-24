const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async (req, res, next) => {
    // getting cookies from req
    // getting token from cookies
    // validating token
    // getting document id from token
    // validating id from db
    // providing req with user data req.user = user 
    // next () as it is a middleware 
   try {
    const cookies = req.cookies 
    const {token} = cookies 
    if(!token) {
        throw new Error("token not valid")
    } 
    const decodeObj = await jwt.verify(token, 'P9kFIJlv')
    const {_id} = decodeObj
    const user = await User.findById(_id)
    if(!user) {
        throw new Error('user not found')
    }
    req.user = user 
    next()
   } catch (error) {
        res.status(400).send(`${error}`)
   }
}

module.exports = {
    userAuth
}