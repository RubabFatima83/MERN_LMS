import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../../auth/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/', scrollToId: 'hero' },
    { name: 'Courses', path: '/', scrollToId: 'courses' },
    { name: 'About', path: '/', scrollToId: 'about' },
    { name: 'Contact', path: '/', scrollToId: 'contact' },
  ];

  // Default active section on initial load
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveSection('Home');
    }
  }, [location]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActiveSection(link.name); // Set clicked section active

    if (link.path === '/') {
      if (location.pathname === '/') {
        scrollToSection(link.scrollToId);
      } else {
        navigate('/', { replace: false });
        setTimeout(() => {
          scrollToSection(link.scrollToId);
        }, 100);
      }
      setIsOpen(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#001845', position: 'sticky', top: 0, zIndex: 50 }}>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-[#001845] text-gray-300 border-b border-[#1f2d53] shadow-lg"
        style={{
          backgroundColor: '#001845',
          willChange: 'transform, opacity',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-2xl font-extrabold text-white tracking-tight hover:text-blue-400 transition duration-200"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                scrollToSection('hero');
                setIsOpen(false);
                setActiveSection('Home');
              }
            }}
          >
            StudentSphere
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-6 text-sm font-medium">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`hover:text-white transition duration-150 ${
                      activeSection === link.name ? 'text-white underline underline-offset-4' : 'text-gray-300'
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {user && (
              <ProfileMenu
                showProfileMenu={showProfileMenu}
                setShowProfileMenu={setShowProfileMenu}
              />
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-2xl text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0c1b3c] px-4 pb-4 overflow-hidden shadow-inner"
            >
              <ul className="flex flex-col space-y-3 text-sm font-medium mt-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      onClick={(e) => {
                        handleNavClick(e, link);
                        setIsOpen(false);
                      }}
                      className={`block py-2 px-2 rounded hover:bg-[#1e2f59] transition ${
                        activeSection === link.name ? 'text-white underline underline-offset-4' : 'text-gray-300'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
};

export default Navbar;
