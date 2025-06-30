import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../auth/Services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';

const TermsList = () => {
  const [terms, setTerms] = useState([]);

  const fetchTerms = async () => {
    try {
      const res = await api.get('/terms/get');
      setTerms(res.data);
    } catch (err) {
      toast.error('Failed to fetch terms');
    }
  };

  useEffect(() => {
    fetchTerms();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this term?')) return;
    try {
      await api.delete(`/terms/delete/${id}`);
      toast.success('Term deleted');
      fetchTerms();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto mt-10 mb-12 px-4 sm:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#65a0ff] pb-4 mb-6 gap-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a0ff]">
            Terms of Service
          </h2>
          <Link
            to="/admin/terms/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto text-center"
          >
            Add Terms
          </Link>
        </div>

        {/* Terms List */}
        {terms.length === 0 ? (
          <p className="text-gray-300 text-center">No terms available.</p>
        ) : (
          <ul className="space-y-4">
            {terms.map((term) => (
              <li
                key={term._id}
                className="bg-[#012465] text-[#65a0ff] border-l-4 border-[#65a0ff] p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                {/* Term Content */}
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold break-words">{term.title}</h3>
                  <p className="text-sm text-gray-300 mt-1 break-words">{term.content}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 sm:flex-col sm:justify-start w-full sm:w-auto">
                  <Link
                    to={`/admin/terms/edit/${term._id}`}
                    className="bg-[#65a0ff] text-white px-4 py-1 rounded hover:bg-[#2375f8] text-sm text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(term._id)}
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

export default TermsList;
