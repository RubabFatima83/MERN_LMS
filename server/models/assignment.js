const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({

    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    // mentor: { type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    fileUrl: { type: String },
    submissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
    submissionStatus: String,
    dueDate: String,

}, { timestamps: true })

module.exports = mongoose.model('Assignment', assignmentSchema)