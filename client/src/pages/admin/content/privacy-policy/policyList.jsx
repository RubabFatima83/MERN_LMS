import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../../auth/Services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';

const PrivacyList = () => {
  const [policies, setPolicies] = useState([]);

  const fetchPolicies = async () => {
    try {
      const res = await api.get('/privacy/get');
      setPolicies(res.data);
    } catch (err) {
      toast.error('Failed to fetch policies');
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this privacy policy?')) return;
    try {
      await api.delete(`/privacy/delete/${id}`);
      toast.success('Deleted successfully');
      fetchPolicies();
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">Privacy Policies</h2>
          <Link to="/admin/privacy/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Add Policy
          </Link>
        </div>
        {policies.length === 0 ? (
          <p className="text-gray-300 text-center">No privacy policies available.</p>
        ) : (
          <ul className="space-y-4">
            {policies.map(policy => (
              <li key={policy._id} className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{policy.title}</h3>
                  <p className="text-sm text-gray-300 mt-1">{policy.content}</p>
                </div>
                <div className="flex gap-3 ml-4">
                  <Link to={`/admin/privacy/edit/${policy._id}`} className="bg-[#65a0ff] text-white px-3 py-1 rounded hover:bg-[#2375f8]">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(policy._id)}
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

export default PrivacyList;
