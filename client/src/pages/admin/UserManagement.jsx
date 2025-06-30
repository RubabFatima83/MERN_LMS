import React, { useState, useEffect } from 'react';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import AdminLayout from '../../components/admin/AdminLayout';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/admin/getall', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUsers(data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    try {
      await api.delete(`/admin/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('User deleted successfully.');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/updaterole/${userId}`, { role: newRole }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      toast.success('User role updated.');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#65a0ff] mb-6 border-b border-[#65a0ff] pb-2 tracking-wide drop-shadow-lg">
          User Management
        </h1>

        {loading ? (
          <p className="text-[#e0e7ff] text-center py-10">Loading users...</p>
        ) : (
          <>
            <p className="mb-4 text-[#e0e7ff]">
              Total Registered Users: <strong>{users.length}</strong>
            </p>

            {/* TABLE FOR LARGE SCREENS */}
            <div className="overflow-x-auto rounded-lg shadow-lg border border-[#65a0ff] bg-[#012465] hidden lg:block">
              <table className="min-w-full divide-y divide-[#65a0ff] text-[#e0e7ff] text-sm lg:text-base">
                <thead>
                  <tr className="border-b border-[#65a0ff]">
                    <th className="p-3 text-left font-semibold tracking-wide">ID</th>
                    <th className="p-3 text-left font-semibold tracking-wide">Name</th>
                    <th className="p-3 text-left font-semibold tracking-wide">Email</th>
                    <th className="p-3 text-left font-semibold tracking-wide">Role</th>
                    <th className="p-3 text-left font-semibold tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-[#1a2a6b] hover:bg-[#1a2a6b] transition duration-200"
                    >
                      <td className="p-3">{user._id}</td>
                      <td className="p-3 capitalize">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          className="bg-[#012465] border border-[#65a0ff] rounded px-2 py-1 text-sm text-[#e0e7ff] focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
                        >
                          <option value="Student">Student</option>
                          <option value="Mentor">Mentor</option>
                          <option value="Admin">Admin</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="text-[#ff5c5c] hover:underline"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CARD LAYOUT FOR MOBILE */}
            <div className="md:block lg:hidden space-y-4">
              {users.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#012465] border border-[#65a0ff] rounded-lg p-4 shadow-md"
                >
                  <div className="mb-2">
                    <span className="font-semibold text-[#65a0ff]">Name: </span>
                    <span className="text-[#e0e7ff]">{user.name}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-[#65a0ff]">Email: </span>
                    <span className="text-[#e0e7ff]">{user.email}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-[#65a0ff]">Role: </span>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="bg-[#012465] border border-[#65a0ff] rounded px-2 py-1 text-sm text-[#e0e7ff] focus:outline-none focus:ring-2 focus:ring-[#65a0ff] mt-1"
                    >
                      <option value="Student">Student</option>
                      <option value="Mentor">Mentor</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <button
                      className="text-[#ff5c5c] hover:underline text-sm"
                      onClick={() => handleDelete(user._id)}
                    >
                      Delete User
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
