import React from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { toast } from 'react-toastify';
import api from '../../auth/Services/api';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';

const plans = [
  {
    name: 'Free Plan',
    price: '₹0',
    features: [
      'Access to free courses only',
      'Limited course content',
      'No certifications',
      'Community support only',
      'Basic progress tracking',
    ],
    value: 'free',
  },
  {
    name: 'Monthly Plan',
    price: '₹299 / month',
    features: [
      'Access to all premium courses',
      'Monthly subscription flexibility',
      'Certificates of completion',
      'Priority email support',
      'Offline downloads available',
      'Advanced progress tracking',
      'Early access to new content',
    ],
    value: 'monthly',
  },
  {
    name: 'Yearly Plan',
    price: '₹2499 / year',
    features: [
      'Access to all premium courses',
      'Best value for students',
      'Certificates of completion',
      '1-on-1 mentorship session (1 per quarter)',
      'Exclusive live webinars',
      'Offline downloads available',
      'Priority support (chat & email)',
      'Advanced progress tracking',
      'Early access to new content',
      'Resume & LinkedIn review (1 per year)',
    ],
    value: 'yearly',
  },
];

const SubscriptionPage = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubscribe = async (plan) => {
    if (!user) {
      toast.info('Please login first');
      return navigate('/login');
    }

    try {
      if (plan.value === 'free') {
        const { data } = await api.post('/subscription/free', { plan: 'Free' });
        setUser(data.updatedUser);
        toast.success(`Subscribed to ${plan.name}`);
        return navigate('/dashboard');
      }

      const { data } = await api.post('/subscription/checkout', {
        plan: plan.value,
        userId: user._id,
        email: user.email,
      });

      const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);
      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });

    } catch (error) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    }
  };

  return (
    <div className="min-h-screen bg-[#001845] text-white py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10 animate-fadeIn">
        Choose Your Plan
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {plans.map((plan, i) => (
          <div
            key={plan.name}
            className={`bg-[#01133d] border border-[#475569] hover:border-[#3b82f6] text-white rounded-2xl shadow-md hover:shadow-[0_0_15px_#3b82f6] p-4 sm:p-5 flex flex-col group cursor-pointer transform transition-transform duration-300 hover:scale-105 opacity-0 animate-fadeInUp`}
            style={{ animationDelay: `${i * 0.2}s`, animationFillMode: 'forwards' }}
          >
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-lg font-semibold text-blue-400 mb-4">{plan.price}</p>
              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span>✅</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleSubscribe(plan)}
              className="mt-auto cursor-pointer w-full bg-gradient-to-r from-[#3a86ff] to-[#00ffea] hover:from-[#2f6ddb] hover:to-[#00ccbd] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 transform hover:scale-105 active:scale-95"
              disabled={user?.subscription === plan.value}
            >
              {user?.subscription === plan.value ? 'Current Plan' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SubscriptionPage;
