import React, { useState } from 'react';
import DashboardNavbar from './DashboardNavbar';

const SidebarLayout = ({ SidebarComponent, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a1a40] text-white">
      {/* Sidebar (Injected) */}
      <SidebarComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-h-screen transition-all duration-300">
        <DashboardNavbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 px-4 py-6 md:px-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;
