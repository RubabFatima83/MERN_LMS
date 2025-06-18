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

  // Update modal fields when assignment changes or modal is opened
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
      if (onSubmitted) onSubmitted(); // refresh assignment list
    } catch (error) {
      console.error('Submission failed', error);
      alert('Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen || !assignment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex justify-center items-center px-4 sm:px-0">
      <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-lg relative max-h-[90vh] overflow-y-auto z-[1001]">
        <h3 className="text-2xl font-semibold mb-6 text-gray-900">
          {assignment.title || 'Assignment'} Submission
        </h3>
        <form onSubmit={handleSubmit}>
          {/* Textarea */}
          <label className="block mb-2 font-medium text-gray-700" htmlFor="submissionText">
            Submission Text
          </label>
          <textarea
            id="submissionText"
            className="w-full border border-gray-300 rounded-md p-3 mb-5 resize-y focus:outline-none focus:ring-2 focus:ring-[#65a0ff]"
            rows={5}
            value={submissionText}
            onChange={(e) => setSubmissionText(e.target.value)}
          />

          {/* File Input */}
          <label className="block mb-2 font-medium text-gray-700" htmlFor="fileUpload">
            Upload File (optional)
          </label>
          <input
            id="fileUpload"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-2"
            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
          />
          {file && (
            <p className="text-sm text-gray-600 mb-4">Selected file: <strong>{file.name}</strong></p>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full sm:w-auto px-4 py-2 rounded-md text-white font-medium transition ${
                submitting ? 'bg-[#65a0ff]/70 cursor-not-allowed' : 'bg-[#65a0ff] hover:bg-[#4a7ddb]'
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
