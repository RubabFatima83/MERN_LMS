import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import StudentLayout from '../../components/student/StudentLayout';
import { FaBullhorn } from 'react-icons/fa';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get(`/student/announcements`);
        setAnnouncements(res.data.data);
      } catch (err) {
        setError('Failed to load announcements');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <StudentLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 text-white">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a0ff] border-b border-[#65a0ff] pb-2 mb-8">
          Announcements
        </h2>

        {loading ? (
          <p className="text-gray-300 text-sm sm:text-base">Loading announcements...</p>
        ) : error ? (
          <p className="text-red-400 text-sm sm:text-base">{error}</p>
        ) : announcements.length === 0 ? (
          <p className="text-gray-400 text-center text-sm sm:text-base">No announcements available.</p>
        ) : (
          <ul className="space-y-6">
            {announcements.map(({ _id, title, message, createdAt, courseId }) => (
              <li
                key={_id}
                className="bg-[#012465] p-4 sm:p-5 rounded-lg shadow-md border-l-4 border-[#65a0ff] transition-transform hover:scale-[1.01] duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <div className="flex items-center gap-2 text-[#65a0ff]">
                    <FaBullhorn className="w-5 h-5 flex-shrink-0" />
                    <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-300 sm:mt-1">
                    {new Date(createdAt).toLocaleDateString()}
                  </span>
                </div>
                {courseId && (
                  <p className="text-xs sm:text-sm text-gray-400 mb-1">
                    Course: {courseId.title}
                  </p>
                )}
                <p className="text-gray-200 text-sm sm:text-base whitespace-pre-line">{message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </StudentLayout>
  );
};

export default Announcements;
