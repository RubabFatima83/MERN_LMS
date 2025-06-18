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

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const mentorId = user._id
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

  // Define columns
  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Email', accessor: 'email' },
    { header: 'Courses', accessor: 'enrolledCourses' },
    { header: 'Progress(%)', accessor: 'progress' },
  ];

  // Format students data
  const formattedStudents = students.map((student) => ({
    ...student,
    enrolledCourses:
      student.courses && student.courses.length > 0
        ? student.courses.map(course => course.title).join(', ')
        : '—',
    // If you want to show overall progress, you might calculate average or something else
    progress: student.courses && student.courses.length > 0
      ? (student.courses.reduce((acc, c) => acc + c.progress, 0) / student.courses.length).toFixed(2)
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
        ) : (
          <ReusableTable columns={columns} data={formattedStudents} />
        )}
      </div>
    </MentorLayout>
  );
};

export default StudentList;
