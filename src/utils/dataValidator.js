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

const editUserValidator = (req) => {
    const editAllowedFields = ['firstName', 'lastName', 'gender', 'age', 'photoUrl']
    const isAllowed = Object.keys(req.body).every((key) => editAllowedFields.includes(key))
    return isAllowed;
}

const editPasswordValidator = (req) => {
    const {password} = req.body 
    return validator.isStrongPassword(password)
}

module.exports = { signUpValidator,
    editUserValidator, editPasswordValidator
 }