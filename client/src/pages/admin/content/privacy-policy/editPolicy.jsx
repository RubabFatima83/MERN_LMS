import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../../auth/Services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../../../components/admin/AdminLayout';
import PrivacyForm from '../../../../components/admin/PolicyForm';

const EditPrivacy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const res = await api.get(`/privacy/get/${id}`);
        setFormData({ title: res.data.title, content: res.data.content });
      } catch (err) {
        toast.error('Failed to load policy');
      }
    };
    fetchPolicy();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/privacy/update/${id}`, formData);
      toast.success('Privacy Policy Updated');
      navigate('/admin/privacy-policy');
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#65a0ff] mb-6">Edit Privacy Policy</h2>
        <PrivacyForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          editing={true}
        />
      </div>
    </AdminLayout>
  );
};

export default EditPrivacy;
