const mongoose = require("mongoose")
const validator = require('validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt') 

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error(" Not a strong password")
            }
        }
    }, 
    photoUrl: {
        type: String,
    },
    age: {
        type: Number,
        min: 18,
        max: 60
    },
    gender: {
        type: String,
        validate(value) {                                           //validate func runs on post automatically but on patch it get passed as runValidator: true in options
            if(["male", "female", "others"].includes(value)) {
                throw new Error("Gender not valid")
            }
        }
    }
},{
    timeStamps: true    // to add time stamp at any entry and updating 
})

userSchema.methods.getJWT = async function() {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "P9kFIJlv", {
        expiresIn: '7d'
    })
    return token 
}

userSchema.methods.validatePassword = async function(userInputPassword) {
    const user = this;
    const passwordHash = user.password 

    const isPasswordValid = await bcrypt.compare(userInputPassword, passwordHash)

    return isPasswordValid
}

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;