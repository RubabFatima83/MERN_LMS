const mongoose = require('mongoose')

const announcementSchema = new mongoose.Schema({

    title: { type: String, required: true },
    message: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', default: null },
    lectureId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecture', default: null },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', default: null },
    createdAt: { type: Date, default: Date.now }

}, { timestamps: true })

module.exports = mongoose.model('Announcement', announcementSchema)