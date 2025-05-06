const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [5, 'Name must be at least 5 characters']
    },

    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },

    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Prevent returning password in queries
        validate: {
            validator: function (val) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^+=\-_.])[A-Za-z\d@$!%*?&#^+=\-_.]{6,}$/.test(val)
            },
            message:
                'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character'
        }
    },

    role: { type: String, enum: ['Student', 'Mentor', 'Admin'], default: 'Student' },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

    isOtpVerified: { type: Boolean, default: false }

}, { timestamps: true })


// Encrypt password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        next()

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// Match user entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', userSchema)