const express = require('express')
const router = express.Router()
const {
    createSubmission,
    updateSubmission,
    getSubmissions,
    getSubmissionsByAssignment,
    getSubmissionsByStudent,
    deleteSubmission,
    updateGradeAndRemarks
} = require('../controllers/submissionController')
const upload = require('../middlewares/uploadFile')
const { protect, authorizeRole } = require('../middlewares/authMiddleware')

// Student Routes
router.post('/:assignmentId', protect, authorizeRole(['Student']), upload.single('file'), createSubmission)

router.put('/update/:assignmentId/:studentId', protect, authorizeRole(['Mentor']), updateSubmission)

router.get('/student/:studentId', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getSubmissionsByStudent)

// Mentor/Admin Routes
router.get('/get/:assignmentId', protect, authorizeRole(['Mentor', 'Admin']), getSubmissions)

router.get('/assignment/:assignmentId', protect, authorizeRole(['Mentor', 'Admin']), getSubmissionsByAssignment)
router.delete('/delete/:id', protect, authorizeRole(['Mentor', 'Admin']), deleteSubmission)

// PUT /assignment/:assignmentId/submission/:studentId
router.put('/:assignmentId/:studentId', protect, authorizeRole(['Mentor', 'Admin']), updateGradeAndRemarks);

module.exports = router
