// middlewares/subscriptionMiddleware
const Subscription = require('../models/subscription.js');

const checkSubscription = async (req, res, next) => {
    const subscription = await Subscription.findOne({ user: req.user._id, isActive: true });

    if (!subscription || new Date(subscription.endDate) < new Date()) {
        return res.status(403).json({ message: 'No active subscription found. Please subscribe.' });
    }

    req.subscription = subscription;
    next();
};

module.exports = { checkSubscription }
