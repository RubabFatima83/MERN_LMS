import React, { useEffect, useState } from 'react';
import api from '../../../../auth/Services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import TermsForm from '../../../../components/admin/TermsForm';

const EditTerms = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const fetchTerm = async () => {
    try {
      const res = await api.get(`/terms/get/${id}`);
      setFormData(res.data);
    } catch (err) {
      toast.error('Failed to load term');
    }
  };

  useEffect(() => {
    fetchTerm();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/terms/update/${id}`, formData);
      toast.success('Terms updated');
      navigate('/admin/terms-of-services');
    } catch (err) {
      toast.error('Failed to update terms');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10 mb-12">
        <h2 className="text-2xl md:text-3xl font-extrabold text-[#65a0ff] mb-6">Edit FAQ</h2>
        <TermsForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={false}
        />
      </div>
    </AdminLayout>
  )
}

export default EditTerms
