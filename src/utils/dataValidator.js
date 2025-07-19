const validator = require("validator") 

const signUpValidator = (req) => {
    const {firstName, lastName, emailId, password} = req.body 

    if(!firstName || !lastName) {
        throw new Error("name not present")
    }
    if(!validator.isEmail(emailId)) {
        throw new Error("email not valid")
    }
    if(!validator.isStrongPassword(password)) {
        throw new Error("password not valid")
    }
}

module.exports = { signUpValidator }