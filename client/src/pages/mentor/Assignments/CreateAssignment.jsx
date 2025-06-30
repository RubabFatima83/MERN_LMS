import React, { useState, useEffect } from 'react';
import api from '../../../auth/Services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUpload } from 'react-icons/fa';
import MentorLayout from '../../../components/mentor/MentorLayout';

const CreateAssignment = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [dueDate, setDueDate] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/course/my');
        setCourses(res.data.data);
      } catch (err) {
        toast.error('Failed to load courses');
      }
    };
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('courseId', courseId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('dueDate', dueDate);
    if (file) {
      formData.append('file', file);
    }

    try {
      await api.post('/assignment/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Assignment created successfully');
      navigate('/dashboard/mentor');
    } catch (err) {
      toast.error('Error creating assignment');
    }
  };

  return (
    <MentorLayout>
      <div className="max-w-4xl mx-auto mt-10 mb-12 bg-[#0a1a4f] border border-[#65a0ff] rounded-2xl p-6 sm:p-8 shadow-md text-white">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#65a0ff] text-center sm:text-left">
          Create New Assignment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Course */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Select Course</label>
            <select
              className="w-full bg-[#0a1a4f] text-white border border-[#65a0ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              <option value="" disabled className="text-gray-400">Select Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>

          {/* Assignment Title */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Assignment Title</label>
            <input
              type="text"
              className="w-full bg-transparent text-white border border-[#65a0ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Assignment Description</label>
            <textarea
              rows={4}
              className="w-full bg-transparent text-white border border-[#65a0ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          {/* Due Date */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Due Date</label>
            <input
              type="date"
              className="w-full bg-transparent text-white border border-[#65a0ff] rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="block mb-1 text-sm font-medium text-[#65a0ff]">Attach File (optional)</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <label
                htmlFor="assignmentFileInput"
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 flex items-center gap-2 text-sm sm:text-base"
              >
                <FaUpload /> Choose File
              </label>
              <span className="text-sm text-gray-300 truncate">
                {file ? file.name : "No file chosen"}
              </span>
            </div>
            <input
              id="assignmentFileInput"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 transition duration-200 text-white font-semibold px-6 py-2 rounded-lg shadow text-sm sm:text-base"
            >
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </MentorLayout>
  );
};

export default CreateAssignment;
