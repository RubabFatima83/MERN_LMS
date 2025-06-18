const express = require('express');

const {
    getFAQs,
    createFAQ,
    updateFAQ,
    deleteFAQ,
    getFAQById
} = require('../controllers/faqController.js');
const { protect, authorizeRole } = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/get', getFAQs);
router.get('/get/:id', protect, getFAQById)
router.post('/add', protect, createFAQ); 
router.put('/update/:id', protect,  updateFAQ); 
router.delete('/delete/:id', protect,  deleteFAQ); 

module.exports = router;
