const User = require('../models/user')
const OTP = require('../models/OTPs')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const { generateOTP } = require('../utils/generateVerificationOTP')
const sendEmail = require('../utils/sendEmail')
const { signupOtpTemplate, loginOtpTemplate } = require('../utils/emailTemplate')
const sendToken = require('../utils/sendAuthenticationToken')

// Sign up
const signUp = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body
    if (!name || !email || !password || !role) {
        return next(new ErrorHandler('All fields are required.', 400))
    }

    const userExists = await User.findOne({ email })
    if (userExists) {
        return next(new ErrorHandler('User already exists!', 400))
    }

    const user = await User.create({ name, email, password, role })

    if (user) {
        const otp = generateOTP()
        await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) })

        const html = signupOtpTemplate(name, otp)
        await sendEmail({ email, subject: 'Verify Your Account', html })
    }
    return next(new ErrorHandler('Invalid credentials.', 401))
})

// Verify OTP
const verifyOtp = catchAsyncErrors(async (req, res, next) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return next(new ErrorHandler('Email and OTP are required.', 400));
    }

    try {
        // Find all unverified users with same email
        const userAllEntries = await User.find({ email, accountVerified: false }).sort({ createdAt: -1 });

        if (userAllEntries.length === 0) {
            return next(new ErrorHandler('User not found or already verified.', 404));
        }

        let user = userAllEntries[0];
        if (userAllEntries.length > 1) {
            // Delete older duplicate unverified accounts
            await User.deleteMany({
                _id: { $ne: user._id },
                email,
                accountVerified: false
            });
        }

        const record = await OTP.findOne({ email, otp });
        if (!record) {
            return next(new ErrorHandler('Invalid OTP.', 400));
        }
        if (record.expiresAt < Date.now()) {
            await OTP.deleteOne({ _id: record._id });
            return next(new ErrorHandler('OTP has expired.', 400));
        }

        user.accountVerified = true;
        await user.save();

        await OTP.deleteMany({ email });

        return sendToken(res, user, 'Login successful.', 200);

    } catch (error) {
        return next(new ErrorHandler('Internal Server Error.', 500));
    }
})

const resendOtp = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.accountVerified) {
        return next(new ErrorHandler('User not found or already verified.', 404));
    }

    const otp = generateOTP();
    await OTP.deleteMany({ email });
    await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) });

    const html = signupOtpTemplate(user.name, otp);
    await sendEmail({ email, subject: 'Your OTP Code', html });

    res.status(200).json({ message: 'OTP resent successfully' });
});


// Login
const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new ErrorHandler('All fields are required.', 400))
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.matchPassword(password))) {
        return next(new ErrorHandler('Invalid credentials', 401))
    }

    if (user.accountVerified) {
        return sendToken(res, user, 'Login successful.', 200);
    }

    const otp = generateOTP()
    await OTP.deleteMany({ email });
    await OTP.create({ email, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) })

    const html = loginOtpTemplate(user.name, otp)
    await sendEmail({ email, subject: 'Your OTP Code', html })

    res.status(200).json({ message: 'OTP sent to your email. Please verify.' })
})

// Logout
const logOut = catchAsyncErrors(async (req, res, next) => {
    res.status(200).clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
})

const getMe = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user, // comes from the protect middleware
    })
}

module.exports = { signUp, verifyOtp, resendOtp, login, logOut, getMe }