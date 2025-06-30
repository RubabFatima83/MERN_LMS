import React, { useEffect, useState } from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MentorLayout from '../../components/mentor/MentorLayout';
import ReusableTable from '../../components/common/ReusableTable';

const StudentList = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Track screen width on resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const mentorId = user._id;
        const res = await api.get(`/mentor/${mentorId}/enrolled-students`);
        setStudents(res.data?.students || []);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to fetch enrolled students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Courses', accessor: 'enrolledCourses' },
    { header: 'Progress(%)', accessor: 'progress' },
  ];

  const formattedStudents = students.map((student) => ({
    ...student,
    enrolledCourses:
      student.courses && student.courses.length > 0
        ? student.courses.map(course => course.title).join(', ')
        : '—',
    progress:
      student.courses && student.courses.length > 0
        ? (
            student.courses.reduce((acc, c) => acc + (c.progress || 0), 0) /
            student.courses.length
          ).toFixed(2)
        : '—',
  }));

  return (
    <MentorLayout>
      <div className="p-6 max-w-7xl mx-auto text-white">
        <h2 className="text-3xl font-extrabold text-[#65a0ff] border-b border-[#65a0ff] pb-2 mb-6 tracking-wide drop-shadow-lg">
          Enrolled Students
        </h2>

        {loading ? (
          <p className="text-gray-300 text-center text-lg">Loading students...</p>
        ) : isMobile ? (
          // ✅ Card layout for mobile
          <div className="space-y-4">
            {formattedStudents.length === 0 ? (
              <p className="text-center text-gray-300 italic">No students found.</p>
            ) : (
              formattedStudents.map((student, idx) => (
                <div
                  key={idx}
                  className="bg-[#012465] rounded-lg p-4 border-l-4 border-[#65a0ff] shadow"
                >
                  <p className="text-base font-semibold text-[#65a0ff] mb-1">{student.name}</p>
                  <p className="text-sm text-gray-400 mb-1">
                    <strong className='text-gray-200'>Email:</strong> {student.email}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    <strong className='text-gray-200'>Courses:</strong> {student.enrolledCourses}
                  </p>
                  <p className="text-sm text-gray-400">
                    <strong className='text-gray-200'>Progress:</strong> {student.progress}%
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          // ✅ Table layout for >768px
          <ReusableTable columns={columns} data={formattedStudents} />
        )}
      </div>
    </MentorLayout>
  );
};

export default StudentList;
