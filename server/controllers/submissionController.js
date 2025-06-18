const Submission = require('../models/submission')
const Assignment = require('../models/assignment')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')

// Create Submission
const createSubmission = catchAsyncErrors(async (req, res, next) => {
    const assignmentId = req.params.assignmentId;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
        return next(new ErrorHandler('Assignment not found', 404));
    }

    if (new Date() > new Date(assignment.dueDate)) {
        return next(new ErrorHandler('Deadline passed, submission closed.', 400));
    }

    const existing = await Submission.findOne({
        studentId: req.user._id,
        assignmentId,
    });

    if (existing) {
        existing.submissionText = req.body.submissionText;
        if (req.file) existing.fileUrl = req.file.filename; // ✅ Only save filename
        existing.submittedAt = new Date();
        await existing.save();

        if (!assignment.submissions.map(id => id.toString()).includes(existing._id.toString())) {
            assignment.submissions.push(existing._id);
            await assignment.save();
        }

        return res.status(200).json({
            success: true,
            message: 'Submission updated successfully!',
            data: existing,
        });
    }

    // New submission
    const submissionData = {
        studentId: req.user._id,
        assignmentId,
        submissionText: req.body.submissionText,
        submittedAt: new Date(),
    };

    if (req.file) {
        submissionData.fileUrl = req.file.filename; // ✅ Only save filename
    }

    const submission = await Submission.create(submissionData);

    if (!assignment.submissions.map(id => id.toString()).includes(submission._id.toString())) {
        assignment.submissions.push(submission._id);
        await assignment.save();
    }

    res.status(201).json({
        success: true,
        message: 'Submitted successfully!',
        data: submission,
    });
});

// Update Submission (text, file, grade, feedback)
const updateSubmission = catchAsyncErrors(async (req, res, next) => {
    const { assignmentId, studentId } = req.params;

    const submission = await Submission.findOneAndUpdate(
        { assignmentId, studentId },
        { grade: req.body.grade, remarks: req.body.remarks },
        { new: true, runValidators: true }
    );

    if (!submission) {
        return next(new ErrorHandler('Submission not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Updated successfully!',
        data: submission
    });
});

// Get all submissions
const getSubmissions = catchAsyncErrors(async (req, res, next) => {
    try {
        const assignmentId = req.params.assignmentId;
        const submissions = await Submission.find({ assignmentId }).populate('studentId', 'name email')
        res.status(200).json({
            success: true,
            data: submissions
        })
    } catch (error) {
        return next(new ErrorHandler('Server Error', 500))
    }
})

// Get submissions for one assignment
const getSubmissionsByAssignment = catchAsyncErrors(async (req, res, next) => {
    try {
        const submissions = await Submission.find({ assignmentId: req.params.assignmentId }).populate('studentId')
        res.status(200).json({
            success: true,
            data: submissions
        })
    } catch (error) {
        return next(new ErrorHandler('Server Error', 500))
    }
})

// Get submissions by student
const getSubmissionsByStudent = catchAsyncErrors(async (req, res, next) => {
    const { studentId } = req.params;

    const submissions = await Submission.find({ studentId }).populate('assignmentId');
    res.status(200).json({ success: true, data: submissions });
})

// Delete
const deleteSubmission = catchAsyncErrors(async (req, res, next) => {
    try {
        const submission = await Submission.findByIdAndDelete(req.params.id)
        if (!submission) return next(new ErrorHandler('Submission not found', 404))
        res.status(200).json({
            success: true,
            message: 'Submission deleted!'
        })
    } catch (error) {
        return next(new ErrorHandler('Server Error', 500))
    }
})

// Grade & remarks on submission
const updateGradeAndRemarks = catchAsyncErrors(async (req, res, next) => {
    const { assignmentId, studentId } = req.params;
    const { grade, remarks } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

    const submission = assignment.submissions.find(sub => sub.student.toString() === studentId);
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    submission.grade = grade;
    submission.remarks = remarks;
    await assignment.save();

    res.json({ message: 'Updated successfully', submission });
})

module.exports = {
    createSubmission,
    updateSubmission,
    getSubmissions,
    getSubmissionsByAssignment,
    getSubmissionsByStudent,
    deleteSubmission,
    updateGradeAndRemarks
}