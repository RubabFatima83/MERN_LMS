import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenCheck, FileText, Activity, Megaphone, X } from 'lucide-react';

const StudentSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const links = [
    { label: 'Courses', path: '/student/courses', icon: <BookOpenCheck size={18} /> },
    { label: 'Assignments', path: '/student/assignments', icon: <FileText size={18} /> },
    { label: 'Progress', path: '/student/progress', icon: <Activity size={18} /> },
    { label: 'Announcements', path: '/student/announcements', icon: <Megaphone size={18} /> },
  ];

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#012465] text-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex flex-col
      `}
    >
      {/* Header with Close Icon for mobile */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900">
        <h2 className="text-2xl font-bold text-white tracking-wide">Student Panel</h2>
        {/* Close icon for mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X size={22} />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col px-4 py-6 space-y-3">
        {links.map(({ label, path, icon }) => (
          <Link
            key={label}
            to={path}
            className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-[#02357c] transition-colors duration-300 font-semibold"
            onClick={() => setSidebarOpen(false)} // Auto-close sidebar on mobile after click
          >
            {icon}
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default StudentSidebar;
