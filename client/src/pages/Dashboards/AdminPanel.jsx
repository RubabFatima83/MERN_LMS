import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';

const AdminPanel = () => {
  return (
    <AdminLayout>
      <Navigate to="/admin/analytics" replace />
    </AdminLayout>
  );
};

export default AdminPanel;
