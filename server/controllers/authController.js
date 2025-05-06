const User = require('../models/user')
const OTP = require('../models/OTPs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/sendEmail')
const { generateOTP } = require('../utils/generateOTP')


// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    })
}


// SingUp
const signUp = async (req, res) => {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User already exists!' })

    const user = await User.create({ name, email, password, role })

    if (user) {

        // Send Welcome Email
        await sendEmail({
            email: user.email,
            subject: 'Welcome to A Collaborative Learning Platform for Students',
            text: `Hi ${user.name}, welcome to our Collaborative Learning Platform for Students!`
        })

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        })
    }
    res.status(400).json({ message: 'Invalid credentials!' })
}


// Login
const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json('Please provide email and password')

    const user = await User.findOne({ email }).select('+password')
    if (!user) return res.status(400).json({ message: 'Invalid email!' })

    const isMatch = await user.matchPassword(password)
    if (!isMatch) return res.status(500).json({ message: 'Invalid email or password!' })

    // Check if OTP already verified
    if (user.isOtpVerified) {
        return res.status(200).json({
            message: 'Login successful.',
            token: generateToken(user._id)
        })
    }

    // If not verified, generate & send OTP
    const otp = generateOTP()
    await OTP.create({
        email,
        otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 min
    })

    await sendEmail({
        email: user.email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`
    })

    res.status(200).json({ message: 'OTP sent to your email. Please verify to complete login process.' })

}


// Verify OTP 
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const otpRecord = await OTP.findOne({ email, otp })

        if (!otpRecord || otpRecord.expiresAt < Date.now()) {
            return res.status(400).json({ message: 'Invalid or expired OTP' })
        }

        // OTP is valid
        user.isOtpVerified = true
        await user.save()

        // Clean up the OTP from DB
        // await OTP.deleteMany({ email })

        res.status(200).json({
            message: 'OTP verified successfully',
            token: generateToken(user._id)
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
}


module.exports = { signUp, login, verifyOtp }