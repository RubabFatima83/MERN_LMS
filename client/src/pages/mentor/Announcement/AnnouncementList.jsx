import React, { useEffect, useState } from 'react';
import api from '../../../auth/Services/api';
import { useNavigate } from 'react-router-dom';
import MentorLayout from '../../../components/mentor/MentorLayout';

const MentorAnnouncementList = () => {
  const navigate = useNavigate();
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get('/announcement/get');
        setAnnouncements(res.data.data);
      } catch (err) {
        console.error('Error fetching announcements', err);
      }
    };
    fetchAnnouncements();
  }, []);

  const clickCreateAnnouncement = () => {
    navigate('/mentor/create-announcement');
  };

  return (
    <MentorLayout>
      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a0ff]">
            My Announcements
          </h2>
          <button
            onClick={clickCreateAnnouncement}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Create Announcement
          </button>
        </div>

        {/* Announcement List */}
        {announcements.length === 0 ? (
          <p className="text-white text-center">No announcements found.</p>
        ) : (
          <ul className="space-y-5">
            {announcements.map((a) => (
              <li
                key={a._id}
                className="bg-[#012465] border-l-4 border-[#65a0ff] p-4 sm:p-5 rounded-xl shadow transition"
              >
                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#65a0ff]">{a.title}</h3>
                  <p className="text-sm text-gray-300">{a.message}</p>
                  <div className="text-sm text-gray-400">
                    {a.courseId && <span>📘 <b>Course:</b> {a.courseId.title} </span>}
                    {a.lectureId && <span> | 🎥 <b>Lecture:</b> {a.lectureId.title} </span>}
                    {a.assignmentId && <span> | 📝 <b>Assignment:</b> {a.assignmentId.title}</span>}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Posted on: {new Date(a.createdAt).toLocaleString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </MentorLayout>
  );
};

export default MentorAnnouncementList;
