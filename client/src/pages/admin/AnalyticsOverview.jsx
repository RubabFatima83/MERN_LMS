import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import {
  Users,
  GraduationCap,
  UserCheck,
  BookOpen,
  FileText,
  Megaphone,
} from 'lucide-react';

const COLORS = ['#65a0ff', '#00C49F'];

const AnalyticsOverview = () => {
  const [stats, setStats] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get('/admin/stats/summary', {
          headers: { 'Content-Type': 'application/json' },
        });
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Something went wrong.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { label: 'Total Users', value: stats.totalUsers, icon: <Users className="w-6 h-6 text-[#65a0ff]" /> },
    { label: 'Mentors', value: stats.totalMentors, icon: <UserCheck className="w-6 h-6 text-[#65a0ff]" /> },
    { label: 'Students', value: stats.totalStudents, icon: <GraduationCap className="w-6 h-6 text-[#65a0ff]" /> },
    { label: 'Courses', value: stats.totalCourses, icon: <BookOpen className="w-6 h-6 text-[#65a0ff]" /> },
    { label: 'Assignments', value: stats.totalAssignments, icon: <FileText className="w-6 h-6 text-[#65a0ff]" /> },
    { label: 'Announcements', value: stats.totalAnnouncements, icon: <Megaphone className="w-6 h-6 text-[#65a0ff]" /> },
  ];

  const roleData = [
    { name: 'Mentors', value: stats?.totalMentors || 0 },
    { name: 'Students', value: stats?.totalStudents || 0 },
  ];

  const contentData = [
    { name: 'Courses', count: stats?.totalCourses || 0 },
    { name: 'Assignments', count: stats?.totalAssignments || 0 },
    { name: 'Announcements', count: stats?.totalAnnouncements || 0 },
  ];

  return (
    <AdminLayout>
      {loading ? (
        <div className="text-[#e0e7ff] text-center py-10">Loading analytics...</div>
      ) : error ? (
        <div className="text-red-600 text-center py-10">Error: {error}</div>
      ) : (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#65a0ff] mb-6 border-b border-[#65a0ff] pb-2 tracking-wide drop-shadow-lg">
            Admin Analytics Overview
          </h1>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {statsData.map((item, index) => (
              <div
                key={index}
                className="bg-[#012465] shadow-lg rounded-xl p-6 border-l-8 border-[#65a0ff]
               hover:scale-[1.03] transition-transform duration-300 ease-in-out cursor-default"
              >
                <div className="flex items-center gap-3 mb-2">
                  {item.icon}
                  <p className="text-[#e0e7ff] text-base sm:text-lg font-medium">{item.label}</p>
                </div>
                <p className="text-[#e0e7ff] text-2xl sm:text-3xl font-semibold">{item.value ?? '—'}</p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
            {/* Pie Chart */}
            <div className="bg-[#012465] p-4 sm:p-6 rounded-xl shadow-lg">
              <h2 className="text-[#e0e7ff] text-lg sm:text-xl mb-4">User Role Distribution</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={roleData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {roleData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#65a0ff", color: "#fff" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-[#012465] p-4 sm:p-6 rounded-xl shadow-lg">
              <h2 className="text-[#e0e7ff] text-lg sm:text-xl mb-4">Content Overview</h2>
              <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={contentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="name" stroke="#e0e7ff" />
                    <YAxis stroke="#e0e7ff" />
                    <Tooltip contentStyle={{ backgroundColor: "#1e293b", borderColor: "#65a0ff", color: "#fff" }} />
                    <Bar dataKey="count" fill="#65a0ff" barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      )}
    </AdminLayout>
  );
};

export default AnalyticsOverview;
