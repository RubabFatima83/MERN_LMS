import React, { useState, useEffect } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import Navbar from '../../components/Home/Navbar';
import Footer from '../../components/Home/Footer';
import { Pencil } from 'lucide-react';

const backend_URL = 'http://localhost:5000';

const ProfileSettings = () => {
  const { user, setUser } = useAuth();
  const [profileData, setProfileData] = useState({ name: '', email: '', role: '', profileImage: '' });
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/user/me');
        const data = response.data;
        setProfileData(data);
        setFormData({ name: data.name, email: data.email });
      } catch (error) {
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const fd = new FormData();
      fd.append('name', formData.name);
      fd.append('email', formData.email);
      if (profileImage) fd.append('profileImage', profileImage);

      const response = await api.put('/user/me', fd);
      const updated = response.data;

      setProfileData(updated);
      setFormData({ name: updated.name, email: updated.email });
      setPreviewImage(null);
      setProfileImage(null);
      setIsEditing(false);
      setUser(updated);
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setFormData({ name: profileData.name, email: profileData.email });
    setProfileImage(null);
    setPreviewImage(null);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#01133d] text-white py-10 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto bg-[#012465] p-8 rounded-xl shadow-lg border border-blue-800">
          <h1 className="text-3xl font-bold mb-6 text-center">Profile Settings</h1>

          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
            <div className="relative group">
              <img
                src={
                  previewImage
                    ? previewImage
                    : profileData.profileImage
                      ? `${backend_URL}/api/uploads/${profileData.profileImage}`
                      : '/default-profile.png'
                }
                alt="Profile"
                onError={(e) => (e.target.src = '/default-profile.png')}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-600 shadow-lg"
              />
              {isEditing && (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    title="Upload profile image"
                  />
                  <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-1">
                    <Pencil size={16} className="text-white" />
                  </div>
                </>
              )}
            </div>

            <div className="text-gray-300 text-lg">
              <p><span className="font-semibold text-white">Role:</span> {profileData.role}</p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-[#01133d] text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-[#01133d] text-white border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={handleSave}
                  className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSettings;
