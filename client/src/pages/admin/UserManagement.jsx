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

            <div className="overflow-x-auto rounded-lg shadow-lg border border-[#65a0ff] bg-[#012465]">
              <table className="min-w-full divide-y divide-[#65a0ff] text-[#e0e7ff]">
                <thead>
                  <tr className="border-b border-[#65a0ff]">
                    {['ID', 'Name', 'Email', 'Role', 'Actions'].map((header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-sm font-semibold tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-[#e0e7ff]">
                        No users found.
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr
                        key={user._id}
                        className="border-b border-[#1a2a6b] hover:bg-[#1a2a6b] transition-colors duration-200"
                      >
                        <td className="px-6 py-3 whitespace-nowrap">{user._id}</td>
                        <td className="px-6 py-3 capitalize whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-3 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-3 whitespace-nowrap">
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
                        <td className="px-6 py-3 whitespace-nowrap">
                          <button
                            className="text-[#ff5c5c] hover:underline"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;
