const express = require('express');

const {
  addPrivacy,
  getPrivacy,
  updatePrivacy,
  deletePrivacy,
  getPrivacyById
} = require('../controllers/privacyController');
const {protect, authorizeRole} = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/add', addPrivacy);
router.get('/get', getPrivacy);
router.get('/get/:id', getPrivacyById)
router.put('/update/:id', updatePrivacy);
router.delete('/delete/:id', deletePrivacy);

module.exports = router;
