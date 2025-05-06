const express = require('express')
const router = express.Router()

const { signUp, login, verifyOtp } = require('../controllers/authController')
const { forgotPassword, resetPassword } = require('../controllers/passwordController')

router.post('/signup', signUp)
router.post('/login', login)

// OTP verification
router.post('/verifyotp', verifyOtp)

// forgot & reset password
router.post('/forgot-password', forgotPassword)
router.put('/reset-password/:token', resetPassword)

module.exports = router
