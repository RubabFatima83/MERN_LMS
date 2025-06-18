const express = require('express')
const router = express.Router()

const { getAllUsers, getUsersByRole, deleteUser, getAdminStats, getSystemLogs, updateUserRole, getStudentsWithCourses } = require('../controllers/adminController')
const { protect, authorizeRole } = require('../middlewares/authMiddleware')

// admin routes
router.get('/getall', protect, getAllUsers)
router.delete('/delete/:id', protect, authorizeRole(['Admin']), deleteUser)
router.get('/stats/summary', protect, getAdminStats)
router.get('/logs', protect, getSystemLogs)
router.put('/updaterole/:id', protect, updateUserRole)
router.get('/students', protect, authorizeRole('Admin'), getStudentsWithCourses);

router.get('/by-role', protect, authorizeRole(['Mentor']), getUsersByRole)


module.exports = router
