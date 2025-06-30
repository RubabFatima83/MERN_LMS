import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminLayout from '../../../../components/admin/AdminLayout'
import FaqForm from '../../../../components/admin/FaqForm'
import api from '../../../../auth/Services/api'
import { toast } from 'react-toastify'

const EditFaq = () => {
  const { id } = useParams()
  const [formData, setFormData] = useState({ question: '', answer: '' })
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const res = await api.get(`/faqs/get/${id}`)
        setFormData({ question: res.data.question, answer: res.data.answer })
      } catch (err) {
        toast.error('Failed to load FAQ')
      }
    }
    fetchFaq()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put(`/faqs/update/${id}`, formData)
      toast.success('FAQ updated successfully')
      navigate('/admin/faqs-management')
    } catch (err) {
      toast.error('Failed to update FAQ')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#65a0ff] mb-6">Edit FAQ</h2>
        <FaqForm
          formData={formData}
          handleChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          handleSubmit={handleSubmit}
          editing={true}
        />
      </div>
    </AdminLayout>
  )
}

export default EditFaq
