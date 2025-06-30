import React, { useState } from 'react'
import AdminLayout from '../../../../components/admin/AdminLayout'
import FaqForm from '../../../../components/admin/FaqForm'
import api from '../../../../auth/Services/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddFaq = () => {
  const [formData, setFormData] = useState({ question: '', answer: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post('/faqs/add', formData)
      toast.success('FAQ added successfully')
      navigate('/admin/faqs-management')
    } catch (err) {
      toast.error('Failed to add FAQ')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#65a0ff] mb-6">Add FAQ</h2>
        <FaqForm
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          handleSubmit={handleSubmit}
          editing={false}
        />
      </div>
    </AdminLayout>
  )
}

export default AddFaq
