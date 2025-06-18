const express = require('express')
const router = express.Router()

const {
    getStudentPerformance,
    getStudentCourses,
    getCourseById,
    getAssignmentsByCourse,
    submitAssignment,
    getStudentGrades,
    getStudentAnnouncements,
    getAnnouncementById,
    getStudentAssignments
} = require('../controllers/studentController')
const { protect, authorizeRole } = require('../middlewares/authMiddleware')

router.get('/performance/:studentId', protect, authorizeRole(['Mentor']), getStudentPerformance)
router.get('/courses', protect, authorizeRole(['Student']), getStudentCourses);
router.get('/course/:id', protect, authorizeRole(['Student']), getCourseById);
router.get('/assignment/:id', protect, authorizeRole(['Student']), getAssignmentsByCourse);

router.get('/assignments', protect, authorizeRole(['Student']), getStudentAssignments);

router.post('/assignment/submit/:id', protect, authorizeRole(['Student']), submitAssignment);

router.get('/grades', protect, authorizeRole(['Student']), getStudentGrades);

router.get('/announcements', protect, authorizeRole(['Student']), getStudentAnnouncements)
router.get('/announcement/get/:id', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getAnnouncementById)

module.exports = router
