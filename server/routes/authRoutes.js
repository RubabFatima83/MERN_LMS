const express = require('express')
const router = express.Router()
const { signUp, verifyOtp, resendOtp, login, logOut, getMe } = require('../controllers/authController')
const { forgotPassword, resetPassword, updatePassword } = require('../controllers/passwordController')
const { protect } = require('../middlewares/authMiddleware')

router.post('/signup', signUp)
router.post('/verify-otp', verifyOtp)
router.post('/resend-otp', resendOtp)
router.post('/login', login)
router.get('/logout', protect, logOut)
router.get('/me', protect, getMe)


// forgot, reset, & update password
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)
router.put('/update-password', protect, updatePassword)

module.exports = router
