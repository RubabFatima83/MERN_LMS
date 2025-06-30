import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState('Home');
  const [isOpen, setIsOpen] = useState(false);

  const sections = {
    quickLinks: [
      { name: 'Home', path: '/', scrollToId: 'hero' },
      { name: 'Courses', path: '/', scrollToId: 'courses' },
      { name: 'About', path: '/', scrollToId: 'about' },
      { name: 'Contact', path: '/', scrollToId: 'contact' },
    ],
    supportLinks: [
      { name: 'FAQ', path: '/', scrollToId: 'faqs' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Privacy Policy', path: '/privacy' },
    ],
    socials: [
      { icon: <FaFacebookF />, href: 'https://www.facebook.com', label: 'Facebook' },
      { icon: <FaTwitter />, href: 'https://www.twitter.com', label: 'Twitter' },
      { icon: <FaInstagram />, href: 'https://www.instagram.com', label: 'Instagram' },
      { icon: <FaLinkedinIn />, href: 'https://www.linkedin.com', label: 'LinkedIn' },
    ],
  };

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

  const handleNavClick = async (e, link) => {
    e.preventDefault();
    setActiveSection(link.name);

    const scrollLater = () => scrollToSection(link.scrollToId);

    if (link.path === '/') {
      if (location.pathname === '/') {
        setIsOpen(false);
        setTimeout(scrollLater, 300);
      } else {
        setIsOpen(false);
        navigate('/', { replace: false });
        setTimeout(scrollLater, 300);
      }
    }
  };

  const renderLinks = (links) =>
    links.map((link) => (
      <li key={link.name}>
        <Link
          to={link.path}
          onClick={(e) => link.scrollToId ? handleNavClick(e, link) : null}
          className="hover:underline hover:text-white transition"
        >
          {link.name}
        </Link>
      </li>
    ));

  return (
    <footer className="bg-[#001845] text-gray-300 pt-12 pb-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight hover:text-blue-400 transition duration-200">
            StudentSphere
          </h1>
          <p className="mt-3 text-sm leading-relaxed">
            Empowering students to learn, grow, and succeed together.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Quick Links</h2>
          <ul className="space-y-2 text-sm">{renderLinks(sections.quickLinks)}</ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Support</h2>
          <ul className="space-y-2 text-sm">{renderLinks(sections.supportLinks)}</ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            {sections.socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} StudentSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
