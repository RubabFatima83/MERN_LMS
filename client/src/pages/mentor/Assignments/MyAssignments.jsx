import React, { useEffect, useState } from 'react';
import api from '../../../auth/Services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AssignmentSubmissions from '../../../components/mentor/AssignmentSubmissions';
import MentorLayout from '../../../components/mentor/MentorLayout';

const MyAssignments = () => {
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await api.get('/assignment/mentor');
        setAssignments(res.data.data);
      } catch (err) {
        toast.error('Failed to load assignments');
      }
    };
    fetchAssignments();
  }, []);

  const clickCreateAssignment = () => {
    navigate('/mentor/create-assignment');
  };

  return (
    <MentorLayout>
      <div className="max-w-5xl mx-auto mt-10 px-4 sm:px-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#65a0ff]">
            My Assignments
          </h2>
          <button
            onClick={clickCreateAssignment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 w-full sm:w-auto"
          >
            Create Assignment
          </button>
        </div>

        {/* Assignments List */}
        {assignments.length === 0 ? (
          <p className="text-white text-center">No assignments found.</p>
        ) : (
          <ul className="space-y-5">
            {assignments.map((a) => (
              <li
                key={a._id}
                className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 sm:p-5 rounded-xl shadow transition"
              >
                <div className="mb-3 space-y-1">
                  <h3 className="text-lg sm:text-xl font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium">Course:</span> {a.courseId.title}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-medium">Due Date:</span>{' '}
                    {new Date(a.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedAssignmentId(
                      selectedAssignmentId === a._id ? null : a._id
                    )
                  }
                  className="text-sm text-white bg-[#65a0ff] px-4 py-2 rounded hover:bg-[#2375f8] transition"
                >
                  {selectedAssignmentId === a._id ? 'Hide Submissions' : 'View Submissions'}
                </button>

                {selectedAssignmentId === a._id && (
                  <div className="mt-4">
                    <AssignmentSubmissions assignmentId={a._id} />
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </MentorLayout>
  );
};

export default MyAssignments;
