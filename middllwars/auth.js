const expressJWT = require('express-jwt')
require('dotenv').config()

exports.requireSignIn = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: 'auth'
})

exports.isAuth = (req, res, next) => {

    let user = req.profile && req.auth && (req.profile._id == req.auth._id)
    console.log(req.profile, req.auth);
    if(!user) {
        return res.status(403).json({
            error: "Access Denied"
        })
    }

    next()
}

exports.isSuperAdmin = (req, res, next) => {
    if(req.auth.role != 1) {
        return res.status(403).json({
            error: "Admin Resource, Access Denied !"
        })
    }
    next()
}

exports.isUser = (req, res, next) => {
    if(req.auth.role != 0) {
        return res.status(403).json({
            error: "User Resource, Access Denied !"
        })
    }
    next()
}

exports.isActivated = (req, res, next) => {
    if(!req.auth.isActivated) {
        return res.status(403).json({
            error: "Ce compte n'est pas activé"
        })
    }
    next()
}
