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
  const [submissionText, setSubmissionText] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

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

  const openModal = (assignmentId, existingSubmissionText = '') => {
    setCurrentAssignmentId(assignmentId);
    setSubmissionText(existingSubmissionText);
    setFile(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentAssignmentId(null);
    setSubmissionText('');
    setFile(null);
  };

  const handleSubmit = async () => {
    if (!currentAssignmentId) return;
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('submissionText', submissionText);
      if (file) formData.append('file', file);

      await api.post(`/submission/${currentAssignmentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Submitted successfully!');
      closeModal();
      fetchAssignments();
    } catch (error) {
      console.error('Submission failed', error);
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <StudentLayout>
      <div className="max-h-screen max-w-4xl mx-auto p-4 sm:p-6">
        <h2 className="text-3xl font-extrabold text-[#65a0ff] mb-6 border-b border-[#65a0ff] mt-0 pb-2">
          Your Assignments
        </h2>

        {loading ? (
          <p className="text-gray-300 text-center">Loading assignments...</p>
        ) : !assignments.length ? (
          <p className="text-gray-400 text-center">No assignments found for your courses.</p>
        ) : (
          <ul className="space-y-5 max-h-[70vh] pr-2 overflow-y-auto">
            {assignments.map((assignment) => {
              const dueDate = new Date(assignment.dueDate);
              const now = new Date();
              const isDeadlinePassed = isAfter(now, dueDate);
              const submission = assignment.submissionStatus;
              const isSubmitted = submission?.submitted ?? false;

              return (
                <li
                  key={assignment._id}
                  className="overflow-hidden bg-[#012465] p-3 rounded-md shadow border-l-4 border-[#65a0ff] transition-transform hover:scale-[1.01]"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold text-[#65a0ff]">{assignment.title}</h3>
                    <span className="text-sm text-gray-300">
                      Due: {assignment.dueDate ? format(dueDate, 'PPP p') : 'No due date'}
                    </span>
                  </div>

                  {expandedId === assignment._id ? (
                    <p className="text-gray-300 mb-2 whitespace-pre-wrap">
                      {assignment.description}
                      <button
                        onClick={() => setExpandedId(null)}
                        className="text-sm text-blue-400 ml-2 underline"
                      >
                        Show less
                      </button>
                    </p>
                  ) : (
                    <p className="text-gray-300 mb-2 whitespace-pre-wrap">
                      {assignment.description.slice(0, 100)}...
                      <button
                        onClick={() => setExpandedId(assignment._id)}
                        className="text-sm text-blue-400 ml-2 underline"
                      >
                        Read more
                      </button>
                    </p>
                  )}

                  <p className="text-sm text-gray-400 mb-1">
                    <span className="font-medium">Course:</span> {assignment.courseId?.title || 'Unknown Course'}
                  </p>

                  {isSubmitted ? (
                    <p className="text-green-400 font-semibold mb-3 break-words">
                      Submitted on{' '}
                      {submission.submittedAt
                        ? format(new Date(submission.submittedAt), 'PPP p')
                        : 'Unknown date'}
                      <br />
                      Grade: {submission.grade || 'Pending'}
                    </p>
                  ) : (
                    <p className="text-red-500 font-semibold mb-3">Not submitted yet</p>
                  )}

                  <>
                    {!isDeadlinePassed ? (
                      <button
                        onClick={() => openModal(assignment._id, submission?.submissionText || '')}
                        className="w-full sm:w-auto px-5 py-2 rounded-md font-medium transition bg-[#65a0ff] hover:bg-[#4a7ddb] text-white"
                      >
                        {isSubmitted ? 'Resubmit' : 'Submit'}
                      </button>
                    ) : (
                      <p className="text-sm text-red-400 font-semibold mt-1">
                        Deadline has passed — submission is closed.
                      </p>
                    )}
                  </>

                </li>
              );
            })}
          </ul>
        )}

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
