const mongoose = require("mongoose")
const validator = require('validator')

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

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;