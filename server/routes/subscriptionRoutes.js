// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/authMiddleware');
const { createCheckoutSession, subscribeFreePlan } = require('../controllers/subscriptionController');


router.post('/checkout', protect, createCheckoutSession);

// router.get('/me', protect, async (req, res) => {
//   const sub = await Subscription.findOne({ user: req.user._id, isActive: true });
//   res.json(sub || { plan: 'Free' });
// });

router.post('/free', protect, subscribeFreePlan)

module.exports = router;
