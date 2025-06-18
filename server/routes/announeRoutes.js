const express = require('express')
const router = express.Router()

const { 
    createAnnouncement, 
    updateAnnouncement, 
    getAnnouncements, 
    getAnnouncementById, 
    deleteAnnouncement 
} = require('../controllers/announceController')

const { protect, authorizeRole } = require('../middlewares/authMiddleware')

router.post('/create', protect, authorizeRole(['Mentor', 'Admin']), createAnnouncement)
router.put('/update/:id', protect, authorizeRole(['Mentor', 'Admin']), updateAnnouncement)
router.get('/get', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getAnnouncements)
router.get('/get/:id', protect, authorizeRole(['Student', 'Mentor', 'Admin']), getAnnouncementById)
router.delete('/delete/:id', protect, authorizeRole(['Mentor', 'Admin']), deleteAnnouncement)

module.exports = router