import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import CourseCard from '../../components/common/CourseCard';
import { toast } from 'react-toastify';
import StudentLayout from '../../components/student/StudentLayout';

const StudentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api.get('/student/courses');
        setCourses(res.data.data); 
      } catch (error) {
        console.error('Failed to fetch courses', error);
        toast.error("Could not load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (

    <StudentLayout>
      <div className="flex">
        <main className="flex-1 mb-18 px-10 py bg-[#0a1a40] min-h-screen">
          <h2 className="text-3xl font-extrabold text-[#65a0ff] border-b border-[#65a0ff] pb-2 mb-6">My Courses</h2>

          {loading ? (
            <p className="text-gray-400 text-lg">Loading courses...</p>
          ) : courses.length === 0 ? (
            <p className="text-gray-400 text-lg">You haven't enrolled in any courses yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </main>
      </div>

    </StudentLayout>
  );
};

export default StudentCourses;
