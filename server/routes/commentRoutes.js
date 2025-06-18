const express = require('express');
const router = express.Router();

const { addComment, getComments, addReply } = require('../controllers/commentController.js');
const { protect } = require('../middlewares/authMiddleware.js');


router.post('/post', protect, addComment);
router.get('/:lectureId', protect, getComments);
router.post('/reply/:commentId', protect, addReply);

module.exports = router