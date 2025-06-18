const express = require('express')
const router = express.Router()

const { 
    createAssignment, 
    updateAssignment,
    getAssignmentById, 
    deleteAssignment,
    submitAssignment,
    getMentorAssignments,
} = require('../controllers/assignmentController')
const upload = require('../middlewares/uploadFile')
const { protect, authorizeRole } = require('../middlewares/authMiddleware')

router.post('/create', protect, authorizeRole(['Mentor', 'Admin']), upload.single('file'), createAssignment)
router.put('/update/:id', protect, authorizeRole(['Mentor', 'Admin']), updateAssignment)

router.get('/mentor', protect, authorizeRole('Mentor'), getMentorAssignments);

router.get('/get/:id', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getAssignmentById)
router.delete('/delete/:id', protect, authorizeRole(['Mentor', 'Admin']), deleteAssignment)
router.post('/submit/:id', protect, submitAssignment)

module.exports = router