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
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">Terms of Service</h2>
          <Link
            to="/admin/terms/add"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Terms
          </Link>
        </div>
        {terms.length === 0 ? (
          <p className="text-gray-300 text-center">No terms available.</p>
        ) : (
          <ul className="space-y-4">
            {terms.map(term => (
              <li
                key={term._id}
                className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-semibold">{term.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{term.content}</p>
                </div>
                <div className="flex gap-3 ml-4">
                  <Link
                    to={`/admin/terms/edit/${term._id}`}
                    className="bg-[#65a0ff] text-white px-3 py-1 rounded hover:bg-[#2375f8]"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(term._id)}
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
  );
};

export default TermsList;
