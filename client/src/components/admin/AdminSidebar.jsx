import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart2,
  Users,
  FileText,
  MessageSquare,
  BookOpen,
  ShieldCheck,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  LayoutTemplate,
  X,
} from 'lucide-react';

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [contentOpen, setContentOpen] = useState(false);

  const mainLinks = [
    { label: 'Site Analytics', path: '/admin/analytics', icon: <BarChart2 size={18} /> },
    { label: 'User Management', path: '/admin/user-management', icon: <Users size={18} /> },
    { label: 'System Logs', path: '/admin/logs', icon: <FileText size={18} /> },
    { label: 'Contact Messages', path: '/admin/messages', icon: <MessageSquare size={18} /> },
  ];

  const contentLinks = [
    { label: 'FAQs Management', path: '/admin/faqs-management', icon: <HelpCircle size={18} /> },
    { label: 'Terms Of Services', path: '/admin/terms-of-services', icon: <BookOpen size={18} /> },
    { label: 'Privacy Policy', path: '/admin/privacy-policy', icon: <ShieldCheck size={18} /> },
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      <aside
        className={`fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#012465] text-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex flex-col`}
      >
        {/* Header with Close button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-900">
          <h2 className="text-2xl font-bold text-white tracking-wide mx-auto">Admin Panel</h2>
          <button className="md:hidden text-white" onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col px-4 py-6 space-y-3">
          {/* Main Links */}
          {mainLinks.map(({ label, path, icon }) => (
            <Link
              key={label}
              to={path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md font-semibold transition-colors duration-300
                ${isActive(path) ? 'bg-[#02357c]' : 'hover:bg-[#02357c]'}`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {/* Content Dropdown */}
          <button
            onClick={() => setContentOpen(!contentOpen)}
            className="flex items-center justify-between px-4 py-3 rounded-md font-semibold hover:bg-[#02357c] transition-colors duration-300"
          >
            <span className="flex items-center gap-3">
              <LayoutTemplate size={18} />
              Content Management
            </span>
            {contentOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>

          {/* Content Links */}
          {contentOpen && (
            <div className="ml-6 mt-1 space-y-2">
              {contentLinks.map(({ label, path, icon }) => (
                <Link
                  key={label}
                  to={path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300
                    ${isActive(path) ? 'bg-[#02357c]' : 'hover:bg-[#02357c]'}`}
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
