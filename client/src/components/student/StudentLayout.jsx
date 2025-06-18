import React from 'react';
import SidebarLayout from '../common/SidebarLayout';
import StudentSidebar from './StudentSidebar';

const StudentLayout = ({ children }) => {
  return (
    <SidebarLayout SidebarComponent={StudentSidebar}>
      {children}
    </SidebarLayout>
  );
};

export default StudentLayout;
