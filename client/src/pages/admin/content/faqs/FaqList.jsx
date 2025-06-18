import React, { useEffect, useState } from 'react'
import api from '../../../../auth/Services/api'
import { toast } from 'react-toastify'
import AdminLayout from '../../../../components/admin/AdminLayout'
import { useNavigate } from 'react-router-dom'

const FaqList = () => {
  const [faqs, setFaqs] = useState([])
  const navigate = useNavigate()

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/faqs/get')
      setFaqs(res.data)
    } catch (err) {
      toast.error('Failed to load FAQs')
    }
  }

  useEffect(() => {
    fetchFaqs()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return
    try {
      await api.delete(`/faqs/delete/${id}`)
      toast.success('FAQ deleted')
      fetchFaqs()
    } catch (err) {
      toast.error('Delete failed')
    }
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">FAQs</h2>
          <button
            onClick={() => navigate('/admin/faqs/add')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add FAQ
          </button>
        </div>

        {faqs.length === 0 ? (
          <p className="text-gray-300 text-center">No FAQs available.</p>
        ) : (
          <ul className="space-y-4">
            {faqs.map((faq) => (
              <li
                key={faq._id}
                className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-sm text-gray-300 mt-1">{faq.answer}</p>
                </div>
                <div className="flex gap-3 ml-4">
                  <button
                    onClick={() => navigate(`/admin/faqs/edit/${faq._id}`)}
                    className="bg-[#65a0ff] text-white px-3 py-1 rounded hover:bg-[#2375f8]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </AdminLayout>
  )
}

export default FaqList;