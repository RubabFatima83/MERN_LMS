const User = require('../models/user')
const Assignment = require('../models/assignment')
const Announcement = require('../models/announcement')
const Course = require('../models/course')
const SystemLog = require('../models/SystemLog')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

const getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()

    if (users.length === 0) {
        return res.status(200).json({
            success: true,
            message: 'No user found.',
            data: []
        })
    }

    res.status(200).json({
        success: true,
        message: 'All users fetched successfully!',
        data: users
    })
})

// GET /api/users?role=Student
const getUsersByRole = catchAsyncErrors(async (req, res, next) => {
    const role = req.query.role

    if (!role) return next(new ErrorHandler('Role is required', 400))

    const users = await User.find({ role });
    res.status(200).json(users);

})

const deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return next(new ErrorHandler('User not found!', 404))
    res.status(200).json({
        success: true,
        message: 'User deleted successfully!'
    })
})

const getAdminStats = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find()
    const totalUsers = users.length
    const totalStudents = users.filter(u => u.role === 'Student').length
    const totalMentors = users.filter(u => u.role === 'Mentor').length

    const totalCourses = await Course.countDocuments()
    const totalAssignments = await Assignment.countDocuments()
    const totalAnnouncements = await Announcement.countDocuments()

    res.status(200).json({
        totalUsers,
        totalStudents,
        totalMentors,
        totalCourses,
        totalAssignments,
        totalAnnouncements
    })
})

const getSystemLogs = catchAsyncErrors(async (req, res, next) => {
    const { page = 1, limit = 20, level, userId } = req.query

    const query = {}
    if (level) query.level = level
    if (userId) query.user = userId

    const logs = await SystemLog.find(query)
        .populate('user', 'name') // populate user info if needed
        .sort({ timestamp: -1 })
        .skip((page - 1) * parseInt(limit))
        .limit(parseInt(limit))

    const total = await SystemLog.countDocuments(query)

    res.status(200).json({
        logs,
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
    })
})

const updateUserRole = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id
    const { role } = req.body

    if (!role) return next(new ErrorHandler('Role is required', 400))

    const user = await User.findById(userId)
    if (!user) return next(new ErrorHandler('User not found', 404))

    user.role = role
    await user.save()

    res.status(200).json({
        success: true,
        message: 'User role updated successfully',
        user
    })
})

const getStudentsWithCourses = catchAsyncErrors(async (req, res, next) => {
    // 1. Get all users with role student
    const students = await User.find({ role: 'student' });

    // 2. Get all courses with enrolled students populated
    const courses = await Course.find({}).select('title enrolledStudents');

    // 3. Build a map of studentId -> [course titles]
    const studentCourseMap = {};

    courses.forEach(course => {
        course.enrolledStudents.forEach(enrollment => {
            const studentId = enrollment.studentId.toString();

            if (!studentCourseMap[studentId]) {
                studentCourseMap[studentId] = [];
            }

            studentCourseMap[studentId].push(course.title);
        });
    });

    // 4. Attach enrolled course titles to each student
    const enrichedStudents = students.map(student => ({
        _id: student._id,
        name: student.name,
        email: student.email,
        enrolledCourses: studentCourseMap[student._id.toString()] || []
    }));

    res.status(200).json(enrichedStudents);
})

module.exports = { getAllUsers, getUsersByRole, deleteUser, getAdminStats, getSystemLogs, updateUserRole, getStudentsWithCourses }