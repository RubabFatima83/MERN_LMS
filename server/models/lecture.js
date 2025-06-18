const mongoose = require('mongoose')

const lectureSchema = new mongoose.Schema({
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    videoUrl: { type: String, required: true },
    duration: String,
    published: { type: Boolean, default: false }  // manage publish status
}, { timestamps: true })

module.exports = mongoose.model('Lecture', lectureSchema)
