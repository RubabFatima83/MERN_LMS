import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../../auth/Services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import PrivacyForm from '../../../../components/admin/PolicyForm';

const AddPrivacy = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/privacy/add', formData);
      toast.success('Privacy Policy Added');
      navigate('/admin/privacy-policy');
    } catch (err) {
      toast.error('Failed to add policy');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#65a0ff] mb-6">Add Privacy Policy</h2>
        <PrivacyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={false}
        />
      </div>
    </AdminLayout>
  );
};

export default AddPrivacy;
