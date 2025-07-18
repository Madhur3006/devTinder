const validator = require("validator") 

const signUpValidator = (req) => {
    const {firstName, lastName, emailId, password} = req.body 

    if(!firstName || !lastName) {
        throw new Error("name not present")
    }
    if(!validator.isEmail(email)) {
        throw new Error("name not present")
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error("name not present")
    }
}

module.exports = { signUpValidator }