import React, { useEffect, useState } from 'react';
import api from '../../auth/Services/api';
import { toast } from 'react-toastify';

const backendUrl = import.meta.env.VITE_BACKEND_URI;

const AssignmentSubmissions = ({ assignmentId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchSubmissions = async () => {
    try {
      const res = await api.get(`/submission/get/${assignmentId}`);
      const data = res.data.data || [];

      setSubmissions(
        data.map((s) => ({
          ...s,
          localGrade: s.grade || '',
          localRemarks: s.remarks || '',
        }))
      );
    } catch (err) {
      toast.error('Failed to load submissions');
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [assignmentId]);

  const handleSave = async (studentId) => {
    const submission = submissions.find((s) => s.studentId._id === studentId);
    if (!submission) return;

    try {
      setUpdatingId(studentId);
      await api.put(`/submission/update/${assignmentId}/${studentId}`, {
        grade: submission.localGrade,
        remarks: submission.localRemarks,
      });
      toast.success('Submission updated');
    } catch (err) {
      toast.error('Failed to update submission');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleChange = (studentId, field, value) => {
    setSubmissions((prev) =>
      prev.map((s) =>
        s.studentId._id === studentId ? { ...s, [field]: value } : s
      )
    );
  };

  return (
    <div className="mt-4">
      <h4 className="font-semibold mb-2">Submissions:</h4>
      {submissions.length === 0 ? (
        <p className="text-gray-600 text-sm">No submissions yet.</p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((sub) => (
            <li
              key={sub.studentId._id}
              className="border rounded p-4 bg-gray-50 space-y-2"
            >
              <p>
                <strong>Student:</strong> {sub.studentId.name} ({sub.studentId.email})
              </p>

              {sub.fileUrl && (
                <p>
                  <a
                    href={`${backendUrl}/api/uploads/${sub.fileUrl.split(/[/\\]/).pop()}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 underline"
                  >
                    View File
                  </a>
                </p>
              )}

              <p className="text-sm text-gray-500">
                Submitted: {new Date(sub.submittedAt).toLocaleString()}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium">Grade:</label>
                  <select
                    value={sub.localGrade}
                    className="border rounded px-2 py-1 w-full"
                    onChange={(e) =>
                      handleChange(sub.studentId._id, 'localGrade', e.target.value)
                    }
                  >
                    <option value="">Select Grade</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Very Good">Very Good</option>
                    <option value="Good">Good</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Remarks:</label>
                  <textarea
                    value={sub.localRemarks}
                    rows={2}
                    className="border rounded px-2 py-1 w-full"
                    onChange={(e) =>
                      handleChange(sub.studentId._id, 'localRemarks', e.target.value)
                    }
                  />
                </div>
              </div>

              <button
                onClick={() => handleSave(sub.studentId._id)}
                className="mt-2 px-4 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50"
                disabled={updatingId === sub.studentId._id}
              >
                {updatingId === sub.studentId._id ? 'Saving...' : 'Save'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssignmentSubmissions;
