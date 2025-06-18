const express = require('express')
const router = express.Router()

const {
    addLecture,
    updateLecture,
    getLectures,
    getLectureById,
    deleteLecture,
    getLecturesByCourse,
    markLectureCompleted,
} = require('../controllers/lectureController')
// const upload = require('../middlewares/uploadFile')
const { protect, authorizeRole } = require('../middlewares/authMiddleware')

router.post('/add/:courseId', protect, authorizeRole(['Mentor', 'Admin']), addLecture)
router.put('/update/:id', protect, authorizeRole(['Mentor', 'Admin']), updateLecture)
router.get('/get', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getLectures)
router.get('/get/:id', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getLectureById)

router.get('/:courseId', protect, authorizeRole(['Mentor', 'Admin']), getLecturesByCourse)

router.delete('/delete/:id', protect, authorizeRole(['Mentor', 'Admin']), deleteLecture)

router.post('/:courseId/:lectureId/complete', protect, authorizeRole('Student'), markLectureCompleted);


module.exports = router