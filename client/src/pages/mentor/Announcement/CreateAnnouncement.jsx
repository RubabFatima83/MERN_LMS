import React, { useEffect, useState } from 'react';
import api from '../../../auth/Services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MentorLayout from '../../../components/mentor/MentorLayout';

const CreateAnnouncement = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [courseId, setCourseId] = useState('');
  const [assignmentId, setAssignmentId] = useState('');
  const [lectureId, setLectureId] = useState('');

  const [courses, setCourses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseRes, assignmentRes, lectureRes] = await Promise.all([
          api.get('/course/my'),
          api.get('/assignment/mentor'),
          api.get('/lecture/get')
        ]);
        setCourses(courseRes.data.data);
        setAssignments(assignmentRes.data.data);
        setLectures(lectureRes.data.data);
      } catch (err) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/announcement/create', {
        title,
        message,
        courseId: courseId || null,
        assignmentId: assignmentId || null,
        lectureId: lectureId || null,
      });
      toast.success('Announcement created');
      setTitle('');
      setMessage('');
      setCourseId('');
      setAssignmentId('');
      setLectureId('');
      navigate('/dashboard/mentor');
    } catch (err) {
      toast.error('Failed to create announcement');
    }
  };

  return (
    <MentorLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-12 bg-[#0a1a4f] border border-[#65a0ff] rounded-2xl p-6 sm:p-8 shadow-md text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#65a0ff] text-center sm:text-left">
          Create New Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Title</label>
            <input
              type="text"
              className="w-full bg-transparent text-white border border-[#65a0ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Message</label>
            <textarea
              rows={4}
              className="w-full bg-transparent text-white border border-[#65a0ff] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
              placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          {/* Selects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Course Select */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Course (optional)</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full bg-[#0a1a4f] text-white border border-[#65a0ff] rounded-lg px-4 py-2 pr-10 sm:text-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#65a0ff] appearance-none"
              >
                <option value="" disabled className="text-gray-400">Select Course</option>
                {courses.map((c) => (
                  <option key={c._id} value={c._id}>{c.title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 top-7 right-3 flex items-center text-white text-sm">▼</div>
            </div>

            {/* Assignment Select */}
            <div className="relative">
              <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Assignment (optional)</label>
              <select
                value={assignmentId}
                onChange={(e) => setAssignmentId(e.target.value)}
                className="w-full bg-[#0a1a4f] text-white border border-[#65a0ff] rounded-lg px-4 py-2 pr-10 sm:text-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#65a0ff] appearance-none"
              >
                <option value="" disabled className="text-gray-400">Select Assignment</option>
                {assignments.map((a) => (
                  <option key={a._id} value={a._id}>{a.title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 top-7 right-3 flex items-center text-white text-sm">▼</div>
            </div>

            {/* Lecture Select */}
            <div className="relative sm:col-span-2">
              <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Lecture (optional)</label>
              <select
                value={lectureId}
                onChange={(e) => setLectureId(e.target.value)}
                className="w-full bg-[#0a1a4f] text-white border border-[#65a0ff] rounded-lg px-4 py-2 pr-10 sm:text-sm text-xs focus:outline-none focus:ring-2 focus:ring-[#65a0ff] appearance-none"
              >
                <option value="" disabled className="text-gray-400">Select Lecture</option>
                {lectures.map((l) => (
                  <option key={l._id} value={l._id}>{l.title}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 top-7 right-3 flex items-center text-white text-sm">▼</div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow"
            >
              Post Announcement
            </button>
          </div>
        </form>
      </div>
    </MentorLayout>
  );
};

export default CreateAnnouncement;
