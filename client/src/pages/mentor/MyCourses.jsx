import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import MentorLayout from '../../components/mentor/MentorLayout';
import CourseCard from '../../components/common/CourseCard';
import { useNavigate } from 'react-router-dom';

const MyCourses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [lecturesMap, setLecturesMap] = useState({});

  const fetchCourses = async () => {
    try {
      const res = await api.get('/course/my');
      setCourses(res.data.data || []);
    } catch (err) {
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const fetchLectures = async (courseId) => {
    try {
      const res = await api.get(`/lecture/course/${courseId}`);
      setLecturesMap(prev => ({ ...prev, [courseId]: res.data.data || [] }));
    } catch (err) {
      console.error(err.response?.data || err.message);
      toast.error('Failed to fetch lectures');
    }
  };

  const toggleLectures = (courseId) => {
    if (expandedCourseId === courseId) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(courseId);
      if (!lecturesMap[courseId]) {
        fetchLectures(courseId);
      }
    }
  };

  const clickCreateCourse = () => {
    navigate('/mentor/create-course')
  }

  useEffect(() => {
    fetchCourses();
  }, [user]);

  return (
    <MentorLayout>
      <div className="p-6 max-w-7xl mx-auto text-white">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">
            My Courses
          </h2>
          <button
            onClick={clickCreateCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Create Course
          </button>
        </div>


        {loading ? (
          <p className="text-gray-300 text-center text-lg">Loading your courses...</p>
        ) : courses.length === 0 ? (
          <div className="text-center py-12">
            <img src="/no-courses.svg" alt="No courses" className="w-40 mx-auto mb-4" />
            <p className="text-gray-400 italic text-lg">You haven’t created any courses yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard
                key={course._id}
                course={course}
                role="Mentor"
                lectures={lecturesMap[course._id] || []}
                expandable={true}
                isExpanded={expandedCourseId === course._id}
                onToggleExpand={toggleLectures}
              />
            ))}
          </div>
        )}
      </div>
    </MentorLayout>
  );
};

export default MyCourses;
