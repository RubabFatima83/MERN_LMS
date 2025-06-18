// const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
// const Enrollment = require('../models/enrollment')
// const Assignment = require('../models/assignment')
// const Submission = require('../models/submission')

// const getStudentPerformance = catchAsyncErrors(async (req, res) => {
//     const studentId = req.params.id

//     // 1. Fetch enrollments with course info and progress
//     const enrollments = await Enrollment.find({ studentId }).populate('courseId', 'title description')

//     // Map courses with progress & grades
//     const courses = enrollments.map(enrollment => ({
//         courseId: enrollment.courseId._id,
//         title: enrollment.courseId.title,
//         description: enrollment.courseId.description,
//         progress: enrollment.progress,
//         grade: enrollment.grade,
//     }))

//     // 2. Fetch assignments for student's courses
//     const courseIds = courses.map(c => c.courseId)
//     const assignments = await Assignment.find({ courseId: { $in: courseIds } }).select('title dueDate feedback totalScore')

//     // 3. Fetch quizzes for student and courses
//     // const quizzes = await Quiz.find({ studentId, courseId: { $in: courseIds } }).select('courseId score totalScore dueDate')

//     // 4. Fetch submissions by student for assignments
//     const assignmentIds = assignments.map(a => a._id)
//     const submissions = await Submission.find({ studentId, assignmentId: { $in: assignmentIds } }).select('assignmentId grade feedback submittedAt')

//     // Combine assignments with student's submissions and feedback
//     const assignmentsWithSubmission = assignments.map(assignment => {
//         const submission = submissions.find(s => s.assignmentId.toString() === assignment._id.toString())
//         return {
//             ...assignment.toObject(),
//             submission: submission ? {
//                 grade: submission.grade,
//                 feedback: submission.feedback,
//                 submittedAt: submission.submittedAt,
//             } : null
//         }
//     })

//     res.json({
//         courses,
//         assignments: assignmentsWithSubmission,
//         quizzes,
//     })
// })

// module.exports = { getStudentPerformance }
