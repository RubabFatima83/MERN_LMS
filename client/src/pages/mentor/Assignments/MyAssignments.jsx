import React, { useEffect, useState } from 'react';
import api from '../../../auth/Services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AssignmentSubmissions from '../../../components/mentor/AssignmentSubmissions';
import MentorLayout from '../../../components/mentor/MentorLayout';

const MyAssignments = () => {
  const navigate = useNavigate()
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
    navigate('/mentor/create-assignment')
  }

  return (
    <MentorLayout>
      <div className="max-w-4xl mx-auto mt-10">
        <div className="flex justify-between items-center border-b border-[#65a0ff] pb-4 mb-6">
          <h2 className="text-3xl font-extrabold text-[#65a0ff]">
            My Assignments
          </h2>
          <button
            onClick={clickCreateAssignment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Create Assignment
          </button>
        </div>

        {assignments.length === 0 ? (
          <p className="text-white">No assignments found.</p>
        ) : (
          <ul className="space-y-4">
            {assignments.map((a) => (
              <li
                key={a._id}
                className="text-[#65a0ff] bg-[#012465] border-l-4 border-[#65a0ff] p-4 shadow rounded"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{a.title}</h3>
                  <p className="text-sm text-gray-300">Course: {a.courseId.title}</p>
                  <p className="text-sm text-gray-400">
                    Due Date: {new Date(a.dueDate).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setSelectedAssignmentId(
                      selectedAssignmentId === a._id ? null : a._id
                    )
                  }
                  className="text-sm text-white bg-[#65a0ff] px-3 py-1 rounded hover:bg-[#2375f8]"
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
