import React from 'react';
import SidebarLayout from '../common/SidebarLayout';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <SidebarLayout SidebarComponent={AdminSidebar}>
      {children}
    </SidebarLayout>
  );
};

export default AdminLayout;
