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
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">
            My Announcements
          </h2>
          <button
            onClick={clickCreateAnnouncement}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Create Announcement
          </button>
        </div>

        {announcements.length === 0 ? (
          <p className="text-white">No announcements found.</p>
        ) : (
          <ul className="space-y-4">
            {announcements.map((a) => (
              <li
                key={a._id}
                className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-300">{a.message}</p>
                  <div className="text-sm text-gray-400 mt-1">
                    {a.courseId && <span>📘 Course: {a.courseId.title} | </span>}
                    {a.lectureId && <span>🎥 Lecture: {a.lectureId.title} | </span>}
                    {a.assignmentId && <span>📝 Assignment: {a.assignmentId.title}</span>}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Posted on: {new Date(a.createdAt).toLocaleString()}
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
