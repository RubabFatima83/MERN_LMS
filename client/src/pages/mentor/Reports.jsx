import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import api from '../../auth/Services/api';
import { ResponsiveContainer } from 'recharts';
import MentorLayout from '../../components/mentor/MentorLayout';

const COLORS = ['#2375f8', '#8884d8', '#82ca9d', '#ffc658'];

const MentorReports = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await api.get('/mentor/reports');
        setReportData(res.data);
      } catch (err) {
        console.error('Error fetching reports:', err);
        setError('Failed to fetch report data.');
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const courseDistributionData = reportData?.courseDistributionData || [];
  const courseProgressData = reportData?.courseProgressData || [];

  return (
    <MentorLayout>
      {loading ? (
        <div className="p-4 text-gray-300">Loading reports...</div>
      ) : error ? (
        <div className="p-4 text-red-500">{error}</div>
      ) : (
        <div className="px-4 py-6 max-w-7xl mx-auto text-white">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-[#65a0ff] border-b-4 border-[#65a0ff] pb-2">
            Mentor Reports
          </h2>

          {/* Summary Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            <div className="bg-[#012465] shadow rounded-lg p-4 text-center border-l-4 border-[#65a0ff]">
              <h3 className="text-sm font-medium text-[#65a0ff]">Total Students</h3>
              <p className="text-2xl font-bold mt-1">{reportData?.totalStudents ?? 0}</p>
            </div>
            <div className="bg-[#012465] shadow rounded-lg p-4 text-center border-l-4 border-[#65a0ff]">
              <h3 className="text-sm font-medium text-[#65a0ff]">Courses Managed</h3>
              <p className="text-2xl font-bold mt-1">{reportData?.totalCourses ?? 0}</p>
            </div>
            <div className="bg-[#012465] shadow rounded-lg p-4 text-center border-l-4 border-[#65a0ff]">
              <h3 className="text-sm font-medium text-[#65a0ff]">Average Completion</h3>
              <p className="text-2xl font-bold mt-1">{reportData?.averageCompletion ?? 0}%</p>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-[#012465] shadow rounded-lg p-4 sm:p-6 mb-10 border border-[#65a0ff]">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#65a0ff]">Course-wise Student Distribution</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistributionData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={{ fill: 'white' }}
                  >
                    {courseDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{ color: 'white', fontSize: '0.8rem' }}
                  />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f1e40', borderColor: '#65a0ff', color: 'white' }}
                    itemStyle={{ color: 'white' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-[#012465] shadow rounded-lg p-4 sm:p-6 border border-[#65a0ff]">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#65a0ff]">Average Course Completion (%)</h3>
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={courseProgressData}
                  margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e2a5e" />
                  <XAxis dataKey="course" stroke="#65a0ff" tick={{ fill: 'white', fontSize: 12 }} />
                  <YAxis domain={[0, 100]} stroke="#65a0ff" tick={{ fill: 'white', fontSize: 12 }} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f1e40', borderColor: '#65a0ff', color: 'white' }}
                  />
                  <Legend wrapperStyle={{ color: 'white', fontSize: '0.8rem' }} />
                  <Bar dataKey="avgCompletion" fill="#65a0ff" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </MentorLayout>
  );
};

export default MentorReports;
