const express = require('express');
const router = express.Router();

const { sendContactMessage, getAllMessages, replyToMessage, getMessageById, deleteMessageById } = require('../controllers/contactController');

router.post('/sendMessage', sendContactMessage);

router.get('/allMessages', getAllMessages);
router.get('/message/:id', getMessageById);
router.delete('/delete/:id', deleteMessageById)
router.post('/reply', replyToMessage);

module.exports = router;
