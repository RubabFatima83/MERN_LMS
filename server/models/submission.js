const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({

    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' },
    submissionText: { type: String, trim: true },
    fileUrl: { type: String },
    submittedAt: { type: Date, default: Date.now },
    grade: { type: String },
    remarks: { type: String }

}, { timestamps: true })

module.exports = mongoose.model('Submission', submissionSchema)