import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../auth/Services/api'
import { useAuth } from '../auth/context/AuthContext'

const VerifyOtp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const email = location.state?.email || ''
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      await api.post('/auth/verify-otp', { email, otp })
      await login(email, '') // update auth context
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setResendLoading(true)
    setError('')
    setMessage('')
    try {
      const { data } = await api.post('/auth/resend-otp', { email })
      setMessage(data.message || 'OTP has been resent to your email.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP')
    } finally {
      setResendLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Verify OTP</h1>

        <p className="text-center text-sm text-gray-700 mb-4">
          We've sent a 4-digit OTP to your email: <strong>{email}</strong>
        </p>

        {error && <p className="text-red-600 text-sm text-center mb-2">{error}</p>}
        {message && <p className="text-green-600 text-sm text-center mb-2">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">OTP</label>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Didn’t receive the OTP?{' '}
          <span
            onClick={handleResendOtp}
            className="text-green-600 hover:underline cursor-pointer"
          >
            {resendLoading ? 'Resending...' : 'Resend'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default VerifyOtp
