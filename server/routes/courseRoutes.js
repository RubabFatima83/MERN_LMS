const express = require('express')
const router = express.Router()

const {
    createCourse,
    updateCourse,
    getCourses,
    getCourseById,
    deleteCourse,
    getMyCourses,
    enrollInCourse,
    getMyProgress,
    getFilter_Options,
    getPremiumCourses
} = require('../controllers/courseController')

const upload = require('../middlewares/uploadFile')
const { protect, authorizeRole } = require('../middlewares/authMiddleware')
const { checkSubscription } = require('../middlewares/subscriptionMiddleware')

router.post('/create', protect, authorizeRole(['Mentor', 'Admin']), upload.single('thumbnail'), createCourse)
router.get("/filters_options", getFilter_Options);

router.put('/update/:id', protect, authorizeRole(['Mentor', 'Admin']), upload.single('thumbnail'), updateCourse)

router.get('/get', getCourses)
router.get('/premium', authorizeRole(['Student', 'Mentor', 'Admin']), checkSubscription, getPremiumCourses);

router.get('/my', protect, authorizeRole('Mentor'), getMyCourses)

router.get('/get/:id', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getCourseById)
router.delete('/delete/:id', protect, authorizeRole(['Mentor', 'Admin']), deleteCourse)

router.post('/:courseId/enroll', protect, enrollInCourse)
router.get('/my-progress', protect, getMyProgress);

module.exports = router