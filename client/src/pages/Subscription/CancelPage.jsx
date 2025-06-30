import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Home/Navbar';
import { FaTimesCircle } from 'react-icons/fa';
import Footer from '../../components/Home/Footer';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4 text-center">
        <FaTimesCircle className="text-red-500 text-6xl mb-6 animate-pulse" />
        <h2 className="text-2xl sm:text-3xl font-bold text-red-800 mb-2">
          Payment was cancelled.
        </h2>
        <p className="text-gray-700 text-sm sm:text-base mb-6 max-w-md">
          It looks like your payment didn’t go through. You can try again or choose another plan.
        </p>
        <button
          onClick={() => navigate('/subscription')}
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 shadow-md"
        >
          Return to Plans
        </button>
      </div>
      <Footer />
    </>
  );
};

export default CancelPage;
