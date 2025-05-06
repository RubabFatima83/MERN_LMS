const crypto = require('crypto')

// Generate and hash password token
const generateResetToken = () => {
    const token = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex')

    // Set expire time
    const expireTime = Date.now() + 30 * 60 * 1000 // 30 minutes

    return { token, hashedToken, expireTime }
}

module.exports = generateResetToken