const stripe = require('../config/stripe');

const createCheckoutSession = async (req, res) => {
  try {
    // console.log("📥 Body in checkout:", req.body); 

    const { plan, userId, email } = req.body;

    let amount = 0;

    if (plan === 'monthly') {
      amount = 29900; // ₹299 in paisa
    } else if (plan === 'yearly') {
      amount = 249900; // ₹2499 in paisa
    } else {
      return res.status(400).json({ message: 'Invalid plan selected' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `${plan} Subscription`
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URI}/subscription-success`,
      cancel_url: `${process.env.FRONTEND_URI}/subscription-cancel`,
      locale: 'en',
      customer_email: email,
      metadata: {
        userId,
        plan,
      }
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error.message);
    res.status(500).json({ message: "Stripe Checkout Failed" });
  }
};

const subscribeFreePlan = async (req, res) => {
  try {
    const userId = req.user._id; // from auth middleware
    const { plan } = req.body;

    if (plan !== 'Free') {
      return res.status(400).json({ message: 'Only Free plan is allowed here.' });
    }

    // Update user subscription
    const user = await User.findByIdAndUpdate(
      userId,
      { subscription: 'Free' },
      { new: true }
    ).select('-password'); // don't send password back

    // Optional: create a subscription record
    await Subscription.create({
      user: userId,
      plan: 'Free',
      startDate: new Date(),
      isActive: true,
      paymentStatus: 'Paid', // assume Free plan is always "paid"
    });

    res.status(200).json({ message: 'Free plan activated', updatedUser: user });

  } catch (error) {
    console.error('Free plan subscription error:', error.message);
    res.status(500).json({ message: 'Could not activate free plan' });
  }
};

module.exports = {
  createCheckoutSession,
  subscribeFreePlan,
};
