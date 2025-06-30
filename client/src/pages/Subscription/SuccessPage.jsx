import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Home/Navbar';
import { FaCheckCircle } from 'react-icons/fa';
import Footer from '../../components/Home/Footer';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.success('Payment successful! Subscription updated.', {
      position: 'top-center',
      autoClose: 3000,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50 px-4 text-center">
        <FaCheckCircle className="text-green-500 text-6xl mb-6 animate-bounce" />
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-2">
          Thank you! Your subscription was successful.
        </h2>
        <p className="text-gray-700 text-sm sm:text-base mb-6 max-w-md">
          You now have full access to premium content and features.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
        >
          Go to Home
        </button>
      </div>
      <Footer />
    </>
  );
};

export default SuccessPage;
