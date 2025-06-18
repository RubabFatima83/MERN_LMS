const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    feedbackType: { type: String, enum: ['course', 'Mentor', 'platform'], required: true, },
    message: { type: String, required: [true, 'Feedback message is required'], trim: true, },
    rating: { type: Number, min: 1, max: 5, required: false, },
    createdAt: { type: Date, default: Date.now, }

}, { timestamps: true, })

module.exports = mongoose.model('Feedback', feedbackSchema);
