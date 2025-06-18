import React from 'react';
import SidebarLayout from '../common/SidebarLayout';
import MentorSidebar from './MentorSidebar';

const MentorLayout = ({ children }) => {
  return (
    <SidebarLayout SidebarComponent={MentorSidebar}>
      {children}
    </SidebarLayout>
  );
};

export default MentorLayout;
