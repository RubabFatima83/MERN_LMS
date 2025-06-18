const User = require('../models/user')
const Assignment = require('../models/assignment')
const Feedback = require('../models/feedback')
const Course = require('../models/course')
const Announcement = require('../models/announcement')
const Submission = require('../models/submission')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const getStudentPerformance = catchAsyncErrors(async (req, res, next) => {
    const studentId = req.params.id

    const student = await User.findById(studentId).select("name email enrolledCourses")

    const assignments = await Assignment.find({ student: studentId })
        .select("title score totalScore feedback")
        .populate("course", "title")

    const feedbacks = await Feedback.find({ user: studentId })
        .select("feedbackType message createdAt")
        .populate("course", "title");

    res.status(200).json({
        student,
        assignments,
        feedbacks
    })
})

const getStudentCourses = catchAsyncErrors(async (req, res, next) => {
    const studentId = req.user._id

    const student = await User.findById(studentId).populate({
        path: 'enrolledCourses',
        select: 'title duration category level thumbnail progress mentor isPremium createdAt',
        populate: { path: 'mentor', select: 'name email' }
    })

    if (!student) return next(new ErrorHandler('Student not found', 404))

    const courses = student.enrolledCourses.map(course => ({
        _id: course._id,
        title: course.title,
        duration: course.duration,
        mentor: course.mentor,
        category: course.category,
        level: course.level,
        thumbnail: course.thumbnail,
        isPremium: course.isPremium,
        createdAt: course.createdAt,
        progress: course.progress || 0 // if you're storing it
    }))

    res.json({
        success: true,
        data: courses
    })

})

const getCourseById = catchAsyncErrors(async (req, res, next) => {
    const course = await Course.findById(req.params.id).populate('mentor', 'name email')
    if (!course) return next(new ErrorHandler('Course not found', 404))
    res.status(200).json({
        success: true,
        message: 'Course fetched successfully!',
        data: course
    })
})

const getAssignmentsByCourse = catchAsyncErrors(async (req, res, next) => {

    const courseId = req.params._id;
    const assignments = await Assignment.find({ courseId });
    res.json({ success: true, data: assignments });

})

const getStudentAssignments = catchAsyncErrors(async (req, res) => {
    const studentId = req.user._id

    const student = await User.findById(studentId).select('enrolledCourses')
    if (!student) {
        return next(new ErrorHandler('Student not found', 404))
    }

    const assignments = await Assignment.find({
        courseId: { $in: student.enrolledCourses }
    }).populate('courseId', 'title').sort({ dueDate: 1 })

    // Add submission info
    const assignmentsWithSubmissions = await Promise.all(assignments.map(async (assignment) => {
        const submission = await Submission.findOne({
            studentId,
            assignmentId: assignment._id
        })

        return {
            ...assignment.toObject(),
            submissionStatus: submission ? {
                submitted: true,
                submittedAt: submission.submittedAt,
                grade: submission.grade,
                submissionText: submission.submissionText,
                fileUrl: submission.fileUrl,
            } : {
                submitted: false
            }
        }
    }))

    res.status(200).json({ success: true, data: assignmentsWithSubmissions })
})

const submitAssignment = catchAsyncErrors(async (req, res, next) => {
    const { assignmentId } = req.params;
    const studentId = req.user.id;
    const file = req.file;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) return next(new ErrorHandler('Assignment not found', 404));

    const now = new Date();
    if (assignment.dueDate && now > assignment.dueDate) {
        return next(new ErrorHandler('Submission deadline has passed.', 400))
    }

    // Check if student has already submitted
    const existing = assignment.submissions.find(sub => sub.student.toString() === studentId)

    if (existing) {
        // Update file and reset grade
        existing.fileUrl = `/uploads/${file.filename}`
        existing.submittedAt = now
        existing.grade = undefined
    } else {
        // Add new submission
        assignment.submissions.push({
            student: studentId,
            fileUrl: `/uploads/${file.filename}`,
            submittedAt: now,
        })
    }

    await assignment.save()

    res.status(200).json({
        success: true,
        message: 'Submission successful',
        data: assignment
    })
})

const getStudentGrades = catchAsyncErrors(async (req, res, next) => {
    const studentId = req.user._id;

    // Find assignments where the student has submitted something
    const assignments = await Assignment.find({
        'submissions.student': studentId
    }).populate('courseId', 'title');

    // Extract grades for the student
    const grades = assignments.flatMap((assignment) => {
        const studentSubmission = assignment.submissions.find(
            (sub) => sub.student.toString() === studentId
        );

        if (studentSubmission && studentSubmission.grade !== undefined) {
            return {
                _id: assignment._id,
                assignmentTitle: assignment.title,
                courseTitle: assignment.courseId?.title || '',
                grade: studentSubmission.grade,
                gradedAt: studentSubmission.updatedAt || assignment.updatedAt,
                remarks: studentSubmission.remarks || ''
            }
        }
        return []
    })

    res.status(200).json({ success: true, data: grades });
})

const getStudentAnnouncements = async (req, res) => {
    try {
        const studentId = req.user._id;

        // Get student's enrolled courses
        const student = await User.findById(studentId).select('enrolledCourses');

        if (!student) {
            return res.status(404).json({ success: false, message: 'Student not found' });
        }

        const enrolledCourses = student.enrolledCourses || [];

        // Find announcements for enrolled courses OR courseId == null (general announcements)
        const announcements = await Announcement.find({
            $or: [
                { courseId: { $in: enrolledCourses } },
                { courseId: null }
            ]
        })
            .populate('courseId', 'title')  // optional: get course title
            .sort({ createdAt: -1 });
            console.log(announcements)

        res.status(200).json({ success: true, data: announcements });
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const getAnnouncementById = catchAsyncErrors(async (req, res, next) => {
    const announcement = await Announcement.findById(req.params.id).populate('courseId', 'courseName')
    if (!announcement) return next(new ErrorHandler('Announcement not found!', 404))
    res.status(200).json({
        success: true,
        message: 'Announcement fetched successfully!',
        data: announcement
    })
})

module.exports = {
    getStudentPerformance,
    getStudentCourses,
    getCourseById,
    getAssignmentsByCourse,
    getStudentAssignments,
    submitAssignment,
    getStudentGrades,
    getStudentAnnouncements,
    getAnnouncementById
}
