import React, { useState, useEffect } from 'react';
import api from '../../auth/Services/api';

const SubmissionModal = ({
  assignment,
  isOpen,
  onClose,
  onSubmitted,
}) => {
  const [submissionText, setSubmissionText] = useState('');
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (assignment && isOpen) {
      setSubmissionText(assignment.submissionStatus?.submissionText || '');
      setFile(null);
    }
  }, [assignment, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignment?._id) return;

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('submissionText', submissionText);
      if (file) formData.append('file', file);

      await api.post(`/submission/${assignment._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Submitted successfully!');
      onClose();
      if (onSubmitted) onSubmitted();
    } catch (error) {
      console.error('Submission failed', error);
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !assignment) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4 py-6 sm:px-6">
      <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-lg p-5 sm:p-8 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
          Submit: {assignment.title || 'Assignment'}
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Submission Text */}
          <label htmlFor="submissionText" className="block mb-2 text-gray-700 font-medium">
            Submission Text
          </label>
          <textarea
            id="submissionText"
            rows={5}
            className="w-full border border-gray-300 rounded-lg p-3 mb-5 resize-y focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
            placeholder="Write your response here..."
          />

          {/* File Upload */}
          <label htmlFor="fileUpload" className="block mb-2 text-gray-700 font-medium">
            Upload File (optional)
          </label>
          <input
            type="file"
            id="fileUpload"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
            className="mb-3"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <p className="text-sm text-gray-600 mb-4">
              Selected file: <strong>{file.name}</strong>
            </p>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full sm:w-auto px-4 py-2 text-white font-medium rounded-lg transition ${
                submitting
                  ? 'bg-[#65a0ff]/70 cursor-not-allowed'
                  : 'bg-[#65a0ff] hover:bg-[#4a7ddb]'
              }`}
            >
              {submitting ? 'Submitting...' : 'Submit Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubmissionModal;
