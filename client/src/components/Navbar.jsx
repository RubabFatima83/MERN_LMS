import React from 'react';
// import logo from '../assets/favicon.png';
import { Navigate, useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav className='w-full bg-white shadow-md fixed top-0 left-0 z-50 px-4 py-3 sm:px-12 flex items-center justify-between'>
            {/* <img src={logo} alt='logo' className='w-1 h-16 sm:w-32' /> */}
            <h1 className='text-xl sm:text-2xl font-bold text-gray-800'>StudentSphere</h1>

            <div className='flex items-center gap-4'>
                <button onClick={()=> navigate('/login')}
                className='border border-gray-400 rounded-full px-5 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'>
                    Login
                </button>
                <button onClick={()=> navigate('/signup')}
                className='border border-gray-400 rounded-full px-5 py-2 text-sm sm:text-base text-gray-800 hover:bg-gray-100 transition-all cursor-pointer'>
                    Signup
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
