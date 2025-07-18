import React, { useState } from 'react'
import api from '../Services/api'
import { toast } from 'react-toastify'
import { X } from 'lucide-react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UpdatePassword = ({ onClose }) => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { oldPassword, newPassword, confirmPassword } = formData

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error('Please fill in all fields')
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New password and confirm password do not match')
    }

    try {
      setLoading(true)
      await api.put(
        '/auth/update-password',
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      toast.success('Password updated successfully!')
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })
      onClose()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed min-h-screen inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
      <div className="bg-[#1e293b] text-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative border border-slate-700">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Old Password */}
          <div className="relative">
            <label className="block mb-1 text-sm text-gray-300 font-medium">
              Old Password
            </label>
            <input
              type={showOldPassword ? 'text' : 'password'}
              name="oldPassword"
              value={formData.oldPassword}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showOldPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block mb-1 text-sm text-gray-300 font-medium">
              New Password
            </label>
            <input
              type={showNewPassword ? 'text' : 'password'}
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-1 text-sm text-gray-300 font-medium">
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white border border-slate-600 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute top-9 right-3 text-gray-400 hover:text-gray-600"
              tabIndex={-1}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  )

}

export default UpdatePassword
