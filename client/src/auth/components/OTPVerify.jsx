import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import api from '../../auth/Services/api';
import { useAuth } from '../../auth/context/AuthContext';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const email = location.state?.email || '';
  const [otpValues, setOtpValues] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otpValues];
    newOtp[index] = value;
    setOtpValues(newOtp);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('Text').trim();
    if (/^\d{4}$/.test(pasteData)) {
      const newOtp = pasteData.split('');
      setOtpValues(newOtp);
      inputsRef.current[3].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpValues.join('');
    if (otp.length !== 4) {
      setError('Please enter the complete 4-digit OTP');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      await api.post('/auth/verify-otp', { email, otp });
      await login(email, '');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError('');
    setMessage('');
    try {
      const { data } = await api.post('/auth/resend-otp', { email });
      setMessage(data.message || 'OTP has been resent.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1E293B] text-white p-8 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-green-400 mb-6">Verify OTP</h1>

        <p className="text-center text-sm text-gray-300 mb-4">
          We've sent a 4-digit OTP to your email: <span className="font-semibold text-white">{email}</span>
        </p>

        {error && <p className="text-red-400 text-sm text-center mb-2">{error}</p>}
        {message && <p className="text-green-400 text-sm text-center mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5" onPaste={handlePaste}>
          <div className="flex justify-between gap-3">
            {otpValues.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                className="w-12 h-12 text-center text-lg rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Didn’t receive the OTP?{' '}
          <span
            onClick={handleResendOtp}
            className="text-green-400 hover:underline cursor-pointer"
          >
            {resendLoading ? 'Resending...' : 'Resend'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
