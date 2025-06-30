import React, { useEffect, useState } from 'react';
import api from '../../../../auth/Services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import { useNavigate } from 'react-router-dom';

const FaqList = () => {
  const [faqs, setFaqs] = useState([]);
  const navigate = useNavigate();

  const fetchFaqs = async () => {
    try {
      const res = await api.get('/faqs/get');
      setFaqs(res.data);
    } catch (err) {
      toast.error('Failed to load FAQs');
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await api.delete(`/faqs/delete/${id}`);
      toast.success('FAQ deleted');
      fetchFaqs();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10 mb-12 px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#65a0ff] pb-4 mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a0ff]">FAQs</h2>
          <button
            onClick={() => navigate('/admin/faqs/add')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
          >
            Add FAQ
          </button>
        </div>

        {/* List */}
        {faqs.length === 0 ? (
          <p className="text-gray-300 text-center">No FAQs available.</p>
        ) : (
          <ul className="space-y-4">
            {faqs.map((faq) => (
              <li
                key={faq._id}
                className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded-lg flex flex-col sm:flex-row justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold break-words">{faq.question}</h3>
                  <p className="text-sm text-gray-300 mt-2 break-words">{faq.answer}</p>
                </div>

                <div className="flex gap-3 sm:flex-col sm:justify-start">
                  <button
                    onClick={() => navigate(`/admin/faqs/edit/${faq._id}`)}
                    className="bg-[#65a0ff] text-white px-4 py-1 rounded hover:bg-[#2375f8] text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(faq._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
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
  );
};

export default FaqList;
