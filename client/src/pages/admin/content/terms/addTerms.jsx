import React, { useState } from 'react';
import api from '../../../../auth/Services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import TermsForm from '../../../../components/admin/TermsForm';

const AddTerms = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/terms/add', formData);
      toast.success('Terms added');
      navigate('/admin/terms-of-services');
    } catch (err) {
      toast.error('Failed to add terms');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-12">
        <h2 className="text-3xl font-extrabold text-[#65a0ff] mb-6">Add Terms of Service</h2>
        <TermsForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={false}
        />
      </div>
    </AdminLayout>
  );
};

export default AddTerms;
