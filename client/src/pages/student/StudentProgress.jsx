import React, { useEffect, useState } from 'react';
import StudentLayout from '../../components/student/StudentLayout';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import { BsPatchCheckFill } from 'react-icons/bs';
import { Bar, Pie } from 'react-chartjs-2';
import { MdBarChart, MdInsights } from 'react-icons/md';
import { BsBook } from 'react-icons/bs';
import { HiOutlineDocumentReport } from 'react-icons/hi';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const StudentProgress = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await api.get('/course/my-progress');
        setEnrollments(res.data.enrollments);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load progress');
      } finally {
        setLoading(false);
      }
    };

    fetchProgress();
  }, []);

  if (loading) {
    return (
      <StudentLayout>
        <div className="p-4 text-white">Loading progress...</div>
      </StudentLayout>
    );
  }

  const totalCourses = enrollments.length;
  const completedCourses = enrollments.filter(e => e.isCompleted).length;

  const courseLabels = enrollments.map(e => e.course.title);
  const progressPercentages = enrollments.map(e => {
    const totalLectures = e.course.lectures.length || 1;
    const watched = e.watchedLectures.length;
    return Math.round((watched / totalLectures) * 100);
  });

  const pieData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        label: 'Course Status',
        data: [completedCourses, totalCourses - completedCourses],
        backgroundColor: ['#4ade80', '#60a5fa'],
        hoverOffset: 20,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const barData = {
    labels: courseLabels,
    datasets: [
      {
        label: 'Progress (%)',
        data: progressPercentages,
        backgroundColor: '#3b82f6',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#e5e7eb',
          font: {
            size: 14,
          },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#e5e7eb' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
      y: {
        ticks: { color: '#e5e7eb' },
        grid: { color: 'rgba(255,255,255,0.05)' },
      },
    },
  };

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-white">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-[#65a0ff] flex items-center gap-2 border-b border-[#65a0ff] pb-2">
          <MdInsights className="text-[#65a0ff] text-2xl sm:text-3xl" /> My Progress
        </h1>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          <div className="bg-[#0f1c3f] rounded-2xl p-4 sm:p-6 shadow-lg border border-indigo-600">
            <h2 className="flex items-center gap-2 text-lg sm:text-2xl font-semibold mb-4">
              <MdBarChart className="text-indigo-400 text-xl sm:text-2xl" /> Course Completion
            </h2>
            <div className="h-[260px] sm:h-[280px]">
              <Pie data={pieData} options={pieOptions} />
            </div>
            <p className="mt-4 text-center text-gray-300 text-sm">
              Total: <span className="font-bold">{totalCourses}</span> | Completed:{' '}
              <span className="font-bold">{completedCourses}</span>
            </p>
          </div>

          <div className="bg-[#0f1c3f] rounded-2xl p-4 sm:p-6 shadow-lg border border-indigo-600">
            <h2 className="flex items-center gap-2 text-lg sm:text-2xl font-semibold mb-4">
              <BsBook className="text-indigo-400 text-xl sm:text-2xl" /> Course Progress Overview
            </h2>
            <div className="h-[260px] sm:h-[280px]">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>

        {/* Enrolled Courses List */}
        <div className="bg-[#0f1c3f] rounded-2xl p-4 sm:p-6 shadow-lg border border-indigo-600">
          <h2 className="flex items-center gap-2 text-lg sm:text-2xl font-semibold mb-6">
            <HiOutlineDocumentReport className="text-indigo-400 text-xl sm:text-2xl" /> Enrolled Courses
          </h2>

          {enrollments.length === 0 ? (
            <p className="text-gray-300 text-sm">You are not enrolled in any courses yet.</p>
          ) : (
            <ul className="space-y-6 max-h-[400px] overflow-y-auto pr-2 sm:pr-3 scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-800">
              {enrollments.map((enrollment) => {
                const totalLectures = enrollment.course.lectures.length || 1;
                const watched = enrollment.watchedLectures.length;
                const progressPercent = Math.round((watched / totalLectures) * 100);

                return (
                  <li
                    key={enrollment._id}
                    className="border border-gray-700 rounded-xl p-4 sm:p-5 bg-[#152856] shadow-sm"
                  >
                    <h3 className="text-base sm:text-xl font-bold text-indigo-300 mb-2">
                      {enrollment.course.title}
                    </h3>

                    <p className="text-gray-300 text-sm mb-3 line-clamp-3">
                      {enrollment.course.description.length > 100
                        ? `${enrollment.course.description.slice(0, 100)}...`
                        : enrollment.course.description}
                    </p>

                    <div className="w-full bg-gray-700 rounded-full h-3 sm:h-4 mb-2">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          progressPercent === 100 ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>

                    <div className="flex justify-between items-center text-xs sm:text-sm text-gray-200">
                      <span>
                        {watched} / {totalLectures} lectures completed ({progressPercent}%)
                      </span>
                      {progressPercent === 100 && (
                        <span className="flex items-center gap-1 text-green-400 font-medium">
                          <BsPatchCheckFill className="text-base" /> Completed
                        </span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </StudentLayout>
  );
};

export default StudentProgress;
