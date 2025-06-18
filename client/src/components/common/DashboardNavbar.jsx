import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars } from 'react-icons/fa';
import ProfileMenu from '../Home/ProfileMenu';
import { useAuth } from '../../auth/context/AuthContext';

const DashboardNavbar = ({ toggleSidebar }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user } = useAuth();

  return (
    <div className="bg-[#001845] sticky top-0 z-50">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full text-gray-300 border-b border-[#1f2d53] shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Left side: Logo & Hamburger */}
          <div className="flex items-center gap-4">
            {/* Hamburger Icon for Mobile */}
            <button
              className="text-white text-xl md:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FaBars />
            </button>

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-extrabold text-white tracking-tight hover:text-blue-400 transition duration-200"
            >
              StudentSphere
            </Link>
          </div>

          {/* Right side: Profile */}
          {user && (
            <ProfileMenu
              showProfileMenu={showProfileMenu}
              setShowProfileMenu={setShowProfileMenu}
            />
          )}
        </div>
      </motion.nav>
    </div>
  );
};

export default DashboardNavbar;
