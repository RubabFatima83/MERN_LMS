const User = require('../models/user')
const generateResetToken = require('../utils/generateToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')

// Forgot Password(Resquest reset link)
const forgotPassword = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found!' })

    const { token, hashedToken, expireTime } = generateResetToken()

    user.resetPasswordToken = hashedToken
    user.resetPasswordExpire = expireTime
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${token}`

    const message = `You are receiving this email because you (or someone else) has requested a password reset.\n\n
    Please make a PUT request to: \n\n ${resetUrl}`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset Token',
            message
        });

        res.status(200).json({ success: true, message: 'Reset link sent to email' });
    } catch (error) {
        console.error(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false })

        return res.status(500).json({ message: 'Email could not be sent.' })
    }
}

const resetPassword = async (req, res) => {

    // Hash URL token
    const { token } = req.params
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired token' })

    // Set new Password
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()

    res.status(200).json({ message: 'Password reset successfully!' })
}

module.exports = { forgotPassword, resetPassword }