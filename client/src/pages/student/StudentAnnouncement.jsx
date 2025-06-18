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
      <div className="text-white">
        <h2 className="text-3xl font-extrabold text-[#65a0ff] border-b border-[#65a0ff] py-8 mx-auto mb-6 pb-2">Announcements</h2>

        {loading ? (
          <p className="text-gray-300">Loading announcements...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : announcements.length === 0 ? (
          <p className="text-gray-400 text-center">No announcements available.</p>
        ) : (
          <ul className="space-y-5">
            {announcements.map(({ _id, title, message, createdAt, courseId }) => (
              <li
                key={_id}
                className="bg-[#012465] p-5 rounded-lg shadow-md border-l-4 border-[#65a0ff] transition-transform hover:scale-[1.01]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2 text-[#65a0ff]">
                    <FaBullhorn className="w-5 h-5 mt-0.5" /> 
                    <h3 className="text-xl font-semibold">{title}</h3>
                  </div>
                  <span className="text-sm text-gray-300">
                    {new Date(createdAt).toLocaleDateString()}
                  </span>
                </div>
                {courseId && (
                  <p className="text-sm text-gray-400 mb-1">Course: {courseId.title}</p>
                )}
                <p className="text-gray-200">{message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </StudentLayout>
  );
};

export default Announcements;
