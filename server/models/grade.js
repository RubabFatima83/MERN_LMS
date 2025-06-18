const mongoose = require('mongoose')

const gradeSchema = new mongoose.Schema({

    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    grade: { type: String, enum: ['A', 'B', 'C', 'D', 'E', 'F'], required: true },
    feedback: String,
    
}, { timestamps: true });

module.exports = mongoose.model('Grade', gradeSchema);
