const express = require('express');

const {
  getTerms,
  getTermById,
  addTerms,
  updateTerms,
  deleteTerms
} = require('../controllers/termsController');
const {protect, authorizeRole} = require('../middlewares/authMiddleware')

const router = express.Router();

router.get('/get', getTerms);
router.get('/get/:id', getTermById);
router.post('/add', addTerms);
router.put('/update/:id', updateTerms);
router.delete('/delete/:id', deleteTerms); 

module.exports = router;
