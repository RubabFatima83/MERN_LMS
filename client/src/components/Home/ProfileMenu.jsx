import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../../auth/context/AuthContext';
import UpdatePassword from '../../auth/components/UpdatePassword';

const backend_URL = 'http://localhost:5000';

const ProfileMenu = ({ showProfileMenu, setShowProfileMenu }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showPassword, setShowPassword] = useState(false)

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleDashboardRedirect = () => {
        if (user?.role === 'Student') navigate('/dashboard/student');
        else if (user?.role === 'Mentor') navigate('/dashboard/mentor');
        else if (user?.role === 'Admin') navigate('/dashboard/admin');
    };

    if (!user) return null;

    return (
        <div className="relative">
            {user.profileImage ? (
                <img
                    src={`${backend_URL}/api/uploads/${user.profileImage}`}
                    alt="Profile"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white cursor-pointer"
                />
            ) : (
                <div onClick={() => setShowProfileMenu(!showProfileMenu)} className="cursor-pointer">
                    <User className="w-8 h-8 text-white" />
                </div>
            )}

            {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-black rounded-xl shadow-xl z-50 overflow-hidden border border-gray-200">
                    {/* Header */}
                    <div className="flex items-center gap-3 px-6 py-8 bg-[#001845] border-b border-gray-200">
                        <img
                            src={user?.profileImage ? `${backend_URL}/api/uploads/${user.profileImage}` : '/default-profile.png'}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover border border-blue-500"
                        />
                        <div>
                            <p className="font-semibold text-gray-100">{user?.name}</p>
                            <p className="text-sm text-gray-300">{user?.email}</p>
                        </div>
                    </div>

                    {/* Options */}
                    <button
                        onClick={() => navigate('/profile')}
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 w-full text-left transition"
                    >
                        <User className="w-5 h-5 text-gray-600" />
                        Profile Settings
                    </button>

                    <div className="dropdown-menu">
                        <button onClick={() => setShowPassword(true)}
                            className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 w-full text-left transition"
                        >
                            <Lock className="w-5 h-5 text-gray-600" />
                            Change Password
                        </button>
                    </div>

                    {showPassword && (
                        <UpdatePassword onClose={() => setShowPassword(false)} />
                    )}

                    <button
                        onClick={handleDashboardRedirect}
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 w-full text-left transition"
                    >
                        <LayoutDashboard className="w-5 h-5 text-gray-600" />
                        Dashboard
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-6 py-3 hover:bg-blue-100 w-full text-left transition"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;
