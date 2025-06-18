const Assignment = require('../models/assignment')
const Course = require('../models/course')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const createAssignment = catchAsyncErrors(async (req, res, next) => {
    const { title, description, courseId, dueDate } = req.body;

    const assignment = new Assignment({
        title,
        description,
        courseId,
        dueDate,
        fileUrl: req.file ? req.file.path : null
    });

    const savedAssignment = await assignment.save();

    res.status(201).json({
        success: true,
        message: 'Assignment created successfully!',
        data: savedAssignment
    });
})

const updateAssignment = catchAsyncErrors(async (req, res, next) => {
    const updates = { ...req.body }
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, updates, {
        new: true,
        runValidators: true
    })

    if (!assignment) return next(new ErrorHandler('Assignment not found', 404))

    res.status(200).json({
        success: true,
        message: 'Assignment updated successfully!',
        data: assignment
    })
})

const getAssignmentById = catchAsyncErrors(async (req, res, next) => {
    const assignment = await Assignment.findById(req.params.id).populate('courseId', 'courseName')
    if (!assignment) return next(new ErrorHandler('Assignment not found', 404))
    res.status(200).json({
        success: true,
        message: 'Assignment fetched successfully!',
        data: assignment
    })
})

const getMentorAssignments = catchAsyncErrors(async (req, res, next) => {
    const mentorId = req.user.id;

    // Find courses created by this mentor
    const courses = await Course.find({ mentor: mentorId }).select('_id');
    const courseIds = courses.map(course => course._id);

    // Find assignments related to those courses
    const assignments = await Assignment.find({ courseId: { $in: courseIds } }).populate('courseId', 'title');

    res.status(200).json({ success: true, data: assignments });
})

const deleteAssignment = catchAsyncErrors(async (req, res, next) => {
    const assignment = await Assignment.findByIdAndDelete(req.params.id)
    if (!assignment) return next(new ErrorHandler('Assignment not found', 404))
    res.status(200).json({
        success: true,
        message: 'Assignment deleted successfully!'
    })
})

const submitAssignment = catchAsyncErrors(async (req, res, next) => {
    const assignment = await Assignment.findById(req.params.id);
    assignment.submissions.push({
        student: req.user.id,
        fileUrl: req.body.fileUrl,
    })
    await assignment.save();
    res.json({ message: 'Submitted' });
})


module.exports = {
    createAssignment,
    updateAssignment,
    getAssignmentById,
    getMentorAssignments,
    deleteAssignment,
    submitAssignment,
}
