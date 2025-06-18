const express = require('express')
const router = express.Router()

const { protect, authorizeRole } = require('../middlewares/authMiddleware')
const { getEnrolledStudentsByMentor, getMentorReports, getCommentsForMentor, addReplyToComment } = require('../controllers/mentorController')


router.get('/:mentorId/enrolled-students', protect, authorizeRole('Mentor'), getEnrolledStudentsByMentor);
router.get('/reports', protect, getMentorReports);
router.get('/comments', protect, authorizeRole('Mentor'), getCommentsForMentor);
router.post('/reply', protect, authorizeRole('Mentor'), addReplyToComment);


module.exports = router