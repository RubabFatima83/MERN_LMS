import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOpenCheck,
  FileText,
  Megaphone,
  Users,
  MessageSquare,
  BarChart2,
  X,
} from 'lucide-react';

const MentorSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();

  const links = [
    { label: 'My Courses', path: '/mentor/my-courses', icon: BookOpenCheck },
    { label: 'Assignments', path: '/mentor/my-assignments', icon: FileText },
    { label: 'Announcements', path: '/mentor/announcements', icon: Megaphone },
    { label: 'Student List', path: '/mentor/student-overview', icon: Users },
    { label: 'Reports', path: '/mentor/reports', icon: BarChart2 },
  ];

  return (
    <aside
      className={`
        fixed md:static top-0 left-0 z-40 h-full w-64 bg-[#012465] text-white shadow-lg transform transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        md:flex flex-col
      `}
    >
      {/* Top Header with Close Icon on Mobile */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-blue-900">
        <h2 className="text-2xl font-bold text-white tracking-wide mx-auto">Mentor Panel</h2>
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
      <nav className="flex flex-col px-4 py-6 space-y-2">
        {links.map(({ label, path, icon: Icon }) => (
          <Link
            key={label}
            to={path}
            onClick={() => setSidebarOpen(false)} // close on mobile after click
            className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-300 font-semibold 
              ${location.pathname === path ? 'bg-[#02357c]' : 'hover:bg-[#02357c]'}
            `}
          >
            <Icon size={20} />
            <span className="md:inline">{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default MentorSidebar;
