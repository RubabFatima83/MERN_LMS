import { useState } from 'react';
import api from '../../auth/Services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const { data } = await api.post('/auth/forgot-password', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage(data.message || 'Reset link sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] px-4">
      <div className="max-w-md w-full bg-[#1E293B] text-white p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-2xl font-bold text-center text-blue-400 mb-4">Forgot Password</h2>
        <p className="text-sm text-center text-gray-400 mb-6">
          Enter your email and we’ll send you a password reset link.
        </p>

        {error && <p className="text-red-400 text-sm text-center mb-4 font-medium">{error}</p>}
        {message && <p className="text-green-400 text-sm text-center mb-4 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full p-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
