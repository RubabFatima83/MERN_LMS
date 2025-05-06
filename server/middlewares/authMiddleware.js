const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect = async (req, res, next) => {

    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = decoded.id

            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({ message: 'Not authorized, token failed' })
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }
}


const authorizeRole = (roles) => {

    return async (req, res, next) => {
        try {
            const user = await User.findById(req.user)
            if (!user) return res.status(404).json({ message: 'User not found' })


            if (!roles.includes(user.role))
                return res.status(403).json({ message: 'Access Denied: Role is Not Authorized' })


            next();
        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Server Error' })
        }
    }
}


module.exports = { protect, authorizeRole };