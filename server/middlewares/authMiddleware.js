const jwt = require('jsonwebtoken')
const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const protect = catchAsyncErrors(async (req, res, next) => {
  const token  = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler('Not authorized. Please login.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return next(new ErrorHandler('No user found with this token', 404))
    }

    req.user = user
    next();
  } catch (err) {
    return next(new ErrorHandler('Invalid or expired token.', 401));
  }
})


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