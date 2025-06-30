import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import api from '../../auth/Services/api';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await api.post('/auth/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (data.user) {
        await login(email, password);
        const role = data.user.role;

        if (role === 'Admin') {
          navigate('/dashboard/admin');
        } else if (role === 'Mentor') {
          navigate('/dashboard/mentor');
        } else {
          navigate('/');
        }
      } else {
        alert('OTP sent to your email. Please verify.');
        navigate('/verify-otp', { state: { email } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1E293B] text-white p-8 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Welcome Back</h1>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold mb-1">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Your password"
              className="w-full p-3 pr-10 rounded-lg bg-[#334155] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute top-10 right-3 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>


          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-blue-400 hover:underline font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
