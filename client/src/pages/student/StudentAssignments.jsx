import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import { format, isAfter } from 'date-fns';
import StudentLayout from '../../components/student/StudentLayout';
import SubmissionModal from './AssignmentSubmission';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [currentAssignmentId, setCurrentAssignmentId] = useState(null);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/student/assignments');
      setAssignments(response.data?.data || []);
    } catch (err) {
      console.error('Failed to load assignments', err);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const openModal = (assignmentId) => {
    setCurrentAssignmentId(assignmentId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentAssignmentId(null);
  };

  return (
    <StudentLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <h2 className="text-xl md:text-3xl font-extrabold text-[#65a0ff] mb-6 border-b border-[#65a0ff] pb-2">
          Your Assignments
        </h2>

        {loading ? (
          <p className="text-gray-300 text-center">Loading assignments...</p>
        ) : !assignments.length ? (
          <p className="text-gray-400 text-center">No assignments found for your courses.</p>
        ) : (
          <ul className="space-y-5 max-h-[70vh] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
            {assignments.map((assignment) => {
              const dueDate = new Date(assignment.dueDate);
              const now = new Date();
              const isDeadlinePassed = isAfter(now, dueDate);
              const submission = assignment.submissionStatus;
              const isSubmitted = submission?.submitted ?? false;

              return (
                <li
                  key={assignment._id}
                  className="bg-[#012465] p-4 sm:p-5 rounded-md shadow border-l-4 border-[#65a0ff] transition-transform hover:scale-[1.01]"
                >
                  {/* Title and Due Date */}
                  <div className="flex flex-col sm:flex-row justify-between gap-2 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-[#65a0ff]">
                      {assignment.title}
                    </h3>
                    <span className="text-sm text-gray-300">
                      Due: {assignment.dueDate ? format(dueDate, 'PPP p') : 'No due date'}
                    </span>
                  </div>

                  {/* Description with Read More */}
                  {expandedId === assignment._id ? (
                    <p className="text-gray-300 mb-2 whitespace-pre-wrap text-sm">
                      {assignment.description}
                      <button
                        onClick={() => setExpandedId(null)}
                        className="text-sm text-blue-400 ml-2 underline"
                      >
                        Show less
                      </button>
                    </p>
                  ) : (
                    <p className="text-gray-300 mb-2 whitespace-pre-wrap text-sm">
                      {assignment.description.slice(0, 100)}...
                      <button
                        onClick={() => setExpandedId(assignment._id)}
                        className="text-sm text-blue-400 ml-2 underline"
                      >
                        Read more
                      </button>
                    </p>
                  )}

                  {/* Course Info */}
                  <p className="text-sm text-gray-400 mb-1">
                    <span className="font-medium">Course:</span>{' '}
                    {assignment.courseId?.title || 'Unknown Course'}
                  </p>

                  {/* Submission Status */}
                  {isSubmitted ? (
                    <p className="text-green-400 font-semibold mb-3 text-sm break-words">
                      Submitted on{' '}
                      {submission.submittedAt
                        ? format(new Date(submission.submittedAt), 'PPP p')
                        : 'Unknown date'}
                      <br />
                      Grade: {submission.grade || 'Pending'}
                    </p>
                  ) : (
                    <p className="text-red-500 font-semibold mb-3 text-sm">Not submitted yet</p>
                  )}

                  {/* Submit / Resubmit Button */}
                  {!isDeadlinePassed ? (
                    <button
                      onClick={() => openModal(assignment._id)}
                      className="w-full sm:w-auto px-4 py-2 rounded-md text-white bg-[#65a0ff] hover:bg-[#4a7ddb] text-sm font-medium transition"
                    >
                      {isSubmitted ? 'Resubmit' : 'Submit'}
                    </button>
                  ) : (
                    <p className="text-sm text-red-400 font-semibold mt-1">
                      Deadline has passed — submission is closed.
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {/* Submission Modal */}
        {modalOpen && (
          <SubmissionModal
            assignment={assignments.find((a) => a._id === currentAssignmentId)}
            isOpen={modalOpen}
            onClose={closeModal}
            onSubmitted={fetchAssignments}
          />
        )}
      </div>
    </StudentLayout>
  );
};

export default StudentAssignments;
