const adminAuth = (req, res, next) => {
    console.log("checking user authentication") 
    const token = 'xyz';
    const isAuthorized = token === 'xyz';
    if(!isAuthorized) {
        res.status(401).send("unauthorized access")
    }
    else {
        next()
    }
}

const userAuth = (req, res, next) => {
    console.log("checking user authorization")
    const token = 'xyz'
    const isAuthorized = token === 'xyz'
    if(!isAuthorized) {
        res.status(401).send("unauthorized access")
    }
    else {
        next()
    }
}

module.exports = {
    adminAuth, 
    userAuth
}