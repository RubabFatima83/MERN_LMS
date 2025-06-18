import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#001845] text-gray-300 pt-12 pb-6 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        
        {/* Brand Section */}
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
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline hover:text-white transition">Home</Link></li>
            <li><Link to="/courses" className="hover:underline hover:text-white transition">Courses</Link></li>
            <li><Link to="/about" className="hover:underline hover:text-white transition">About</Link></li>
            <li><Link to="/contact" className="hover:underline hover:text-white transition">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Support</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faqs" className="hover:underline hover:text-white transition">FAQ</Link></li>
            <li><Link to="/terms" className="hover:underline hover:text-white transition">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:underline hover:text-white transition">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Follow Us</h2>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
            <a href="#" className="hover:text-white transition"><FaLinkedinIn /></a>
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
