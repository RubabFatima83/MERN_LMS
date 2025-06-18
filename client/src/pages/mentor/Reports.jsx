import React, { useState, useEffect } from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip as RechartsTooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import api from '../../auth/Services/api';
import { ResponsiveContainer } from 'recharts';
import MentorLayout from '../../components/mentor/MentorLayout';

// Colors array for pie chart slices
const COLORS = ['#2375f8', '#8884d8', '#82ca9d', '#ffc658'];

const MentorReports = () => {
  const [reportData, setReportData] = useState(null)
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

  // if (loading) return <p className="text-center mt-20">Loading reports...</p>;
  if (error) return <p className="text-center mt-20 text-red-600">{error}</p>;

  const courseDistributionData = reportData?.courseDistributionData || [];
  const courseProgressData = reportData?.courseProgressData || [];

  return (
    <MentorLayout>
      {loading ? (
        <div className="p-4 text-gray-600">Loading reports...</div>
      ) : (
        <div className="p-6 max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-8 text-[#65a0ff] border-b-4 border-[#65a0ff] pb-2">
            Mentor Reports
          </h2>

          {/* Summary Box */}
          <div className="flex gap-6 mb-10">
            <div className="bg-[#012465] shadow rounded-lg p-6 flex-1 text-center border-l-4 border-[#65a0ff]">
              <h3 className="text-lg font-semibold text-[#65a0ff]">Total Students</h3>
              <p className="text-2xl font-bold text-white">{reportData?.totalStudents ?? 0}</p>
            </div>
            <div className="bg-[#012465] shadow rounded-lg p-6 flex-1 text-center border-l-4 border-[#65a0ff]">
              <h3 className="text-lg font-semibold text-[#65a0ff]">Courses Managed</h3>
              <p className="text-2xl font-bold text-white">{reportData?.totalCourses ?? 0}</p>
            </div>
            <div className="bg-[#012465] shadow rounded-lg p-6 flex-1 text-center border-l-4 border-[#65a0ff]">
              <h3 className="text-lg font-semibold text-[#65a0ff]">Average Completion</h3>
              <p className="text-2xl font-bold text-white">{reportData?.averageCompletion ?? 0}%</p>
            </div>
          </div>

          {/* Pie Chart for Student Distribution */}
          <div className="bg-[#012465] shadow rounded-lg p-6 mb-12 border border-[#65a0ff]">
            <h3 className="text-xl font-semibold mb-4 text-[#65a0ff]">Course-wise Student Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
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
                  height={36}
                  wrapperStyle={{ color: 'white' }}
                />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f1e40', borderColor: '#65a0ff', color: 'white' }}
                  itemStyle={{ color: 'white' }}
                />
              </PieChart>
            </ResponsiveContainer>

          </div>

          {/* Bar Chart for Average Completion */}
          <div className="bg-[#012465] shadow rounded-lg p-6 border border-[#65a0ff]">
            <h3 className="text-xl font-semibold mb-4 text-[#65a0ff]">Average Course Completion (%)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={courseProgressData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1e2a5e" />
                <XAxis
                  dataKey="course"
                  stroke="#65a0ff"
                  tick={{ fill: 'white' }}
                />
                <YAxis
                  domain={[0, 100]}
                  stroke="#65a0ff"
                  tick={{ fill: 'white' }}
                  tickFormatter={(tick) => `${tick}%`}
                />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f1e40', borderColor: '#65a0ff', color: 'white' }}
                />
                <Legend
                  wrapperStyle={{ color: 'white' }}
                />
                <Bar dataKey="avgCompletion" fill="#65a0ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </MentorLayout>
  );
};

export default MentorReports;
